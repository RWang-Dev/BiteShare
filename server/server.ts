import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();
const admin = require("firebase-admin");
const serviceAccount = require("./firebaseAccountKey.json");

const app = express();
const PORT = process.env.PORT || 3000;
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: FIREBASE_PROJECT_ID,
});

const db = admin.firestore();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).send("Internal Server Error");
});

// Routes

// GET
app.get("/test", async (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express! " + process.env.PORT);
});

app.get("/test-db", async (req: Request, res: Response) => {
  try {
    const usersRef = db.collection("users");
    const snapshot = await usersRef.get();

    const users = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({
      status: "Connected",
      userCount: users.length,
      users,
    });
  } catch (error) {
    console.error("Firebase connection error:", error);
    res.status(500).json({
      status: "Error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.get("/users/:uid", async (req: Request, res: Response) => {
  const { uid } = req.params;

  try {
    const userCollection = await db.collection("users");
    const userDoc = await userCollection.doc(uid).get();

    if (!userDoc.exists) {
      res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      uid: userDoc.id,
      ...userDoc.data(),
    });
  } catch (error) {
    console.error("Error fetching user: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  return;
});

// POST
app.post("/users", async (req: Request, res: Response) => {
  try {
    const { uid, username } = req.body;
    if (!uid || !username) {
      res.status(400).json({ error: "UID and username are required" });
    }

    const usersCollection = await db.collection("users");
    await usersCollection.doc(uid).set(
      {
        username,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    res.status(201).json({
      message: "User created/updated successfully",
      uid,
      username,
    });
  } catch (error) {
    console.error("Error creating user: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  return;
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

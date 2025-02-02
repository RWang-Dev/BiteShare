import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";

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
const storage = admin.storage().bucket("biteshare-5f270.firebasestorage.app");

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).send("Internal Server Error");
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
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

app.get("/coupon", async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    const couponCollection = db.collection("coupons");
    const coupon = await couponCollection.doc(id).get();

    res.status(200).json({
      couponData: coupon.data(),
      message: "Got coupon",
    });
    return;
  } catch (error) {
    console.error(error);
  }
  return;
});

app.get("/claimedCoupons", async (req: Request, res: Response) => {
  try {
    const { uid } = req.query;

    const userCollection = db.collection("users");
    const user = await userCollection.doc(uid).get();

    console.log(user);
    const claimedCoupons = user.data().claimedCoupons;

    console.log(claimedCoupons);
    res.status(200).json({
      coupons: claimedCoupons,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "failed getting claimed coupons",
    });
  }
  return;
});

app.get("/coupons", async (req: Request, res: Response) => {
  try {
    const { uid, limit = 10, lastVisible } = req.query;
    const limitInt = parseInt(limit as string, 10);

    const userDoc = await db
      .collection("users")
      .doc(uid as string)
      .get();
    const userData = userDoc.data();
    const claimedCoupons = userData?.claimedCoupons || [];
    console.log(claimedCoupons);

    let query = db.collection("coupons").orderBy("createdAt").limit(limitInt);

    if (lastVisible && lastVisible !== "null") {
      const parsedLastVisible = JSON.parse(lastVisible as string);
      const lastVisibleTimestamp = new admin.firestore.Timestamp(
        parsedLastVisible._seconds,
        parsedLastVisible._nanoseconds
      );
      console.log("PARSED: ", lastVisibleTimestamp);
      query = db
        .collection("coupons")
        .orderBy("createdAt")
        .startAfter(lastVisibleTimestamp)
        .limit(limitInt);
    }
    const snapshot = await query.get();

    const coupons = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
      claimed: claimedCoupons.includes(doc.id),
    }));

    let newLastVisible = null;
    if (coupons.length > 0) {
      newLastVisible = JSON.stringify(coupons[coupons.length - 1].createdAt);
    }

    console.log("NEW LAST VISIBLE: ", newLastVisible);
    console.log("UNCLAIMED COUPONS: ", coupons);
    res.status(200).json({
      coupons,
      lastVisible: newLastVisible,
    });
  } catch (error) {
    console.error("Firebase connection error: ", error);
    res.status(500).json({ error: "Failed to fetch coupons" });
  }
  return;
});

app.get("/users/:uid", async (req: Request, res: Response) => {
  const { uid } = req.params;

  try {
    const userCollection = await db.collection("users");
    const userDoc = await userCollection.doc(uid).get();

    if (!userDoc.exists) {
      res.status(200).json({ result: "User not found" });
      return;
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

// PATCH
app.patch("/users/updateUserType", async (req: Request, res: Response) => {
  try {
    const { uid, newUserType } = req.body;
    const userCollection = db.collection("users");
    const userData: any = {
      userType: newUserType,
    };

    await userCollection.doc(uid).set(userData, { merge: true });

    res.status(201).json({
      message: "User updated successfully",
      uid,
    });
  } catch (error) {
    console.error(error);
  }
  return;
});

// POST
app.post("/claimCoupon", async (req: Request, res: Response) => {
  try {
    const { uid, couponid, type } = req.body;
    if (!uid || !couponid) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const userRef = db.collection("users").doc(uid);
    const couponRef = db.collection("coupons").doc(couponid); // Fix: Use couponid instead of uid

    const userDoc = await userRef.get();
    const userData = userDoc.exists ? userDoc.data() : { claimedCoupons: [] };

    const couponDoc = await couponRef.get();
    const couponData = couponDoc.exists
      ? couponDoc.data()
      : { usersClaimed: [] };

    await userRef.set(
      {
        claimedCoupons: Array.isArray(userData.claimedCoupons)
          ? [...userData.claimedCoupons, couponid]
          : [couponid],
      },
      { merge: true }
    );

    await couponRef.set(
      {
        usersClaimed: Array.isArray(couponData.usersClaimed)
          ? [...couponData.usersClaimed, uid]
          : [uid],
      },
      { merge: true }
    );

    res.status(200).json({
      message: "Coupon claimed successfully",
    });
    return;
  } catch (error: any) {
    console.error("Error claiming coupon:", error);
    res.status(500).json({
      message: "Error claiming coupon",
      error: error.message,
    });
    return;
  }
});

app.post(
  "/users/createProfile",
  upload.single("profileImage"),
  async (req: Request, res: Response) => {
    try {
      const { uid, username } = req.body;
      const file = req.file;

      if (!uid || !username) {
        res.status(400).json({ error: "UID and username are required" });
        return;
      }

      let profileImageUrl = "";

      if (file) {
        const fileName = file.originalname;
        const fileUpload = storage.file(`users/${uid}/${fileName}`);

        await fileUpload.save(file.buffer, {
          metadata: {
            contentType: file.mimetype,
          },
        });

        await fileUpload.makePublic();
        profileImageUrl = `https://storage.googleapis.com/${storage.name}/users/${uid}/${fileName}`;
      }

      const userData: any = {
        username,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      if (profileImageUrl) {
        userData.profileImageUrl = profileImageUrl;
      }

      const usersCollection = await db.collection("users");
      await usersCollection.doc(uid).set(userData, { merge: true });

      res.status(201).json({
        message: "User created/updated successfully",
        uid,
        username,
        profileImageUrl,
      });
    } catch (error) {
      console.error("Error creating user: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
    return;
  }
);

// app.post("/influencers/posts", upload.single, async (req: Request, res: Response) => {

// })

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

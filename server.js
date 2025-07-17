const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json'); // Download from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(cors());
app.use(express.json());

// Firestore reference
const db = admin.firestore();

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { name, contact, email, password } = req.body;
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
      phoneNumber: contact
    });
    // Optionally store extra user info in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      name,
      contact,
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    res.status(201).json({ message: 'Signup successful', uid: userRecord.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login endpoint (returns custom token)
app.post('/login', async (req, res) => {
  const { email } = req.body;
  // For login, use Firebase Client SDK on the frontend.
  // Optionally, you can generate a custom token for advanced use cases:
  try {
    const user = await admin.auth().getUserByEmail(email);
    const token = await admin.auth().createCustomToken(user.uid);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Join queue endpoint
app.post('/queue/join', async (req, res) => {
  const { service, userId } = req.body;
  if (!service || !userId) {
    return res.status(400).json({ error: 'Missing service or userId' });
  }
  try {
    const queueRef = db.collection('queues').doc(service);
    await queueRef.set(
      { users: admin.firestore.FieldValue.arrayUnion(userId) },
      { merge: true }
    );
    res.json({ message: 'Joined queue' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Cancel queue endpoint
app.post('/queue/cancel', async (req, res) => {
  const { service, userId } = req.body;
  if (!service || !userId) {
    return res.status(400).json({ error: 'Missing service or userId' });
  }
  try {
    const queueRef = db.collection('queues').doc(service);
    await queueRef.update({
      users: admin.firestore.FieldValue.arrayRemove(userId)
    });
    res.json({ message: 'Left queue' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get queue status for a user
app.get('/queue/status/:service/:userId', async (req, res) => {
  const { service, userId } = req.params;
  try {
    const queueDoc = await db.collection('queues').doc(service).get();
    if (!queueDoc.exists) {
      return res.json({ inQueue: false });
    }
    const users = queueDoc.data().users || [];
    res.json({ inQueue: users.includes(userId) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
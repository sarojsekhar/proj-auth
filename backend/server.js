const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB Connection area start....
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri);
    let usersCollection;

    async function connectDB() {
        await client.connect();
        const db = client.db("proj_auth");
        usersCollection = db.collection("users");
        console.log("MongoDB connected proj_auth !....");
    }

    connectDB();
// MongoDB Connection area end....

// Register API endpoint start
    app.post("/api/register", async (req, res) => {
        try{
            console.log(req.body);
            const { username, email, password } = req.body;
            
            console.log(username, email, password);
            const existingUser = usersCollection.findOne({ email });
            if ( existingUser ) {
                return res.status(400).json({ message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await usersCollection.insertOne({
                username,
                email,
                password: hashedPassword,
                createdAt: new Date()
            });

            res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error registering user", error });
        }
    });
// Register API endpoint end

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
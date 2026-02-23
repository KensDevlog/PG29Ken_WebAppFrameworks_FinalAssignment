import express, { type Request, type Response } from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { connectDb } from "./mongodb";
import contactInquiriesRouter from "./src/routes/contactInquiries";
dotenv.config();

type LeaderboardItem = {
    player: string;
    score: number;
};

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.sqlDB_HOST ?? "localhost",
    user: process.env.sqlDB_USER,
    password: process.env.sqlDB_PASSWORD,
    database: process.env.sqlDB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

app.get("/api/ping", (req: Request, res: Response) => {
    res.json({ message: "OK" });
});

app.get("/api/leaderboard-summary", async (req: Request, res: Response) => {
    const [rows] = await pool.execute(
        "SELECT username AS player, score FROM scores ORDER BY score DESC LIMIT 3;"
    );
    res.json(rows as LeaderboardItem[]);
});

app.get("/api/leaderboard", async (req: Request, res: Response) => {
    const [rows] = await pool.execute(
        "SELECT username AS player, score FROM scores ORDER BY score DESC;"
    );
    res.json(rows as LeaderboardItem[]);
});

app.use("/api/contact", contactInquiriesRouter);

app.listen(PORT, async () => {
    console.log(`Backend server is running at http://localhost:${PORT}`);
    await connectDb(process.env.MONGO_URI ?? "mongodb://localhost:27017/a1app");
});
import mongoose from "mongoose";

import mongoose from "mongoose";

export async function connectDb(uri: string) {
    await mongoose.connect(uri);
    console.log("Database Connected :D");
}

export async function disconnectDb() {
    await mongoose.disconnect();
    console.log("database disconnected");
}
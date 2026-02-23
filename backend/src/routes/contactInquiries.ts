import { Router, Request, Response } from "express";
import { ContactInquiry } from "../models/ContactInquiry";

const router = Router();

// create a new inquiry and send to mongodb
router.post("/", async (req: Request, res: Response) => {
    try {
        const created = await ContactInquiry.create(req.body);
        res.status(201).json(created);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// get all inquiries from a specific email
router.get("/:email", async (req: Request, res: Response) => {
    try {
        const inquiries = await ContactInquiry.find(
            { email: req.params.email },
            { inquiry: 1, _id: 0 }
        );
        res.status(200).json(inquiries);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// get the name attached to a specific email
router.get("/:email/name", async (req: Request, res: Response) => {
    try {
        const result = await ContactInquiry.findOne(
            { email: req.params.email },
            { name: 1, _id: 0 }
        );
        if (!result) return res.status(404).json({ error: "Email not found. Try again later" });
        res.status(200).json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
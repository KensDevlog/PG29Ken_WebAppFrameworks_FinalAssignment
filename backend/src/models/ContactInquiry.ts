import mongoose from "mongoose";

const contactInquirySchema = new mongoose.Schema(
	{
		email: { type: String, required: true,  trim: true },
		name: { type: String, required: true, trim: true },
		inquiry: { type: String, required: true }
	},
	{ timestamps: true }
);

export const ContactInquiry = mongoose.model("ContactInquiry", contactInquirySchema);
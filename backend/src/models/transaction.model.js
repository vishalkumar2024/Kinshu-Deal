import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ClaimedAmount: {
    type: Number,
    required: true,
  },
  passedAmount: {
    type: Number,
    default: 0,
  },
  remark: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);
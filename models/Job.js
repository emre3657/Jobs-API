const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide a company name"],
      minlenght: 1,
      maxlength: 50,
      trim: true,
    },
    position: {
      type: String,
      required: [true, "Please provide a position"],
      minlength: 1,
      maxlength: 100,
      trim: true,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide an user"],
      immutable: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);

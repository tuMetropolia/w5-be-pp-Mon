/* {
  "name": "Matti Seppänen",
  "email": "matti@example.com",
  "password": "M@45mtg$",
  "phone_number": "+358401234567",
  "gender": "Male",
  "date_of_birth": "2000-01-15",
  "membership_status": "Active"
} */

  const mongoose = require("mongoose");

  const Schema = mongoose.Schema;
 
  const userSchema = new Schema(
  {
      name: {
      type: String,
      required: true,
      },
      email: {
      type: String,
      required: true,
      unique: true,
      },
      password: {
      type: String,
      required: true,
      },
      phone_number: {
      type: String,
      required: true,
      },
      gender: {
      type: String,
      required: true,
      },
      date_of_birth: {
      type: Date,
      required: true,
      },
      membership_status: {
      type: String,
      required: true,
      },
  },
  { timestamps: true  }
  );
 
  module.exports = mongoose.model("User", userSchema);
/*
{
  "name": "London in 7 Days Tour",
  "info": "Explore the best of London in 7 days with our expert guides. Visit iconic landmarks like the Tower of London, Buckingham Palace, and the British Museum. Enjoy guided walks through historic neighborhoods and experience the vibrant culture of this amazing city.",
  "image": "https://www.course-api.com/images/tours/tour-1.jpeg",
  "price": "2,195"
}
*/

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);

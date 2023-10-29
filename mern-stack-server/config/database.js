// const mongoose = require("mongoose");

// const connectDatabase = () => {
//   mongoose
//     .connect(process.env.DB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000,
//       // useCreateIndex: true, //make this true
//       autoIndex: true,
//       maxPoolSize: 10, // Maintain up to 10 socket connections
//       serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
//       socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
//       family: 4,
//     })
//     .then(() => mongoose.connection.syncIndexes())
//     .then((data) => {
//       console.log(`Mongodb connected with server: ${data.connection.host}`);
//     });
// };

// module.exports = connectDatabase;
// const mongoose = require("mongoose");

// const connectDatabase = async () => {
//   try {
//     await mongoose.connect(process.env.DB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000,
//       autoIndex: true,
//       maxPoolSize: 10,
//       socketTimeoutMS: 45000,
//       family: 4,
//     });

//     // Ensure indexes for all collections
//     await mongoose.connection.syncIndexes();

//     console.log(`Mongodb connected with server: ${mongoose.connection.host}`);
//     // Seed data or start processing requests here
//   } catch (error) {
//     console.error("Error connecting to the database:", error);
//   }
// };

// module.exports = connectDatabase;
const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongodb connected with server: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

module.exports = connectDatabase;
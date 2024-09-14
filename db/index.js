import mongoose from 'mongoose';

const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "Zupper" })
    .then((data) => console.log(`Connected to DB: ${data.connection.host}`))
    .catch((err) => {
      throw err;
    });
};


export default connectDB;
import mongoose from "mongoose";

const connectedDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to Database MongoDB')
  } catch (error) {
    throw new Error("No es posible conectarse a la base de datos", error);
  }
};

export default connectedDB;
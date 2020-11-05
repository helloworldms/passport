import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true, // 콘피그레이션 추가해
  useUnifiedTopology: true, // 콘피그레이션 사용안함
});
const db = mongoose.connection; // export

const handleOpen = () => console.log("✅ connected to DB");
const handleError = (error) =>
  console.log(`❌ Error on DB connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);

import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import "./models/Video";
import "./models/Comment";
import "./models/User";

//dotenv- 숨김
const PORT = process.env.PORT || 400;

const handleListening = () =>
app.listen(PORT, handleListening);
  console.log(`✅ Listening on: http://localhost:${PORT}`);


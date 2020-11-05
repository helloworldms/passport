import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
  },
});

const model = mongoose.model("Comment", CommentSchema);
export default model;

//video와 commnet 어떻게 연결시킬까
//commnet에 video ID 저장하거나
//video가 ID의 array를 가지게 한다

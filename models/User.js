import mongoose from "mongoose";
import PassportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number,
});

UserSchema.plugin(PassportLocalMongoose, { usernameFiled: "email" });

const model = mongoose.model("User", UserSchema);

export default model;

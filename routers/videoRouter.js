import express from "express";
import routes from "../routes";
import {
  getUpload,
  postUpload,
  videoDetail,
  editVideo,
  deleteVideo,
} from "../controllers/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);
videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;

/// file upload하면 server에 있는 folder(video/)에 upload postUpload라는 funtion은
/// 해당 file에 접근함. file방식이 아닌 url방식으로. 모든 것이 제대로 되었다면

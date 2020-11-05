import routes from "../routes";
import Video from "../models/Video";

//asyc 비디오 살펴봐 look for videos/////
///기다리지 않음으로 기다리게 해야함 여긴 꼭
///다음과정이 끝날떄까지 조금 기다려줘
export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    throw Error("errrrrr");
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
///upload - user vido file선택 > 어딘가 업로드후 해당 file url얻고 file url로 video셍성
///File upload 해서 middleware로 받음 그리고 middleware에서 file upload후 URL 복사해서 Database에 저장
export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  // 누군가 videoController에서 Upload하려 할때 무슨 일이 일어나는질 알아야 함
  ///
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = (req, res) => {
  const { body, file } = req;
  console.log(body, file);
  res.render("upload", { pageTitle: "Upload" });

  // 반환을 원하는건 file아님 location. location 내 서버일수도 있고, 아마존 서버일수도 있음
  // 누군가 videoController에서 Upload하려 할때 무슨 일이 일어나는질 알아야 함
  ///file upload후 url반환 middleware팔요 - multer-function넣음 url반환
  // To Do: Upload and save video
  // upload.pug에서 추가 enctype="multipart/form-data"

  //res.redirect(routes.videoDetail(324393));
};

export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });

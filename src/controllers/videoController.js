import Video from "../models/Video";

// res.render 함수는 2가지 인수를 가짐. 
// 1) 파일의 이름, 2) 여러개의 변수를 가질 수 있는 obj (home.pug-> base.pug의 pageTitle 변수명 지정)

// Video.find({}, (error, videos) => {}); // callback 함수 방식

export const home = async (req, res) => { // promise 방식 
  const videos = await Video.find({}).sort({ createdAt: "desc" });
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params; //ES6 사용. const id = req.params.id 와 같음.
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "Video not Found." });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
}

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
}

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload video" });
}

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      // createdAt: Date.now(),
      hashtags: Video.formatHashtags(hashtags),
    });
    // save는 promise를 return해준다.
    // DB에 파일이 저장되는 것을 기다려준다.
    // await video.save();
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload video",
      errorMessage: error._message,
    });
  }
}


export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
}

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}`, "i"),
      },
    });
  }
  return res.render("search", { pageTitle: "Search", videos });
}
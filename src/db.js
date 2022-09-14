import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/mywetube");
// 만약에 에러가 난다면, 위에다가
// ,{
//   useNewUrlParser: true, 
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// }
// 붙이기!!

const db = mongoose.connection;

const handleOpen = () => console.log("💫Connected to DB");
const handleError = (error) => console.log("💥DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);
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
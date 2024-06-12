import mongoose from "mongoose";  // 确保导入 mongoose
import UserModel from "../../user/model/user.model";  // 导入 User 模型

const courseSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  term: {
    type: String,
    required: true,
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // 这里使用字符串 "User"
    required: true,
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // 这里使用字符串 "User"
  }],
});

export default mongoose.models.Course || mongoose.model("course", courseSchema);

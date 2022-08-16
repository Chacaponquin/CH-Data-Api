import mongoose from "mongoose";
import {
  SUPER_USER_LIMITS,
  USER_LIMITS,
} from "../../shared/helpers/constants/UserLimits";

interface UserSchema {
  username: string;
  email: string;
  password: string;
  isSuperUser: boolean;
  datasetsSchemas: any[];
}

const userSchema = new mongoose.Schema<UserSchema>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    username: { type: String, required: true, maxlength: 50 },
    isSuperUser: { type: Boolean, default: false },
    datasetsSchemas: {
      type: [
        { type: mongoose.Types.ObjectId, required: true, ref: "DatasetSchema" },
      ],
      default: [],
    },
  },
  { timestamps: { createdAt: true } }
);

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

userSchema.virtual("limitDatasets").get(function () {
  if (this.isSuperUser) return SUPER_USER_LIMITS.LIMIT_DATASETS;
  else return USER_LIMITS.LIMIT_DATASETS;
});
userSchema.virtual("limitDocuments").get(function () {
  if (this.isSuperUser) return SUPER_USER_LIMITS.LIMIT_DOCUMENTS;
  else return USER_LIMITS.LIMIT_DOCUMENTS;
});

export default mongoose.model("User", userSchema);

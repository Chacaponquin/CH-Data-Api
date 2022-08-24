import mongoose from "mongoose";
import { LOGIN_METHODS } from "../../shared/helpers/constants/LoginMethods";
import {
  SUPER_USER_LIMITS,
  USER_LIMITS,
} from "../../shared/helpers/constants/UserLimits";

interface UserSchema {
  username: string;
  email: string | null;
  password: string | null;
  isSuperUser: boolean;
  datasetsSchemas: any[];
  image: string | null;
  methodLogin: LOGIN_METHODS;
}

const userSchema = new mongoose.Schema<UserSchema>(
  {
    email: { type: String, default: null },
    password: { type: String, default: null },
    username: { type: String, required: true, maxlength: 50 },
    image: { type: String, default: null },
    isSuperUser: { type: Boolean, default: false },
    datasetsSchemas: {
      type: [
        { type: mongoose.Types.ObjectId, required: true, ref: "DatasetSchema" },
      ],
      default: [],
    },
    methodLogin: { type: String, enum: LOGIN_METHODS, required: true },
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

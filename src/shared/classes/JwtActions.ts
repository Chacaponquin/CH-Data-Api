import jwt from "jsonwebtoken";
import User from "../../db/schemas/User";

export const JwtActions = {
  verifyToken: async (token: string) => {
    try {
      const user = jwt.verify(token, process.env.SECRET_WORD as string) as any;

      if (user) {
        return await User.findById(user.id);
      } else return null;
    } catch (error) {
      return null;
    }
  },
};

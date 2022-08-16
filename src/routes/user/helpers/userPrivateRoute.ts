import { Request, Response } from "express";

import { IsNotUserError } from "../errors/IsNotUserError";

export const userPrivateRoute = (req: Request, res: Response, next: any) => {
  try {
    const currentUser = req.user as any;
    if (currentUser) {
      next();
    } else throw new IsNotUserError();
  } catch (error) {
    if (error instanceof IsNotUserError) {
      res
        .status(500)
        .json({
          error: "Debes ser un usuario para poder acceder a tus schemas",
        })
        .end();
    } else res.status(401).json({ error: {} }).end();
  }
};

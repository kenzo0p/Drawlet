import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";

// Extend Express Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const middleware = (req  :Request  ,res : Response , next : NextFunction) => {
   try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(403).json({ error: "Token expired or missing" });
    }
    const token = authHeader.split(' ')[1] ?? "";
    const decodedToken = jwt.verify(token,JWT_SECRET!) as { userId?: string };
    if (!decodedToken.userId) {
      return res.status(403).json({ error: "Token expired or unauthenticated" });
    }
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.log(error, "middleware");
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}
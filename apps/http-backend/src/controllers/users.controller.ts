import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CreateUser, SigninSchema } from "@repo/common/types";
import bcrypt from "bcrypt";
import { prismaClient } from "@repo/database/client";
import { JWT_SECRET } from "@repo/backend-common/config";
export const signup = async (req: Request, res: Response) => {
  try {
    const { success, data } = CreateUser.safeParse(req.body);
    if (!success) {
      return res.status(403).json("Invalid input");
    }
    const username = data.username;
    const password = data.password;
    const name = data.name;

    const hashPassword = await bcrypt.hash(password, 10);
    const isUser = await prismaClient.user.findFirst({ where: { username } });
    if (isUser) {
      return res.status(400).json("User already exist with this username");
    }

    const newUser = await prismaClient.user.create({
      data: {
        username,
        password: hashPassword,
        name,
      },
    });

    const token = jwt.sign(newUser.id , JWT_SECRET)

    if (!newUser) {
      return res.status(403).json("Try again something went wrong");
    }

    return res.status(201).json({newUser , token});
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
};
export const signin = async (req: Request, res: Response) => {
  try {
    const { success, data } = SigninSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json("Invalid inputs");
    }

    const username = data.username;
    const password = data.passoword;

    const user = await prismaClient.user.findFirst({ where: { username } });
    if (!user) {
      return res
        .status(400)
        .json("User not found with this username please create the account");
    }

    const isPassword = await bcrypt.compare(user.password, password);
    if (!isPassword) {
      return res.status(400).json("Password is incorrect");
    }
    const token = jwt.sign(user.id , JWT_SECRET)
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
};
export const createRoom = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
};

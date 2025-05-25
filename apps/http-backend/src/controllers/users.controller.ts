import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CreateUser, SigninSchema, CreateRoomSchema } from "@repo/common/types";
import bcrypt from "bcrypt";
import { prismaClient } from "@repo/database/client";
import { JWT_SECRET } from "@repo/backend-common/config";
export const signup = async (req: Request, res: Response): Promise<any> => {
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
    const userId = newUser.id;
    const token = jwt.sign({ userId }, JWT_SECRET);

    if (!newUser) {
      return res.status(403).json("Try again something went wrong");
    }

    return res.status(201).json({ newUser, token });
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
};
export const signin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { success, data } = SigninSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json("Invalid inputs");
    }

    const username = data.username;
    const password = data.password;

    const user = await prismaClient.user.findFirst({ where: { username } });
    if (!user) {
      return res
        .status(400)
        .json("User not found with this username please create the account");
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json("Password is incorrect");
    }
    const userId = user.id;
    const token = jwt.sign({ userId }, JWT_SECRET);
    return res.status(200).json({token});
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
};
export const createRoom = async (req: Request, res: Response): Promise<any> => {
  try {
    const { success, data } = CreateRoomSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthenticated user" });
    }

    const newRoom = await prismaClient.room.create({
      data: {
        slug: data.slug,
        adminId: userId,
      },
    });

    return res.status(201).json({roomId :newRoom.id});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllRoomChats = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const roomId = Number(req.params.roomId);
    console.log("Fetching chats for room:", roomId); // Debug log
    const messages = await prismaClient.chat.findMany({
      where: {
        roomId: roomId,
      },
      orderBy: {
        id: "desc",
      },
      take: 50,
    });
    console.log("Found chats:", messages); // Debug log
    return res.status(200).json({ messages : messages  });
  } catch (error) {
    return res
      .status(500)
      .json({ message : [], error: error });
  }
};
export const getRoom = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const slug = req.params.slug;
    const room = prismaClient.room.findFirst({
      where: {
        slug
      }
    });

    return res.status(200).json({ room });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Integer server error", error: error });
  }
};

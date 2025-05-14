import { Request, Response } from "express";
import jwt from "jsonwebtoken"
export const signup  = async (req : Request , res : Response) => {
    try {
        
    } catch (error) {
        return res.status(500).json("Internal server error");
    }
}
export const signin  = async (req : Request , res : Response) => {
    try {
        const userId = req.userId;
    } catch (error) {
        return res.status(500).json("Internal server error");
    }
}
export const createRoom  = async (req : Request , res : Response) => {
    try {
        
    } catch (error) {
        return res.status(500).json("Internal server error");
    }
}
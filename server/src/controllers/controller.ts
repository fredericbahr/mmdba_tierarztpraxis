import { Request, Response } from "express";
import { httpOK } from "../config/statusCode";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getHome = async (req: Request, res: Response) => {
  res.status(httpOK).json({ test: "Backend replied" });
};

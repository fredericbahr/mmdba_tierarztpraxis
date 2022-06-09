import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { httpIntServerError, httpOK } from "../config/statusCode";

const prisma = new PrismaClient();

export const getSpecies = async (req: Request, res: Response) => {
  try {
    const species = await prisma.species.findMany({});

    res.status(httpOK).json(species);
  } catch (error: any) {
    res.status(httpIntServerError).json({ error: error.message });
  }
};

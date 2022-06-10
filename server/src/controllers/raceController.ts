import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
  httpBadRequest,
  httpIntServerError,
  httpOK,
} from "../config/statusCode";
import { IRacesRequest } from "../interfaces/raceInterfaces";

const prisma = new PrismaClient();

/**
 * Gets the races with the specified speciesId
 * @param req Request Object
 * @param res Response Object
 */
export const getRaces = async (req: Request<IRacesRequest>, res: Response) => {
  const { speciesId } = req.params;

  if (!speciesId) {
    return res.status(httpBadRequest).json({
      error: "Bitte geben Sie eine Spezies an",
    });
  }

  try {
    const races = await prisma.race.findMany({
      where: {
        speciesId,
      },
    });

    res.status(httpOK).json(races);
  } catch (error: any) {
    res.status(httpIntServerError).json({ error: error.message });
  }
};

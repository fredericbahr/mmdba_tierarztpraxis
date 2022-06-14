import { PrismaClient, Race } from "@prisma/client";
import { Request, Response } from "express";
import {
  httpBadRequest,
  httpIntServerError,
  httpOK,
} from "../config/statusCode";
import {
  IRaceCreateRequest,
  IRacesGetRequest,
} from "../interfaces/raceInterfaces";

const prisma = new PrismaClient();

/**
 * Gets the races with the specified speciesId
 * @param req Request Object
 * @param res Response Object
 */
export const getRaces = async (
  req: Request<IRacesGetRequest>,
  res: Response
) => {
  const { speciesId } = req.params;

  if (!speciesId) {
    return res.status(httpBadRequest).json({
      error: "Bitte geben Sie eine Spezies an",
    });
  }

  try {
    const races = await prisma.race.findMany({
      where: {
        speciesId: +speciesId,
      },
    });

    res.status(httpOK).json({ races });
  } catch (error: any) {
    res.status(httpIntServerError).json({ error: error.message });
  }
};

export const handleRaceCreation = async (
  req: Request<never, never, IRaceCreateRequest>,
  res: Response
) => {
  try {
    const { name, speciesId } = req.body;

    if (!name || !speciesId) {
      return res.status(httpBadRequest).json({
        error: "Name und Species angeben",
      });
    }

    const race = await prisma.race.create({
      data: {
        name,
        species: {
          connect: {
            id: +speciesId,
          },
        },
      },
    });

    return res.status(httpOK).json({ race });
  } catch (error: any) {
    return res.status(httpIntServerError).json({
      error: "Fehler beim Erstellen einer Rasse",
    });
  }
};

import { PrismaClient, Species } from "@prisma/client";
import { Request, Response } from "express";
import {
  httpBadRequest,
  httpIntServerError,
  httpOK,
} from "../config/statusCode";

const prisma = new PrismaClient();

/**
 * Gets all species
 * @param req Request Object
 * @param res Response Object
 */
export const getSpecies = async (req: Request, res: Response) => {
  try {
    const species = await prisma.species.findMany({});

    res.status(httpOK).json(species);
  } catch (error: any) {
    res.status(httpIntServerError).json({
      error: "Fehler beim Abfragen der Spezies",
    });
  }
};

/**
 * Handles the creation of a new species
 * @param req Request Object
 * @param res Response Object
 */
export const handleSpeciesCreation = async (
  req: Request<never, never, Omit<Species, "id">>,
  res: Response
) => {
  const { name } = req.body;

  if (!name) {
    return res.status(httpBadRequest).json({ error: "Name bitte angeben" });
  }

  try {
    const species = await prisma.species.create({
      data: {
        name: name,
      },
    });

    res.status(httpOK).json({ species });
  } catch (error: any) {
    return res.status(httpIntServerError).json({
      error: "Fehler beim Speichern der Spezies",
    });
  }
};

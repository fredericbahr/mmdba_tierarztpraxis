import { Animal, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
  httpBadRequest,
  httpIntServerError,
  httpOK,
} from "../config/statusCode";
import { ICreateAnimalRequest } from "../interfaces/animalInterface";

const prisma = new PrismaClient();

/**
 * Creates a new animal
 * @param req Request object
 * @param res Response object
 */
export const createAnimal = async (
  req: Request<never, never, ICreateAnimalRequest>,
  res: Response
) => {
  const { name, birthday, weight, customerId, raceId } = req.body;

  if (!name || !birthday || !weight || !customerId || !raceId) {
    return res.status(httpBadRequest).json({
      error: "Nicht alle Felder ausgefüllt",
    });
  }

  try {
    const animal = await prisma.animal.create({
      data: {
        name,
        birthday,
        weight,
        owner: {
          connect: {
            id: customerId,
          },
        },
        race: {
          connect: {
            id: raceId,
          },
        },
      },
    });

    return res.status(httpOK).json({ animal });
  } catch (error: any) {
    return res.status(httpIntServerError).json({
      error: "Fehler beim Erstellen des Tieres",
    });
  }
};

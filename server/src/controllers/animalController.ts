import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
  httpBadRequest,
  httpIntServerError,
  httpOK,
} from "../config/statusCode";
import { ICreateAnimalRequest } from "../interfaces/animalInterface";

const prisma = new PrismaClient();

/**
 * Gets all animals
 * @param req Request Object
 * @param res Response Object
 */
export const getAnimals = async (req: Request, res: Response) => {
  try {
    const animals = await prisma.animal.findMany({});

    return res.status(httpOK).json({ animals });
  } catch (error: any) {
    return res.status(httpIntServerError).json({
      error: "Fehelr beim Abrufen der Tiere",
    });
  }
};

/**
 * Gets the animals for a customer
 * @param req Request Object
 * @param res Response Object
 */
export const getAnimalsForCustomer = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;

    const animals = await prisma.animal.findMany({
      where: {
        customerId: Number(customerId),
      },
    });

    return res.status(httpOK).json({ animals });
  } catch (error: any) {
    return res.status(httpIntServerError).json({
      error: "Fehelr beim Abrufen der Tiere für einen Kunden",
    });
  }
};

/**
 * Creates a new animal
 * @param req Request object
 * @param res Response object
 */
export const createAnimal = async (
  req: Request<never, never, ICreateAnimalRequest>,
  res: Response
) => {
  const { name, birthdate, weight, customerId, raceId } = req.body;

  if (!name || !birthdate || !weight || !customerId || !raceId) {
    return res.status(httpBadRequest).json({
      error: "Nicht alle Felder ausgefüllt",
    });
  }

  try {
    const animal = await prisma.animal.create({
      data: {
        name,
        birthdate,
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

import { PrismaClient } from "@prisma/client";
import console from "console";
import { Request, Response } from "express";
import {
  httpBadRequest,
  httpIntServerError,
  httpOK,
} from "../config/statusCode";
import { ICreateAnimalRequest, ISearchAnimalRequest } from "../interfaces/animalInterface";

const prisma = new PrismaClient();

export const getAnimals = async (
  req: Request<never, never, ICreateAnimalRequest>,
  res: Response
) => {
  try {
    const animals = await prisma.animal.findMany();
    console.log("Trying to find all");
    console.log(animals);
    return res.status(httpOK).json({ animals });
  }
  catch (error: any) {
    return res.status(httpIntServerError).json({
      error: "Fehler beim Suchen des Tieres",
    });
  }
};

export const getAnimalQuery = async (
  req: Request<ISearchAnimalRequest, never, ICreateAnimalRequest>,
  res: Response) => {
    try {
      console.log("Trying to find specific");
      console.log(req.query);
      const animal = await prisma.animal.findMany({
        where: {
          birthdate: req.query.birthdate != null ? new Date(String(req.query.birthdate)) : undefined,
          customerId: req.query.customerId != null ? Number(req.query.customerId) : undefined,
          name: req.query.name != null && req.query.name != "" ? String(req.query.name) : undefined, 
          raceId: req.query.raceId != null ? Number(req.query.raceId) : undefined,
          weight: req.query.weight != null ? Number(req.query.weight) : undefined, 
        }}
      );
      console.log(animal);
      return res.status(httpOK).json({ animal });
    }
    catch (error: any) {
      return res.status(httpIntServerError).json({
        error: "Fehler beim Suchen des Tieres",
      });
    }
  };

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


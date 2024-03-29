import { Animal, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { httpIntServerError, httpOK } from "../config/statusCode";
import {
  IAnimalDeleteRequest,
  ICreateAnimalRequest,
  ISearchAnimalRequest,
} from "../interfaces/animalInterface";

const prisma = new PrismaClient();

export const getAnimals = async (
  req: Request<never, never, ICreateAnimalRequest>,
  res: Response
) => {
  try {
    const animals = await prisma.animal.findMany({
      include: {
        owner: {
          select: {
            name: true,
          },
        },
        race: {
          select: {
            name: true,
          },
        },
      },
    });
    return res.status(httpOK).json({ animals });
  } catch (error: any) {
    return res.status(httpIntServerError).json({
      error: "Fehler beim Suchen des Tieres",
    });
  }
};

export const getLatestAnimals = async (req: Request, res: Response) => {
  try {
    const amount = parseInt(req.params.amount ?? 10);
    const animals: Animal[] = await prisma.animal.findMany({
      orderBy: { createdAt: "desc" },
      take: amount,
      include: {
        owner: true,
        race: {
          include: {
            species: true,
          },
        },
      },
    });

    return res.status(httpOK).json({ animals });
  } catch (err) {
    return res
      .status(httpIntServerError)
      .json({ error: "Fehler beim Abrufen der neusten Tiere" });
  }
};

export const getAnimalQuery = async (
  req: Request<ISearchAnimalRequest, never, ICreateAnimalRequest>,
  res: Response
) => {
  try {
    const animal = await prisma.animal.findMany({
      where: {
        birthdate:
          req.query.birthdate != null
            ? new Date(String(req.query.birthdate))
            : undefined,
        customerId:
          req.query.customerId != null
            ? Number(req.query.customerId)
            : undefined,
        name:
          req.query.name != null && req.query.name != ""
            ? String(req.query.name)
            : undefined,
        raceId: req.query.raceId != null ? Number(req.query.raceId) : undefined,
        weight: req.query.weight != null ? Number(req.query.weight) : undefined,
      },
      include: {
        owner: {
          select: {
            name: true,
          },
        },
        race: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(httpOK).json({ animal });
  } catch (error: any) {
    return res.status(httpIntServerError).json({
      error: "Fehler beim Suchen des Tieres",
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
      include: {
        owner: true,
        race: true,
      },
    });

    return res.status(httpOK).json({ animal });
  } catch (error: any) {
    return res.status(httpIntServerError).json({
      error: "Fehler beim Erstellen des Tieres",
    });
  }
};

export const deleteAnimal = async (
  req: Request<never, never, IAnimalDeleteRequest>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const deleteAnimal = await prisma.animal.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(httpOK).json({ deleteAnimal });
  } catch (error: any) {
    return res.status(httpIntServerError).json({
      error: "Fehler beim Löschen des Tieres",
    });
  }
};

import { Medicine, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
  httpBadRequest,
  httpIntServerError,
  httpOK,
} from "../config/statusCode";
import PdfParse from "pdf-parse";
import {
  IMedicineKeywordSearch,
  IMedicneAdvancedSearchRequest,
} from "../interfaces/medicneInterface";

const prisma = new PrismaClient();

/**
 * Gets all medicines from the database
 * @param req Request object
 * @param res Response object
 */
export const getMedicines = async (req: Request, res: Response) => {
  try {
    const medicines: Medicine[] = await prisma.medicine.findMany();

    return res.status(httpOK).json({ medicines });
  } catch (err) {
    return res
      .status(httpIntServerError)
      .json({ error: "Fehler beim Abrufen der Medikamente" });
  }
};

/**
 * Gets the latest medicines from the database
 * An amount of medicines can be specified via url parameter
 * Default amount is 10
 * @param req Request object
 * @param res Response object
 */
export const getLatestMedicines = async (req: Request, res: Response) => {
  try {
    const amount = parseInt(req.params.amount ?? 10);
    const medicines: Medicine[] = await prisma.medicine.findMany({
      orderBy: { createdAt: "desc" },
      take: amount,
    });

    return res.status(httpOK).json({ medicines });
  } catch (err) {
    return res
      .status(httpIntServerError)
      .json({ error: "Fehler beim Abrufen der Medikamente" });
  }
};

/**
 * Creates a medicine in the database
 * @param req Request object
 * @param res Response object
 */
export const createMedicine = async (req: Request, res: Response) => {
  const { name, dosis } = req.body;

  if (!name || !dosis) {
    return res.status(httpBadRequest).json({
      error: "Bitte alle Felder ausfüllen",
    });
  }

  try {
    if (req.file) {
      const description = (await PdfParse(req.file.buffer)).text;

      const medicine = await prisma.medicine.create({
        data: {
          name,
          description,
          dosis: Number(dosis),
          blob: req.file.buffer,
        },
      });

      return res.status(httpOK).json({ medicine });
    }

    const medicine = await prisma.medicine.create({
      data: {
        name,
        dosis: Number(dosis),
      },
    });

    return res.status(httpOK).json({ medicine });
  } catch (error) {
    console.log(error);
    return res
      .status(httpIntServerError)
      .json({ error: "Fehler beim Erstellen der Medizin" });
  }
};

export const handleMedicineNameSearch = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(httpBadRequest).json({
      error: "Bitte einen Suchbegriff eingeben",
    });
  }

  try {
    const medicines: Medicine[] = await prisma.medicine.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });

    return res.status(httpOK).json({ medicines });
  } catch (err) {
    return res
      .status(httpIntServerError)
      .json({ error: "Fehler beim Suchen der Medikamente" });
  }
};

export const handleAdvancedMedicineNameSearch = async (
  req: Request<never, never, IMedicneAdvancedSearchRequest>,
  res: Response
) => {
  const { keywords } = req.body;

  if (!keywords) {
    return res.status(httpBadRequest).json({
      error: "Bitte Suchbegriff eingeben",
    });
  }

  try {
    const query: string = keywords.reduce(
      (acc: string, curr: IMedicineKeywordSearch, idx: number) => {
        const { keyword, operator } = curr;
        if (idx === 0) {
          return keyword;
        }

        return acc + `${operator} ${keyword}`;
      },
      ""
    );

    const medicines: Medicine[] = await prisma.medicine.findMany({
      where: {
        name: {
          search: query,
        },
      },
    });

    return res.status(httpOK).json({ medicines });
  } catch (err) {
    console.log(err);
    return res
      .status(httpIntServerError)
      .json({ error: "Fehler beim Suchen der Medikamente" });
  }
};

export const handleAdvancedMedicineDescriptionSearch = async (
  req: Request<never, never, IMedicneAdvancedSearchRequest>,
  res: Response
) => {
  const { keywords } = req.body;

  
  if (!keywords) {
    return res.status(httpBadRequest).json({
      error: "Bitte Suchbegriff eingeben",
    });
  }
  
  try {
    const query: string = keywords.reduce(
      (acc: string, curr: IMedicineKeywordSearch, idx: number) => {
        const { keyword, operator } = curr;
        if (idx === 0) {
          return keyword;
        }

        return acc + `${operator} ${keyword}`;
      },
      ""
    );

    const medicines: Medicine[] = await prisma.medicine.findMany({
      where: {
        description: {
          search: query,
        },
      },
    });
    
    console.log("hi", medicines)
    return res.status(httpOK).json({ medicines });
  } catch (err) {
    console.log(err);
    return res
      .status(httpIntServerError)
      .json({ error: "Fehler beim Suchen der Medikamente" });
  }
};

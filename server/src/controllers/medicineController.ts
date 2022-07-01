import { Medicine, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
  httpBadRequest,
  httpIntServerError,
  httpOK,
} from "../config/statusCode";
import PdfParse from "pdf-parse";

const prisma = new PrismaClient();

export const getMedicines = async (req: Request, res: Response) => {
  try {
    const medicines: Medicine[] = await prisma.medicine.findMany();

    res.status(httpOK).json({ medicines });
  } catch (err) {
    res
      .status(httpIntServerError)
      .json({ error: "Fehler beim Abrufen der Medikamente" });
  }
};

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

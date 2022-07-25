import { Treatment, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import PdfParse from "pdf-parse";
import {
  httpBadRequest,
  httpIntServerError,
  httpOK,
} from "../config/statusCode";
import { ITreatmentSearchQuery } from "../interfaces/treatmentInterface";
import { generateTreatmentSearchQuery } from "../services/treatmentSearchService";

const prisma = new PrismaClient({
  log: [{ level: "query", emit: "event" }],
});

// prisma.$on("query", (e) => {
//   console.log("Query: " + e.query);
//   console.log("Params: " + e.params);
//   console.log("Duration: " + e.duration + "ms");
//   console.log();
// });

export const getTreatments = async (req: Request, res: Response) => {
  try {
    const treatments = await prisma.treatment.findMany({});

    res.status(httpOK).json({ treatments });
  } catch (error: any) {
    res
      .status(httpIntServerError)
      .json({ error: "Fehler beim Abrufen der Behanldungen" });
  }
};

export const getLatestTreatments = async (
  req: Request<{ limit: string | undefined }>,
  res: Response
) => {
  try {
    const limit = Number(req.params.limit || 10);
    const treatments = await prisma.treatment.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        animal: {
          include: {
            race: {
              include: {
                species: true,
              },
            },
          },
        },
        customer: true,
        medicines: true,
        findings: true,
        photos: true,
        videos: true,
      },
    });

    res.status(httpOK).json({ treatments });
  } catch (error: any) {
    res
      .status(httpIntServerError)
      .json({ error: "Fehler beim Abrufen der letzten Behanldungen" });
  }
};

export const createTreatment = async (
  req: Request<never, never, Partial<Treatment>>,
  res: Response
) => {
  const { diagnosis, date, costs, notes, animalId, customerId } = req.body;
  const files = req.files as Express.Multer.File[];

  if (!diagnosis || !date || !costs || !animalId || !customerId) {
    return res.status(httpBadRequest).json({
      error: "Bitte alle Felder ausfüllen",
    });
  }

  try {
    const findings = await getFindings(files);
    const photos = getPhotos(files);
    const videos = getVideos(files);

    const treatment = await prisma.treatment.create({
      data: {
        diagnosis,
        date: new Date(date),
        costs: Number(costs),
        notes: notes || "",
        animal: {
          connect: { id: Number(animalId) },
        },
        customer: {
          connect: { id: Number(customerId) },
        },
        findings: {
          create: findings.map((finding) => ({
            description: "",
            blob: finding.buffer,
            content: finding.text,
          })),
        },
        photos: {
          create: photos.map((photo) => ({
            description: "",
            blob: photo.buffer,
            mimeType: photo.mimetype,
          })),
        },
        videos: {
          create: videos.map((video) => ({
            description: "",
            blob: video.buffer,
            mimeType: video.mimetype,
          })),
        },
      },
    });

    return res.status(httpOK).json({ treatment });
  } catch (error: any) {
    return res
      .status(httpIntServerError)
      .json({ error: "Fehler beim Erstellen der Behandlung" });
  }
};

/**
 * Gets the findings from an array of files and enrich the file information with a text field containing the pdf text
 * @param files the files to get the findings from
 * @returns the findings within the files
 */
const getFindings = async (files: Express.Multer.File[]) => {
  return await Promise.all(
    files
      .filter((file) => {
        return file.mimetype === "application/pdf";
      })
      .map(async (file) => {
        return { ...file, text: (await PdfParse(file.buffer)).text };
      })
  );
};

/**
 * Gets the photos from an array of files
 * @param files the files to get the photos from
 * @returns the photos within the files
 */
const getPhotos = (files: Express.Multer.File[]) => {
  return files.filter((file) => file.mimetype.startsWith("image/"));
};

/**
 * Gets the videos from an array of files
 * @param files the files to get the videos from
 * @returns the videos within the files
 */
const getVideos = (files: Express.Multer.File[]) => {
  return files.filter((file) => file.mimetype.startsWith("video/"));
};

/**
 * Handles the search of treatments
 * @param req Request object
 * @param res Response object
 */
export const handleTreatmentSearch = async (
  req: Request<never, never, { searchQuery: ITreatmentSearchQuery[] }>,
  res: Response
) => {
  const { searchQuery } = req.body;

  if (!searchQuery) {
    return res.status(httpBadRequest).json({
      error: "Suchanfrage nicht übergeben",
    });
  }

  try {
    const whereQuery = generateTreatmentSearchQuery(searchQuery);

    const treatments = await prisma.treatment.findMany({
      where: whereQuery,
      include: {
        animal: {
          include: {
            race: {
              include: {
                species: true,
              },
            },
          },
        },
        customer: true,
        medicines: true,
        findings: true,
        photos: true,
        videos: true,
      },
    });

    return res.status(httpOK).json({ treatments });
  } catch (error: any) {
    return res
      .status(httpIntServerError)
      .json({ error: "Fehler beim Abrufen der Behandlungen" });
  }
};

export const deleteTreatment = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;

  if (!id) {
    return res.status(httpBadRequest).json({
      error: "Bitte eine Behandlungs-ID angeben",
    });
  }

  try {
    const deletedTreatment = await prisma.treatment.delete({
      where: { id: Number(id) },
    });

    return res.status(httpOK).json({ deletedTreatment });
  } catch (error: any) {
    return res
      .status(httpIntServerError)
      .json({ error: "Fehler beim Löschen der Behandlung" });
  }
};

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { httpIntServerError, httpOK } from "../config/statusCode";
import { IRacesRequest } from "../interfaces/raceInterfaces";

const prisma = new PrismaClient();

export const getRaces = async (req: Request<IRacesRequest>, res: Response) => {
    
    try {
        const races = await prisma.race.findMany({});

        res.status(httpOK).json(races);
    } catch (error: any) {
        res.status(httpIntServerError).json({ error: error.message });
    }
};

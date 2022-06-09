import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { httpIntServerError, httpOK } from "../config/statusCode";

const prisma = new PrismaClient();

/**
 * Gets the customers aka animal owners
 * @param req Request Object
 * @param res Response Object
 */
export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await prisma.customer.findMany({});

    res.status(httpOK).json(customers);
  } catch (error: any) {
    res.status(httpIntServerError).json({ error: error.message });
  }
};

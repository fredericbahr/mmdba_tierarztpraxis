import { Customer, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
  httpBadRequest,
  httpIntServerError,
  httpOK,
} from "../config/statusCode";

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

/**
 * Handles the createion of a customer
 * @param req Request Object
 * @param res Response Object
 */
export const handleCustomerCreate = async (
  req: Request<never, never, Partial<Customer>>,
  res: Response
) => {
  const { name, street, plz, city, phoneNumber } = req.body;

  if (!name || !street || !plz || !city || !phoneNumber) {
    return res.status(httpBadRequest).json({
      error: "Bitte alle Felder ausfüllen",
    });
  }

  try {
    const customer = await prisma.customer.create({
      data: {
        name,
        street,
        plz,
        city,
        phoneNumber,
      },
    });

    return res.status(httpOK).json({ customer });
  } catch (error: any) {
    return res.status(httpIntServerError).json({
      error: "Fehler beim Speichern des Kunden",
    });
  }
};

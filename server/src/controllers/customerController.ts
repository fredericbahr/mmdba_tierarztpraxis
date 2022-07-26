import { Customer, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
  httpBadRequest,
  httpIntServerError,
  httpOK,
} from "../config/statusCode";

import {
  ICreateCustomerRequest,
  ISearchCustomerRequest,
  IDeleteCustomerRequest,
} from "../interfaces/customerInterface";

const prisma = new PrismaClient();

/**
 * Gets the customers aka animal owners
 * @param req Request Object
 * @param res Response Object
 */
export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await prisma.customer.findMany({});

    res.status(httpOK).json({ customers });
  } catch (error: any) {
    res
      .status(httpIntServerError)
      .json({ error: "Fehler beim Abrufen der Kunden" });
  }
};

export const getCustomerQuery = async (
  req: Request<ISearchCustomerRequest, never, ICreateCustomerRequest>,
  res: Response
) => {
  try {
    const customer = await prisma.customer.findMany({
      where: {
        city:
          req.query.city != null && req.query.city != ""
            ? String(req.query.city)
            : undefined,
        createdAt:
          req.query.createdAt != null
            ? new Date(String(req.query.createdAt))
            : undefined,
        name:
          req.query.name != null && req.query.name != ""
            ? String(req.query.name)
            : undefined,
        phoneNumber:
          req.query.phoneNumber != null && req.query.phoneNumber != ""
            ? String(req.query.phoneNumber)
            : undefined,
        plz: req.query.plz != null ? Number(req.query.plz) : undefined,
        street:
          req.query.street != null && req.query.street != ""
            ? String(req.query.street)
            : undefined,
      },
      include: {
        animals: {
          include: {
            owner: true,
            race: {
              include: {
                species: true,
              },
            },
          },
        },
      },
    });

    return res.status(httpOK).json({ customer });
  } catch (error: any) {
    res
      .status(httpIntServerError)
      .json({ error: "Fehler beimAbrufen der Kunden" });
  }
};

export const getLatestCustomers = async (req: Request, res: Response) => {
  try {
    const amount = parseInt(req.params.amount ?? 10);
    const customers: Customer[] = await prisma.customer.findMany({
      orderBy: { createdAt: "desc" },
      take: amount,
      include: {
        animals: {
          include: {
            owner: true,
            race: {
              include: {
                species: true,
              },
            },
          },
        },
      },
    });

    return res.status(httpOK).json({ customers });
  } catch (err) {
    return res
      .status(httpIntServerError)
      .json({ error: "Fehler beim Abrufen der neusten Tiere" });
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

export const deleteCustomer = async (
  req: Request<never, never, IDeleteCustomerRequest>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const deleteCustomer = await prisma.customer.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(httpOK).json({ deleteCustomer });
  } catch (error: any) {
    return res.status(httpIntServerError).json({
      error: "Fehler beim Löschen des Kunden",
    });
  }
};

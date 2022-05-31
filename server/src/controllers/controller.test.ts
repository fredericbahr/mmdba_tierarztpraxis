import { getHome } from "./controller";
import { Request, Response } from "express";

describe("#controller test", () => {
  test("#getHome", async () => {
    const mReq: Request = {} as Request;
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    await getHome(mReq, mRes);

    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith({ test: "Backend replied" });
  });
});

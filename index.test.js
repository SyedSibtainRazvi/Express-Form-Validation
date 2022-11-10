import request from "supertest";
import app from "../Express Form Validation/index"

describe("POST / standups", () => {
    test("when the data is validated successfully", async () => {
      const response = await request(app).post("/validate").send("Form Validated Successfully");
      expect(response.status).toBe(201);
    })
})
import request from "supertest";
import { app } from "../server"; 


describe("CSV Upload Endpoint", () => {
  it("returns 400 if no file is uploaded", async () => {
    const res = await request(app).post("/api/upload");
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("No file uploaded");
  });

 
});

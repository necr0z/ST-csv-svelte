import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import uploadRouter from "./routes/csvUpload";
import dataRouter from "./routes/dataRoutes";

dotenv.config();

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRouter);
app.use("/api/data", dataRouter);

const port = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

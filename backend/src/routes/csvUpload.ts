import { Router, NextFunction, Response } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

interface MulterRequest extends Express.Request {
  file?: Express.Multer.File;
}

// Multer config
const upload = multer({ dest: "uploads/" });

router.post(
  "/",
  upload.single("csvFile"),
  async (
    req: MulterRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // 1) Validate file
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return; // end the function here
      }

      // 2) Read CSV
      const filePath = path.join(__dirname, "../../", req.file.path);
      const recordsToInsert: any[] = [];

      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (row) => {
          /**
           * row might look like:
           * {
           *   postId: "1",
           *   id: "1",
           *   name: "some name",
           *   email: "someone@example.com",
           *   body: "some comment"
           * }
           */
          const csvId = row.id ? parseInt(row.id, 10) : undefined;
          const postId = row.postId ? parseInt(row.postId, 10) : null;

          recordsToInsert.push({
            csvId,
            postId,
            name: row.name ?? null,
            email: row.email ?? null,
            body: row.body ?? null,
          });
        })
        .on("end", async () => {
          // 3) Insert to DB
          if (recordsToInsert.length === 0) {
            res.status(400).json({ error: "CSV file is empty or invalid" });
            return;
          }

          try {
            await prisma.csvData.createMany({
              data: recordsToInsert,
              skipDuplicates: true,
            });

            res.json({
              message: "File processed and data inserted successfully",
            });
            return;
          } catch (dbError) {
            console.error(dbError);
            res
              .status(500)
              .json({ error: "Error inserting data into database" });
            return;
          }
        })
        .on("error", (parseError) => {
          console.error(parseError);
          res.status(500).json({ error: "Error reading CSV file" });
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

export default router;

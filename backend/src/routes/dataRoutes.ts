import { Router, NextFunction, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get(
  "/",
  async (req, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = parseInt((req.query.page as string) || "1", 10);
      const pageSize = parseInt((req.query.pageSize as string) || "10", 10);
      const search = (req.query.search as string) || "";

      const skip = (page - 1) * pageSize;

      // Optional typed whereClause
      let whereClause: Prisma.csvDataWhereInput | undefined;

      if (search) {
        whereClause = {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive" as Prisma.QueryMode,
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive" as Prisma.QueryMode,
              },
            },
            {
              body: {
                contains: search,
                mode: "insensitive" as Prisma.QueryMode,
              },
            },
          ],
        };
      }

      const [data, totalCount] = await Promise.all([
        prisma.csvData.findMany({
          where: whereClause,
          skip,
          take: pageSize,
          orderBy: { csvId: "asc" },
        }),
        prisma.csvData.count({
          where: whereClause,
        }),
      ]);

      res.json({
        data,
        totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / pageSize),
      });
      return; // end the function
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
      return;
    }
  }
);

export default router;

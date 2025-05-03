import { prisma } from "../../../lib/prisma";

export class PCUsageRepository {
  async fetchPCUsage(startDate: Date, endDate: Date) {
    const pcUsage = await prisma.pCUsage.findMany({
      where: {
        createdAt: { gte: startDate, lte: endDate },
      },
    });

    return pcUsage;
  }
}

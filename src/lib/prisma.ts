import { PrismaClient } from "../../prisma/generated/prisma";
export type { PlotFlag, GameItem } from "../../prisma/generated/prisma";

const prisma = new PrismaClient();

export default prisma;

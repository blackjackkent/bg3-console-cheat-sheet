import { PrismaClient } from "../../prisma/generated/prisma";
export type {
	PlotFlag,
	GameItem,
	Cutscene,
} from "../../prisma/generated/prisma";

const prisma = new PrismaClient();

export default prisma;

import { PrismaClient } from "../../prisma/generated/prisma";
export type {
	PlotFlag,
	GameItem,
	Cutscene,
	CutsceneCharacter,
	CutsceneCategory,
	CharacterTag,
} from "../../prisma/generated/prisma";

const prisma = new PrismaClient();

export default prisma;

export type { PlotFlag, GameItem, CharacterTag } from "@/lib/prisma";
import type {
	CutsceneCategory,
	CutsceneCharacter,
	Cutscene as DbCutscene,
} from "@/lib/prisma";

export interface Cutscene extends DbCutscene {
	characters: CutsceneCharacter[];
	category: CutsceneCategory;
}

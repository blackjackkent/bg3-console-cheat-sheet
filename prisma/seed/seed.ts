import { PrismaClient } from "../generated/prisma";
import plotFlags from "./Flags_array.json";
import items from "./items.json";
import csvToJson from "convert-csv-to-json";

const prisma = new PrismaClient();

type PlotFlagJsonItem = {
	UUID: string;
	Name: string;
	Description: string;
};

type CharacterTagJsonItem = {
	Name: string;
	GUID: string;
	Description: string;
};

type GameJsonItem = {
	Name: string;
	MapKey: string;
	Data: {
		Description: string;
		DisplayName: string;
	};
};

async function main() {
	// await importPlotFlags();
	// await importItems();
	await importCharacterTags();
}

async function importCharacterTags() {
	const fileInputName = "./prisma/seed/character_tags.csv";
	const jsonData = csvToJson.fieldDelimiter(",").getJsonFromCsv(fileInputName);
	const typedTags = jsonData as CharacterTagJsonItem[];
	console.log(`Imported ${jsonData.length} tags`);
	for (let i = 0; i < typedTags.length; i++) {
		const { GUID, Name, Description } = typedTags[i] as CharacterTagJsonItem;
		const cleanDescription = Description.replaceAll("%", ",");
		const tag = await prisma.characterTag.create({
			data: {
				uuid: GUID,
				name: Name,
				description: cleanDescription,
			},
		});
		console.log(`Inserted ${JSON.stringify(tag)}`);
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function importPlotFlags() {
	const typedFlags = plotFlags as PlotFlagJsonItem[];
	console.log(`Imported ${typedFlags.length} flags`);
	await prisma.plotFlag.deleteMany({});
	for (let i = 0; i < typedFlags.length; i++) {
		const { UUID, Name, Description } = typedFlags[i] as PlotFlagJsonItem;
		const hasDescription =
			!!Description && !Description.toLocaleUpperCase().endsWith("DESCRIPTION");
		const flag = await prisma.plotFlag.create({
			data: {
				uuid: UUID,
				name: Name,
				description: hasDescription ? Description : "",
			},
		});
		console.log(`Inserted ${JSON.stringify(flag)}`);
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function importItems() {
	const typedItems = items as [];
	console.log(`Imported ${typedItems.length} items`);
	await prisma.gameItem.deleteMany({});
	for (let i = 0; i < typedItems.length; i++) {
		const { Name, MapKey, Data } = typedItems[i] as GameJsonItem;
		const item = await prisma.gameItem.create({
			data: {
				name: Name,
				displayName: !!Data?.DisplayName ? Data?.DisplayName : "",
				description: !!Data?.Description ? Data?.Description : "",
				mapKey: MapKey,
			},
		});
		console.log(`Inserted ${JSON.stringify(item)}`);
	}
}

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

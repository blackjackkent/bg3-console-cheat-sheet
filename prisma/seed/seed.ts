import { PrismaClient } from "../generated/prisma";
import plotFlags from "./Flags_array.json";
import items from "./items.json";

const prisma = new PrismaClient();

type PlotFlagJsonItem = {
	UUID: string;
	Name: string;
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
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function importPlotFlags() {
	const typedFlags = plotFlags as [];
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
	console.log(`Imported ${typedItems.length} flags`);
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

import { prompt, PromptObject } from "prompts";
import { PrismaClient } from "../generated/prisma";
import chalk from "chalk";
import { copy } from "copy-paste";

const prisma = new PrismaClient();

type PromptResponseData = {
	uuid: string;
	name: string;
	description: string;
	categoryId: number;
	notes: string;
	numberOfCharacters: number;
};

/**
 * Find cutscene UUID:
 * Search for dialogue in parser files, get file name
 * Search for filename in modder's multitool
 * Open **Dialogs**_merged.lsf in results
 * use ID with npm run add-cutscene
 */

async function addCutsceneInformation() {
	const { uuid } = await prompt({
		type: "text",
		name: "uuid",
		message: "What is the cutscene UUID?",
	});
	const shouldProcess = await checkCutscene(uuid);

	if (!shouldProcess) {
		console.log(chalk.red("Aborting..."));
		return;
	}

	const questions: PromptObject[] = [
		{
			type: "text",
			name: "name",
			message: "What is the cutscene name?",
		},
		{
			type: "text",
			name: "description",
			message: "What is the cutscene description?",
		},
		{
			type: "select",
			name: "categoryId",
			message: "What category is this scene?",
			choices: [
				{ title: "Romance Cutscene", value: 1 },
				{ title: "Act 1 Main Quest Cutscene", value: 2 },
				{ title: "Act 1 Side Quest Cutscene", value: 3 },
				{ title: "Act 2 Main Quest Cutscene", value: 4 },
				{ title: "Act 2 Side Quest Cutscene", value: 5 },
				{ title: "Act 3 Main Quest Cutscene", value: 6 },
				{ title: "Act 3 Side Quest Cutscene", value: 7 },
				{ title: "Miscellaneous Cutscene", value: 8 },
				{ title: "Origin Cutscene", value: 9 },
			],
			initial: 0,
		},
		{
			type: "text",
			name: "notes",
			message: "Any important notes for running this scene?",
		},
		{
			type: "number",
			name: "numberOfCharacters",
			message: "How many characters does this scene have?",
		},
	];
	const answers: PromptResponseData = await prompt(questions);
	const characters: { index: number; description: string }[] = [];
	for (let i = 0; i < answers.numberOfCharacters; i++) {
		const characterAnswer = await prompt({
			type: "text",
			name: "description",
			message: `What is the description for character ${i + 1}?`,
		});
		if (!!characterAnswer.description) {
			characters.push({ index: i, description: characterAnswer.description });
		}
	}

	await prisma.cutscene.create({
		data: {
			name: answers.name,
			uuid: uuid,
			description: answers.description,
			notes: answers.notes,
			categoryId: answers.categoryId,
			characters: {
				create: characters,
			},
		},
	});
}

async function checkCutscene(uuid: string) {
	const command = `Osi.QRY_StartDialogCustom_Fixed("${uuid}", "Jaheira_226cd0fb-8870-3c3a-4206-4fc92d465b0d", "Khalid_567dde16-8893-7c1c-4b74-a663fd54194e",1,1,-1,1)`;
	console.log("Command copied to clipboard: " + chalk.red(command));
	copy(command);
	const { shouldGatherCutsceneInfo } = await prompt({
		type: "confirm",
		name: "shouldGatherCutsceneInfo",
		message: "Should this cutscene be processed?",
	});
	return shouldGatherCutsceneInfo;
}

async function main() {
	await addCutsceneInformation();
}
main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

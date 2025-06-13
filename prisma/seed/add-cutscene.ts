import { prompt, PromptObject } from "prompts";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

type PromptResponseData = {
	uuid: string;
	name: string;
	description: string;
	categoryId: number;
	notes: string;
	numberOfCharacters: number;
};

async function addCutsceneInformation() {
	const questions: PromptObject[] = [
		{
			type: "text",
			name: "uuid",
			message: "What is the cutscene UUID?",
		},
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
			uuid: answers.uuid,
			description: answers.description,
			notes: answers.notes,
			categoryId: answers.categoryId,
			characters: {
				create: characters,
			},
		},
	});
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

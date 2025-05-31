import { prompt, PromptObject } from "prompts";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

type PromptResponseData = {
	name: string;
	uuid: string;
	description: string;
	categoryId: number;
	characterCount: number;
};

async function addCutsceneInformation() {
	const questions: PromptObject[] = [
		{
			type: "text",
			name: "name",
			message: `What is the cutscene file name?`,
		},
		{
			type: "text",
			name: "uuid",
			message: `What is the cutscene UUID?`,
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
			],
			initial: 0,
		},
		{
			type: "number",
			name: "characterCount",
			message: "How many characters are in this scene?",
		},
	];
	const answers: PromptResponseData = await prompt(questions);
	const { characterCount } = answers;
	const characters: { index: number; description: string }[] = [];
	for (let i = 0; i < characterCount; i++) {
		const characterAnswer = await prompt({
			type: "text",
			name: "description",
			message: `What is the description for character ${i + 1}?`,
		});
		characters.push({ index: i, description: characterAnswer.description });
	}
	console.log({ answers, characters });
	await prisma.cutscene.create({
		data: {
			name: answers.name,
			uuid: answers.uuid,
			description: answers.description,
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

import { prompt, PromptObject } from "prompts";
import { PrismaClient } from "../generated/prisma";
import sceneDataList from "./scenes.json";
import { SceneData } from "./load-cutscene-data";
import { copy } from "copy-paste";
import chalk from "chalk";
import fs from "fs";

const prisma = new PrismaClient();

type PromptResponseData = {
	description: string;
	categoryId: number;
	notes: string;
};

async function addCutsceneInformation(scene: SceneData) {
	const questions: PromptObject[] = [
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
	];
	const answers: PromptResponseData = await prompt(questions);
	const characters: { index: number; description: string }[] = [];
	for (let i = 0; i < scene.numberOfCharacters; i++) {
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
			name: scene.sceneName,
			uuid: scene.sceneUuid,
			description: answers.description,
			notes: answers.notes,
			categoryId: answers.categoryId,
			characters: {
				create: characters,
			},
		},
	});
}

async function processCutscenes() {
	const data: SceneData[] = [...sceneDataList];
	for (const [idx, scene] of data.entries()) {
		const shouldSkip =
			scene.sceneName.startsWith("PB_") ||
			scene.sceneName.includes("_PB_") ||
			scene.sceneName.includes("AD_") ||
			scene.sceneName.includes("_AD") ||
			scene.sceneName.includes("PointNClick") ||
			scene.sceneName.endsWith("_Dead") ||
			scene.sceneName.includes("SwD") ||
			scene.sceneName.includes("SpeakWithDead") ||
			scene.sceneName.includes("InParty") ||
			scene.sceneName.includes("Leaving") ||
			scene.sceneName.includes("ViciousMockery") ||
			scene.sceneName.toLocaleUpperCase().includes("TEST_") ||
			scene.sceneName.toLocaleUpperCase().includes("_TEST") ||
			!scene.sceneName ||
			scene.sceneName.startsWith("BHVR");
		if (!shouldSkip) {
			const shouldGatherCutsceneInfo = await checkCutscene(scene, idx);
			if (shouldGatherCutsceneInfo) {
				await addCutsceneInformation(scene);
			}
		}
		const updatedFileInfo = data.slice(idx + 1);
		fs.writeFileSync(
			"prisma/seed/scenes.json",
			JSON.stringify(updatedFileInfo),
			"utf8"
		);
		console.log({
			choppedArrayLength: updatedFileInfo.length,
			importedArrayLength: sceneDataList.length,
			originalArrayLength: data.length,
		});
	}
}

async function checkCutscene(scene: SceneData, idx: number) {
	console.log("----------");
	console.log(
		chalk.blue(`Processing scene ${idx + 1} of ${sceneDataList.length}: `) +
			chalk.bgBlue(scene.sceneName)
	);
	console.log("Command copied to clipboard: " + chalk.red(scene.command));
	copy(scene.command);
	const { shouldGatherCutsceneInfo } = await prompt({
		type: "confirm",
		name: "shouldGatherCutsceneInfo",
		message: "Should this cutscene be processed?",
	});
	return shouldGatherCutsceneInfo;
}

async function main() {
	await processCutscenes();
}
main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

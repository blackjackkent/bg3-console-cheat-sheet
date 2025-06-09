import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";

export type SceneData = {
	sceneUuid: string;
	sceneName: string;
	numberOfCharacters: number;
	command: string;
};

const sampleChars = [
	"Jaheira_226cd0fb-8870-3c3a-4206-4fc92d465b0d",
	"Khalid_567dde16-8893-7c1c-4b74-a663fd54194e",
	"Rasaad_3bd5edc5-3e60-4f4b-6242-488b8a6035c2",
	"Caden_4538d8df-e97d-c5ef-936b-b5c18c8d346d",
	"S_Player_Astarion_c7c13742-bacd-460a-8f65-f864fe41f255",
	"S_Player_Gale_ad9af97d-75da-406a-ae13-7071c563f604",
	"S_GLO_Halsin_7628bc0e-52b8-42a7-856a-13a6fd413323",
	"S_Player_Jaheira_91b6b200-7d00-4d62-8dc9-99e8339dfa1a",
	"S_Player_Karlach_2c76687d-93a2-477b-8b18-8a14b549304c",
	"S_Player_Laezel_58a69333-40bf-8358-1d17-fff240d7fb12",
	"S_Player_Minsc_0de603c5-42e2-4811-9dad-f652de080eba",
	"S_GOB_DrowCommander_25721313-0c15-4935-8176-9f134385451b",
	"S_Player_ShadowHeart_3ed74f06-3c60-42dc-83f6-f034cb47c679",
	"S_Player_Wyll_c774d764-4a17-48dc-b470-32ace9ce447d",
];

async function fetchSceneInfo() {
	const files: string[] = [];

	const getFilesRecursively = (directory: string) => {
		const filesInDirectory = fs.readdirSync(directory);
		for (const file of filesInDirectory) {
			const absolute = path.join(directory, file);
			if (fs.statSync(absolute).isDirectory()) {
				getFilesRecursively(absolute);
			} else {
				files.push(absolute);
			}
		}
	};

	getFilesRecursively("./prisma/seed/cutscene-data");
	const sceneDataList: SceneData[] = [];
	files.forEach((filePath) => {
		const xml = fs.readFileSync(filePath, "utf8");
		const $ = cheerio.load(xml);
		const scenes = $('node[id="Resource"]');
		scenes.each((idx, scene) => {
			const sceneUuid = $(scene).find('attribute[id="ID"]').attr("value") || "";
			const sceneName =
				$(scene).find('attribute[id="Name"]').attr("value") || "";
			const numberOfCharacters = $(scene).find(
				'children > node[id="SpeakerSlotsWithLines"]'
			).length;
			let command = `Osi.QRY_StartDialogCustom_Fixed("${sceneUuid}",`;
			for (let i = 0; i < numberOfCharacters; i++) {
				command += `"${sampleChars[i]}",`;
			}
			command += "1,1,-1,1)";
			const sceneIsAmbientDialogue =
				sceneName.includes("_AD_") ||
				sceneName.includes("_PAD_") ||
				sceneName.endsWith("_AD") ||
				sceneName.endsWith("_PAD") ||
				sceneName.includes("_VB_") ||
				sceneName.endsWith("_VB");
			if (!sceneIsAmbientDialogue) {
				const sceneData = {
					sceneUuid,
					sceneName,
					numberOfCharacters,
					command,
				};
				sceneDataList.push(sceneData);
			}
		});
	});

	console.log(sceneDataList);
	console.log(
		`found ${sceneDataList.length} scenes for you to test, you schmuck`
	);
	fs.writeFileSync(
		"prisma/seed/scenes.json",
		JSON.stringify(sceneDataList),
		"utf8"
	);
}

async function main() {
	await fetchSceneInfo();
}
main().catch((e) => {
	throw e;
});

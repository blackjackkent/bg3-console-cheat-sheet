export type ApprovalRangeItem = {
	description: string;
	representativeValue: number;
};
export const APPROVAL_RANGES: ApprovalRangeItem[] = [
	{ description: "less then -50 ~ Catastrophic", representativeValue: -51 },
	{ description: "-49 to -40 ~ Very Low", representativeValue: -45 },
	{ description: "-39 to -20 ~ Low", representativeValue: -30 },
	{ description: "-19 to 20 ~ Neutral", representativeValue: 0 },
	{ description: "21 to 40 ~ Medium", representativeValue: 30 },
	{ description: "41 to 60 ~ High", representativeValue: 50 },
	{ description: "61 to 80 ~ Very High", representativeValue: 70 },
	{ description: "81 to 100 ~ Exceptional", representativeValue: 100 },
];

export type CharacterUuidData = {
	uuid: string;
	characterName: string;
	voiceId: string;
};
export const CHARACTER_UUIDS: CharacterUuidData[] = [
	{
		characterName: "Astarion",
		uuid: "S_Player_Astarion_c7c13742-bacd-460a-8f65-f864fe41f255",
		voiceId: "vc7c13742bacd460a8f65f864fe41f255",
	},
	{
		characterName: "Gale",
		uuid: "S_Player_Gale_ad9af97d-75da-406a-ae13-7071c563f604",
		voiceId: "vad9af97d75da406aae137071c563f604",
	},
	{
		characterName: "Halsin",
		uuid: "S_GLO_Halsin_7628bc0e-52b8-42a7-856a-13a6fd413323",
		voiceId: "v7628bc0e52b842a7856a13a6fd413323",
	},
	{
		characterName: "Jaheira",
		uuid: "S_Player_Jaheira_91b6b200-7d00-4d62-8dc9-99e8339dfa1a",
		voiceId: "v91b6b2007d004d628dc999e8339dfa1a",
	},
	{
		characterName: "Karlach",
		uuid: "S_Player_Karlach_2c76687d-93a2-477b-8b18-8a14b549304c",
		voiceId: "v2c76687d93a2477b8b188a14b549304c",
	},
	{
		characterName: "Lae'zel",
		uuid: "S_Player_Laezel_58a69333-40bf-8358-1d17-fff240d7fb12",
		voiceId: "v58a6933340bf83581d17fff240d7fb12",
	},
	{
		characterName: "Minsc",
		uuid: "S_Player_Minsc_0de603c5-42e2-4811-9dad-f652de080eba",
		voiceId: "v0de603c542e248119dadf652de080eba",
	},
	{
		characterName: "Minthara",
		uuid: "S_GOB_DrowCommander_25721313-0c15-4935-8176-9f134385451b",
		voiceId: "v257213130c15493581769f134385451b",
	},
	{
		characterName: "Shadowheart",
		uuid: "S_Player_ShadowHeart_3ed74f06-3c60-42dc-83f6-f034cb47c679",
		voiceId: "v3ed74f063c6042dc83f6f034cb47c679",
	},
	{
		characterName: "Wyll",
		uuid: "S_Player_Wyll_c774d764-4a17-48dc-b470-32ace9ce447d",
		voiceId: "vc774d7644a1748dcb47032ace9ce447d",
	},
];

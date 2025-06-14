"use client";
import { JSX, useState } from "react";
import PlotFlagsTools from "../tools/plot-flags/PlotFlagsTools";
import SpawnItemsTools from "../tools/spawn-items/SpawnItemsTools";
import AddGoldTools from "../tools/add-gold/AddGoldTools";
import CharacterUuidsTools from "../tools/character-uuids/CharacterUuidsTools";
import TriggerRespecTools from "../tools/trigger-respec/TriggerRespecTools";
import SetApprovalTools from "../tools/set-approval/SetApprovalTools";
import TriggerCutsceneTools from "../tools/trigger-cutscene/TriggerCutsceneTools";
import CharacterTagsTools from "../tools/character-tags/CharacterTagsTools";
import SingleValueSelect from "./SingleValueSelect";
import { Box, ClientOnly, Skeleton } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import SetHitpointsTools from "../tools/set-hitpoints/SetHitpointsTools";

type HomePageItem = {
	key: string;
	displayName: string;
	content: JSX.Element;
};

const HomeMenuSelector = () => {
	const [value, setValue] = useState<HomePageItem | null>(null);
	const itemBg = useColorModeValue("gray.100", "gray.900");
	const items: HomePageItem[] = [
		{
			key: "get-uuids",
			displayName: "Get Character UUIDs",
			content: <CharacterUuidsTools />,
		},
		{
			key: "manage-flags",
			displayName: "Manage Plot Flags",
			content: <PlotFlagsTools />,
		},
		{
			key: "set-tags",
			displayName: "Manage Character Tags",
			content: <CharacterTagsTools />,
		},
		{
			key: "trigger-cutscene",
			displayName: "Trigger Cutscenes",
			content: <TriggerCutsceneTools />,
		},
		{
			key: "spawn-items",
			displayName: "Spawn Items",
			content: <SpawnItemsTools />,
		},
		{
			key: "add-gold",
			displayName: "Add Gold",
			content: <AddGoldTools />,
		},
		{
			key: "set-hitpoints",
			displayName: "Set Character Hitpoints",
			content: <SetHitpointsTools />,
		},
		{
			key: "trigger-respec",
			displayName: "Trigger Character Respec",
			content: <TriggerRespecTools />,
		},
		{
			key: "set-approval",
			displayName: "Set Companion Approval",
			content: <SetApprovalTools />,
		},
	];
	return (
		<>
			<SingleValueSelect
				items={items}
				itemToString={(i) => i?.displayName || ""}
				itemToValue={(i) => i?.key || ""}
				selectedItem={value}
				setSelectedItem={setValue}
				placeholder="Select Tool"
			/>

			{!!value && (
				<ClientOnly fallback={<Skeleton boxSize="8" />}>
					<Box
						textAlign="left"
						px={8}
						py={6}
						mt={4}
						bg={itemBg}
						position="relative"
						w="full"
					>
						{value?.content}
					</Box>
				</ClientOnly>
			)}
		</>
	);
};

export default HomeMenuSelector;

"use client";
import { Accordion } from "@chakra-ui/react";
import { useState } from "react";
import HomeMenuAccordionItem from "./HomeMenuAccordionItem";
import PlotFlagsTools from "../tools/plot-flags/PlotFlagsTools";
import SpawnItemsTools from "../tools/spawn-items/SpawnItemsTools";
import AddGoldTools from "../tools/add-gold/AddGoldTools";
import CharacterUuidsTools from "../tools/character-uuids/CharacterUuidsTools";
import TriggerRespecTools from "../tools/trigger-respec/TriggerRespecTools";
import SetApprovalTools from "../tools/set-approval/SetApprovalTools";
import TriggerCutsceneTools from "../tools/trigger-cutscene/TriggerCutsceneTools";

const HomeMenuAccordion = () => {
	const [value, setValue] = useState<string[]>([]);
	return (
		<Accordion.Root
			value={value}
			onValueChange={(e) => setValue(e.value)}
			collapsible
			multiple
		>
			<HomeMenuAccordionItem value="manage-flags" title="Manage Plot Flags">
				<PlotFlagsTools />
			</HomeMenuAccordionItem>
			<HomeMenuAccordionItem value="spawn-items" title="Spawn Items">
				<SpawnItemsTools />
			</HomeMenuAccordionItem>
			<HomeMenuAccordionItem value="add-gold" title="Add Gold">
				<AddGoldTools />
			</HomeMenuAccordionItem>
			<HomeMenuAccordionItem value="trigger-cutscene" title="Trigger Cutscene">
				<TriggerCutsceneTools />
			</HomeMenuAccordionItem>
			<HomeMenuAccordionItem value="get-uuids" title="Get Character UUIDs">
				<CharacterUuidsTools />
			</HomeMenuAccordionItem>
			<HomeMenuAccordionItem
				value="trigger-respec"
				title="Trigger Character Respec"
			>
				<TriggerRespecTools />
			</HomeMenuAccordionItem>
			<HomeMenuAccordionItem
				value="set-approval"
				title="Set Companion Approval Rating"
			>
				<SetApprovalTools />
			</HomeMenuAccordionItem>
		</Accordion.Root>
	);
};

export default HomeMenuAccordion;

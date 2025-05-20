"use client";
import { Accordion } from "@chakra-ui/react";
import { useState } from "react";
import HomeMenuAccordionItem from "./HomeMenuAccordionItem";

const HomeMenuAccordion = () => {
	const [value, setValue] = useState<string[]>([]);
	return (
		<Accordion.Root
			value={value}
			onValueChange={(e) => setValue(e.value)}
			collapsible
		>
			<HomeMenuAccordionItem value="manage-flags" title="Manage Plot Flags">
				Manage Plot Flags
			</HomeMenuAccordionItem>
			<HomeMenuAccordionItem value="spawn-items" title="Spawn Items">
				Spawn Items
			</HomeMenuAccordionItem>
			<HomeMenuAccordionItem value="add-gold" title="Add Gold">
				Add Gold
			</HomeMenuAccordionItem>
			<HomeMenuAccordionItem value="trigger-cutscene" title="Trigger Cutscene">
				Trigger Cutscene
			</HomeMenuAccordionItem>
			<HomeMenuAccordionItem value="get-uuids" title="Get Character UUIDs">
				Get Character UUIDs
			</HomeMenuAccordionItem>
			<HomeMenuAccordionItem
				value="trigger-respec"
				title="Trigger Character Respec"
			>
				Trigger Character Respec
			</HomeMenuAccordionItem>
			<HomeMenuAccordionItem
				value="set-approval"
				title="Set Companion Approval Rating"
			>
				Set Companion Approval Rating
			</HomeMenuAccordionItem>
		</Accordion.Root>
	);
};

export default HomeMenuAccordion;

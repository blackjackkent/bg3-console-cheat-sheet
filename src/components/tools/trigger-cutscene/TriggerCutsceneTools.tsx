import { Heading, Separator, Span, Text } from "@chakra-ui/react";
import { Cutscene } from "@/lib/types";
import { useState } from "react";
import SearchableCombobox from "@/components/common/SearchableCombobox";
import TriggerCutsceneAboutModal from "./TriggerCutsceneAboutModal";
import TriggerCutsceneCommandDetails from "./TriggerCutsceneCommandDetails";
import ExternalLink from "@/components/common/ExternalLink";

const TriggerCutsceneTools = ({}) => {
	const [selectedSceneUuids, setSelectedSceneUuids] = useState<string[]>([]);

	return (
		<>
			<TriggerCutsceneAboutModal />
			<Heading size="lg" fontWeight="bold" mb={4}>
				Generate Cutscene Trigger Commands
			</Heading>
			<Text mb={4}>
				Search for a cutscene by keyword(s). Select a result item to generate
				console commands to manipulate that flag in game.
			</Text>
			<Text mb={4} fontSize="sm" color="fg.muted">
				<Span color="orange.fg" fontWeight="bold" textDecor="underline">
					NOTE:{" "}
				</Span>{" "}
				This collection of cutscenes is not exhaustive, as the number of scenes
				in the game is prohibitively large. Can&apos;t find the scene
				you&apos;re looking for?{" "}
				<ExternalLink href="https://github.com/blackjackkent/bg3-console-cheat-sheet/issues">
					File an issue on GitHub
				</ExternalLink>{" "}
				to request an addition.
			</Text>
			<SearchableCombobox
				apiKey="cutscenes"
				itemToDescription={(item: Cutscene) => item.description}
				itemToString={(item: Cutscene) => item.name}
				itemToValue={(item: Cutscene) => item.uuid}
				itemToSub={(item) => {
					return `Characters: ${item.characters
						.map((c) => c.description)
						.join(", ")}`;
				}}
				selectedValues={selectedSceneUuids}
				setSelectedValues={setSelectedSceneUuids}
				itemSize={120}
			/>
			{!!selectedSceneUuids.length && (
				<>
					<Separator w="full" borderColor="gray.500" size="sm" mb={4} />
					<TriggerCutsceneCommandDetails sceneUuid={selectedSceneUuids[0]} />
				</>
			)}
		</>
	);
};

export default TriggerCutsceneTools;

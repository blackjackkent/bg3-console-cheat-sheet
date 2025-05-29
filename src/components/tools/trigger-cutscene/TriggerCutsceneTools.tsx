import { Heading, Text, VStack } from "@chakra-ui/react";
import { Cutscene } from "@/lib/types";
import CommandText from "../../common/CommandText";
import { useState } from "react";
import SearchableCombobox from "@/components/common/SearchableCombobox";
import TriggerCutsceneAboutModal from "./TriggerCutsceneAboutModal";

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
			<SearchableCombobox
				apiKey="cutscenes"
				itemToDescription={(item: Cutscene) => item.description}
				itemToString={(item: Cutscene) => item.name}
				itemToValue={(item: Cutscene) => item.uuid}
				selectedValues={selectedSceneUuids}
				setSelectedValues={setSelectedSceneUuids}
			/>
			{!!selectedSceneUuids?.length && (
				<VStack alignItems="flex-start">
					<Text color="orange.300">To set this flag:</Text>
					<CommandText
						value={`SetFlag("${selectedSceneUuids[0]}", Osi.DB_Avatars:Get(nil)[1][1])`}
					/>
					<Text color="orange.300">To unset this flag:</Text>
					<CommandText
						value={`ClearFlag("${selectedSceneUuids[0]}", Osi.DB_Avatars:Get(nil)[1][1])`}
					/>
					<Text color="orange.300">
						To check the value of this flag (returns &quot;0&quot; for unset,
						&quot;1&quot; for set):
					</Text>
					<CommandText
						value={`print(GetFlag("${selectedSceneUuids[0]}", Osi.DB_Avatars:Get(nil)[1][1]))`}
					/>
				</VStack>
			)}
		</>
	);
};

export default TriggerCutsceneTools;

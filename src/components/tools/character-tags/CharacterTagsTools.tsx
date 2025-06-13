import { Heading, Text, VStack } from "@chakra-ui/react";
import { CharacterTag } from "@/lib/types";
import CommandText from "../../common/CommandText";
import { useState } from "react";
import SearchableCombobox from "@/components/common/SearchableCombobox";
import CharacterTagsAboutModal from "./CharacterTagsAboutModal";

const CharacterTagsTools = ({}) => {
	const [selectedTagUuids, setSelectedTagUuids] = useState<string[]>([]);

	return (
		<>
			<CharacterTagsAboutModal />
			<Heading size="lg" fontWeight="bold" mb={4}>
				Generate Character Tag Commands
			</Heading>
			<Text mb={4}>
				Search for a tag by name or keyword(s). Select a result item to generate
				console commands to manipulate that tag in game.
			</Text>
			<SearchableCombobox
				apiKey="character-tags"
				itemToDescription={(item: CharacterTag) => item.description}
				itemToString={(item: CharacterTag) => item.name}
				itemToValue={(item: CharacterTag) => item.uuid}
				selectedValues={selectedTagUuids}
				setSelectedValues={setSelectedTagUuids}
			/>
			{!!selectedTagUuids?.length && (
				<VStack alignItems="flex-start">
					<Text color="orange.fg">To set this flag:</Text>
					<CommandText
						value={`SetFlag("${selectedTagUuids[0]}", Osi.DB_Avatars:Get(nil)[1][1])`}
					/>
					<Text color="orange.fg">To unset this flag:</Text>
					<CommandText
						value={`ClearFlag("${selectedTagUuids[0]}", Osi.DB_Avatars:Get(nil)[1][1])`}
					/>
					<Text color="orange.fg">
						To check the value of this flag (returns &quot;0&quot; for unset,
						&quot;1&quot; for set):
					</Text>
					<CommandText
						value={`print(GetFlag("${selectedTagUuids[0]}", Osi.DB_Avatars:Get(nil)[1][1]))`}
					/>
				</VStack>
			)}
		</>
	);
};

export default CharacterTagsTools;

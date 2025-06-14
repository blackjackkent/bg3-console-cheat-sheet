import { Box, Field, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { CharacterTag } from "@/lib/types";
import CommandText from "../../common/CommandText";
import { useMemo, useState } from "react";
import SearchableCombobox from "@/components/common/SearchableCombobox";
import CharacterTagsAboutModal from "./CharacterTagsAboutModal";
import { useColorModeValue } from "@/components/ui/color-mode";

const CharacterTagsTools = ({}) => {
	const [selectedTagUuids, setSelectedTagUuids] = useState<string[]>([]);
	const [characterUuid, setCharacterUuid] = useState("");
	const inputColor = useColorModeValue("gray.300", "gray.700");
	const uuidRenderedString = useMemo(() => {
		if (!characterUuid || characterUuid.includes("DB_Avatars")) {
			return characterUuid;
		}
		return `"${characterUuid}"`;
	}, [characterUuid]);

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
				<>
					<Text mb={4}>
						Enter character UUID to which the tag should be attached:
					</Text>
					<Box mb={2} w="full">
						<Field.Root>
							<Input
								borderColor={inputColor}
								value={characterUuid}
								onChange={(e) => setCharacterUuid(e.currentTarget.value)}
								placeholder="Character UUID"
								w="full"
							/>
						</Field.Root>
					</Box>
				</>
			)}
			{!!selectedTagUuids?.length && !!characterUuid && (
				<VStack alignItems="flex-start" mt={4}>
					<Text color="orange.fg">To attach this tag to this character:</Text>
					<CommandText
						value={`SetTag(${uuidRenderedString}, "${selectedTagUuids[0]}")`}
					/>
					<Text color="orange.fg">To remove this tag from this character:</Text>
					<CommandText
						value={`ClearTag(${uuidRenderedString}, "${selectedTagUuids[0]}")`}
					/>
					<Text color="orange.fg">
						To check the value of this tag on this character (returns
						&quot;0&quot; for unset, &quot;1&quot; for set):
					</Text>
					<CommandText
						value={`print(IsTagged(${uuidRenderedString}, "${selectedTagUuids[0]}"))`}
					/>
				</VStack>
			)}
		</>
	);
};

export default CharacterTagsTools;

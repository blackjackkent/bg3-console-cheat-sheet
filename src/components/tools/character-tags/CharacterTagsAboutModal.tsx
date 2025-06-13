import { Box, Code, Text } from "@chakra-ui/react";
import CommandText from "../../common/CommandText";
import AboutModal from "../../common/AboutModal";
import Image from "next/image";

const CharacterTagsAboutModal = () => {
	return (
		<AboutModal title="About Character Tags">
			<Text mb={4}>
				Character tags are used to indicate that a character belongs to a
				particular group or has a particular condition. Among other things, they
				are used to determine whether to provide certain options in dialogue
				trees.
			</Text>
			<Text mb={4}>
				When checking the state of a tag on a particular character,{" "}
				<Code>0</Code> means that it is unset, and <Code>1</Code> means that it
				is set.
			</Text>

			<Text>
				You can see information about the tags set on characters in your party
				by scrolling to the bottom of their Character Sheet &quot;Detailed
				View&quot; in-game:
			</Text>
			<Box mx="auto" my={4} w="fit-content">
				<Image src={`/images/tags.png`} alt="" width="415" height="102" />
			</Box>

			<Text mb={4}>
				You can check or modify the presence of a particular tag on a particular
				character using the tag&apos;s UUID and the character&apos;s UUID. See
				the section of this site titled &quot;Get Character UUIDs&quot; for
				information on how to find the UUIDs for your desired characters.
			</Text>
			<Text>
				To check if a particular tag is currently set on a particular character:
			</Text>
			<CommandText
				value={`print(IsTagged("{character UUID}", "{tag UUID}"))`}
			/>

			<Text>To set a particular flag:</Text>
			<CommandText value={`SetTag("{character UUID}", "{tag UUID}")`} />

			<Text>To unset a particular flag:</Text>
			<CommandText value={`ClearTag("{character UUID}", "{tag UUID}")`} />
		</AboutModal>
	);
};

export default CharacterTagsAboutModal;

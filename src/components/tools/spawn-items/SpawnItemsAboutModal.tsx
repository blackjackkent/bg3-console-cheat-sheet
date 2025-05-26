import { Text } from "@chakra-ui/react";
import CommandText from "../../common/CommandText";
import AboutModal from "../../common/AboutModal";

const SpawnItemsAboutModal = () => {
	return (
		<AboutModal title="About Item Spawning">
			<Text>To spawn an item in a character&apos;s inventory:</Text>
			<CommandText
				value={`TemplateAddTo("{item UUID}", "{character UUID}", {quantity})`}
			/>

			<Text my={4}>
				The search tool provided in this app searches a full list of all item
				entities in the game. Not all of these entities can actually be spawned
				in a character&apos;s inventory. If you attempt to run a spawn command
				on an invalid item UUID, nothing will happen.
			</Text>
		</AboutModal>
	);
};

export default SpawnItemsAboutModal;

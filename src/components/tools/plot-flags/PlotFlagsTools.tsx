import PlotFlagsAboutModal from "./PlotFlagsAboutModal";
import { Heading, Text, VStack } from "@chakra-ui/react";
import { PlotFlag } from "@/lib/types";
import CommandText from "../../common/CommandText";
import { useState } from "react";
import SearchableCombobox from "@/components/common/SearchableCombobox";

const PlotFlagsTools = ({}) => {
	const [selectedFlagUuids, setSelectedFlagUuids] = useState<string[]>([]);

	return (
		<>
			<PlotFlagsAboutModal />
			<Heading size="lg" fontWeight="bold" mb={4}>
				Generate Plot Flag Commands
			</Heading>
			<Text mb={4}>
				Search for a plot flag by name or keyword(s). Select a result item to
				generate console commands to manipulate that flag in game.
			</Text>
			<SearchableCombobox
				apiKey="plot-flags"
				itemToDescription={(item: PlotFlag) => item.description}
				itemToString={(item: PlotFlag) => item.name}
				itemToValue={(item: PlotFlag) => item.uuid}
				selectedValues={selectedFlagUuids}
				setSelectedValues={setSelectedFlagUuids}
			/>
			{!!selectedFlagUuids?.length && (
				<VStack alignItems="flex-start">
					<Text color="orange.300">To set this flag:</Text>
					<CommandText
						value={`SetFlag("${selectedFlagUuids[0]}", Osi.DB_Avatars:Get(nil)[1][1])`}
					/>
					<Text color="orange.300">To unset this flag:</Text>
					<CommandText
						value={`ClearFlag("${selectedFlagUuids[0]}", Osi.DB_Avatars:Get(nil)[1][1])`}
					/>
					<Text color="orange.300">
						To check the value of this flag (returns &quot;0&quot; for unset,
						&quot;1&quot; for set):
					</Text>
					<CommandText
						value={`print(GetFlag("${selectedFlagUuids[0]}", Osi.DB_Avatars:Get(nil)[1][1]))`}
					/>
				</VStack>
			)}
		</>
	);
};

export default PlotFlagsTools;

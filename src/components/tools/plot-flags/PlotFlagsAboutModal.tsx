import { Code, Text } from "@chakra-ui/react";
import CommandText from "../../common/CommandText";
import AboutModal from "../../common/AboutModal";

const PlotFlagsAboutModal = () => {
	return (
		<AboutModal title="About Plot Flags">
			<Text mb={4}>
				Plot flags are used to indicate whether or not a particular circumstance
				is true in the current state of the active save. Among other things,
				they are used to determine the route taken through the branching paths
				of a dialogue tree.
			</Text>
			<Text mb={4}>
				When checking the state of a flag, <Code>0</Code> means that it is unset
				(false), and <Code>1</Code> means that it is set (true).
			</Text>

			<Text mb={4}>
				Flags have a name and a UUID (universally unique identifier). The UUID
				is the important part when being passed to commands, but the name can be
				attached for clarity.
			</Text>
			<Text> In other words:</Text>
			<Code my={2} mx="auto" display="block" width="fit-content">
				010d2d26-74f9-4e3d-8437-4c23694dd591
			</Code>
			<Text mx="auto" display="block" width="fit-content">
				and
			</Text>
			<Code my={2} mx="auto" display="block" width="fit-content">
				LOW_JaheirasHouse_Event_FoundKhalidsGift010d2d26-74f9-4e3d-8437-4c23694dd591
			</Code>
			<Text mb={4}>
				are treated equivalently as UUID parameters to Osiris commands.
			</Text>

			<Text>To check if a particular flag is currently set:</Text>
			<CommandText
				value={`print(GetFlag("{flag UUID}", "{character UUID}"))`}
			/>

			<Text>To set a particular flag:</Text>
			<CommandText value={`SetFlag("{flag UUID}", "{character UUID}")`} />

			<Text>To unset a particular flag:</Text>
			<CommandText value={`ClearFlag("{flag UUID}", "{character UUID}")`} />
		</AboutModal>
	);
};

export default PlotFlagsAboutModal;

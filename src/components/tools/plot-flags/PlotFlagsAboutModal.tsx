import { Text } from "@chakra-ui/react";
import CommandText from "../../common/CommandText";
import AboutModal from "../../common/AboutModal";

const PlotFlagsAboutModal = () => {
	return (
		<AboutModal title="About Plot Flags">
			<Text mb={4}>
				Plot flags are used to indicate whether or not a particular circumstance
				is true in the current state of the active save.
			</Text>
			<Text>
				To check if a particular flag is currently set, use the following
				command (&quot;0&quot; means it is unset, &quot;1&quot; means it is
				set):
			</Text>
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

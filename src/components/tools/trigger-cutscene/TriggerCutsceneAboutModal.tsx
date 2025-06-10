import { Code, Link, Text } from "@chakra-ui/react";
import AboutModal from "../../common/AboutModal";
import CommandText from "@/components/common/CommandText";

const TriggerCutsceneAboutModal = () => {
	return (
		<AboutModal title="About Cutscene Triggering">
			<Text mb={4}>
				Any cutscene in the game can be triggered by using the command{" "}
				<Code>Osi.QRY_StartDialogCustom_Fixed</Code>. This command can be passed
				the UUID associated with the cutscene, followed by a variable number of
				UUIDs representing different characters in that scene.
			</Text>
			<Text mb={4}>
				You can pass any character UUIDs you wish, whether or not they are the
				characters the scene was originally designed for. For instance, running
				the command{" "}
			</Text>
			<CommandText
				value={`Osi.QRY_StartDialogCustom_Fixed("859821c9-666b-6f28-f59c-0394f49b0281","S_Player_Karlach_2c76687d-93a2-477b-8b18-8a14b549304c","S_Player_Laezel_58a69333-40bf-8358-1d17-fff240d7fb12",1,1,-1,1)`}
			></CommandText>
			<Text mb={4}>
				will trigger Wyll&apos;s Act 2 (dancing) romance scene, but with Karlach
				in the role of Wyll and Lae&apos;zel in the role of the player
				character. See the section of this site titled &quot;Get Character
				UUIDs&quot; for information on how to find the UUIDs for your desired
				characters.
			</Text>
			<Text mb={4}>
				Triggering these scenes manually, particularly with characters they were
				not originally designed for, is an imprecise science at best and often a
				matter of trial and error. You may see unexpected behavior due to the
				local landscape where you trigger the scene, unexpected body types for
				the characters involved, or what flags your save file currently has set.
			</Text>
			<Text mb={4}>
				You can use parsed dialogue files to determine the specific flags
				necessary for the dialogue path you wish to follow. See the section of
				this site titled &quot;Manage Plot Flags&quot; for more information on
				how to set and unset these flags.
			</Text>
			<Text>
				This app provides the commands for a non-exhaustive list of cutscene
				triggers. If you would like to see a scene included here that is
				missing, please{" "}
				<Link
					variant="underline"
					colorPalette="orange"
					target="_blank"
					rel="noopener noreferrer"
					href="https://github.com/blackjackkent/bg3-console-cheat-sheet/issues"
				>
					file an issue on GitHub
				</Link>{" "}
				with information about the scene you would like to see added.
			</Text>
		</AboutModal>
	);
};

export default TriggerCutsceneAboutModal;

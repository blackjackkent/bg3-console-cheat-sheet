import { Heading, Text, VStack } from "@chakra-ui/react";
import CommandText from "../../common/CommandText";

const TriggerRespecTools = () => {
	return (
		<>
			<Heading size="lg" fontWeight="bold" mb={4}>
				Generate Character Respec Command
			</Heading>
			<VStack alignItems="flex-start">
				<Text color="orange.fg">
					To trigger a respec for the currently selected character:
				</Text>
				<CommandText
					value={`Osi.StartRespec(Osi.GetCurrentCharacter(Osi.GetReservedUserID(Osi.DB_Avatars:Get(nil)[1][1])))`}
				/>
			</VStack>
		</>
	);
};

export default TriggerRespecTools;

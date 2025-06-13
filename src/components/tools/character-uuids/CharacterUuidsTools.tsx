import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import CommandText from "../../common/CommandText";
import { CHARACTER_UUIDS } from "@/lib/constants";

const CharacterUuidsTools = () => {
	return (
		<>
			<Heading size="lg" fontWeight="bold" mb={4}>
				Character UUID Information
			</Heading>
			<VStack alignItems="flex-start">
				<Heading size="md" color="orange.fg">
					Origin/Companion Character UUIDs
				</Heading>
				{CHARACTER_UUIDS.map((c) => (
					<Box key={c.uuid} w="full" pl={4}>
						<Heading size="sm" fontWeight="semibold">
							{c.characterName}
						</Heading>
						<CommandText value={c.uuid} />
					</Box>
				))}

				<Text color="orange.fg">
					The UUID of the avatar character of your playthrough (Tav, Durge, or
					the origin character you selected at game start):
				</Text>
				<Box pl={4} w="full">
					<CommandText value={`Osi.DB_Avatars:Get(nil)[1][1]`} />
				</Box>
				<Text color="orange.fg">
					To get the UUID of another character in the party (such as a
					hireling), select them, then run:
				</Text>
				<Box pl={4} w="full">
					<CommandText
						value={`print(Osi.GetCurrentCharacter(Osi.GetReservedUserID(Osi.DB_Avatars:Get(nil)[1][1])))`}
					/>
				</Box>
			</VStack>
		</>
	);
};

export default CharacterUuidsTools;

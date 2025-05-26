import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import CommandText from "../../common/CommandText";

const CharacterUuidsTools = () => {
	return (
		<>
			<Heading size="lg" fontWeight="bold" mb={4}>
				Character UUID Information
			</Heading>
			<VStack alignItems="flex-start">
				<Heading size="md" color="orange.300">
					Origin/Companion Character UUIDs
				</Heading>
				<Box w="full" pl={4}>
					<Heading size="sm" fontWeight="semibold">
						Astarion
					</Heading>
					<CommandText
						value={`S_Player_Astarion_c7c13742-bacd-460a-8f65-f864fe41f255`}
					/>
				</Box>
				<Box w="full" pl={4}>
					<Heading size="sm" fontWeight="semibold">
						Gale
					</Heading>
					<CommandText
						value={`S_Player_Gale_ad9af97d-75da-406a-ae13-7071c563f604`}
					/>
				</Box>
				<Box w="full" pl={4}>
					<Heading size="sm" fontWeight="semibold">
						Halsin
					</Heading>
					<CommandText
						value={`S_GLO_Halsin_7628bc0e-52b8-42a7-856a-13a6fd413323`}
					/>
				</Box>
				<Box w="full" pl={4}>
					<Heading size="sm" fontWeight="semibold">
						Jaheira
					</Heading>
					<CommandText
						value={`S_Player_Jaheira_91b6b200-7d00-4d62-8dc9-99e8339dfa1a`}
					/>
				</Box>
				<Box w="full" pl={4}>
					<Heading size="sm" fontWeight="semibold">
						Karlach
					</Heading>
					<CommandText
						value={`S_Player_Karlach_2c76687d-93a2-477b-8b18-8a14b549304c`}
					/>
				</Box>
				<Box w="full" pl={4}>
					<Heading size="sm" fontWeight="semibold">
						Lae&apos;zel
					</Heading>
					<CommandText
						value={`S_Player_Laezel_58a69333-40bf-8358-1d17-fff240d7fb12`}
					/>
				</Box>
				<Box w="full" pl={4}>
					<Heading size="sm" fontWeight="semibold">
						Minsc
					</Heading>
					<CommandText
						value={`S_Player_Minsc_0de603c5-42e2-4811-9dad-f652de080eba`}
					/>
				</Box>
				<Box w="full" pl={4}>
					<Heading size="sm" fontWeight="semibold">
						Minthara
					</Heading>
					<CommandText
						value={`S_GOB_DrowCommander_25721313-0c15-4935-8176-9f134385451b`}
					/>
				</Box>
				<Box w="full" pl={4}>
					<Heading size="sm" fontWeight="semibold">
						Shadowheart
					</Heading>
					<CommandText
						value={`S_Player_ShadowHeart_3ed74f06-3c60-42dc-83f6-f034cb47c679`}
					/>
				</Box>
				<Box w="full" pl={4}>
					<Heading size="sm" fontWeight="semibold">
						Wyll
					</Heading>
					<CommandText
						value={`S_Player_Wyll_c774d764-4a17-48dc-b470-32ace9ce447d`}
					/>
				</Box>
				<Text color="orange.300">
					To get the UUID of another character in the party (such as a
					hireling), select them, then run:
				</Text>
				<CommandText
					value={`print(Osi.GetCurrentCharacter(Osi.GetReservedUserID(Osi.DB_Avatars:Get(nil)[1][1])))`}
				/>
			</VStack>
		</>
	);
};

export default CharacterUuidsTools;

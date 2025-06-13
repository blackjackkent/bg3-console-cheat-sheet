import { Heading, HStack, NumberInput, Text, VStack } from "@chakra-ui/react";
import CommandText from "../../common/CommandText";
import { useState } from "react";

const SetHitpointsTools = () => {
	const [quantity, setQuantity] = useState<number>(0);
	return (
		<>
			<Heading size="lg" fontWeight="bold" mb={4}>
				Generate Set Hitpoints Commands
			</Heading>
			<HStack mb={4}>
				<Text>What hitpoints value do you want to set?</Text>
				<NumberInput.Root
					maxW="200px"
					value={quantity?.toString()}
					onValueChange={(e) => setQuantity(parseInt(e.value))}
					min={0}
				>
					<NumberInput.Control />
					<NumberInput.Input />
				</NumberInput.Root>
			</HStack>
			{quantity > 0 && (
				<VStack alignItems="flex-start">
					<Text color="orange.fg">
						To set the currently selected character&apos;s hitpoints to{" "}
						{quantity}:
					</Text>
					<CommandText
						value={`SetHitpoints(Osi.GetCurrentCharacter(Osi.GetReservedUserID(Osi.DB_Avatars:Get(nil)[1][1])), ${quantity})`}
					/>
				</VStack>
			)}
		</>
	);
};

export default SetHitpointsTools;

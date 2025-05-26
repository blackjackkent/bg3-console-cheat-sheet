import { Heading, HStack, NumberInput, Text, VStack } from "@chakra-ui/react";
import CommandText from "../../common/CommandText";
import { useState } from "react";

const AddGoldTools = () => {
	const [quantity, setQuantity] = useState<number>(0);
	return (
		<>
			<Heading size="lg" fontWeight="bold" mb={4}>
				Generate Add Gold Commands
			</Heading>
			<HStack mb={4}>
				<Text>How much gold do you want to spawn?</Text>
				<NumberInput.Root
					maxW="200px"
					value={quantity?.toString()}
					onValueChange={(e) => setQuantity(parseInt(e.value))}
					min={0}
					step={100}
				>
					<NumberInput.Control />
					<NumberInput.Input />
				</NumberInput.Root>
			</HStack>
			{quantity > 0 && (
				<VStack alignItems="flex-start">
					<Text color="orange.300">
						To spawn {quantity} gold in the currently selected character&apos;s
						inventory:
					</Text>
					<CommandText
						value={`AddGold(Osi.GetCurrentCharacter(Osi.GetReservedUserID(Osi.DB_Avatars:Get(nil)[1][1])), ${quantity})`}
					/>
				</VStack>
			)}
		</>
	);
};

export default AddGoldTools;

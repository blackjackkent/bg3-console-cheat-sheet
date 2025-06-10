import { useColorModeValue } from "@/components/ui/color-mode";
import { CutsceneCharacter } from "@/lib/prisma";
import { Box, Field, Input } from "@chakra-ui/react";
import { ChangeEvent } from "react";

type TriggerCutsceneCharacterInputProps = {
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	value: string;
	character: CutsceneCharacter;
};

const TriggerCutsceneCharacterInput = ({
	onChange,
	value,
	character,
}: TriggerCutsceneCharacterInputProps) => {
	const inputColor = useColorModeValue("gray.300", "gray.700");
	return (
		<Box px={4} mb={2} w="full">
			<Field.Root>
				<Field.Label fontWeight="semibold">{character.description}</Field.Label>
				<Input
					borderColor={inputColor}
					value={value}
					onChange={onChange}
					placeholder="Character UUID"
					w="full"
				/>
			</Field.Root>
		</Box>
	);
};

export default TriggerCutsceneCharacterInput;

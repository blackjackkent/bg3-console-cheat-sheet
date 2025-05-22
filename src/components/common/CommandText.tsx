import { Box, Button, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import { useState } from "react";

type CommandTextProps = {
	value: string;
};

const CommandText = ({ value }: CommandTextProps) => {
	const bg = useColorModeValue("gray.200", "gray.800");
	const [isCopied, setIsCopied] = useState(false);
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(value);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy text:", err);
		}
	};
	return (
		<Box
			w="full"
			bgColor={bg}
			p={2}
			my={2}
			fontFamily="mono"
			rounded="sm"
			position="relative"
		>
			<Text>{value}</Text>
			<Button
				position="absolute"
				size="2xs"
				onClick={handleCopy}
				right={2}
				top={2}
			>
				{isCopied ? "Copied!" : "Copy"}
			</Button>
		</Box>
	);
};

export default CommandText;

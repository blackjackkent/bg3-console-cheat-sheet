import { Accordion, Box, Span } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { useColorModeValue } from "../ui/color-mode";

type HomeMenuAccordionItemProps = {
	title: string;
	value: string;
};

const HomeMenuAccordionItem = ({
	title,
	value,
	children,
}: PropsWithChildren<HomeMenuAccordionItemProps>) => {
	const bodyBg = useColorModeValue("gray.100", "gray.900");
	return (
		<Accordion.Item value={value}>
			<Accordion.ItemTrigger cursor="pointer">
				<Span flex="1">{title}</Span>
				<Accordion.ItemIndicator />
			</Accordion.ItemTrigger>
			<Accordion.ItemContent>
				<Accordion.ItemBody>
					<Box textAlign="left" px={8} py={6} bg={bodyBg} position="relative">
						{children}
					</Box>
				</Accordion.ItemBody>
			</Accordion.ItemContent>
		</Accordion.Item>
	);
};

export default HomeMenuAccordionItem;

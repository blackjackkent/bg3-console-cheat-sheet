"use client";
import { Accordion, Box, ClientOnly, Skeleton, Span } from "@chakra-ui/react";
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
	return (
		<Accordion.Item value={value}>
			<Accordion.ItemTrigger cursor="pointer">
				<Span flex="1">{title}</Span>
				<Accordion.ItemIndicator />
			</Accordion.ItemTrigger>
			<Accordion.ItemContent>
				<Accordion.ItemBody>
					<HomeMenuAccordionItemInternal>
						{children}
					</HomeMenuAccordionItemInternal>
				</Accordion.ItemBody>
			</Accordion.ItemContent>
		</Accordion.Item>
	);
};

const HomeMenuAccordionItemInternal = ({ children }: PropsWithChildren) => {
	const bodyBg = useColorModeValue("gray.100", "gray.900");
	return (
		<ClientOnly fallback={<Skeleton boxSize="8" />}>
			<Box textAlign="left" px={8} py={6} bg={bodyBg} position="relative">
				{children}
			</Box>
		</ClientOnly>
	);
};

export default HomeMenuAccordionItem;

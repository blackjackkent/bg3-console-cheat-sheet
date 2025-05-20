import { Accordion, Span } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

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
				<Accordion.ItemBody>{children}</Accordion.ItemBody>
			</Accordion.ItemContent>
		</Accordion.Item>
	);
};

export default HomeMenuAccordionItem;

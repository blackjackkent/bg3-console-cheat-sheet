import { CloseButton, Dialog, IconButton, Portal } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { MdHelp } from "react-icons/md";

type AboutModalProps = {
	title: string;
};

const AboutModal = ({
	title,
	children,
}: PropsWithChildren<AboutModalProps>) => {
	return (
		<Dialog.Root size="lg">
			<Dialog.Trigger asChild>
				<IconButton
					variant="ghost"
					aria-label="Learn More"
					position="absolute"
					title="Learn More"
					right={4}
					top={4}
				>
					<MdHelp />
				</IconButton>
			</Dialog.Trigger>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>{title}</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>{children}</Dialog.Body>
						<Dialog.CloseTrigger asChild>
							<CloseButton size="sm" />
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
};

export default AboutModal;

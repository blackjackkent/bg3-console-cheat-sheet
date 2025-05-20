import { HStack, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const Header = () => {
	return (
		<HStack
			h={10}
			bg="orange.800"
			color="white"
			w="full"
			p={4}
			justifyContent="space-between"
		>
			<NextLink href="/">
				<Text fontWeight="bold">BG3 Console Cheat Sheet</Text>
			</NextLink>
			<HStack spaceX={4}>
				<Link variant="underline" asChild>
					<NextLink href="/credits">Credits</NextLink>
				</Link>
				<Link
					target="_blank"
					rel="noopener noreferrer"
					variant="underline"
					href="http://blackjackkent.tumblr.com/ask"
				>
					Contact
				</Link>
			</HStack>
		</HStack>
	);
};

export default Header;

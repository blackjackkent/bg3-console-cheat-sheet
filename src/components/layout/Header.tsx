import { Box, HStack, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const Header = () => {
	return (
		<HStack
			minH={10}
			bg="orange.800"
			color="white"
			w="full"
			p={4}
			justifyContent={{ base: "flex-end", sm: "space-between" }}
		>
			<Box display={{ base: "none", sm: "block" }}>
				<NextLink href="/">
					<Text fontWeight="bold">BG3 Console Cheat Sheet</Text>
				</NextLink>
			</Box>
			<HStack spaceX={4}>
				<Link
					variant="underline"
					asChild
					display={{ base: "inline", sm: "none" }}
				>
					<NextLink href="/">Home</NextLink>
				</Link>
				<Link variant="underline" asChild>
					<NextLink href="/contribute">Contribute</NextLink>
				</Link>
				<Link variant="underline" asChild>
					<NextLink href="/credits">Credits</NextLink>
				</Link>
				<Link
					target="_blank"
					rel="noopener noreferrer"
					variant="underline"
					href="https://github.com/blackjackkent/bg3-console-cheat-sheet/issues/new"
				>
					Contact
				</Link>
			</HStack>
		</HStack>
	);
};

export default Header;

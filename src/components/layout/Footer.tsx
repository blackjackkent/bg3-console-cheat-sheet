import { HStack, Link } from "@chakra-ui/react";

const Footer = () => {
	return (
		<HStack h={10} bg="orange.800" w="full" justifyContent="center" p={4}>
			This site is a fan resource for Baldur&apos;s Gate 3 and not associated
			with Larian Studios. | &copy; {new Date().getFullYear()}{" "}
			<Link
				target="_blank"
				rel="noopener noreferrer"
				href="http://www.blackjack-software.com"
				variant="underline"
			>
				Blackjack Software
			</Link>
		</HStack>
	);
};

export default Footer;

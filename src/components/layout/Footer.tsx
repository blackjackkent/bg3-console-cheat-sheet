import { Box, Link } from "@chakra-ui/react";

const Footer = () => {
	return (
		<Box
			minH={10}
			color="white"
			bg="orange.800"
			w="full"
			textAlign="center"
			p={4}
		>
			This site is a fan resource for Baldur&apos;s Gate 3 and not associated
			with Larian Studios. | &copy; {new Date().getFullYear()}{" "}
			<Link
				target="_blank"
				rel="noopener noreferrer"
				href="http://www.blackjack-software.com"
				variant="underline"
				display="inline"
			>
				Blackjack Software
			</Link>
		</Box>
	);
};

export default Footer;

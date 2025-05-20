import { HStack } from "@chakra-ui/react";

const Footer = () => {
	return (
		<HStack h={10} bg="orange.800" w="full" justifyContent="center" p={4}>
			&copy; {new Date().getFullYear()} Blackjack Software
		</HStack>
	);
};

export default Footer;

import HomeMenuAccordion from "@/components/common/HomeMenuAccordion";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function Home() {
	return (
		<Box>
			<Flex direction="column" alignItems="center" textAlign="center">
				<Image src={`/images/logo-bg3.png`} alt="" width="200" height="200" />
				<Heading size="4xl" mb="4">
					Script Extender Console Cheat Sheet
				</Heading>
				<Box w="full">
					<Text>
						This tool is a cheat sheet for rapidly generating commands to be
						used in the{" "}
						<Link
							href="https://github.com/Norbyte/bg3se"
							target="_blank"
							rel="noopener noreferrer"
							colorPalette="orange"
						>
							Baldur&apos;s Gate 3 Script Extender mod
						</Link>
						.
					</Text>
					<Text my={4}>
						If you find any errors in this information, have a suggestion for
						improvement, or wish to request an addition, please reach out to me
						by{" "}
						<Link
							target="_blank"
							rel="noopener noreferrer"
							href="https://github.com/blackjackkent/bg3-console-cheat-sheet/issues/new"
							colorPalette="orange"
						>
							filing an issue on Github
						</Link>
						.
					</Text>
				</Box>

				<Heading size="2xl" my={8}>
					What would you like to do?
				</Heading>
				<HomeMenuAccordion />
			</Flex>
		</Box>
	);
}

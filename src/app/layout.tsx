import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ColorModeButton } from "@/components/ui/color-mode";
import { Provider } from "@/components/ui/provider";
import { Box, VStack } from "@chakra-ui/react";

export default function RootLayout(props: { children: React.ReactNode }) {
	const { children } = props;
	return (
		<html suppressHydrationWarning>
			<body>
				<Provider>
					<VStack w="full" h="vh">
						<Header />
						<Box flex="1" position="relative" w="full">
							<Box
								h="full"
								w={{ base: "full", md: "768px" }}
								margin="auto"
								px={8}
							>
								{children}
							</Box>
							<ColorModeButton position="absolute" bottom={4} right={4} />
						</Box>
						<Footer />
					</VStack>
				</Provider>
			</body>
		</html>
	);
}

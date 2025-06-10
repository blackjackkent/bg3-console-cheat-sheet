import ExternalLink from "@/components/common/ExternalLink";
import { Heading, Text } from "@chakra-ui/react";
import Head from "next/head";

const ContributePage = () => {
	return (
		<>
			<Head>
				<title>BG3 Console Cheat Sheet - Contribute</title>
			</Head>
			<Heading size="3xl" mb={4}>
				How to Contribute
			</Heading>

			<Text mb={4}>
				If you find any errors in the information on this site, have a
				suggestion for improvement, or wish to request an addition, please reach
				out to me by{" "}
				<ExternalLink href="https://github.com/blackjackkent/bg3-console-cheat-sheet/issues/new">
					filing an issue on Github
				</ExternalLink>
				. I&apos;ll happily take a look and make the necessary adjustments as
				soon as possible!
			</Text>

			<Text>
				This tool is provided free of charge to help the fan community. If it
				helped you, I&apos;d love to hear about it! Drop me a message on{" "}
				<ExternalLink href="https://blackjackkent.tumblr.com/ask">
					Tumblr
				</ExternalLink>{" "}
				and say hi! If BG fanfiction is your thing, you can also check out my
				work on{" "}
				<ExternalLink href="archiveofourown.org/users/BlackjackKent/works?fandom_id=96620257">
					Archive of Our Own
				</ExternalLink>
				.
			</Text>
		</>
	);
};

export default ContributePage;

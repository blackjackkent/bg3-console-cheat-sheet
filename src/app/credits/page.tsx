import ExternalLink from "@/components/common/ExternalLink";
import { Heading, List, Text } from "@chakra-ui/react";
import Head from "next/head";

const CreditsPage = () => {
	return (
		<>
			<Head>
				<title>BG3 Console Cheat Sheet - Credits</title>
			</Head>
			<Heading size="3xl" mb={4}>
				Credits/Thanks
			</Heading>

			<Text>
				Shoutout to the following people, whose past work helped me to learn
				and/or provided data necessary to make this tool:
			</Text>
			<List.Root ml={8} mt={8}>
				<List.Item>
					The{" "}
					<ExternalLink href="https://docs.baldursgate3.game/index.php?title=Category:Osiris_Calls">
						BG3 Modding Wiki
					</ExternalLink>{" "}
					for their documentation information on many Osiris calls.
				</List.Item>
				<List.Item>
					<ExternalLink href="https://github.com/LaughingLeader/BG3ModdingTools/blob/master/generated/Osi.lua">
						LaughingLeader
					</ExternalLink>{" "}
					on GitHub for their extracted collection of Osiris command
					information.
				</List.Item>
				<List.Item>
					<ExternalLink href="https://www.nexusmods.com/baldursgate3/mods/1303">
						Liareth
					</ExternalLink>{" "}
					on NexusMods for their extracted JSON file of item UUIDs.
				</List.Item>
				<List.Item>
					<ExternalLink href="https://www.tumblr.com/mogruith">
						mogruith
					</ExternalLink>{" "}
					on Tumblr for tutorials on scene triggering (and other photo
					tools-related stuff).
				</List.Item>
				<List.Item>
					<ExternalLink href="https://bg3.moxifer.com/BG3-Moxi-s-Research-Directory-e093cee52f854f2d86338891673a0d99">
						Moxi&apos;s Resource Directory
					</ExternalLink>{" "}
					for guidance on scene UUIDs and dialog hunting
				</List.Item>
				<List.Item>
					<ExternalLink href="https://github.com/Norbyte/bg3se/tree/main">
						Norbyte
					</ExternalLink>{" "}
					on GitHub for building the BG3 Script Extender.
				</List.Item>
				<List.Item>
					<ExternalLink href="https://fearlessrevolution.com/viewtopic.php?p=377051#p377051">
						Noway3
					</ExternalLink>{" "}
					on FearlessRevolution.com for their extracted collection of plot flag
					information.
				</List.Item>
				<List.Item>
					<ExternalLink href="https://www.tumblr.com/astreamofstars">
						astreamofstars
					</ExternalLink>{" "}
					and{" "}
					<ExternalLink href="https://www.tumblr.com/eluvisen">
						eluvisen
					</ExternalLink>{" "}
					on Tumblr for their support and listening to me ramble about this
					stuff all the time. &lt;3
				</List.Item>
			</List.Root>
		</>
	);
};

export default CreditsPage;

import { Heading, Link, List, Text } from "@chakra-ui/react";
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
					<Link
						variant="underline"
						colorPalette="orange"
						target="_blank"
						rel="noopener noreferrer"
						href="https://docs.baldursgate3.game/index.php?title=Category:Osiris_Calls"
					>
						BG3 Modding Wiki
					</Link>{" "}
					for their documentation information on many Osiris calls.
				</List.Item>
				<List.Item>
					<Link
						variant="underline"
						colorPalette="orange"
						target="_blank"
						rel="noopener noreferrer"
						href="https://github.com/LaughingLeader/BG3ModdingTools/blob/master/generated/Osi.lua"
					>
						LaughingLeader
					</Link>{" "}
					on GitHub for their extracted collection of Osiris command
					information.
				</List.Item>
				<List.Item>
					<Link
						variant="underline"
						colorPalette="orange"
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.nexusmods.com/baldursgate3/mods/1303"
					>
						Liareth
					</Link>{" "}
					on NexusMods for their extracted JSON file of item UUIDs.
				</List.Item>
				<List.Item>
					<Link
						variant="underline"
						colorPalette="orange"
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.tumblr.com/mogruith"
					>
						mogruith
					</Link>{" "}
					on Tumblr for tutorials on scene triggering (and other photo
					tools-related stuff).
				</List.Item>
				<List.Item>
					<Link
						variant="underline"
						colorPalette="orange"
						target="_blank"
						rel="noopener noreferrer"
						href="https://bg3.moxifer.com/BG3-Moxi-s-Research-Directory-e093cee52f854f2d86338891673a0d99"
					>
						Moxi&apos;s Resource Directory
					</Link>{" "}
					for guidance on scene UUIDs and dialog hunting
				</List.Item>
				<List.Item>
					<Link
						variant="underline"
						colorPalette="orange"
						target="_blank"
						rel="noopener noreferrer"
						href="https://github.com/Norbyte/bg3se/tree/main"
					>
						Norbyte
					</Link>{" "}
					on GitHub for building the BG3 Script Extender.
				</List.Item>
				<List.Item>
					<Link
						variant="underline"
						colorPalette="orange"
						target="_blank"
						rel="noopener noreferrer"
						href="https://fearlessrevolution.com/viewtopic.php?p=377051#p377051"
					>
						Noway3
					</Link>{" "}
					on FearlessRevolution.com for their extracted collection of plot flag
					information.
				</List.Item>
				<List.Item>
					<Link
						variant="underline"
						colorPalette="orange"
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.tumblr.com/astreamofstars"
					>
						astreamofstars
					</Link>{" "}
					and{" "}
					<Link
						variant="underline"
						colorPalette="orange"
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.tumblr.com/eluvisen"
					>
						eluvisen
					</Link>{" "}
					on Tumblr for their support and listening to me ramble about this
					stuff all the time. &lt;3
				</List.Item>
			</List.Root>
		</>
	);
};

export default CreditsPage;

import { Cutscene } from "@/lib/types";
import { fetcher } from "@/lib/util";
import { Box, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import TriggerCutsceneCharacterInput from "./TriggerCutsceneCharacterInput";
import { useColorModeValue } from "@/components/ui/color-mode";
import CommandText from "@/components/common/CommandText";

type TriggerCutsceneCommandDetailsProps = {
	sceneUuid: string;
};

const TriggerCutsceneCommandDetails = ({
	sceneUuid,
}: TriggerCutsceneCommandDetailsProps) => {
	const bg = useColorModeValue("gray.200", "gray.800");
	const [characterUuids, setCharacterUuids] = useState<{
		[idx: number]: string;
	}>({});
	const { data, error, isLoading } = useSWR<Cutscene>(
		`/api/cutscenes/${sceneUuid}`,
		fetcher
	);
	const characterCount = data?.characters?.length || 0;

	useEffect(() => {
		setCharacterUuids({});
	}, [sceneUuid]);

	const onCharacterUuidChange = (index: number, value: string) => {
		setCharacterUuids({ ...characterUuids, [index]: value });
	};

	const hasUnfilledCharacters =
		Object.values(characterUuids).some((v) => !v) ||
		Object.values(characterUuids).length < characterCount;

	const generateCommandString = () => {
		let string = `Osi.QRY_StartDialogCustom_Fixed("${data?.uuid}",`;
		for (let i = 0; i < characterCount; i++) {
			string += `"${characterUuids[i]}",`;
		}
		string += "1,1,-1,1)";
		return string;
	};

	return (
		<>
			<Box w="full">
				{isLoading && <Spinner />}
				{!!error && (
					<Text color="red.500">Error generating cutscene tools.</Text>
				)}
				{!isLoading && !error && (
					<VStack alignItems="flex-start">
						<Box bg={bg} w="full" p={4}>
							<Heading size="md" fontWeight="bold">
								{data?.name}
							</Heading>
							<Text fontSize="md" color="fg.muted">
								{data?.description}
							</Text>
							<Text fontSize="sm" fontWeight="bold" color="fg.muted">
								Characters:{" "}
								{data?.characters.map((c) => c.description).join(", ")}
							</Text>
						</Box>
						<Text color="orange.300">
							Enter a UUID for a character to fill each of the following roles:
						</Text>
						{data?.characters?.map((c) => {
							const idx = c.index;
							return (
								<TriggerCutsceneCharacterInput
									value={characterUuids[idx]}
									onChange={(e) =>
										onCharacterUuidChange(idx, e.currentTarget.value)
									}
									character={c}
									key={idx}
								/>
							);
						})}
						{!hasUnfilledCharacters && (
							<>
								<Text color="orange.300">To set this flag:</Text>
								<Box px={4}>
									<CommandText value={generateCommandString()} />
								</Box>
							</>
						)}
					</VStack>
				)}
			</Box>
		</>
	);
};

export default TriggerCutsceneCommandDetails;

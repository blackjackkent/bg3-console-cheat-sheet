import {
	createListCollection,
	Heading,
	HStack,
	Portal,
	Select,
	Text,
	VStack,
} from "@chakra-ui/react";
import CommandText from "../../common/CommandText";
import { JSX, useMemo, useState } from "react";
import { CHARACTER_UUIDS } from "@/lib/util";

const SetApprovalTools = () => {
	const [selectedApproval, setSelectedApproval] = useState<string | null>(null);
	const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
		null
	);
	const characterFormattedData = useMemo(() => {
		const characterValues: { label: string; value: string }[] = [];
		const characterOptions: JSX.Element[] = [];
		CHARACTER_UUIDS.forEach((char) => {
			const value = { label: char.characterName, value: char.uuid };
			const option = (
				<Select.Item item={value} key={char.uuid}>
					{char.characterName}
					<Select.ItemIndicator />
				</Select.Item>
			);
			characterValues.push(value);
			characterOptions.push(option);
		});
		return { characterValues, characterOptions };
	}, []);
	const approvalFormattedData = useMemo(() => {
		const approvalValues = [
			{ label: "less then -50 ~ Catastrophic", value: "-51" },
			{ label: "-49 to -40 ~ Very Low", value: "-45" },
			{ label: "-39 to -20 ~ Low", value: "-30" },
			{ label: "-19 to 20 ~ Neutral", value: "0" },
			{ label: "21 to 40 ~ Medium", value: "30" },
			{ label: "41 to 60 ~ High", value: "50" },
			{ label: "61 to 80 ~ Very High", value: "70" },
			{ label: "81 to 100 ~ Exceptional", value: "100" },
		];
		const approvalOptions: JSX.Element[] = approvalValues.map((approval) => (
			<Select.Item item={approval} key={approval.value}>
				{approval.label}
				<Select.ItemIndicator />
			</Select.Item>
		));
		return { approvalValues, approvalOptions };
	}, []);
	const characterCollection = createListCollection({
		items: characterFormattedData.characterValues,
	});
	const approvalCollection = createListCollection({
		items: approvalFormattedData.approvalValues,
	});
	return (
		<>
			<Heading size="lg" fontWeight="bold" mb={4}>
				Generate Companion Approval Commands
			</Heading>
			<HStack mb={4}>
				<Text>Which character&apos;s approval do you want to adjust?</Text>
				<Select.Root
					collection={characterCollection}
					value={!!selectedCharacter ? [selectedCharacter] : []}
					onValueChange={(e) => setSelectedCharacter(e.value[0])}
				>
					<Select.HiddenSelect />
					<Select.Control>
						<Select.Trigger>
							<Select.ValueText placeholder="Select character" />
						</Select.Trigger>
						<Select.IndicatorGroup>
							<Select.Indicator />
						</Select.IndicatorGroup>
					</Select.Control>
					<Portal>
						<Select.Positioner>
							<Select.Content>
								{characterFormattedData.characterOptions}
							</Select.Content>
						</Select.Positioner>
					</Portal>
				</Select.Root>
			</HStack>
			<HStack mb={4}>
				<Text>What approval level would you like to set them to?</Text>
				<Select.Root
					collection={approvalCollection}
					value={!!selectedApproval ? [selectedApproval] : []}
					onValueChange={(e) => setSelectedApproval(e.value[0])}
				>
					<Select.HiddenSelect />
					<Select.Control>
						<Select.Trigger>
							<Select.ValueText placeholder="Select approval level" />
						</Select.Trigger>
						<Select.IndicatorGroup>
							<Select.Indicator />
						</Select.IndicatorGroup>
					</Select.Control>
					<Portal>
						<Select.Positioner>
							<Select.Content>
								{approvalFormattedData.approvalOptions}
							</Select.Content>
						</Select.Positioner>
					</Portal>
				</Select.Root>
			</HStack>
			{!!selectedCharacter && !!selectedApproval && (
				<VStack alignItems="flex-start">
					<Text color="orange.300">
						To set this character&apos;s approval to the selected level:
					</Text>
					<CommandText
						value={`Osi.ChangeApprovalRating("${selectedCharacter}", Osi.DB_Avatars:Get(nil)[1][1], 0, ${selectedApproval})`}
					/>
				</VStack>
			)}
		</>
	);
};

export default SetApprovalTools;

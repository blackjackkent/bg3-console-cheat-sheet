import { Heading, HStack, Text, VStack } from "@chakra-ui/react";
import CommandText from "../../common/CommandText";
import { useState } from "react";
import {
	APPROVAL_RANGES,
	ApprovalRangeItem,
	CHARACTER_UUIDS,
	CharacterUuidData,
} from "@/lib/constants";
import SingleValueSelect from "@/components/common/SingleValueSelect";

const SetApprovalTools = () => {
	const [selectedApproval, setSelectedApproval] = useState<ApprovalRangeItem>();
	const [selectedCharacter, setSelectedCharacter] =
		useState<CharacterUuidData>();
	return (
		<>
			<Heading size="lg" fontWeight="bold" mb={4}>
				Generate Companion Approval Commands
			</Heading>
			<HStack mb={4}>
				<Text>Which character&apos;s approval do you want to adjust?</Text>
				<SingleValueSelect
					items={CHARACTER_UUIDS}
					itemToString={(char) => char?.characterName || ""}
					itemToValue={(char) => char?.uuid || ""}
					placeholder="Select character"
					selectedItem={selectedCharacter}
					setSelectedItem={setSelectedCharacter}
				/>
			</HStack>
			<HStack mb={4}>
				<Text>What approval level would you like to set them to?</Text>
				<SingleValueSelect
					items={APPROVAL_RANGES}
					itemToString={(range) => range?.description || ""}
					itemToValue={(range) => range?.representativeValue.toString() || ""}
					placeholder="Select character"
					selectedItem={selectedApproval}
					setSelectedItem={setSelectedApproval}
				/>
			</HStack>
			{!!selectedCharacter && !!selectedApproval && (
				<VStack alignItems="flex-start">
					<Text color="orange.300">
						To set this character&apos;s approval to the selected level:
					</Text>
					<CommandText
						value={`Osi.ChangeApprovalRating("${selectedCharacter.uuid}", Osi.DB_Avatars:Get(nil)[1][1], 0, ${selectedApproval.representativeValue})`}
					/>
				</VStack>
			)}
		</>
	);
};

export default SetApprovalTools;

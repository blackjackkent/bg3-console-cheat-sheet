import { Heading, HStack, NumberInput, Text, VStack } from "@chakra-ui/react";
import SpawnItemsAboutModal from "./SpawnItemsAboutModal";
import SearchableCombobox from "@/components/common/SearchableCombobox";
import { GameItem } from "@/lib/prisma";
import { useState } from "react";
import CommandText from "@/components/common/CommandText";

const SpawnItemsTools = () => {
	const [selectedItemUuids, setSelectedItemUuids] = useState<string[]>([]);
	const [quantity, setQuantity] = useState<number>(0);
	return (
		<>
			<SpawnItemsAboutModal />
			<Heading size="lg" fontWeight="bold" mb={4}>
				Generate Item Spawn Commands
			</Heading>
			<Text mb={4}>
				Search for an item by name or keyword(s). Select a result item to
				generate a console command to spawn that item in your selected
				character&apos;s inventory.
			</Text>
			<SearchableCombobox
				apiKey="items"
				itemToDescription={(item: GameItem) => item.description}
				itemToString={(item: GameItem) => item.name}
				itemToValue={(item: GameItem) => item.mapKey}
				selectedValues={selectedItemUuids}
				setSelectedValues={setSelectedItemUuids}
			/>
			{!!selectedItemUuids.length && (
				<HStack mb={4}>
					<Text>How many do you want to spawn?</Text>
					<NumberInput.Root
						maxW="200px"
						value={quantity?.toString()}
						onValueChange={(e) => setQuantity(parseInt(e.value))}
						min={0}
					>
						<NumberInput.Control />
						<NumberInput.Input />
					</NumberInput.Root>
				</HStack>
			)}
			{!!selectedItemUuids?.length && quantity > 0 && (
				<VStack alignItems="flex-start">
					<Text color="orange.300">
						To spawn {quantity} of this item in the currently selected
						character&apos;s inventory:
					</Text>
					<CommandText
						value={`TemplateAddTo("${selectedItemUuids[0]}", Osi.GetCurrentCharacter(Osi.GetReservedUserID(Osi.DB_Avatars:Get(nil)[1][1])), ${quantity})`}
					/>
				</VStack>
			)}
		</>
	);
};

export default SpawnItemsTools;

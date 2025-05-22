import usePlotFlags from "@/lib/hooks/usePlotFlags";
import PlotFlagsAboutModal from "../about-modals/PlotFlagsAboutModal";
import {
	Combobox,
	ComboboxInputValueChangeDetails,
	Heading,
	HStack,
	Portal,
	Span,
	Spinner,
	Text,
	useListCollection,
	VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { PlotFlag } from "@/lib/types";
import debounce from "lodash.debounce";

const PlotFlagsTools = ({}) => {
	const [query, setQuery] = useState<string>();
	const { data, error, isLoading } = usePlotFlags(query || "");
	const [selectedFlagUuids, setSelectedFlagUuids] = useState<string[]>();

	const { collection, set } = useListCollection<PlotFlag>({
		initialItems: [],
		limit: 10,
	});

	useEffect(() => {
		set(data || []);
	}, [set, data]);

	const handleInputDebounce = useRef(
		debounce(async (query: string) => {
			setQuery(query);
		}, 300)
	).current;

	const handleInput = (e: ComboboxInputValueChangeDetails) => {
		handleInputDebounce(e.inputValue);
	};

	return (
		<>
			<PlotFlagsAboutModal />
			<Heading size="lg" fontWeight="bold">
				Generate Plot Flag Commands
			</Heading>
			<Text>Search for a plot flag by name or keyword(s).</Text>
			<Combobox.Root
				collection={collection}
				onInputValueChange={handleInput}
				value={selectedFlagUuids}
				onValueChange={(e) => setSelectedFlagUuids(e.value)}
			>
				<Combobox.Label>Search Star Wars Characters</Combobox.Label>

				<Combobox.Control>
					<Combobox.Input placeholder="Type to search" />
					<Combobox.IndicatorGroup>
						<Combobox.ClearTrigger />
						<Combobox.Trigger />
					</Combobox.IndicatorGroup>
				</Combobox.Control>

				<Portal>
					<Combobox.Positioner>
						<Combobox.Content minW="sm">
							{isLoading ? (
								<HStack p="2">
									<Spinner size="xs" borderWidth="1px" />
									<Span>Loading...</Span>
								</HStack>
							) : error ? (
								<Span p="2" color="fg.error">
									Error fetching
								</Span>
							) : (
								collection.items?.map((flag) => (
									<Combobox.Item key={flag.uuid} item={flag}>
										<VStack justify="space-between" textStyle="sm">
											<Span fontWeight="medium" truncate>
												{flag.name}
											</Span>
											{flag.description && (
												<Span color="fg.muted" truncate>
													{flag.description}
												</Span>
											)}
										</VStack>
										<Combobox.ItemIndicator />
									</Combobox.Item>
								))
							)}
						</Combobox.Content>
					</Combobox.Positioner>
				</Portal>
			</Combobox.Root>
		</>
	);
};

export default PlotFlagsTools;

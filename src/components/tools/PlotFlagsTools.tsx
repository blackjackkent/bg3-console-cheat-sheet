import usePlotFlags from "@/lib/hooks/usePlotFlags";
import PlotFlagsAboutModal from "../about-modals/PlotFlagsAboutModal";
import {
	Box,
	Combobox,
	ComboboxInputValueChangeDetails,
	Heading,
	Highlight,
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
import { useVirtualizer } from "@tanstack/react-virtual";
import { flushSync } from "react-dom";
import CommandText from "../common/CommandText";
import { useColorMode } from "../ui/color-mode";

const PlotFlagsTools = ({}) => {
	const [query, setQuery] = useState<string>();
	const { data, error, isLoading } = usePlotFlags(query || "");
	const [selectedFlagUuids, setSelectedFlagUuids] = useState<string[]>();
	const { colorMode } = useColorMode();
	console.log(colorMode);

	const contentRef = useRef<HTMLDivElement>(null);
	const { collection, set } = useListCollection<PlotFlag>({
		initialItems: [],
		itemToString: (item) => item.name,
		itemToValue: (item) => item.uuid,
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

	const virtualizer = useVirtualizer({
		count: collection.size,
		getScrollElement: () => contentRef.current,
		estimateSize: () => 60,
		overscan: 5,
		scrollPaddingEnd: 32,
	});

	const handleScrollToIndexFn = (details: { index: number }) => {
		flushSync(() => {
			virtualizer.scrollToIndex(details.index, {
				align: "center",
				behavior: "auto",
			});
		});
	};

	return (
		<>
			<PlotFlagsAboutModal />
			<Heading size="lg" fontWeight="bold" mb={4}>
				Generate Plot Flag Commands
			</Heading>
			<Text mb={4}>
				Search for a plot flag by name or keyword(s). Select a result item to
				generate console commands to manipulate that flag in game.
			</Text>
			<Combobox.Root
				collection={collection}
				onInputValueChange={handleInput}
				scrollToIndexFn={handleScrollToIndexFn}
				value={selectedFlagUuids}
				onValueChange={(e) => setSelectedFlagUuids(e.value)}
				positioning={{
					fitViewport: true,
				}}
				mb={8}
			>
				<Combobox.Control>
					<Combobox.Input placeholder="Type to search" />
					<Combobox.IndicatorGroup>
						<Combobox.ClearTrigger />
						<Combobox.Trigger />
					</Combobox.IndicatorGroup>
				</Combobox.Control>
				<Portal>
					<Combobox.Positioner>
						<Combobox.Content minW="sm" ref={contentRef}>
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
								<div
									style={{
										height: `${virtualizer.getTotalSize()}px`,
										width: "100%",
										position: "relative",
									}}
								>
									{virtualizer.getVirtualItems().map((virtualItem) => {
										const flag = collection.items[virtualItem.index];
										return (
											<Combobox.Item
												key={flag.uuid}
												item={flag}
												position="absolute"
												top={0}
												left={0}
												w="full"
												height={`${virtualItem.size}px`}
												transform={`translateY(${virtualItem.start}px)`}
												borderBottom="1px solid #333"
												cursor="pointer"
											>
												<VStack
													w="full"
													whiteSpace="nowrap"
													overflow="hidden"
													textOverflow="ellipsis"
													alignItems="flex-start"
												>
													<Span fontWeight="bold" truncate>
														<Highlight
															query={query || ""}
															styles={{ bg: "orange.muted" }}
															ignoreCase
														>
															{flag.name}
														</Highlight>
													</Span>
													{flag.description && (
														<Span color="fg.muted" truncate>
															<Highlight
																query={query || ""}
																styles={{ bg: "orange.muted" }}
																ignoreCase
															>
																{flag.description}
															</Highlight>
														</Span>
													)}
												</VStack>
												<Combobox.ItemIndicator />
											</Combobox.Item>
										);
									})}
								</div>
							)}
						</Combobox.Content>
					</Combobox.Positioner>
				</Portal>
			</Combobox.Root>
			{!!selectedFlagUuids?.length && (
				<VStack alignItems="flex-start">
					<Text color="orange.300">To set this flag:</Text>
					<CommandText
						value={`SetFlag("${selectedFlagUuids[0]}", Osi.DB_Avatars:Get(nil)[1][1])`}
					/>
					<Text color="orange.300">To unset this flag:</Text>
					<CommandText
						value={`ClearFlag("${selectedFlagUuids[0]}", Osi.DB_Avatars:Get(nil)[1][1])`}
					/>
					<Text color="orange.300">
						To check the value of this flag (returns &quot;0&quot; for unset,
						&quot;1&quot; for set):
					</Text>
					<CommandText
						value={`print(GetFlag("${selectedFlagUuids[0]}", Osi.DB_Avatars:Get(nil)[1][1]))`}
					/>
				</VStack>
			)}
		</>
	);
};

export default PlotFlagsTools;

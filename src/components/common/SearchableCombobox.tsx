import { fetcher } from "@/lib/util";
import {
	Combobox,
	ComboboxInputValueChangeDetails,
	Highlight,
	HStack,
	Portal,
	Span,
	Spinner,
	useListCollection,
	VStack,
} from "@chakra-ui/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import debounce from "lodash.debounce";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import useSWR from "swr";

type SearchableComboboxProps<T> = {
	apiKey: string;
	itemToString: (item: T) => string;
	itemToValue: (item: T) => string;
	itemToDescription: (item: T) => string;
	selectedValues: string[];
	setSelectedValues: (vals: string[]) => void;
};

function SearchableCombobox<T>({
	apiKey,
	itemToString,
	itemToDescription,
	itemToValue,
	selectedValues,
	setSelectedValues,
}: SearchableComboboxProps<T>) {
	const [query, setQuery] = useState<string>("");
	const { data, error, isLoading } = useSWR<T[]>(
		`/api/${apiKey}?query=${encodeURIComponent(query)}`,
		fetcher
	);

	const contentRef = useRef<HTMLDivElement>(null);
	const { collection, set } = useListCollection<T>({
		initialItems: [],
		itemToString,
		itemToValue,
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
		<Combobox.Root
			collection={collection}
			onInputValueChange={handleInput}
			scrollToIndexFn={handleScrollToIndexFn}
			value={selectedValues}
			onValueChange={(e) => setSelectedValues(e.value)}
			mb={4}
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
									const item = collection.items[virtualItem.index];
									const name = itemToString(item);
									const value = itemToValue(item);
									const description = itemToDescription(item);
									return (
										<Combobox.Item
											key={value}
											item={item}
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
														{name}
													</Highlight>
												</Span>
												{!!description && (
													<Span color="fg.muted" truncate>
														<Highlight
															query={query || ""}
															styles={{ bg: "orange.muted" }}
															ignoreCase
														>
															{description}
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
	);
}

export default SearchableCombobox;

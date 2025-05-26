import { Portal, Select, useListCollection } from "@chakra-ui/react";
import { useMemo, JSX, useEffect } from "react";

type SingleValueSelectProps<T> = {
	items: T[];
	itemToString: (item: T) => string;
	itemToValue: (item: T) => string;
	selectedItem: T;
	setSelectedItem: (vals: T) => void;
	placeholder: string;
};

function SingleValueSelect<T>({
	items,
	itemToString,
	itemToValue,
	selectedItem,
	setSelectedItem,
	placeholder,
}: SingleValueSelectProps<T>) {
	const { collection, set } = useListCollection<T>({
		initialItems: [],
		itemToString,
		itemToValue,
	});

	useEffect(() => {
		set(items || []);
	}, [items, set]);

	const itemMap = useMemo(() => {
		const itemMap: { [key: string]: T } = {};
		const itemOptions: JSX.Element[] = [];
		items.forEach((item) => {
			const value = itemToValue(item);
			itemMap[value] = item;
			itemOptions.push();
		});
		return itemMap;
	}, [items, itemToValue]);
	return (
		<Select.Root
			collection={collection}
			value={!!selectedItem ? [itemToValue(selectedItem)] : []}
			onValueChange={(e) => setSelectedItem(itemMap[e.value[0]])}
		>
			<Select.HiddenSelect />
			<Select.Control>
				<Select.Trigger>
					<Select.ValueText placeholder={placeholder} />
				</Select.Trigger>
				<Select.IndicatorGroup>
					<Select.Indicator />
				</Select.IndicatorGroup>
			</Select.Control>
			<Portal>
				<Select.Positioner>
					<Select.Content>
						{collection.items.map((item) => (
							<Select.Item item={item} key={itemToValue(item)}>
								{itemToString(item)}
								<Select.ItemIndicator />
							</Select.Item>
						))}
					</Select.Content>
				</Select.Positioner>
			</Portal>
		</Select.Root>
	);
}

export default SingleValueSelect;

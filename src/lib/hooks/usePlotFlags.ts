import useSWR from "swr";
import { fetcher } from "../util";
import { PlotFlag } from "../types";

const usePlotFlags = (query: string) => {
	const { data, error, isLoading } = useSWR<PlotFlag[]>(
		`/api/plot-flags?query=${encodeURIComponent(query)}`,
		fetcher
	);
	return {
		data,
		error,
		isLoading,
	};
};

export default usePlotFlags;

import useSWR from "swr";
import { fetcher } from "../util";

const usePlotFlags = (query: string) => {
	const { data, error, isLoading } = useSWR(
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

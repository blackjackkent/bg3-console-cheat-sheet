import usePlotFlags from "@/lib/hooks/usePlotFlags";
import PlotFlagsAboutModal from "../about-modals/PlotFlagsAboutModal";
import { Heading } from "@chakra-ui/react";
import { useState } from "react";
import prisma from "@/lib/prisma";
import { PlotFlag } from "@/lib/types";

const PlotFlagsTools = ({}) => {
	const [query, setQuery] = useState<string>();
	const { data } = usePlotFlags(query);
	const [selectedFlag, setSelectedFlag] = useState<PlotFlag>();

	return (
		<>
			<PlotFlagsAboutModal />
			<Heading size="lg" fontWeight="bold">
				Generate Plot Flag Commands
			</Heading>
		</>
	);
};

export default PlotFlagsTools;

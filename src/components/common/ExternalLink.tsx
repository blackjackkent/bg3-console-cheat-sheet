import { Link } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

type ExternalLinkProps = {
	href: string;
};

const ExternalLink = ({
	href,
	children,
}: PropsWithChildren<ExternalLinkProps>) => {
	return (
		<Link
			target="_blank"
			rel="noopener noreferrer"
			href={href}
			colorPalette="orange"
			variant="underline"
		>
			{children}
		</Link>
	);
};

export default ExternalLink;

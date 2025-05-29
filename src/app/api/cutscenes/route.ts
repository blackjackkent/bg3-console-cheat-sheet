import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const query = request.nextUrl.searchParams.get("query");
	const queryNormalized = query?.toLocaleUpperCase() || "";
	const cutscenes = await prisma.cutscene.findMany({
		include: {
			category: true,
			characters: true,
		},
	});
	const filteredItems = cutscenes.filter((item) => {
		const category = item.category.description.toLocaleUpperCase();
		const name = item.name.toLocaleUpperCase();
		const description = item.description.toLocaleUpperCase();
		const characters = item.characters.filter((char) =>
			char.description.toLocaleUpperCase().includes(queryNormalized)
		);

		return (
			category.includes(queryNormalized) ||
			name.includes(queryNormalized) ||
			description.includes(queryNormalized) ||
			characters.length > 0
		);
	});
	return Response.json(filteredItems);
}

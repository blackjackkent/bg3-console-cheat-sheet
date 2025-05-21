import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const query = request.nextUrl.searchParams.get("query");
	if (!query) {
		return [];
	}
	const decodedQuery = decodeURIComponent(query);
	const results = await prisma.plotFlag.findMany({
		where: {
			OR: [
				{
					name: {
						contains: decodedQuery,
					},
				},
				{
					description: {
						contains: decodedQuery,
					},
				},
			],
		},
	});

	return Response.json(results);
}

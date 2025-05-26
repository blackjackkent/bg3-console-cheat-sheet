import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const query = request.nextUrl.searchParams.get("query");
	if (!query) {
		return Response.json([]);
	}
	const decodedQuery = decodeURIComponent(query);
	const escapedQuery = `%${decodedQuery
		.replace("_", "\\_")
		.replace("%", "\\%")}%`;

	const results =
		await prisma.$queryRaw`SELECT * FROM GameItem WHERE name LIKE ${escapedQuery} ESCAPE '\\' OR description LIKE ${escapedQuery} ESCAPE '\\' ORDER BY name`;

	return Response.json(results);
}

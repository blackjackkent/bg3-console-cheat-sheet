import prisma from "@/lib/prisma";

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ uuid: string }> }
) {
	const { uuid } = await params;
	const cutscene = await prisma.cutscene.findFirst({
		include: {
			category: true,
			characters: true,
		},
		where: {
			uuid,
		},
	});
	return Response.json(cutscene);
}

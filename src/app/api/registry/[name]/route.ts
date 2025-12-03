import { NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { join } from "path"

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ name: string }> }
) {
	const { name } = await params
	const registryPath = join(process.cwd(), "public", "r", `${name}.json`)

	try {
		const fileContent = await readFile(registryPath, "utf-8")
		const registryItem = JSON.parse(fileContent)
		return NextResponse.json(registryItem)
	} catch (error) {
		return NextResponse.json(
			{ error: "Registry item not found" },
			{ status: 404 }
		)
	}
}

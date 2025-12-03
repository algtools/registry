import { NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { join } from "path"

export async function GET() {
	try {
		const registryPath = join(process.cwd(), "registry.json")
		const fileContent = await readFile(registryPath, "utf-8")
		const registry = JSON.parse(fileContent)
		return NextResponse.json(registry)
	} catch (error) {
		return NextResponse.json(
			{ error: "Registry not found" },
			{ status: 404 }
		)
	}
}

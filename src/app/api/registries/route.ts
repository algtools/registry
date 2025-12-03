import { NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { join } from "path"

export async function GET() {
	try {
		const configPath = join(process.cwd(), "registries-config.json")
		const configContent = await readFile(configPath, "utf-8")
		const config = JSON.parse(configContent)
		return NextResponse.json(config)
	} catch (error) {
		return NextResponse.json(
			{ error: "Registries config not found" },
			{ status: 404 }
		)
	}
}

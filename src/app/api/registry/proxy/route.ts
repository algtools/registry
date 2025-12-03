import { NextResponse } from "next/server"

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const url = searchParams.get("url")

	if (!url) {
		return NextResponse.json(
			{ error: "URL parameter is required" },
			{ status: 400 }
		)
	}

	try {
		const response = await fetch(url, {
			headers: {
				"User-Agent": "shadcn-registry-browser/1.0",
			},
		})

		if (!response.ok) {
			return NextResponse.json(
				{ error: "Failed to fetch registry" },
				{ status: response.status }
			)
		}

		const data = await response.json()
		return NextResponse.json(data, {
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET",
			},
		})
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch registry" },
			{ status: 500 }
		)
	}
}

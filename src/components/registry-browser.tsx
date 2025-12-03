"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelloWorld } from "@/registry/new-york/blocks/hello-world/hello-world"

interface Registry {
	id: string
	name: string
	url: string
	registryUrl: string
	description: string
	enabled: boolean
}

interface RegistryItem {
	name: string
	type: string
	title: string
	description: string
}

export function RegistryBrowser() {
	const [registries, setRegistries] = React.useState<Registry[]>([])
	const [selectedRegistry, setSelectedRegistry] = React.useState<string | null>(null)
	const [items, setItems] = React.useState<RegistryItem[]>([])
	const [loading, setLoading] = React.useState(true)

	React.useEffect(() => {
		fetch("/api/registries")
			.then((res) => res.json())
			.then((data) => {
				setRegistries(data.registries || [])
				if (data.registries && data.registries.length > 0) {
					setSelectedRegistry(data.registries[0].id)
				}
			})
			.catch(console.error)
			.finally(() => setLoading(false))
	}, [])

	React.useEffect(() => {
		if (!selectedRegistry) return

		const registry = registries.find((r) => r.id === selectedRegistry)
		if (!registry) return

		// Use proxy for external registries to avoid CORS issues
		const isExternal =
			typeof window !== "undefined" &&
			registry.registryUrl.startsWith("http") &&
			!registry.registryUrl.startsWith(window.location.origin)
		const fetchUrl = isExternal
			? `/api/registry/proxy?url=${encodeURIComponent(registry.registryUrl)}`
			: registry.registryUrl

		fetch(fetchUrl)
			.then((res) => res.json())
			.then((data) => {
				setItems(data.items || [])
			})
			.catch(console.error)
	}, [selectedRegistry, registries])

	if (loading) {
		return <div className="p-8">Loading registries...</div>
	}

	return (
		<div className="max-w-7xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
			<header className="flex flex-col gap-1">
				<h1 className="text-3xl font-bold tracking-tight">Unified Registry Browser</h1>
				<p className="text-muted-foreground">
					Browse and use components from multiple shadcn registries
				</p>
			</header>

			<div className="flex gap-4 mb-4">
				{registries.map((registry) => (
					<Button
						key={registry.id}
						variant={selectedRegistry === registry.id ? "default" : "outline"}
						onClick={() => setSelectedRegistry(registry.id)}
					>
						{registry.name}
					</Button>
				))}
			</div>

			<main className="flex flex-col flex-1 gap-8">
				{items.map((item) => (
					<Card key={item.name} className="min-h-[450px]">
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle>{item.title}</CardTitle>
									<CardDescription>{item.description}</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<div className="flex items-center justify-center min-h-[400px] relative border rounded-lg p-4">
								{item.name === "hello-world" && <HelloWorld />}
								{item.name !== "hello-world" && (
									<p className="text-muted-foreground">
										Component preview not available
									</p>
								)}
							</div>
						</CardContent>
					</Card>
				))}

				{items.length === 0 && (
					<Card>
						<CardContent className="p-8">
							<p className="text-muted-foreground text-center">
								No components found in this registry
							</p>
						</CardContent>
					</Card>
				)}
			</main>
		</div>
	)
}

import React, { useState, useCallback } from 'react'
import { Box, Button, Card, Flex, Text, useToast, TextInput } from '@sanity/ui'
import { set, PatchEvent } from 'sanity'

export const GeopointInput = (props: any) => {
    const { onChange, value } = props
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const toast = useToast()

    const fetchCoordinates = useCallback(async () => {
        if (!searchQuery) return toast.push({ status: 'warning', title: 'Enter a city name first' })

        setLoading(true)
        try {
            // 1. Hit OpenStreetMap API (Free)
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`
            )
            const data = await response.json()

            if (data && data.length > 0) {
                // 2. Auto-save to Sanity
                onChange(PatchEvent.from(set({
                    _type: 'geopoint',
                    lat: parseFloat(data[0].lat),
                    lng: parseFloat(data[0].lon),
                    alt: 0
                })))
                toast.push({ status: 'success', title: `Found: ${data[0].display_name}` })
            } else {
                toast.push({ status: 'error', title: 'Location not found' })
            }
        } catch (err) {
            toast.push({ status: 'error', title: 'Fetch failed' })
        } finally {
            setLoading(false)
        }
    }, [searchQuery, onChange, toast])

    return (
        <Card border padding={3} radius={2}>
            <Flex direction="column" gap={3}>
                <Text size={1} weight="bold">Auto-Fetch Coordinates</Text>
                <Flex gap={2}>
                    <Box flex={1}>
                        <TextInput
                            placeholder="Type City (e.g. Dubai)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.currentTarget.value)}
                        />
                    </Box>
                    <Button
                        text={loading ? "Searching..." : "Fetch"}
                        onClick={fetchCoordinates}
                        tone="primary"
                        mode="ghost"
                    />
                </Flex>
                {/* Hides the default manual input but keeps the functionality */}
                <Box style={{ display: 'none' }}>{props.renderDefault(props)}</Box>
                {value && <Text size={1} muted>Saved: {value.lat}, {value.lng}</Text>}
            </Flex>
        </Card>
    )
}
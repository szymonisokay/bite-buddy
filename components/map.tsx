'use client'

import L, { Map as MapContainerType } from 'leaflet'
import { useEffect, useRef } from 'react'
import { Circle, MapContainer, Marker, TileLayer } from 'react-leaflet'

import { cn } from '@/lib/utils'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

import 'leaflet/dist/leaflet.css'
import { useTheme } from 'next-themes'

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
	iconUrl: markerIcon.src,
	iconRetinaUrl: markerIcon2x.src,
	shadowUrl: markerShadow.src,
})

interface Props {
	className?: string
	location: {
		latitude: number
		longitude: number
		deliveryRange: number
	}
}

export const Map = ({ className, location }: Props) => {
	const map = useRef<null | MapContainerType>(null)
	const { theme } = useTheme()

	const markerLocation = new L.LatLng(location.latitude, location.longitude)

	useEffect(() => {
		map.current?.setView(markerLocation)
	}, [markerLocation.lat, markerLocation.lng])

	return (
		<div className={cn(className)}>
			<MapContainer
				ref={map}
				className={cn('h-[300px] map-container', theme)}
				center={markerLocation}
				zoom={10}
				scrollWheelZoom
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				<Marker position={markerLocation} />
				<Circle
					center={markerLocation}
					radius={location.deliveryRange * 1000}
				/>
			</MapContainer>
		</div>
	)
}

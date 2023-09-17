'use client'

import L, { Map as MapContainerType } from 'leaflet'
import { useEffect, useRef } from 'react'
import { Circle, MapContainer, Marker, TileLayer } from 'react-leaflet'

import { cn } from '@/lib/utils'

import 'leaflet/dist/leaflet.css'

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

	const icon = L.icon({
		iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=%231a8986&size=small&iconType=material&scaleFactor=2&apiKey=${process.env.NEXT_PUBLIC_LEAFLET_ICON_MARKER_API_KEY}`,
		iconSize: [31, 46],
		iconAnchor: [15.5, 42],
		popupAnchor: [0, -45],
	})

	const markerLocation = new L.LatLng(location.latitude, location.longitude)

	useEffect(() => {
		map.current?.setView(markerLocation)
	}, [markerLocation.lat, markerLocation.lng])

	return (
		<div className={cn(className)}>
			<MapContainer
				ref={map}
				className='h-[300px]'
				center={markerLocation}
				zoom={10}
				scrollWheelZoom
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				<Marker position={markerLocation} icon={icon} />
				<Circle
					center={markerLocation}
					radius={location.deliveryRange * 1000}
					color='#1a8986'
				/>
			</MapContainer>
		</div>
	)
}

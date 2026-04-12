"use client"
import React, { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix default marker icons for webpack/next
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

interface LeafletMapProps {
  center: { lat: number; lon: number }
  zoom: number
  marker: { lat: number; lon: number } | null
  onMapClick: (_lat: number, _lon: number) => void
  className?: string
}

export default function LeafletMap({ center, zoom, marker, onMapClick, className }: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    const map = L.map(mapContainerRef.current, {
      center: [center.lat, center.lon],
      zoom,
      zoomControl: false,
    })

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
      maxZoom: 19,
    }).addTo(map)

    L.control.zoom({ position: "bottomleft" }).addTo(map)

    map.on("click", (e: L.LeafletMouseEvent) => {
      onMapClick(e.latlng.lat, e.latlng.lng)
    })

    mapRef.current = map

    // Ensure map renders correctly (fixes grey tiles on mount / modal animation)
    const t1 = setTimeout(() => map.invalidateSize(), 0)
    const t2 = setTimeout(() => map.invalidateSize(), 100)
    const t3 = setTimeout(() => map.invalidateSize(), 300)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      map.remove()
      mapRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keep click handler up to date
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    map.off("click")
    map.on("click", (e: L.LeafletMouseEvent) => {
      onMapClick(e.latlng.lat, e.latlng.lng)
    })
  }, [onMapClick])

  // Update center & zoom
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    map.setView([center.lat, center.lon], zoom, { animate: true })
  }, [center.lat, center.lon, zoom])

  // Update marker
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    if (markerRef.current) {
      map.removeLayer(markerRef.current)
      markerRef.current = null
    }

    if (marker) {
      markerRef.current = L.marker([marker.lat, marker.lon], { icon: defaultIcon }).addTo(map)
    }
  }, [marker])

  // Invalidate size when container resizes (e.g. modal open)
  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapContainerRef.current) return

    const observer = new ResizeObserver(() => {
      map.invalidateSize()
    })
    observer.observe(mapContainerRef.current)
    return () => observer.disconnect()
  }, [])

  return <div ref={mapContainerRef} className={className} style={{ cursor: "crosshair" }} />
}

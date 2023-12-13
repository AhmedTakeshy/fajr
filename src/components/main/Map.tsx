"use client"
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import Link from "next/link";
import { ImLocation } from "react-icons/im";

export default function MapPage() {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const [showPopup, setShowPopup] = useState<boolean>(true);
    const [viewState, setViewState] = useState({
        latitude: 33.30430739551274,
        longitude: 44.323928150187406,
        zoom: 16,
    })
    return (
        <div className="max-w-full flex justify-center lg:justify-end my-12 lg:my-0">
            <Map
                mapboxAccessToken={mapboxToken}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                {...viewState}
                style={{ width: 600, height: 450, borderRadius: "1rem" }}
                cursor="pointer"
                optimizeForTerrain={true}
                onZoom={(e) => setViewState(e.viewState)}
            >
                <Marker longitude={viewState.longitude} latitude={viewState.latitude} color="transparent" anchor="top">
                    <Link href="https://maps.app.goo.gl/fFC5S6ba6ABJiBuz6" target="_blank">
                        <ImLocation size={30} className="text-red-500" />
                    </Link>
                </Marker>
                <ImLocation size={30} className="text-red-500" />
                {showPopup && (
                    <Popup style={{ color: "black", fontWeight: "700", fontSize: "1.1rem", width: "8rem", padding: ".7rem", textAlign: "center" }} longitude={viewState.longitude} latitude={viewState.latitude}
                        offset={20}
                        anchor="top"
                        onClose={() => setShowPopup(false)}
                    >
                        شركة فجر بغداد
                    </Popup>)}
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
            </Map>
        </div>
    )
}

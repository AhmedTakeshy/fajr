"use client"
import Map, { Marker, Popup, NavigationControl, GeolocateControl, FullscreenControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import Link from "next/link";

export default function MapPage() {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const [showPopup, setShowPopup] = useState<boolean>(true);
    const viewState = {
        latitude: 33.30430739551274,
        longitude: 44.323928150187406,
        zoom: 12,
    }
    return (
        <div className="max-w-full mx-8 my-4">
            <Map
                mapboxAccessToken={mapboxToken}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                {...viewState}
                style={{ width: "100%", height: "100%", borderRadius: "8px" }}
            >
                <Link href=" https://maps.app.goo.gl/fFC5S6ba6ABJiBuz6" target="_blank">
                <Marker longitude={viewState.longitude} latitude={viewState.latitude} color="red" anchor="top"/>
                    {showPopup && (
                        <Popup style={{ color: "black", fontWeight: "700", fontSize: "1.1rem" }} longitude={viewState.longitude} latitude={viewState.latitude}
                            offset={25}
                            anchor="top"
                            onClose={() => setShowPopup(false)}>
                            شركة فجر بغداد
                        </Popup>)}
                </Link>
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
            </Map>
        </div>
    )
}

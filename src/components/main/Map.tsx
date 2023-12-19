"use client"
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MapPage() {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const [viewState, setViewState] = useState({
        latitude: 33.30430739551274,
        longitude: 44.323928150187406,
        zoom: 16,
    })


    const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 650)

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    const isMobile = width <= 600;

    // Remove the event listener on the mpa to prevent the page from going down to focus on the map

    return (
        <div className="flex justify-center my-12 xl:justify-end lg:my-0">
            <Map
                mapboxAccessToken={mapboxToken}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                {...viewState}
                style={{ width: `${isMobile ? "75%" : "100%"}`, height: 450, borderRadius: "1rem", padding: "1rem", maxWidth: "37.5rem" }}
                onZoom={(e) => setViewState(e.viewState)}
            >
                <Marker longitude={viewState.longitude} latitude={viewState.latitude} color="red" anchor="top" />
                {true && (
                    <Popup
                        style={{
                            color: "black",
                            fontWeight: "700",
                            fontSize: isMobile ? "0.9rem" : "1.1rem",
                            width: isMobile ? "9rem" : "15rem",
                            padding: isMobile ? "0.3rem" : ".7rem",
                            textAlign: "center",
                        }}
                        longitude={viewState.longitude}
                        latitude={viewState.latitude}
                        focusAfterOpen={false}
                        offset={20}
                        anchor="top"
                    >
                        بغداد نفق الشرطة شارع الكنيسة قرب كنيسة مار يوسف مجاور خياطة عامر العيساوي للدشاديش مقابل مصرف  بغداد / عمارة الرحمن الطابق ٣ الاخير.
                        <Link href="https://maps.app.goo.gl/fFC5S6ba6ABJiBuz6" target="_blank" className="text-cyan-600 hover:underline underline-offset-2">
                            <br />
                            اضغط هنا للتوجه للموقع
                        </Link>
                    </Popup>)}
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
            </Map>
        </div>
    )
}

"use client"
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
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
    const [width, setWidth] = useState<number>(global.innerWidth)

    const handleWindowResize = () => {
        setWidth(global.innerWidth);
    };

    useEffect(() => {
        global.addEventListener("resize", handleWindowResize);
        return () => global.removeEventListener("resize", handleWindowResize);
    }, []);

    const isMobile = width <= 768;

    return (
        <div className="md:max-w-full flex justify-center xl:justify-end my-12 lg:my-0">
            <Map
                mapboxAccessToken={mapboxToken}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                {...viewState}
                style={{ width: `${isMobile ? "75%" : "100%"}`, height: 450, borderRadius: "1rem", padding: "1rem" }}
                cursor="pointer"
                optimizeForTerrain={true}
                onZoom={(e) => setViewState(e.viewState)}
            >
                <Marker longitude={viewState.longitude} latitude={viewState.latitude} color="red" anchor="top"/>
                {showPopup && (
                    <Popup style={{ color: "black", fontWeight: "700", fontSize: "1.1rem", width: "15rem", padding: ".7rem", textAlign: "center" }} longitude={viewState.longitude} latitude={viewState.latitude}
                        offset={20}
                        anchor="top"
                    >
                        بغداد نفق الشرطة شارع الكنيسة قرب كنيسة مار يوسف مجاور خياطة عامر العيساوي للدشاديش مقابل مصرف  بغداد / عمارة الرحمن الطابق ٣ الاخير 
                        <Link href="https://maps.app.goo.gl/fFC5S6ba6ABJiBuz6" target="_blank" className="text-cyan-600 hover:underline underline-offset-2">
                            اضغط هنا للتوجه للموقع
                        </Link>
                        </Popup>)}
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
            </Map>
        </div>
    )
}

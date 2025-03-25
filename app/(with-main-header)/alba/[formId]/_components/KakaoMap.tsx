'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';

interface KakaoMapProps {
  lat: number;
  lng: number;
}

const KakaoMap = ({ lat, lng }: KakaoMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const initMap = () => {
    if (!mapContainerRef.current) return;

    const mapOptions = {
      center: new window.kakao.maps.LatLng(lat, lng),
      level: 3,
    };

    const map = new window.kakao.maps.Map(mapContainerRef.current, mapOptions);

    new window.kakao.maps.Marker({
      position: map.getCenter(),
      map,
    });
  };

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initMap();
    }
  }, [lat, lng]);

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services&autoload=false`}
        strategy="lazyOnload"
        onLoad={() => kakao.maps.load(initMap)}
      />
      <div ref={mapContainerRef} className="w-full h-full" />
    </>
  );
};

export default KakaoMap;

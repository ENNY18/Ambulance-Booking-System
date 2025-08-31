import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import LineString from 'ol/geom/LineString';

const OSMMap = () => {
  const mapRef = useRef();

  useEffect(() => {
    const startLonLat = [3.3792, 6.5244]; 
    const endLonLat = [3.45, 6.45];      
    const start = fromLonLat(startLonLat);
    const end = fromLonLat(endLonLat);

    
    const route = new LineString([start, end]);

   
    const redMarker = new Feature(new Point(start));
    redMarker.setStyle(
      new Style({
        image: new Icon({
          src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
          scale: 0.05,
        }),
      })
    );

    
    const destinationMarker = new Feature(new Point(end));
    destinationMarker.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 10,
          fill: new Fill({ color: 'rgba(0, 123, 255, 0.6)' }),
          stroke: new Stroke({ color: '#007bff', width: 2 }),
        }),
      })
    );

    const vectorSource = new VectorSource({
      features: [redMarker, destinationMarker],
    });

    const markerLayer = new VectorLayer({ source: vectorSource });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        markerLayer,
      ],
      view: new View({
        center: start,
        zoom: 13,
      }),
    });

    
    const totalSteps = 300;
    let currentStep = 0;

    const move = () => {
      if (currentStep >= totalSteps) return;
      const fraction = currentStep / totalSteps;
      const coordinate = route.getCoordinateAt(fraction);
      redMarker.setGeometry(new Point(coordinate));
      currentStep++;
      setTimeout(move, 1000); 
    };

    move();

    return () => map.setTarget(null);
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '1000px' }}></div>;
};

export default OSMMap;

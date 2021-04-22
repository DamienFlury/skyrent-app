import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Map = () => (
  <MapContainer center={[48.8566, 2.3522]} zoom={13} scrollWheelZoom={false} style={{height: '500px'}}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[48.8566, 2.3522]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
);

export default Map;

import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import * as stationData from "../../data/stationsData.json";
import { useHistory } from "react-router-dom";



function Map() {
  const history = useHistory();
  const login = () => history.push("/login");
  const [viewport, setViewport] = useState({
    latitude: 65.058108,
    longitude: 25.460917,
    height: '100vh',
    width: '100%',
    zoom: 11,
  });


  const [selectedStation, setselectedStation] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setselectedStation(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}

        mapboxApiAccessToken={process.env.MAP_BOX_TOKEN = "pk.eyJ1Ijoia29taHVzdGxhIiwiYSI6ImNrZzN3aGdlcjBlczcycG81NnlsZjdnYmcifQ.pPluRgXMNX6i5LFd0K3oNA"}
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {stationData.features.map(station => (

          <Marker
            key={station.properties.STATION_ID}
            latitude={station.geometry.coordinates[1]}
            longitude={station.geometry.coordinates[0]}
          >
            <div
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setselectedStation(station);
              }}
            >
              <img src="/gas-station.svg" alt="Station Icon" />
            </div>
          </Marker>
        ))}

        {selectedStation ? (

          <Popup className="popup-btn"
            latitude={selectedStation.geometry.coordinates[1]}
            longitude={selectedStation.geometry.coordinates[0]}
            onClose={() => {
              setselectedStation(null);
            }}
          >
            <div className="popup-info">
              <h3>{selectedStation.properties.NAME}</h3>
              <p>{selectedStation.properties.ADDRESS}{selectedStation.properties.DESCRIPTIO.map(plugs => <ul>{plugs}</ul>)}</p>
            </div>
          </Popup>

        ) : null}


        {selectedStation ? (
          <div className='sidebar'>

            <div className='heading'>
              <button onClick={login}>check In</button>
              <img src={selectedStation.properties.IMG} alt="img" />
            </div>

            <div className='sidebar-title'>
              <h3>{selectedStation.properties.NAME}</h3>
              <div><p>{selectedStation.properties.ADDRESS}</p>{selectedStation.properties.DESCRIPTIO.map(plugs => <ul>{plugs}</ul>)} <p className="sidebar-capacity">{selectedStation.properties.CAPACITY}</p></div>
            </div>

            <div className='sidebar-information'>
              <h4>Cost per minutes</h4>
              <p>{selectedStation.properties.PRICE}</p>
              <h4>Amenities</h4>
              <p>{selectedStation.properties.FACILITY}</p>
              <h4>Hours</h4>
              <p>{selectedStation.properties.HOURS}</p>
            </div>

            <div className="sidebar-plugs" >
              <h4>Plugs</h4>
              {selectedStation.properties.DESCRIPTIO.map(plugs => <ul>{plugs}</ul>)}
            </div>

          </div>
        ) : null}
      </ReactMapGL >
    </div>
  );
}


export default Map
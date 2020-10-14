import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import * as stationData from "../../data/stationsData.json";
import { useHistory } from "react-router-dom";


function Map() {
  const history = useHistory();
  const login = () => history.push("/login");
  const [viewport, setViewport] = useState({
    container: 'map',
    latitude: 65.058108,
    longitude: 25.460917,
    height: "100vh",
    width: "100%",
    zoom: 12,

  });

  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (

    <div >

      <ReactMapGL
        {...viewport}

        mapboxApiAccessToken={process.env.MAP_BOX_TOKEN = "pk.eyJ1Ijoia29taHVzdGxhIiwiYSI6ImNrZzN3aGdlcjBlczcycG81NnlsZjdnYmcifQ.pPluRgXMNX6i5LFd0K3oNA"}
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {stationData.features.map(park => (
          <Marker
            key={park.properties.PARK_ID}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
          >
            <div
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedPark(park);
              }}
            >
              <img src="/gas-station.svg" alt="Station Icon" />
            </div>
          </Marker>
        ))}

        {selectedPark ? (
          <Popup
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <div>
              <h3>{selectedPark.properties.NAME}</h3>
              <p>{selectedPark.properties.ADDRESS}{selectedPark.properties.DESCRIPTIO.map(plugs => <ul>{plugs}</ul>)}</p>
            </div>
          </Popup>
        ) : null}
        {selectedPark ? (
          <div className='sidebar'>

            <div className='heading'>
              <button onClick={login}>check In</button>
              <img src={selectedPark.properties.IMG} alt="image lost" />
            </div>

            <div className='title'>
              <h3>{selectedPark.properties.NAME}</h3>
              <div className="info"><p>{selectedPark.properties.ADDRESS}</p>{selectedPark.properties.DESCRIPTIO.map(plugs => <ul>{plugs}</ul>)} <p>{selectedPark.properties.CAPACITY}</p></div>
            </div>

            <div className='listings'>
              <h4>Cost per minutes</h4>
              <p className="list">{selectedPark.properties.PRICE}</p>
              <h4>Amenities</h4>
              <p className="list">{selectedPark.properties.FACILITY}</p>
              <h4>Hours</h4>
              <p className="list">{selectedPark.properties.HOURS}</p>
            </div>

            <div className="plugs" >
              <h4>Plugs</h4>
              {selectedPark.properties.DESCRIPTIO.map(plugs => <ul>{plugs}</ul>)}
            </div>

          </div>
        ) : null}

      </ReactMapGL>

    </div >

  );
}


export default Map
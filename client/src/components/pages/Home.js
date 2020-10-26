import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import * as stationData from "../../data/stationsData.json";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";



function Map() {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  const login = () => history.push("/login");

  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  let minutes = Math.floor(seconds / 60);
  let cost = useState(0);

  useEffect(() => {
    // console.log('first render', seconds);

    if (isRunning) {
      const id = window.setInterval(() => {
        // console.log('tick', seconds);

        setSeconds(seconds => seconds + 1)
      }, 1000);
      return () => window.clearInterval(id)
    }
    return undefined;
  }, [isRunning]);



  const [viewport, setViewport] = useState({
    latitude: 65.058108,
    longitude: 25.460917,
    height: '100vh',
    width: '100%',
    zoom: 11,
  });


  const [selectedStation, setSelectedStation] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedStation(null);
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
        mapboxApiAccessToken={process.env.REACT_APP_TOKEN = "pk.eyJ1Ijoia29taHVzdGxhIiwiYSI6ImNrZzN3aGdlcjBlczcycG81NnlsZjdnYmcifQ.pPluRgXMNX6i5LFd0K3oNA"}
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {stationData.features.map(station => (

          <Marker
            key={station.properties.STAT_ID}
            latitude={station.geometry.coordinates[1]}
            longitude={station.geometry.coordinates[0]}
          >
            <div
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedStation(station);
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
              setSelectedStation(null);
            }}
          >
            <div className="popup-info">
              <h3>{selectedStation.properties.NAME}</h3>
              <p>{selectedStation.properties.ADDRESS}</p>
              {selectedStation.properties.DESCRIPTION.map(plugs => <p className="sidebar-capacity" key={plugs}> {plugs} </p>)
              }
              <p>{selectedStation.properties.PRICE} €/minute</p>
            </div>
          </Popup>

        ) : null}


        {selectedStation ? (

          < div className='sidebar'>

            <div className="btn">
              {userData.user ? (

                isRunning ? (<button className='heading' onClick={() => {
                  setIsRunning(false);
                  // console.log("cost is: " + cost);

                }}>Stop Charge</button>
                ) : (
                    <button className='heading' onClick={() => { setIsRunning(true); }}>Start Charge</button>
                  )


              ) : (
                  <button className='heading' onClick={login}>Charge</button>

                )}
            </div>

            <div className='heading'>
              <img src={selectedStation.properties.IMG} alt="img" />
            </div>

            <div className='sidebar-title'>
              <h3>{selectedStation.properties.NAME}</h3>
              <div>
                <p className="sidebar-capacity">{selectedStation.properties.ADDRESS}</p>
                <h4>Plugs types: </h4>
                {selectedStation.properties.DESCRIPTION.map(plugs => <p className="sidebar-capacity" key={plugs}> {plugs} </p>)
                }
                <h4>Electric Capacity: </h4>
                <p className="sidebar-capacity">{selectedStation.properties.CAPACITY}KW</p>
              </div>
            </div>

            <div className='sidebar-information'>
              <h4>Cost per minutes:</h4>
              <p>{selectedStation.properties.PRICE} €/minute</p>
              <h4>Amenities:</h4>
              <p>{selectedStation.properties.FACILITY}</p>
              <h4>Hours:</h4>
              <p>{selectedStation.properties.HOURS}</p>
            </div>

            <div className='sidebar-plugs' >
              <h3>Charging Status:</h3>
              <p className="sidebar-plug-p">Time of charging in Seconds:</p>
              <p className="sidebar-capacity">{seconds} Seconds </p>
              <p className="sidebar-plug-p">Price of Charging in Euro:</p>
              <p className="sidebar-capacity">{
                selectedStation.properties.PRICE === 0 ? (<>Free</>) : (cost = (minutes * selectedStation.properties.PRICE).toFixed(2))
              } € for {minutes} minutes </p>
            </div>
          </div>
        ) : null
        }
      </ReactMapGL >
    </div >
  );
}


export default Map
// import React from 'react';
// import {
//   GoogleMap,
//   useLoadScript,
//   Marker,
//   InfoWindow,
// } from "@react-google-maps/api";
// // import "@reach/combodox/styles.css";

// const libraries = ["places"];
// const mapContainerStyle = {
//   width: "100vw",
//   height: "100vh",
// };
// const center = {
//   lat: 65.012093,
//   lng: 25.465076,
// }


// function Map() {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//     libraries,
//   });
//   if (loadError) return "Error loading Google Maps"
//   if (!isLoaded) return "Loading google Maps"

//   return <div>
//     <GoogleMap mapContainerStyle={mapContainerStyle}
//       zoom={8}
//       center={center}
    
//     ></GoogleMap>
//   </div>
// };

// export default Map

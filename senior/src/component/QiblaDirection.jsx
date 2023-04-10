import React, { useState, useEffect } from "react";
import { Qibla } from "qibla";
import "./compass.css";
import "bootstrap/dist/css/bootstrap.min.css";

function QiblaDirection() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [qiblaDirection, setQiblaDirection] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      let qiblaFromTrueNorth = Qibla.degreesFromTrueNorth(latitude, longitude);
      setQiblaDirection(qiblaFromTrueNorth);
    }
  }, [latitude, longitude]);

  const compassStyle = {
    transform: `rotate(${360 - qiblaDirection}deg)`,
  };

  return (
    <div className="container-sm text-center ">
      <div className="qibla-direction">
        {latitude === null || longitude === null ? (
          <p>Fetching your location...</p>
        ) : (
          <>
            <div
              className="compass bg-light shadow-lg rounded-circle mx-auto"
              style={compassStyle}
            >
              <div className="needle bg-dark rounded-pill position-absolute top-0 start-50 translate-middle-x"></div>
            </div>
            <p className="qibla-direction__text mt-3">
              The Qibla direction from your location is {qiblaDirection}{" "}
              degrees.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default QiblaDirection;
import { useEffect, useState } from "react";
import "./App.css";
import MapComponent from "./components/MapComponent";
import checkIfValidIP from "./components/checkIP";
import LeftArrow from "./components/LeftArrow";

function App() {
  const [ipData, setIpData] = useState(null);
  const [ipAddress, setIpAddress] = useState("");
  const getInitialData = async () => {
    const response = await fetch("https://api.ipregistry.co", {
      method: "GET",
      headers: {
        Authorization: `ApiKey ${process.env.REACT_APP_IP_API_KEY}`,
      },
    });
    const data = await response.json();
    setIpData(data);
  };
  useEffect(() => {
    try {
      getInitialData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkIfValidIP(ipAddress)) {
      try {
        const getDataOnSearch = async () => {
          const response = await fetch(
            `https://api.ipregistry.co/${ipAddress}`,
            {
              method: "GET",
              headers: {
                Authorization: `ApiKey ${process.env.REACT_APP_IP_API_KEY}`,
              },
            }
          );
          const data = await response.json();
          if (data.ip) {
            setIpData(data);
          }
        };
        getDataOnSearch();
      } catch (error) {
        console.log(error);
      }
    } else if (checkIfValidIP(ipAddress) === "empty") {
      getInitialData();
    } else {
      alert("Invalid IP Address");
    }
  };
  return (
    <>
      <section>
        <article>
          <header>
            <h1>IP Address Tracker</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search for any IP address"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
              />
              <button type="submit">
                <LeftArrow></LeftArrow>
              </button>
            </form>
          </header>
          {ipData && (
            <div className="data">
              <div className="data-item">
                <h2>IP ADDRESS</h2>
                <p>{ipData.ip}</p>
                <span className="vl"></span>
              </div>
              <div className="data-item">
                <h2>LOCATION</h2>
                <p>
                  {ipData.location.country.name}, {ipData.location.city},{" "}
                  {ipData.postal}
                </p>
                <span className="vl"></span>
              </div>
              <div className="data-item">
                <h2>TIMEZONE</h2>
                <p>{ipData.time_zone.id}</p>
                <span className="vl"></span>
              </div>
              <div className="data-item">
                <h2>ISP</h2>
                <p>
                  {ipData.connection.organization},{ipData.connection.domain}
                </p>
              </div>
            </div>
          )}
        </article>

        <MapComponent data={ipData}></MapComponent>
      </section>
    </>
  );
}

export default App;

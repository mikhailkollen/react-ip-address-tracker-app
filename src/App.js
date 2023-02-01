import { useEffect, useState } from "react";
import "./App.css";
import MapComponent from "./components/MapComponent";

import LeftArrow from "./components/LeftArrow";
function App() {
  const [ipData, setIpData] = useState(null);
  const [ipAddress, setIpAddress] = useState("");
  // const [dataOnSearch, setDataOnSearch] = useState({});
  useEffect(() => {
    try {
      const getInitialData = async () => {
        const response = await fetch("http://ipwho.is/");
        const data = await response.json();
        setIpData(data);
      };
      getInitialData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const getDataOnSearch = async () => {
        const response = await fetch(`http://ipwho.is/${ipAddress}`);
        const data = await response.json();
        if (data.success) {
          setIpData(data);
        }
        setIpAddress("");
      };
      getDataOnSearch();
    } catch (error) {
      console.log(error);
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
                  {ipData.city}, {ipData.country}, {ipData.postal}
                </p>
                <span className="vl"></span>
              </div>
              <div className="data-item">
                <h2>TIMEZONE</h2>
                <p> UTC {ipData.timezone.utc}</p>
                <span className="vl"></span>
              </div>
              <div className="data-item">
                <h2>ISP</h2>
                <p>
                  {ipData.connection.isp},{ipData.connection.domain}
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

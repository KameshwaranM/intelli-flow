import React, { useEffect, useState } from "react";
import Logo from '../../../../Assets/Intellil-Flow-Logo.png';
// import { countryData } from "../Region/countryData";
import "../Region/index.css";
import { useParams } from "react-router-dom";
import { ImSpinner } from "react-icons/im";
import { URL_Language, URL_Region, URL_Select_Region, URL_TimeZone } from "../../API-URL";

const SetRegion = () => {
  const [loading, setLoading] = useState(false);
  const [consoleerror, setConsoleError] = useState("");
  const [selectedcountry, setSelectedCountry] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [timezones, setTimezones] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [countries, setCountries] = useState([]);

  const ids = useParams();
  const id = ids.id;

  const handleRegionSave = async () => {
    try {
      if (!selectedcountry || !selectedLanguage || !selectedTimezone) {
        const error = "Please select a value for each field";
        console.error(error);
        setConsoleError(error);
        setTimeout(() => {
          setConsoleError("");
        }, 3000);
        return;
      }
      setLoading(true);
      const data = {
        id,
        region: selectedcountry,
        TimeZone: selectedTimezone,
        Language: selectedLanguage,
      };
      const response = await fetch(URL_Select_Region, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Region saved successfully");
        window.location.href = "/Login";
      } else {
        const errorData = await response.json(); 
        console.error("Failed to save region:", errorData.message);
        setConsoleError(errorData.message);
        setTimeout(() => {
          setConsoleError("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      console.log( "res",error.response.data.message)
    } finally {
      setLoading(false);
    }
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleTimezoneChange = (event) => {
    setSelectedTimezone(event.target.value);
  };

  useEffect(() => {
    fetch(URL_TimeZone)
      .then((response) => response.json())
      .then((data) => {
        setTimezones(data.data);
      })
      .catch((error) => {
        console.error("Error fetching timezone data:", error);
      });
  }, []);

  useEffect(() => {
    fetch(URL_Language)
      .then((response) => response.json())
      .then((data) => {
        setLanguages(data.data);
      })
      .catch((error) => {
        console.error("Error fetching language data:", error);
      });
  }, []);

  useEffect(() => {
    fetch(URL_Region)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.data);
      })
      .catch((error) => {
        console.error("Error fetching region data:", error);
      });
  }, []);

  return (
    <>
      <div className="region-content">
        <header className="region-content-img">
          <img src={Logo} alt="Logo" />
        </header>

        <section className="region-content-sec1">
          <h4>Tell me where to store the data</h4>
          <p>
            The data center does not have to match your physical location. By
            selecting a non-US based data region, you will incur an additional
            $0.05 per GB ingested if you upgrade your plan to a paid plan.
          </p>
          <label>Data Region</label>
          <select onChange={handleCountryChange} value={selectedcountry}>
            <option value="" disabled>
              Select...
            </option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
          <label>Language</label>
          <select onChange={handleLanguageChange} value={selectedLanguage}>
            <option value="" disabled>
              Select...
            </option>
            {languages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
          <label>TimeZone</label>
          <select onChange={handleTimezoneChange} value={selectedTimezone}>
            <option value="" disabled>
              Select...
            </option>
            {timezones.map((timezone, index) => (
              <option key={index} value={timezone}>
                {timezone}
              </option>
            ))}
          </select>

          <button onClick={handleRegionSave}>
            {loading ? (
              <>
                Loading...
                <ImSpinner className="submit-spiner" />
              </>
            ) : (
              "Save"
            )}
          </button>
          <div style={{textAlign:"center",color:"red"}}>{consoleerror}</div>
        </section>
      </div>
    </>
  );
};

export default SetRegion;

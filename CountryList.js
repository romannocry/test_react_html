  
const { createElement, useState, useEffect, useRef } = React;
const render = ReactDOM.render;
const html = htm.bind(createElement);
import Country from './Country'

    //data service
    const getAllCountries = async () => {
      try {
      const response = await fetch(`https://restcountries.eu/rest/v2/all`);
      const responseCountries = await response.json();
      return responseCountries;
      } catch (err) {
      console.log(err);
      }
  };
  //Get countries component
  export default function CountryList() {

  const [countries, setCountries] = useState([]);
  const componentIsMounted = useRef(true);

  useEffect(() => {
      getAllCountries()
      .then(response => {
          if (componentIsMounted.current) {
          setCountries(response);
          }
      })
      .catch(err => {
          console.log(err);
      });
      return () => {
      componentIsMounted.current = false;
      };
  }, []);

      return html`
          <div className="countries-container">
              ${countries.map((country, index) => (
                  html`<${Country} country=${country} key=${index}/>`
              ))}
          </div>`;
  }


const { createElement, useState, useEffect, useRef } = React;
const render = ReactDOM.render;
const html = htm.bind(createElement);  

const Country = props => {
  const [countryState, setCountryState] = useState(props);
  console.log(countryState);
  return html`
    <div onClick=${() => alert('test')} >
      <p>
        <strong>Name:</strong>
        ${countryState.country.name}
      </p>
    </div>`;
};

export default Country;
//key=${countryState.props.key}
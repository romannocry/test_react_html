

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

<Router>
<div className="App">
<nav className="navbar navbar-expand navbar-dark bg-dark">

        <a href="?ClickCounter" className="navbar-brand">
          App
        </a>

        <div className="navbar-nav mr-auto">
          ${menu.map(item => html`<li className="nav-item"><Link to=${"?"+item.name} className="nav-link">${item.name}</Link></li>`)}
        </div>
      </nav>
<Home/>
</div>
<Switch>
${menu.map(item =>html`<Route exact path=${["?"+item.name]} component=${item.component} />`)}

</Switch>
</Router>
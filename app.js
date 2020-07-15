 
    const { createElement, useState, useEffect, useRef } = React;
    const render = ReactDOM.render;
    const html = htm.bind(createElement);
    import ClickCounter2 from './counter'
    import CountryList from './CountryList'
    //Menu
    




    function ClickCounter() {
      const [count, setCount] = useState(0);
      
      return html`
        
        <div>
          <button onClick=${() => setCount(count + 1)}>
            Clicked ${count} times
          </button>
        </div>
      `;
    }

    //Bottom of the tree function
    function App() {
      return html`<${ClickCounter}/><${CountryList}/>`
    }

    //Rendering
    render(html`<${App}/>`, document.getElementById("App"));
    
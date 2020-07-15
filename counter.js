 
    const { createElement, useState, useEffect, useRef } = React;
    const render = ReactDOM.render;
    const html = htm.bind(createElement);
    
    export default function ClickCounter2() {
      const [count, setCount] = useState(0);
      
      return html`
        
        <div>
          <button onClick=${() => setCount(count + 1)}>
            Clicked! ${count} times
          </button>
        </div>
      `;
    }
    
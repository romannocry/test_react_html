 
    const { createElement, useState, useEffect, useRef } = React;
    const { browserHistory, Router, Route, IndexRoute, Switch, Link } = ReactRouterDOM;
    //const { button, Tab, Tabs } = ReactBootstrap;
    const { Select } = reactDropdownSelect;
    const { Card } = ReactCardFlip;

    const render = ReactDOM.render;
    const html = htm.bind(createElement);

    //data service
    const getTeams = async () => {
      try {
      const response = await fetch(`teams.json`);
      const Teams = await response.json();
      //console.log(Teams);
      console.log("Getting teams from data service");
      return Teams;
      } catch (err) {
      console.log(err);
      }
    };
    
    //Get teams component
    function TeamList() {

    const [teams, setTeams] = useState([]);
    const componentIsMounted = useRef(true);
    console.log("loading Team List")
    useEffect(() => {
        getTeams()
        .then(response => {
            if (componentIsMounted.current) {
              setTeams(response);
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
        <table class="c-table">
        <thead class="c-table__head">
				<tr class="c-table__head-row">
					<th class="c-table__head-cell u-text--center">Place</th>
					<th class="c-table__head-cell">Driver</th>
					<th class="c-table__head-cell">Wins</th>
					<th class="c-table__head-cell u-text--right">Points</th>
				</tr>
			</thead>
			<tbody>
        ${teams.map((team, index) => (
          html`<${Team} team=${team} key=${index}/>`
      ))}
      </tbody>
      </table>
  `;
    }
  
    //Team Card component
    const Team = props => {
      const [teamState, setTeamState] = useState(props);
      return html`
      <tr class="c-table__row" onClick=${() => alert(teamState.index)}>
        <td class="c-table__cell c-table__cell--place u-text--center"><span class="c-place">test</span></td>
        <td class="c-table__cell c-table__cell--name">${teamState.team.name}<br/><small>Team Captain</small></td>
        <td class="c-table__cell c-table__cell--count"><small>1</small></td>
        <td class="c-table__cell c-table__cell--points u-text--right"><strong>22</strong></td>
      </tr>`;
    };
  
    //Actions
    
    const useInput = initialValue => {
      const [value, setValue] = useState(initialValue);
    
      return {
        value,
        setValue,
        reset: () => setValue(""),
        value,
        onChange: event => {
          setValue(event.target.value);
          console.log(event.target.value);
        },
      };
    };


    function CreateTeamForm(props) {
      const { value, onChange, reset } = useInput('YourTeamName');
      const [members, setMembers] = useState({});
      const options = [{"id":1,"value":"Roman","label":"Roman"},{"id":2,"value":"joe","label":"joe"},{"id":3,"value":"bengi","label":"bengi"},];
      console.log("loading Create Team form");

      const handleSubmit = (evt) => {
          evt.preventDefault();
          console.log("Creating team: ");
          console.log(value);
          console.log("with members: ");
          console.log(members);
          //  value="";
          setMembers("");
      }
 

      return html`
      <div class="card">
      <div class="card-body">

        <h5 class="card-title">Create a team</h5>
        <h6 class="card-subtitle mb-12 text-muted">Game on!</h6>
        
        
        <form onSubmit=${handleSubmit}>

        <div class="form-group">
          <label for="teamName">Team Name</label>
          <input type="text" class="form-control" id="teamName" aria-describedby="teamName" placeholder="${value}" onChange="${onChange}" required/>
          <small id="teamHelp" class="form-text text-muted">Better be a cool name.</small>
        </div>
        <div class="form-group">
          <label for="members">Members</label>
          <${Select}
          options=${options}
          values=${[]}
          required
          multi
          onChange=${(values) => setMembers(values)}
        />
        <!-- Switch with customized icons -->
        <div class="switch switch-square"
          data-on-label="<i class='fui-check'></i>"
          data-off-label="<i class='fui-cross'></i>">
          <input type="checkbox" />
        </div>
        <input type="checkbox" checked data-toggle="switch" />

        </div>

 
      <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      </div>
      </div>
        `;
    }

    function JoinTeamForm(props) {
      const { value, onChange, reset } = useInput('Team secret ID');
      console.log("loading Join Team");

      const handleSubmit = (evt) => {
          evt.preventDefault();
          alert(`Joining Team ${value}`);
          reset();
      }
      
      return html`
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Join a team</h5>
          <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <form onSubmit=${handleSubmit}>
          <label>
            Join a team:
            <input type="text" value="${value}" onChange="${onChange}" />
          </label>
          <input class="btn btn-default btn-wide" type="submit" value="Submit" />
        </form>
        <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
          </div>
          </div>
          `;
    }

    function AddMeToRandomTeam(props) {
      const { value, onChange, reset } = useInput('Team secret ID');
      console.log("loading AddMeToRandomTeam");
      const handleSubmit = (evt) => {
          evt.preventDefault();
          alert(`Joining Team ${value}`);
          reset();
      }
      
      return html`
        <div class="card">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <form onSubmit=${handleSubmit}>
              <label>
                Add me to a random team
                <input type="text" value="${value}" onChange="${onChange}" />
              </label>
              <input class="btn btn-default btn-wide" type="submit" value="Submit" />
            </form>
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
          </div>
          </div>


        `;
    }
    function ClickCounter() {
      const [count, setCount] = useState(0);
      console.log("loading counter");
      return html`
      <div>
      <section id=timeline>
      <h1>Rules & Timeline</h1>
      <p class="leader">All cards must be the same height and width for space calculations on large screens.</p>
      <div class="demo-card-wrapper">
        <div class="demo-card demo-card--step1">
          <div class="head">
            <div class="number-box">
              <span>01</span>
            </div>
            <h2><span class="small">Creating</span>Teams</h2>
          </div>
          <div class="body">
            <p>Create a team or request to join one</p>
          </div>
        </div>
    
        <div class="demo-card demo-card--step2">
          <div class="head">
            <div class="number-box">
              <span>02</span>
            </div>
            <h2><span class="small">Subtitle</span> Confidence</h2>
          </div>
          <div class="body">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta reiciendis deserunt doloribus consequatur, laudantium odio dolorum laboriosam.</p>
          </div>
        </div>
    
        <div class="demo-card demo-card--step3">
          <div class="head">
            <div class="number-box">
              <span>03</span>
            </div>
            <h2><span class="small">Subtitle</span> Adaptation</h2>
          </div>
          <div class="body">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta reiciendis deserunt doloribus consequatur, laudantium odio dolorum laboriosam.</p>
          </div>
        </div>
    
        <div class="demo-card demo-card--step4">
          <div class="head">
            <div class="number-box">
              <span>04</span>
            </div>
            <h2><span class="small">Subtitle</span> Consistency</h2>
          </div>
          <div class="body">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta reiciendis deserunt doloribus consequatur, laudantium odio dolorum laboriosam.</p>
          </div>
        </div>
    
        <div class="demo-card demo-card--step5">
          <div class="head">
            <div class="number-box">
              <span>05</span>
            </div>
            <h2><span class="small">Subtitle</span> Conversion</h2>
          </div>
          <div class="body">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta reiciendis deserunt doloribus consequatur, laudantium odio dolorum laboriosam.</p>
            <!--<img src="http://placehold.it/1000x500" alt="Graphic">-->
          </div>
        </div>
        
      </div>
    </section>
            <div>
          <button onClick=${() => setCount(count + 1)}>
            Clicked ${count} times
          </button>
        </div>
        </div>
      `;
    }

    //Bottom of the tree function
    function App() {
      
      let menuOptions = [{label:"Home",path:"nav-home",component:ClickCounter},
                        {label:"Create a team",path:"nav-create-team",component:CreateTeamForm},
                        {label:"Join a random team",path:"nav-join-random-team",component:AddMeToRandomTeam},
                        {label:"Leaderboard",path:"nav-leaderboard",component:TeamList}]

      const [active,setActive] = useState(menuOptions[0])
      
      const options = [{"id":1,"value":"Roman","label":"Roman"},{"id":2,"value":"joe","label":"joe"},{"id":3,"value":"bengi","label":"bengi"},];

      //console.log(active.path);
      return (html`
      <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
      <a className=${ active.path == 'nav-home' ? 'nav-item nav-link active': 'nav-item nav-link' } onClick="${() => setActive(menuOptions[0])}" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Home</a>
      <a className=${ active.path == 'nav-create-team' ? 'nav-item nav-link active': 'nav-item nav-link' } onClick="${() => setActive(menuOptions[1])}" id="nav-create-team-tab" data-toggle="tab" href="#nav-create-team" role="tab" aria-controls="nav-create-team" aria-selected="true">Create a team</a>
      <a className=${ active.path == 'nav-join-random-team' ? 'nav-item nav-link active': 'nav-item nav-link' } onClick="${() => setActive(menuOptions[2])}" id="nav-join-random-team-tab" data-toggle="tab" href="#nav-join-random-team" role="tab" aria-controls="nav-join-random-team" aria-selected="false">Join a random team</a>
      <a className=${ active.path == 'nav-leaderboard' ? 'nav-item nav-link active': 'nav-item nav-link' } onClick="${() => setActive(menuOptions[3])}" id="nav-leaderboard-tab" data-toggle="tab" href="#nav-leaderboard" role="tab" aria-controls="nav-leaderboard" aria-selected="false">Leader Board</a>
      </div>
    </nav>


    <div class="tab-content" id="nav-tabContent">  
      <div class="slider"><div class="indicator"></div></div>
      <div class="content-2">
            <section>
              <h2>${active.label}</h2>
              <${active.component}/>
            </section>   
      </div>
      </div>
      `
      )}

    //Rendering
    render(html`<${App}/>`, document.getElementById("App"));
    
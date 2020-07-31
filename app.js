 
    const { createElement, useState, useEffect, useRef } = React;
    const { browserHistory, Router, Route, IndexRoute, Switch, Link } = ReactRouterDOM;
    //const { button, Tab, Tabs } = ReactBootstrap;
    const { Select } = reactDropdownSelect;


    const render = ReactDOM.render;
    const html = htm.bind(createElement);

//Router
let menu =[{name:'CreateTeamForm',component:CreateTeamForm},{name:'JoinTeamForm',component:JoinTeamForm},{name:'ClickCounter',component:ClickCounter}]



    //data service
    const getTeams = async () => {
      try {
      const response = await fetch(`teams.json`);
      const Teams = await response.json();
      console.log(Teams);
      return Teams;
      } catch (err) {
      console.log(err);
      }
    };
    
    //Get teams component
    function TeamList() {

    const [teams, setTeams] = useState([]);
    const componentIsMounted = useRef(true);
  
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
            <div className="team-container">
                ${teams.map((team, index) => (
                    html`<${Team} team=${team} key=${index}/>`
                ))}
            </div>`;
    }
  
    //Team Card component
    const Team = props => {
      const [teamState, setTeamState] = useState(props);
      console.log(teamState);
      return html`
        <div onClick=${() => alert(teamState.team.joinID)} >
          <p>
            <strong>Name:</strong>
            ${teamState.team.name}
          </p>
        </div>`;
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

      const handleSubmit = (evt) => {
          evt.preventDefault();
          console.log("Creating team: ");
          console.log(value);
          console.log("with members: ");
          console.log(members);
          //  value="";
          setMembers("");
      }
      
      const onChange2 = event =>{
        console.log(event);
      }

      return html`
      <div class="card">
      <div class="card-body">

        <h5 class="card-title">Create a team</h5>
        <h6 class="card-subtitle mb-12 text-muted">Game on!</h6>
        
        
        <form onSubmit=${handleSubmit}>

        <div class="form-group">
          <label for="teamName">Team Name</label>
          <input type="text" class="form-control" id="teamName" aria-describedby="teamName" placeholder="${value}" onChange="${onChange}"/>
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
        </div>

 
      <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      </div>
      </div>
        `;
    }

    function JoinTeamForm(props) {
      const { value, onChange, reset } = useInput('Team secret ID');
      
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
          <button onClick=${() => setCount(count + 1)}>
            Clicked ${count} times
          </button>
        </div>
      `;
    }

    function Menu(){
      
      const [active,setActive] = useState({"label":"nav-home"})
      
      return html`
        
      <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <a className=${ active.label == 'nav-home' ? 'nav-item nav-link active': 'nav-item nav-link' } onClick="${() => setActive({"label":"nav-home"})}" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Home</a>
        <a className=${ active.label == 'nav-profile' ? 'nav-item nav-link active': 'nav-item nav-link' } onClick="${() => setActive({"label":"nav-profile"})}" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</a>
        <a className=${ active.label == 'nav-contact' ? 'nav-item nav-link active': 'nav-item nav-link' } onClick="${() => setActive({"label":"nav-contact"})}" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</a>
      </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
     
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

      const onChange2 = event =>{
        console.log(event);
      }
      console.log(active.path);
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
    
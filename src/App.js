import React, { Component, useState } from 'react';
import './App.css';
import './styles/styles.css';
import Typewriter from "typewriter-effect";



function App() {
  // functionable constants
  const [page, setPage] = useState('dashboard');
  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  // Movie Database Constant
  const movies = [
    {
        name: "Free Guy", 
        description: "A bank teller discovers that he's actually an NPC inside a brutal, open world video game.",
        rating: "7.3/10"
    },
    {
        name: "Shang-Chi and the Legend of the Ten Rings", 
        description: "Shang-Chi, the master of weaponry-based Kung Fu, is forced to confront his past after being drawn into the Ten Rings organization.",
        rating: "7.9/10"
    },
    {
        name: "Iron Man", 
        description: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
        rating: "7.9/10"
    },
    {
      name: "Ant-Man", 
      description: "Armed with a super-suit with the astonishing ability to shrink in scale but increase in strength, cat burglar Scott Lang must embrace his inner hero and help his mentor, Dr. Hank Pym, pull off a plan that will save the world.",
      rating: "7.3/10"
    },
    {
      name: "Doctor Strange", 
      description: "While on a journey of physical and spiritual healing, a brilliant neurosurgeon is drawn into the world of the mystic arts.",
      rating: "7.5/10"
    },
    {
      name: "Jungle Cruise", 
      description: "Based on Disneyland's theme park ride where a small riverboat takes a group of travelers through a jungle filled with dangerous animals and reptiles but with a supernatural element.",
      rating: "6.6/10"
    },
    {
      name: "Thor", 
      description: "The powerful but arrogant god Thor is cast out of Asgard to live amongst humans in Midgard (Earth), where he soon becomes one of their finest defenders.",
      rating: "7.0/10"
    },
    {
      name: "The Suicide Squad", 
      description: "Supervillains Harley Quinn, Bloodsport, Peacemaker and a collection of nutty cons at Belle Reve prison join the super-secret, super-shady Task Force X as they are dropped off at the remote, enemy-infused island of Corto Maltese.",
      rating: "7.3/10"
    },
    {
      name: "Black Widow", 
      description: "Natasha Romanoff confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises.",
      rating: "6.8/10"
    },
    {
      name: "The Dark Knight", 
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      rating: "9.0/10"
    }
  ]
  
  // Wishlist Constant
  const wishList = [];

  // Add to Wishlist
  function add(data){
    wishList.push(data);
  }
  
  // Search Movies
  function listing(database, query){
    function getTitle(data, mvname){
      var temp = new RegExp(mvname, "i")
      let matched = []
      for(let i = 0 ; i < 10; i++){
        var result = data[i].name.match(temp);
        if(result != null){
          matched.push(i);
        }
      }
      return matched;
    }
    let matches =[]
    if (query == "all") {
      for (let i = 0; i < database.length; i++){
        matches.push(i)
      }
    }
    else {
      matches = getTitle(database, query)
    }

    const table = (
    <table>
      <tr>
        <td>Movie Name</td>
        <td>Rating</td>
        <td>Description</td>
        <td>Details</td>
        <td>Actions</td>
      </tr>
      
      {matches.map((match) =>
        <tr>
          <td id={"Name-" + match}>{database[match].name}</td>
          <td id={"Rating-" + match}>{database[match].rating}</td>
          <td id={"Description-" + match}>{database[match].description}</td>
          <td><a onClick={() => navigateTo('details')}>Details</a></td>
          <td><a onClick={() => add(database[match])}>Add to Wishlist</a></td>
        </tr>
      )}
      </table>
    )
    return table
  }
  
  class SearchForm extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event){
      this.setState(
        {value: event.target.value}
      );
    }
  
    handleSubmit(event){
      event.preventDefault();
      const result = listing(this.state.value);
      this.props.containerContent(result);
    }
  
    render() {
      return(
      <div className="search-box" action="">
            <h2 style={{'text-align': 'center' }}> Search a Movie</h2>
            <form onSubmit={this.handleSubmit}>
                <input type="text" id="movieName" autocomplete="off" placeholder="Enter a Movie Name" onChange={this.handleChange} value={this.state.value}/>
                <button type="submit" id="searchb" value="submit">Search</button>
            </form>
      </div>
      );
    }
  }
  
  class Result extends React.Component{
    render() {
      return(
        this.props.content
      );
    }
  }
  
  class Container extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        value: '',
        content: listing(movies, "all") 
      };
    }
  
    changeHandler = (result) => {
      this.setState({
        content: result
      })
    }
  
    render() {
      return (
        <div className="wrapper">
          <SearchForm containerContent = {this.changeHandler} />
          <Result content = {this.state.content}/>
        </div>
      )
    }
  }

  class ContainerWishlist extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        value: '',
        content: listing(wishList, "all") 
      };
    }
  
    changeHandler = (result) => {
      this.setState({
        content: result
      })
    }
  
    render() {
      return (
        <div className="wrapper">
          <SearchForm containerContent = {this.changeHandler} />
          <Result content = {this.state.content}/>
        </div>
      )
    }
  }
  
  //Dashboard
  const renderDashboard = () => (
    <>
      <div className="navigation-wrapper">
            <ul className="nav-ul">
                <li className="active"><a onClick={() => navigateTo('dashboard')}>Welcome User</a></li>
                <li className="menu"><a onClick={() => navigateTo('search')}>Search a Movie</a></li>
                <li className="menu"><a onClick={() => navigateTo ('wishlist')}>Wishlist ({wishList.length})</a></li>
            </ul>
        </div>
        <br />
        <div className = "App">
          <Typewriter
            options = {{
              strings: ["Welcome to Movie Database", "Made by: Nicholas Sidharta", "GDSC ITB Front-end Framework", "Enjoy!"],
              delay: 100,
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      <br />
      <footer>
        Copyright &copy; Movie Database - GDSC ITB 2021 - Nicholas Sidharta - 597
      </footer>
    </>
  );

  //Search Movie
  const renderSearch = () => (
    <>
      <div className="navigation-wrapper">
          <ul className="nav-ul">
              <li className="active"><a onClick={() => navigateTo('dashboard')}>Welcome User</a></li>
              <li className="menu"><a onClick={() => navigateTo('search')}>Search a Movie</a></li>
              <li className="menu"><a onClick={() => navigateTo ('wishlist')}>Wishlist ({wishList.length})</a></li>
          </ul>
      </div>
      <br />
      <br />
      <Container />
      <br />
      <br />
      <footer>
          Copyright &copy; Movie Database - GDSC ITB 2021 - Nicholas Sidharta - 597
      </footer>
    </>
  );

  //Wishlist
  const renderWishlist = () => (
    <>
      <div className="navigation-wrapper">
          <ul className="nav-ul">
              <li className="active"><a onClick={() => navigateTo('dashboard')}>Welcome User</a></li>
              <li className="menu"><a onClick={() => navigateTo('search')}>Search a Movie</a></li>
              <li className="menu"><a onClick={() => navigateTo ('wishlist')}>Wishlist ({wishList.length})</a></li>
          </ul>
      </div>
      <br />
      <br />
      <ContainerWishlist />
      <br />
      <br />
      <footer>
          Copyright &copy; Movie Database - GDSC ITB 2021 - Nicholas Sidharta - 597
      </footer>
    </>
  );

  const renderDetails = () => (
    <>
      <div>
        <div className="navigation-wrapper">
            <ul className="nav-ul">
              <li className="active"><a onClick={() => navigateTo('dashboard')}>Welcome User</a></li>
              <li className="menu"><a onClick={() => navigateTo('search')}>Search a Movie</a></li>
              <li className="menu"><a onClick={() => navigateTo ('wishlist')}>Wishlist ({wishList.length})</a></li>
            </ul>
        </div>
        <br />
        <Container />
      </div>
      <br />
      <br />
      <footer>
          Copyright &copy; Movie Database - GDSC ITB 2021 - Nicholas Sidharta - 597
      </footer>
    </>
    );

  //recall page
  return (
    <div className = "main">
      {page === 'dashboard' && renderDashboard()}
      {page === 'search' && renderSearch()}
      {page === 'wishlist' && renderWishlist()}
      {page === 'details' && renderDetails()}  
    </div>
  );
}
export default App;
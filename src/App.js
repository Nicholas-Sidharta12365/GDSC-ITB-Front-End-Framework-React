import React, { Component, useState } from 'react';
import './App.css';
import './styles/styles.css';
import Typewriter from "typewriter-effect";

// Wishlist Constant
const wishList = [];
let movieIndexSelected = -1;

function App() {
  // functionable constants
  const [page, setPage] = useState('dashboard');
  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  
  // Movie Database Constant
  const movies = [
    {
      id: 0,
      name: "Free Guy", 
      description: "A bank teller discovers that he's actually an NPC inside a brutal, open world video game.",
      rating: "7.3/10"
    },
    {
      id: 1,
      name: "Shang-Chi and the Legend of the Ten Rings", 
      description: "Shang-Chi, the master of weaponry-based Kung Fu, is forced to confront his past after being drawn into the Ten Rings organization.",
      rating: "7.9/10"
    },
    {
      id: 2,
      name: "Iron Man", 
      description: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
      rating: "7.9/10"
    },
    {
      id: 3,
      name: "Ant-Man", 
      description: "Armed with a super-suit with the astonishing ability to shrink in scale but increase in strength, cat burglar Scott Lang must embrace his inner hero and help his mentor, Dr. Hank Pym, pull off a plan that will save the world.",
      rating: "7.3/10"
    },
    {
      id: 4,
      name: "Doctor Strange", 
      description: "While on a journey of physical and spiritual healing, a brilliant neurosurgeon is drawn into the world of the mystic arts.",
      rating: "7.5/10"
    },
    {
      id: 5,
      name: "Jungle Cruise", 
      description: "Based on Disneyland's theme park ride where a small riverboat takes a group of travelers through a jungle filled with dangerous animals and reptiles but with a supernatural element.",
      rating: "6.6/10"
    },
    {
      id: 6,
      name: "Thor", 
      description: "The powerful but arrogant god Thor is cast out of Asgard to live amongst humans in Midgard (Earth), where he soon becomes one of their finest defenders.",
      rating: "7.0/10"
    },
    {
      id: 7,
      name: "The Suicide Squad", 
      description: "Supervillains Harley Quinn, Bloodsport, Peacemaker and a collection of nutty cons at Belle Reve prison join the super-secret, super-shady Task Force X as they are dropped off at the remote, enemy-infused island of Corto Maltese.",
      rating: "7.3/10"
    },
    {
      id: 8,
      name: "Black Widow", 
      description: "Natasha Romanoff confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises.",
      rating: "6.8/10"
    },
    {
      id: 9,
      name: "The Dark Knight", 
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      rating: "9.0/10"
    }
  ]

  // Add to Wishlist
  function add(data, id){
    var status = true;
    for(let i = 0; i < wishList.length; i++){
      if(id == wishList[i].id){
        status = false;
        break;
      }
    }
    if(status == true){
      wishList.push(data);
      navigateTo('wishlist');
    }
    else{
      alert("Movie has been added!");
    }
  }
  
  // Remove from Wishlist
  function remove(data){
    for (let i = 0; i < wishList.length; i++){
      if (wishList[i].id == data) {
        wishList.splice(i, 1);
        break;
      }
    }
    navigateTo('search');
  }

  // Search Movies
  function listing(database, query){
    function getTitle(data, mvname){
      var temp = new RegExp(mvname, "i")
      let matched = []
      for(let i = 0 ; i < data.length; i++){
        let movieName = data[i].name;
        var result = movieName.match(temp);
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
        <td>Add</td>
        <td>Remove</td>
      </tr>
        {matches.map((match) =>
          <tr>
            <td id={"Name-" + match}>{database[match].name}</td>
            <td id={"Rating-" + match}>{database[match].rating}</td>
            <td id={"Description-" + match}>{database[match].description}</td>
            <td><a className="ref" onClick={() => {movieIndexSelected = match; navigateTo('details')}}>Details</a></td>
            <td><a className="ref" onClick={() => add(database[match], match)}>Add to Wishlist</a></td>
            <td><a className="ref" onClick={() => remove(database[match].id)}>Remove from Wishlist</a></td>
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
      const result = listing(movies, this.state.value);
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
          <Result content = {this.state.content}/>
        </div>
      )
    }
  }
  
  class ContainerDetails extends React.Component {
    constructor(props){
      super(props);
      this.imgPath = './img/'+ movies[movieIndexSelected].name +'.jpg'
    }

    render() {
      return(
        <div className="details">
          <h2 style={{'text-align': 'center'}}> {movies[movieIndexSelected].name} </h2>
          
          <img src={this.imgPath}></img>

          <p id="movied">{movies[movieIndexSelected].description}</p>
          <h4>Rating</h4>
          <p id="movier">{movies[movieIndexSelected].rating}</p>
          <p><a onClick = {() => navigateTo('dashboard')} class="back">Back</a></p>
        </div>
      )
    }
  }
  class WishlistCount extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        count: wishList.length
      };
    }
    
    countChange() {
      this.setState({
        count: wishList.length
      })
    }

    render() {
      return this.state.count
    }
  }

  //Dashboard
  const renderDashboard = () => (
    <>
      <div className="navigation-wrapper">
            <ul className="nav-ul">
                <li className="active"><a onClick={() => navigateTo('dashboard')}>Welcome User</a></li>
                <li className="menu"><a onClick={() => navigateTo('search')}>Search a Movie</a></li>
                <li className="menu"><a onClick={() => navigateTo ('wishlist')}>Wishlist (<WishlistCount />)</a></li>
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
      <div className="search-box"><h3>Your Wishlist</h3></div>
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
        <ContainerDetails />
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
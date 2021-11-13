import { useState } from 'react';
import './App.css';
import './styles/styles.css';

function App() {
  //functionable constants
  const [page, setPage] = useState('dashboard');
  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  //movie list
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

  //Dashboard
  const renderDashboard = () => (
    typewritter(),
    <>
      <div className="navigation-wrapper">
            <ul className="nav-ul">
                <li className="active"><a onClick={() => navigateTo('dashboard')}>Welcome User</a></li>
                <li className="menu"><a onClick={() => navigateTo('search')}>Search a Movie</a></li>
            </ul>
        </div>
        <br />
        <h1>Welcome to Movie Database</h1>
      <br />
      <footer>
        Copyright &copy; Movie Database - GDSC ITB 2021 - Nicholas Sidharta - 597
      </footer>
    </>
  );

  //Search Movie
  const renderSearch = () => (
    listing(),
    <>
      <div className="navigation-wrapper">
          <ul className="nav-ul">
              <li className="active"><a onClick={() => navigateTo('dashboard')}>Welcome User</a></li>
              <li className="menu"><a onClick={() => navigateTo('search')}>Search a Movie</a></li>
          </ul>
      </div>
      <br />
      <br />
      <div className="search-box">
          <h2 style={{'text-align': 'center' }}> Search a Movie</h2>
          <form>
              <input type="text" id="movieName" autocomplete="off" placeholder="Enter a Movie Name" />
              <button type="button" id="searchb">Search</button>
              <button type="reset">Reset</button>
          </form>
      </div>
      <div className="container" id="containers"></div>
      <br />
      <footer>
          Copyright &copy; Movie Database - GDSC ITB 2021 - Nicholas Sidharta - 597
      </footer>
    </>
  );

  //Wishlist
  const renderWishlist = () => (
    <>
      
    </>
  );

  function typewritter(){
    //typewritter effect
    document.addEventListener('DOMContentLoaded',function(event){
      // array with texts to type in typewriter
      var dataText = [ "Welcome to Movie Database", "Created by: Nicholas Sidharta", "GDSC ITB Workshop Front-End", "Enjoy!"];

      // type one text in the typwriter
      // keeps calling itself until the text is finished
      function typeWriter(text, i, fnCallback) {
        // check if text isn't finished yet
        if (i < (text.length)) {
          // add next character to h1
        document.querySelector("h1").innerHTML = text.substring(0, i+1) +'<span class="type-span" aria-hidden="true"></span>';

          // wait for a while and call this function again for next character
          setTimeout(function() {
            typeWriter(text, i + 1, fnCallback)
          }, 100);
        }
        // text finished, call callback if there is a callback function
        else if (typeof fnCallback == 'function') {
          // call callback after timeout
          setTimeout(fnCallback, 1000);
        }
      }
      // start a typewriter animation for a text in the dataText array
      function StartTextAnimation(i) {
        if (typeof dataText[i] == 'undefined'){
            setTimeout(function() {
              StartTextAnimation(0);
            }, 1000);
        }
        // check if dataText[i] exists
        else if (i < dataText[i].length) {
          // text exists! start typewriter animation
          typeWriter(dataText[i], 0, function(){
          // after callback (and whole text has been animated), start next text
          StartTextAnimation(i + 1);
        });
        }
      }
      // start the text animation
      StartTextAnimation(0);
      }
    );
  }
  
  function listing(){
    var table = "<table>"+
      "<tr>"+
          "<th>Name</th>"+
          "<th>Rating</th>"+
          "<th>Description</th>"+
          "<th>Details</th>"+
      "</tr>";

    for(let i = 0 ; i < 10; i++){
      table = table + "<tr>"+
          "<td id='Name"+i+"'>"+movies[i].name+"</td>"+
          "<td id='Rating"+i+"'>"+movies[i].rating+"</td>"+
          "<td id='Description"+i+"'>"+movies[i].description+"</td>"+
          "<td><a href='details.html?id=" + i + "'class='a-details'>details</a></td>"+
      "</tr>";
    }
    table = table + "</table>";

    document.getElementById("containers").innerHTML = table;

    function getTitle(mvname){
      var temp = new RegExp(mvname, "i")
      let matched = []
      for(let i = 0 ; i < 10; i++){
        var result = movies[i].name.match(temp);
        if(result != null){
          matched.push(i);
        }
      }
      return matched;
    }

    document.getElementById("searchb").addEventListener("click", function(){
      let match = getTitle(document.getElementById("movieName").value)
      var table = "<table>"+
        "<tr>"+
            "<th>Name</th>"+
            "<th>Rating</th>"+
            "<th>Description</th>"+
            "<th>Details</th>"+
        "</tr>";

      for(let i = 0 ; i < match.length; i++){
        table = table + "<tr>"+
            "<td id='Name"+match[i]+"'>"+movies[match[i]].name+"</td>"+
            "<td id='Rating"+match[i]+"'>"+movies[match[i]].rating+"</td>"+
            "<td id='Description"+match[i]+"'>"+movies[match[i]].description+"</td>"+
            "<td><a href='details.html?id=" + match[i] + "'class='a-details'>details</a></td>"+
        "</tr>";
      }
    table = table + "</table>";

    document.getElementById("containers").innerHTML = table;
    });
  }

  //recall page
  return (
    <div className = "main">
      {page === 'dashboard' && renderDashboard()}
      {page === 'search' && renderSearch()}
      {page === 'wishlist' && renderWishlist()}  
    </div>
  );
}
export default App;

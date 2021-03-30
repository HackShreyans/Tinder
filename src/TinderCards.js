import { SwipeableDrawer } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import TinderCards from "react-tinder-card";
import "./TinderrCards.css";

function TinderoCards() {
  const [people, setpeople] = useState([]);

  //apicode
  //onLoad
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch("http://localhost:5001/tinder/cards", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result) {
          setpeople(result);
        }
      })
      .catch(error => console.log("error", error));
  }, []);

  const Swiped = (direction, nameToDelete) => {
    console.log("removing:" + nameToDelete);
    // setLastDirection(direction);
  };
  const outOfFrame = name => {
    console.log(name + "left the screen!");
  };

  return (
    <div className="tinderCards">
      <div className="tindercards__cardContainer">
        {people.map(person => (
          <TinderCards
            className="swipe"
            key={person.name}
            preventSwipe={["up", "down"]}
            onSwipe={dir => Swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name)}
          >
            <div
              style={{ backgroundImage: `url(${person.imgUrl})` }}
              className="card"
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCards>
        ))}
      </div>
    </div>
  );
}

export default TinderoCards;

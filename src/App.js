import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props, context) {
    super(props, context);

    // CONSTANTS
    this.SUITS = ['♣', '♠', '♥', '♦'];
    this.NUMBERS = ['3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace', '2']; // TODO: more proper term other than NUMBERS?

    // STATE
    this.state = {
      playerCards: []
    };
  }

  shuffleCards() {
    var shuffledCards = [];
    var playerCards = [[], [], [], []];

    while (shuffledCards.length < 52) {
      var r = Math.floor(Math.random() * 52);
      if (shuffledCards.indexOf(r) === -1) {
        playerCards[shuffledCards.length % 4].push(r);
        shuffledCards.push(r);
      }
    }

    playerCards.forEach((player) => {
      player.forEach((card) => {
        var num = Math.floor(card / 4), suit = card % 4;
        console.log(`[${card}] ${this.NUMBERS[num]} ${this.SUITS[suit]}`);
      });
      console.log('\n\n');
    });

    this.setState({
      playerCards: [...playerCards]
    });
  }

  componentDidMount() {
    this.shuffleCards();
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default App;

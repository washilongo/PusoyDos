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
      test: 0,
      playerCards: [],
      cardStats: [] // TODO: use typescript? ICardStat { SuitCount: [], NumberCount: [] }
    };
  }

  getSuit(card) {
    return card % 4;
  }

  getNumber(card) {
    return Math.floor(card / 4);
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

    this.setState({
      playerCards: [...playerCards],
      // test: 1
    }, () => { this.checkCombinations() });
  }

  checkCombinations() {
    console.log('checkCombinations() ', this.state);
    this.setCardStats();
  }

  setCardStats() {
    var cardStats = [{}, {}, {}, {}];

    this.state.playerCards.forEach((player, i) => {
      console.log('setCardStats(), player ', i);
      var stats = {
        suitCount: [0, 0, 0, 0],
        numCount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      };
      player.forEach((card) => {
        var suit = this.getSuit(card), num = this.getNumber(card);
        stats.suitCount[suit]++;
        stats.numCount[num]++;
      });

      console.log(stats);
      cardStats[i] = stats;
    });

    this.setState({ cardStats: [...cardStats] });
  }

  componentDidMount() {
    this.shuffleCards();
  }

  render() {
    const players = this.state.playerCards.map((player, i) => {

      const cards = player.map((card) => {
        var num = this.getNumber(card), suit = this.getSuit(card);
        return (
          <div key={`card${card}`} className="col-md-4">
            <h4 style={{ color: suit > 1 ? 'red' : 'black' }}>{`[${card}] ${this.NUMBERS[num]} ${this.SUITS[suit]}`}</h4>
          </div>
        );
      });

      return (
        <div key={i} className="col-md-6" style={{ padding: '50px' }}>
          <h3>{`Player ${i + 1}`}</h3>
          {cards}
        </div>
      );
    });

    return (
      <div>
        {players}
      </div>
    );
  }
}

export default App;

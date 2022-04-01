import { v4 } from "uuid";

// Written in .ts for learning purposes. Transpiled into --target es2022.

interface Player {
  id: number | string,
  display_name: string,
  handedness?: "L" | "R",
  gender?: "M" | "F", 
}

interface Game {
  id: number,
  session_id: number,
  time_created: string,
  game_status: string,
  selected_by_player_id: number,
  time_started: string,
  pairA: Array<Player>,
  pairB: Array<Player>,
  winners: Array<Player>,
  losers: Array<Player>, 
  win_score: number,
  lose_score: number,
}

// Game class aims to abstract manipulations to game state away from app component logic.
class Game {
  constructor (props) {
    this.id = props.id || v4();
    this.session_id = props.session_id;
    this.time_created = props.time_created || new Date().toJSON();
    this.game_status = props.game_status || "pending";
    this.selected_by_player_id = props.selected_by_player_id || this.getValidPlayerId(props.select_id);
    this.time_started = props.time_started || null ;
    this.pairA = props.pairA || null;
    this.pairB = props.pairB || null;
    this.winners = props.winners || null;
    this.losers = props.losers|| null;
    this.win_score = props.win_score || null;
    this.lose_score = props.lose_score || null;
  }
  getId() {
    return this.id;
  }
  getValidPlayerId(player: any) {
    if (typeof player === "object") {
      try {
        return this.getValidPlayerId(player.id);
      } catch (e) {
        return 0;
      }
    }
    if (typeof player === "string") {
      return 0;
    } 
    return player;
  }
  setPairA(players: Array<Player>) {
    this.pairA = players;
    return this.pairA;
  }
  setPairB(players: Array<Player>) {
    this.pairB = players;
    return this.pairB;
  }
  getPlayers() {
    return { pairA: this.pairA, pairB: this.pairB };
    }
  // Enforces common convention of placing ladies ahead of men when returned to the queue.  
  genderSort(players: Array<Player>) {
    if (players.length > 1 && players[0].gender === "M" && players[1].gender === "F") {
      return players.reverse();
    }
    return players;
  } 
  startGame() {
    this.game_status = "active";
    this.time_started = new Date().toJSON();
  }
  // Sets final game state in preparation for transmission.
  setScore(pairAScore: number, pairBScore: number) {
    const options = {A: this.pairA, B: this.pairB};
    const [ winner, loser, winscore, losescore ] = pairAScore > pairBScore ? ["A", "B", pairAScore, pairBScore] : ["B", "A", pairBScore, pairAScore];
    this.winners = options[winner];
    this.losers = options[loser];
    this.win_score = winscore;
    this.lose_score = losescore;
    this.game_status = "completed"
  }
  // Data structured to enable serialization of Game. The object can be passed to class constructor to restore state.
  getState() {
    return {
      id: this.id,
      session_id: this.session_id,
      time_created: this.time_created,
      game_status: this.game_status,
      selected_by_player_id: this.selected_by_player_id,
      time_started: this.time_started,
      pairA: this.pairA,
      pairB: this.pairB,
      winners: this.winners, 
      losers: this.losers, 
      win_score: this.win_score, 
      lose_score: this.lose_score, 
    }
  }
  // Data is structured to be accepted by the database.
  getSummary() {
    if (!this.winners) {
      return "use .setScore(pairA, pairB) first.";
    }
    return { 
      data: {
        id: this.id,
        session_id: this.session_id,
        selected_by_player_id: this.selected_by_player_id || 0,
        time_created: this.time_created,
        time_started: this.time_started,
        game_status: this.game_status,
        time_completed: new Date().toJSON(),
        player_id_win_1: this.getValidPlayerId(this.winners[0]),
        player_id_win_2: this.getValidPlayerId(this.winners[1]) || null,
        player_id_lose_1: this.getValidPlayerId(this.losers[0]),
        player_id_lose_2: this.getValidPlayerId(this.losers[1]) || null,
        win_score: this.win_score,
        lose_score: this.lose_score,
      },
      playersToEnqueue: [...this.genderSort([...this.winners]), ...this.genderSort([...this.losers])],
    };
  }
};

export default Game;
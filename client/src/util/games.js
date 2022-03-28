import { v4 } from "uuid";
class Game {
    constructor(props) {
        this.id = v4();
        this.session_id = props.session_id;
        this.time_created = new Date();
        this.game_status = props.game_status || "pending";
        this.selected_by_player_id = this.getValidPlayerId(props.id);
        this.time_started = null;
        this.pairA = null;
        this.pairB = null;
        this.winners = null;
        this.losers = null;
        this.win_score = null;
        this.lose_score = null;
    }
    getValidPlayerId(player) {
        if (typeof player === "string") {
            return 0;
        }
        if (typeof player === "object") {
            try {
                return player.id;
            }
            catch (e) {
                return 0;
            }
        }
        return player;
    }
    setPairA(players) {
        this.pairA = players;
        return this.pairA;
    }
    setPairB(players) {
        this.pairB = players;
        return this.pairB;
    }
    setGameStatus(status) {
        const options = { pending: "pending", inPlay: "inPlay", completed: "completed", void: "void" };
        this.game_status = options[status] || this.game_status;
        return this.game_status;
    }
    setScore(pairAScore, pairBScore) {
        const options = { A: this.pairA, B: this.pairB };
        const [winner, loser, winscore, losescore] = pairAScore > pairBScore ? ["A", "B", pairAScore, pairBScore] : ["B", "A", pairBScore, pairAScore];
        this.winners = options[winner];
        this.losers = options[loser];
        this.win_score = winscore;
        this.lose_score = losescore;
    }
    getSummary() {
        if (!this.winners) {
            return "use .setScore(pairA, pairB) first.";
        }
        const gameData = {
            data: {
                id: this.id,
                session_id: this.session_id,
                selected_by_player_id: this.selected_by_player_id,
                time_created: this.time_created,
                time_started: this.time_started,
                game_status: this.game_status,
                time_completed: new Date(),
                player_id_win_1: this.getValidPlayerId(this.winners[0]),
                player_id_win_2: this.getValidPlayerId(this.winners[1]) || null,
                player_id_lose_1: this.getValidPlayerId(this.losers[0]),
                player_id_lose_2: this.getValidPlayerId(this.losers[1]) || null,
                win_score: this.win_score,
                lose_score: this.lose_score
            },
            playersToEnqueue: [...this.winners.map(plr => plr.id), ...this.losers.map(plr => plr.id)]
        };
        return gameData;
    }
}
export default Game;

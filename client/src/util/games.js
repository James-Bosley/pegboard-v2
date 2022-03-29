import { v4 } from "uuid";
class Game {
    constructor(props) {
        this.id = props.id || v4();
        this.session_id = props.session_id;
        this.time_created = props.time_created || new Date().toJSON();
        this.game_status = props.game_status || "pending";
        this.selected_by_player_id = props.selected_by_player_id || this.getValidPlayerId(props.select_id);
        this.time_started = props.time_started || null;
        this.pairA = props.pairA || null;
        this.pairB = props.pairB || null;
        this.winners = props.winners || null;
        this.losers = props.losers || null;
        this.win_score = props.win_score || null;
        this.lose_score = props.lose_score || null;
    }
    getId() {
        return this.id;
    }
    getValidPlayerId(player) {
        if (typeof player === "object") {
            try {
                return this.getValidPlayerId(player.id);
            }
            catch (e) {
                return 0;
            }
        }
        if (typeof player === "string") {
            return 0;
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
    getPlayers() {
        return { pairA: this.pairA, pairB: this.pairB };
    }
    startGame() {
        this.game_status = "active";
        this.time_started = new Date().toJSON();
    }
    setScore(pairAScore, pairBScore) {
        const options = { A: this.pairA, B: this.pairB };
        const [winner, loser, winscore, losescore] = pairAScore > pairBScore ? ["A", "B", pairAScore, pairBScore] : ["B", "A", pairBScore, pairAScore];
        this.winners = options[winner];
        this.losers = options[loser];
        this.win_score = winscore;
        this.lose_score = losescore;
        this.game_status = "completed";
    }
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
        };
    }
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
            playersToEnqueue: [...this.winners, ...this.losers],
        };
    }
}
;
export default Game;

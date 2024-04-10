const readline = require('readline');

class DartGame {
    constructor() {
        this.validSectors = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,25];
        this.validMultiplier = [1,2,3];
        this.players = [
            { name: 'Player1', score: 501, id: 1000, legs: 0},
            { name: 'Player2', score: 501, id: 2000, legs: 0}
        ];
        this.currentPlayerIndex = 0;
        this.ServicePlayerIndex = 0;
        this.dartsThrown = 0;
        this.firstTo = 3;
        this.doubleOut = true;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.bust = false;
        this.won = false;
    }

    async startGame() {
        while (!(this.players[0].legs === this.firstTo) || !(this.players[1].legs === this.firstTo)) {

            console.log(`Current turn: ${this.players[this.currentPlayerIndex].id}`);

            for (let i = 0; i < 3; i++) {
                await this.takeTurn();
                if (this.bust === true){
                    this.bust=false;
                    break;
                }

                else if (this.won === true){
                    break;
                }
            }

            if (this.won === true) {
                console.log(`The winner is: ${this.players[this.currentPlayerIndex].name}`);
                this.players[this.currentPlayerIndex].legs++;
                console.log(`${this.players[0].name} ${this.players[0].legs} - ${this.players[1].legs} ${this.players[1].name}`);
                this.won = false;
                this.players[0].score = 501;
                this.players[1].score = 501;
                this.switchServicePlayer();
            }

            else
            {
                this.switchPlayer();
            }
            
        }

        console.log(`The winner of the match: ${this.players[this.currentPlayerIndex].name}`)
        console.log(`${this.players[0].name} ${this.players[0].legs} - ${this.players[1].legs} ${this.players[1].name}`);
        this.rl.close();
    }

    async takeTurn() {
        return new Promise((resolve) => {
            this.rl.question(`${this.players[this.currentPlayerIndex].name}'s turn. Enter sector and multiplier separated by space: `, (input) => {
                const [sector, multiplier] = input.trim().split(' ').map(val => parseInt(val));

                if (!(this.validSectors.includes(sector)) || !(this.validMultiplier.includes(multiplier))) {
                    console.log('Invalid score!');
                    resolve();
                    return;
                }

                this.throwDart(sector, multiplier);
                resolve();
            });
        });
    }

    switchPlayer() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
    }

    switchServicePlayer(){
        this.ServicePlayerIndex = (this.ServicePlayerIndex + 1) % 2;
    }

    throwDart(sector, multiplier) {
        const currentPlayer = this.players[this.currentPlayerIndex];
        const previousScore = currentPlayer.score
        const points = sector * multiplier;
        currentPlayer.score -= points;
        this.dartsThrown++;

        console.log(`${currentPlayer.name} threw dart: ${sector} * ${multiplier} = ${points} score: ${currentPlayer.score}`);

        if (this.doubleOut === false) {
            if (currentPlayer.score === 0) {
                this.won = true;
                console.log(`${currentPlayer.name} wins with a perfect score!`);
            } else if (currentPlayer.score < 0) {
                console.log(`${currentPlayer.name} busts!`);
                currentPlayer.score = previousScore; // Revert invalid throw
                this.bust = true
            }
        }

        else if (this.doubleOut === true){

            if ((multiplier === 2) && (currentPlayer.score === 0)) {
                this.won = true;
                console.log(`${currentPlayer.name} wins with a perfect score!`);
            } else if ((currentPlayer.score < 0) || ((currentPlayer.score=== 0) && !(multiplier === 2)) ) {
                console.log(`${currentPlayer.name} busts!`);
                currentPlayer.score = previousScore; // Revert invalid throw
                this.bust = true
            }
        }

        if (currentPlayer.score === 0) {
            this.won = true;
            console.log(`${currentPlayer.name} wins with a perfect score!`);
        } else if (currentPlayer.score < 0) {
            console.log(`${currentPlayer.name} busts!`);
            currentPlayer.score = previousScore; // Revert invalid throw
            this.bust = true
        }
    }    

    isGameOver() {
        return this.players.some(player => player.score == 0);
    }
}

const game = new DartGame();
game.startGame();

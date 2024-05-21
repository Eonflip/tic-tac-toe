const opponentChoice = {
    opponent: null,
    playerSymbol: 'X',
    opponentSymbol: 'circle',

    showOpponentModal() {
        const opponentModal = document.getElementById('opponentModal');
        opponentModal.style.display = 'block';

        document.getElementById('computerButton').onclick = () => {
            this.opponent = aiPlayer;
            opponentModal.style.display = 'none';
            this.showSymbolModal();
        };

        document.getElementById('secondPlayerButton').onclick = () => {
            this.opponent = player2;
            opponentModal.style.display = 'none';
            this.showSymbolModal();
        };

        document.querySelector('.closeOpponentModal').onclick = () => {
            opponentModal.style.display = 'none';
        };
    },

    showSymbolModal() {
        const symbolModal = document.getElementById('symbolModal');
        symbolModal.style.display = 'block';

        document.getElementById('xButton').onclick = () => {
            this.playerSymbol = 'X';
            this.opponentSymbol = 'circle';
            symbolModal.style.display = 'none';
            game.start();
        };

        document.getElementById('oButton').onclick = () => {
            this.playerSymbol = 'circle';
            this.opponentSymbol = 'X';
            symbolModal.style.display = 'none';
            game.start();
        };

        document.querySelector('.closeSymbolModal').onclick = () => {
            symbolModal.style.display = 'none';
        };
    }
};



function minimax(board, currentPlayer) {
    const opponent = currentPlayer === aiPlayer.symbol ? player1.symbol : aiPlayer.symbol;
    
    if (board.checkWin(aiPlayer.symbol)) {
        return { score: 1 };
    } else if (board.checkWin(player1.symbol)) {
        return { score: -1 };
    } else if (board.isDraw()) {
        return { score: 0 };
    }

    const moves = [];

    board.tiles.forEach((tile, index) => {
        if (tile === null) {
            const move = { index: index };
            board.placeMark(index, { symbol: currentPlayer });

            const result = minimax(board, opponent);
            move.score = result.score;

            board.undoMark(index);
            moves.push(move);
        }
    });

    let bestMove;
    if (currentPlayer === aiPlayer.symbol) {
        let bestScore = -Infinity;
        moves.forEach(move => {
            if (move.score > bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        });
    } else {
        let bestScore = Infinity;
        moves.forEach(move => {
            if (move.score < bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        });
    }

    return bestMove;
}

const gameBoard = {
    tiles: Array(9).fill(null),
    WINNING_COMBINATIONS: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],
    resetBoard() {
        this.tiles = Array(9).fill(null);
    },
    isDraw() {
        return this.tiles.every(tile => tile !== null);
    },
    checkWin(currentClass) {
        return this.WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => this.tiles[index] === currentClass);
        });
    },
    placeMark(index, player) {
        if (this.tiles[index] === null) {
            this.tiles[index] = player.symbol;
            return true;
        }
        return false;
    },
    undoMark(index) {
        this.tiles[index] = null;
    }
};

const player1 = {
    name: 'Player 1',
    symbol: 'X',
    makeMove(index) {
        return gameBoard.placeMark(index, this);
    }
};

const player2 = {
    name: 'Player 2',
    symbol: 'circle',
    makeMove(index) {
        return gameBoard.placeMark(index, this);
    }
};

const aiPlayer = {
    name: 'Computer',
    symbol: 'circle',
    makeMove() {
        const bestMove = minimax(gameBoard, this.symbol);
        gameBoard.placeMark(bestMove.index, this);
    }
};

const game = {
    currentPlayer: player1,
    start() {
        gameBoard.resetBoard();
        player1.symbol = opponentChoice.playerSymbol;
        if (opponentChoice.opponent === aiPlayer) {
            aiPlayer.symbol = opponentChoice.opponentSymbol;
        } else {
            player2.symbol = opponentChoice.opponentSymbol;
        }
        this.currentPlayer = player1;
        playerTurnText = document.querySelector('.player-turn-text');
        playerTurnText.innerText = `${this.currentPlayer.name}'s Turn`;
        this.render();
    },
    handleClick(index) {
        if (this.currentPlayer.makeMove(index)) {
            if (gameBoard.checkWin(this.currentPlayer.symbol)) {
                setTimeout(() => {
                    this.displayWinner(this.currentPlayer.name);
                }, 1000);
            } else if (gameBoard.isDraw()) {
                setTimeout(() => {
                    this.displayWinner('Draw');
                }, 1000);
            } else {
                this.swapTurns();
            }
            this.render();
        }
    },
    swapTurns() {
        this.currentPlayer = this.currentPlayer === player1 ? opponentChoice.opponent : player1;
        playerTurnText = document.querySelector('.player-turn-text');
        playerTurnText.innerText = `${this.currentPlayer.name}'s Turn`;
        this.render();
        if (this.currentPlayer === aiPlayer) {
            setTimeout(() => {
                aiPlayer.makeMove();
                if (gameBoard.checkWin(aiPlayer.symbol)) {
                    setTimeout(() => {
                        this.displayWinner(aiPlayer.name);
                    }, 1000);
                } else if (gameBoard.isDraw()) {
                    setTimeout(() => {
                        this.displayWinner('Draw');
                    }, 1000);
                } else {
                    this.currentPlayer = player1;
                    playerTurnText.innerText = `${this.currentPlayer.name}'s Turn`;
                }
                this.render();
            }, 1000);

        }
    },
    displayWinner(winner) {
        const winningMessageElement = document.getElementById('winningMessage');
        const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
        winningMessageTextElement.innerText = winner === 'Draw' ? 'Draw!' : `${winner} Wins!`;
        winningMessageElement.classList.add('show');
    },
    render() {
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach((tile, index) => {
            tile.classList.remove('x', 'circle');
            if (gameBoard.tiles[index]) {
                tile.classList.add(gameBoard.tiles[index].toLowerCase());
            }
        });
    }
};

document.querySelectorAll('.tile').forEach((tile, index) => {
    tile.addEventListener('click', () => game.handleClick(index));
});

document.getElementById('restartButton').addEventListener('click', () => {
    document.getElementById('winningMessage').classList.remove('show');
    opponentChoice.showOpponentModal();
});

document.getElementById('midGameRestart').addEventListener('click', () => {
    opponentChoice.showOpponentModal();
})

//game.start();
opponentChoice.showOpponentModal();
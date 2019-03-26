class Board {
    constructor(displayBoard) {
        //general declarations
        this.turn = {
            color: "white",
            move: 1
        };
        this.displayBoard = displayBoard;
        this.board = new Array(8);
        this.prevMoves = [];
        this.alphabet = ["a", "b", "c", "d", "e", "f", "g", "h"];
        this.inverseRow = [8, 7, 6, 5, 4, 3, 2, 1];
        this.computer = new Computer(this);

        //white piece things
        this.whitePieces = [];
        this.whiteMoves = [];

        //black piece things
        this.blackPieces = [];
        this.blackMoves = [];

        //starting to create a board
        for (let i = 0; i < 8; i++) {
            this.board[i] = new Array(8);
        }
        this.startGame(displayBoard);
    }
    startGame(displayBoard){
        this.initBoard();
        this.definePieces();
        this.populateBoard();
        if (displayBoard) {
            this.drawBoard();
        }
    }

    initBoard() {
        for (let col = 0; col < 8; col++) {
            for (let row = 0; row < 8; row++) {
                this.board[col][row] = {
                    color: 'default',
                    piece: false
                };
                if ((col + row) % 2 === 1) {
                    this.board[col][row].color = 'black';
                } else {
                    this.board[col][row].color = 'white';
                }
            }
        }
    }

    //adds pieces to the chess board;
    populateBoard() {
        let pieceList;
        for (let c = 0; c < 2; c++) {
            if (c === 0) {
                pieceList = this.whitePieces;
            } else {
                pieceList = this.blackPieces;
            }
            for (let i in pieceList) {
                let col = pieceList[i].pos.col;
                let row = pieceList[i].pos.row;
                //remember that when doing a move I need to immediately make first move false or else this won't work
                this.board[col][row].piece =  pieceList[i];
            }
        }
    }

    //creates the pieces for the beginning of the game by populating piece lists
    definePieces() {
        let color, piecelist, row;
        for (let c = 0; c < 2; c++) {
            if (c === 0) {
                color = "white";
                piecelist = this.whitePieces;
                row = 6;
            } else {
                color = "black";
                piecelist = this.blackPieces;
                row = 1;
            }
            //creates pawn pieces
            for (let col = 0; col < 8; col++) {
                piecelist.push(new Piece('P', color, 1, true, col, row, col, row));
            }
            //changes row for white and black pieces
            if (color === "white") {
                row = 7;
            } else {
                row = 0;
            }
            //creates rook pieces
            for (let col = 0; col < 8; col += 7) {
                piecelist.push(new Piece('R', color, 5, true, col, row, col, row));
            }
            //creates knight pieces
            for (let col = 1; col < 8; col += 5) {
                piecelist.push(new Piece('N', color, 3, true, col, row, col, row));
            }
            //creates bishop pieces
            for (let col = 2; col < 8; col += 3) {
                piecelist.push(new Piece('B', color, 3, true, col, row, col, row));
            }
            //create queen piece
            piecelist.push(new Piece('Q', color, 9, true, 3, row, 3, row));
            //creates king piece
            piecelist.push(new Piece('K', color, -1, true, 4, row, 4, row));
        }
    }

    //for display board
    drawBoard(board) {
        this.clearBoard();
        for (let w = 0; w < 8; w++) {
            for (let h = 0; h < 8; h++) {
                if (this.board[w][h].piece !== false) {
                    let docPiece = document.createElement("img");
                    if (this.board[w][h].piece.color === "white") {
                        if (this.board[w][h].piece.piece === 'P') {
                            docPiece.src = "images/wp.webp";
                        } else if (this.board[w][h].piece.piece === 'R') {
                            docPiece.src = "images/wr.webp";
                        } else if (this.board[w][h].piece.piece === 'N') {
                            docPiece.src = "images/wn.webp";
                        } else if (this.board[w][h].piece.piece === 'B') {
                            docPiece.src = "images/wb.webp";
                        } else if (this.board[w][h].piece.piece === 'Q') {
                            docPiece.src = "images/wq.webp";
                        } else {
                            docPiece.src = "images/wk.webp";
                        }
                    } else {
                        if (this.board[w][h].piece.piece === 'P') {
                            docPiece.src = "images/bp.webp";
                        } else if (this.board[w][h].piece.piece === 'R') {
                            docPiece.src = "images/br.webp";
                        } else if (this.board[w][h].piece.piece === 'N') {
                            docPiece.src = "images/bn.webp";
                        } else if (this.board[w][h].piece.piece === 'B') {
                            docPiece.src = "images/bb.webp";
                        } else if (this.board[w][h].piece.piece === 'Q') {
                            docPiece.src = "images/bq.webp";
                        } else {
                            docPiece.src = "images/bk.webp";
                        }
                    }
                    let square = document.getElementById(this.alphabet[w] + (this.inverseRow[h]));
                    docPiece.id = this.alphabet[w] + (this.inverseRow[h]);
                    if (square != null) {
                        square.appendChild(docPiece);
                    }
                }
            }
        }
    }

    clearBoard(){
        for (let h = 0; h < 8; ++h){
            for (let w = 0; w < 8; ++w){
                let square = document.getElementById(this.alphabet[w] + (this.inverseRow[h]));
                if (square != null){
                    while(square.firstChild){
                        square.removeChild(square.firstChild);
                    }
                }
            }
        }
    }

    moveFinder(color="none") {
        let moveList, pieceList;
        if(color !== "none"){
            if (color === "white") {
                moveList = this.whiteMoves;
                pieceList = this.whitePieces;
            } else {
                moveList = this.blackMoves;
                pieceList = this.blackPieces;
            }
        }else {
            if (this.turn.color === "white") {
                moveList = this.whiteMoves;
                pieceList = this.whitePieces;
            } else {
                moveList = this.blackMoves;
                pieceList = this.blackPieces;
            }
        }
        moveList.length = 0;
        for (let i in pieceList) {
            let piece = pieceList[i].piece;
            let color = pieceList[i].color;
            let firstMove = pieceList[i].firstMove;
            let pos = pieceList[i].pos;

            if (piece === "P") {
                let twoMove, oneMove, enpRow;
                if (color === "white") {
                    twoMove = -2;
                    oneMove = -1;
                    enpRow = 1;
                } else {
                    twoMove = 2;
                    oneMove = 1;
                    enpRow = 6;
                }
                if (firstMove && this.board[pos.col][pos.row + twoMove].piece === false) {
                    moveList.push(new Move(pieceList[i], pos.col, pos.row + twoMove));
                }
                if (this.board[pos.col][pos.row + oneMove].piece === false && (pos.row + oneMove <= 7 && pos.row + oneMove >= 0)) {
                    moveList.push(new Move(pieceList[i], pos.col, pos.row + oneMove))
                }
                //capture moves
                for (let c = pos.col - 1; c <= pos.col + 1; c += 2) {
                    if ((c <= 7 && c >= 0) && (pos.row + oneMove <= 7 && pos.row + oneMove >= 0)) {
                        if (this.board[c][pos.row + oneMove].piece && this.board[c][pos.row + oneMove].piece.color !== color) {
                            moveList.push(new Move(pieceList[i], c, pos.row + oneMove, this.board[c][pos.row + oneMove].piece));
                        }
                    }
                }
                //enpassent move
                for (let c = pos.col - 1; c <= pos.col + 1; c += 2) {
                    if (pos.row === 3 || pos.row === 4) {
                        if (c <= 7 && c >= 0 && this.board[c][pos.row].piece && this.board[c][pos.row].piece.piece === "P") {
                            if (this.board[c][pos.row].piece.color !== color &&
                                this.board[c][pos.row].piece.prevPos.row === enpRow &&
                                this.prevMoves[0].piece === this.board[c][pos.row].piece) {
                                moveList.push(new Move(pieceList[i], c, pos.row + oneMove, this.board[c][pos.row].piece));
                            }

                        }
                    }
                }
            } else if (piece === "R") {
                //pretty sure it would be pretty easy to combine the two h and v into one
                for (let r = pos.row + 1; r <= 7; ++r) {
                    if (this.board[pos.col][r].piece === false) {
                        moveList.push(new Move(pieceList[i], pos.col, r));
                    } else if (this.board[pos.col][r].piece.color !== color) {
                        moveList.push(new Move(pieceList[i], pos.col, r, this.board[pos.col][r].piece));
                        break;
                    } else {
                        break;
                    }
                }
                for (let r = pos.row - 1; r >= 0; --r) {
                    if (this.board[pos.col][r].piece === false) {
                        moveList.push(new Move(pieceList[i], pos.col, r));
                    } else if (this.board[pos.col][r].piece.color !== color) {
                        moveList.push(new Move(pieceList[i], pos.col, r, this.board[pos.col][r].piece));
                        break;
                    } else {
                        break;
                    }
                }
                //horizontal moves
                for (let c = pos.col + 1; c <= 7; ++c) {
                    if (this.board[c][pos.row].piece === false) {
                        moveList.push(new Move(pieceList[i], c, pos.row));
                    } else if (this.board[c][pos.row].piece.color !== color) {
                        moveList.push(new Move(pieceList[i], c, pos.row, this.board[c][pos.row].piece));
                        break;
                    } else {
                        break;
                    }
                }
                for (let c = pos.col - 1; c >= 0; --c) {
                    if (this.board[c][pos.row].piece === false) {
                        moveList.push(new Move(pieceList[i], c, pos.row));
                    } else if (this.board[c][pos.row].piece.color !== color) {
                        moveList.push(new Move(pieceList[i], c, pos.row, this.board[c][pos.row].piece));
                        break;
                    } else {
                        break;
                    }
                }
            } else if (piece === "N") {
                for (let c = 1; c <= 2; ++c) {
                    if ((c === 1) && (pos.col + c <= 7)) {
                        if (pos.row + 2 <= 7 &&
                            this.board[pos.col + c][pos.row + 2].piece === false) {
                            moveList.push(new Move(pieceList[i], pos.col + c, pos.row + 2));
                        } else if (pos.row + 2 <= 7 &&
                            this.board[pos.col + c][pos.row + 2].piece &&
                            this.board[pos.col + c][pos.row + 2].piece.color !== color) {
                            moveList.push(new Move(pieceList[i], pos.col + c, pos.row + 2, this.board[pos.col + c][pos.row + 2].piece));
                        }
                        if (pos.row - 2 >= 0 &&
                            this.board[pos.col + c][pos.row - 2].piece === false) {
                            moveList.push(new Move(pieceList[i], pos.col + c, pos.row - 2));
                        } else if (pos.row - 2 >= 0 &&
                            this.board[pos.col + c][pos.row - 2].piece &&
                            this.board[pos.col + c][pos.row - 2].piece.color !== color) {
                            moveList.push(new Move(pieceList[i], pos.col + c, pos.row - 2, this.board[pos.col + c][pos.row - 2].piece));
                        }
                    } else if ((c === 2) && (pos.col + c <= 7)) {
                        if (pos.row + 1 <= 7 &&
                            this.board[pos.col + c][pos.row + 1].piece === false) {
                            moveList.push(new Move(pieceList[i], pos.col + c, pos.row + 1));
                        } else if (pos.row + 1 <= 7 &&
                            this.board[pos.col + c][pos.row + 1].piece &&
                            this.board[pos.col + c][pos.row + 1].piece.color !== color) {
                            moveList.push(new Move(pieceList[i], pos.col + c, pos.row + 1, this.board[pos.col + c][pos.row + 1].piece));
                        }
                        if (pos.row - 1 >= 0 &&
                            this.board[pos.col + c][pos.row - 1].piece === false) {
                            moveList.push(new Move(pieceList[i], pos.col + c, pos.row - 1));
                        } else if (pos.row - 1 >= 0 &&
                            this.board[pos.col + c][pos.row - 1].piece &&
                            this.board[pos.col + c][pos.row - 1].piece.color !== color) {
                            moveList.push(new Move(pieceList[i], pos.col + c, pos.row - 1, this.board[pos.col + c][pos.row - 1].piece));
                        }
                    }
                    if ((c === 1) && (pos.col - c >= 0)) {
                        if (pos.row + 2 <= 7 &&
                            this.board[pos.col - c][pos.row + 2].piece === false) {
                            moveList.push(new Move(pieceList[i], pos.col - c, pos.row + 2));
                        } else if (pos.row + 2 <= 7 &&
                            this.board[pos.col - c][pos.row + 2].piece &&
                            this.board[pos.col - c][pos.row + 2].piece.color !== color) {
                            moveList.push(new Move(pieceList[i], pos.col - c, pos.row + 2, this.board[pos.col - c][pos.row + 2].piece));
                        }
                        if (pos.row - 2 >= 0 &&
                            this.board[pos.col - c][pos.row - 2].piece === false) {
                            moveList.push(new Move(pieceList[i], pos.col - c, pos.row - 2));
                        } else if (pos.row - 2 >= 0 &&
                            this.board[pos.col - c][pos.row - 2].piece &&
                            this.board[pos.col - c][pos.row - 2].piece.color !== color) {
                            moveList.push(new Move(pieceList[i], pos.col - c, pos.row - 2, this.board[pos.col - c][pos.row - 2].piece));
                        }
                    } else if ((c === 2) && (pos.col - c >= 0)) {
                        if (pos.row + 1 <= 7 &&
                            this.board[pos.col - c][pos.row + 1].piece === false) {
                            moveList.push(new Move(pieceList[i], pos.col - c, pos.row + 1));
                        } else if (pos.row + 1 <= 7 &&
                            this.board[pos.col - c][pos.row + 1].piece &&
                            this.board[pos.col - c][pos.row + 1].piece.color !== color) {
                            moveList.push(new Move(pieceList[i], pos.col - c, pos.row + 1, this.board[pos.col - c][pos.row + 1].piece));
                        }
                        if (pos.row - 1 >= 0 &&
                            this.board[pos.col - c][pos.row - 1].piece === false) {
                            moveList.push(new Move(pieceList[i], pos.col - c, pos.row - 1));
                        } else if (pos.row - 1 >= 0 &&
                            this.board[pos.col - c][pos.row - 1].piece &&
                            this.board[pos.col - c][pos.row - 1].piece.color !== color) {
                            moveList.push(new Move(pieceList[i], pos.col - c, pos.row - 1, this.board[pos.col - c][pos.row - 1].piece));
                        }
                    }
                }
            } else if (piece === "B") {
                let colChange;
                for (let r = pos.row + 1; r <= 7; ++r) {
                    //moving up, checks if bishop is not moving off of the top of this.board
                    //beak up into 2 arrays so that the for loop can be broken
                    colChange = r - pos.row;
                    if (pos.col + colChange <= 7 && this.board[pos.col + colChange][r].piece === false) {
                        moveList.push(new Move(pieceList[i], pos.col + colChange, r));
                    } else if (pos.col + colChange <= 7 &&
                        this.board[pos.col + colChange][r].piece &&
                        this.board[pos.col + colChange][r].piece.color !== color) {
                        moveList.push(new Move(pieceList[i], pos.col + colChange, r, this.board[pos.col + colChange][r].piece));
                        break;
                    } else {
                        break;
                    }
                }
                for (let r = pos.row + 1; r <= 7; ++r) {
                    let colChange = r - pos.row;
                    if (pos.col - colChange >= 0 && this.board[pos.col - colChange][r].piece === false) {
                        moveList.push(new Move(pieceList[i], pos.col - colChange, r));
                    } else if (pos.col - colChange >= 0 &&
                        this.board[pos.col - colChange][r].piece &&
                        this.board[pos.col - colChange][r].piece.color !== color) {
                        moveList.push(new Move(pieceList[i], pos.col + colChange, r, this.board[pos.col - colChange][r].piece));
                        break;
                    } else {
                        break;
                    }
                }
                //moving left
                for (let r = pos.row - 1; r >= 0; --r) {
                    //moving up, checks if bishop is not moving off of the top of this.board
                    let colChange = pos.row - r;
                    if (pos.col + colChange <= 7 && this.board[pos.col + colChange][r].piece === false) {
                        moveList.push(new Move(pieceList[i], pos.col + colChange, r));
                    } else if (pos.col + colChange <= 7 &&
                        this.board[pos.col + colChange][r].piece &&
                        this.board[pos.col + colChange][r].piece.color !== color) {
                        moveList.push(new Move(pieceList[i], pos.col + colChange, r, this.board[pos.col + colChange][r].piece));
                        break;
                    } else {
                        break;
                    }
                }
                for (let r = pos.row - 1; r >= 0; --r) {
                    //moving down, checks if the piece is not moving off of the bottom f the this.board
                    let colChange = pos.row - r;
                    if (pos.col - colChange >= 0 && this.board[pos.col - colChange][r].piece === false) {
                        moveList.push(new Move(pieceList[i], pos.col - colChange, r));
                    } else if (pos.col - colChange >= 0 && this.board[pos.col - colChange][r].piece.color !== color) {
                        moveList.push(new Move(pieceList[i], pos.col - colChange, r, this.board[pos.col - colChange][r].piece));
                        break;
                    } else {
                        break;
                    }
                }
            } else if (piece === "Q") {
                for (let r = pos.row + 1; r <= 7; ++r) {
                    if (this.board[pos.col][r].piece === false) {
                        moveList.push(new Move(pieceList[i], pos.col, r));
                    } else if (this.board[pos.col][r].piece.color !== color) {
                        moveList.push(new Move(pieceList[i], pos.col, r, this.board[pos.col][r].piece));
                        break;
                    } else {
                        break;
                    }
                }
                for (let r = pos.row - 1; r >= 0; --r) {
                    if (this.board[pos.col][r].piece === false) {
                        moveList.push(new Move(pieceList[i], pos.col, r));
                    } else if (this.board[pos.col][r].piece.color !== color) {
                        moveList.push(new Move(pieceList[i], pos.col, r, this.board[pos.col][r].piece));
                        break;
                    } else {
                        break;
                    }
                }
                //horizontal moves
                for (let c = pos.col + 1; c <= 7; ++c) {
                    if (this.board[c][pos.row].piece === false) {
                        moveList.push(new Move(pieceList[i], c, pos.row));
                    } else if (this.board[c][pos.row].piece.color !== color) {
                        moveList.push(new Move(pieceList[i], c, pos.row, this.board[c][pos.row].piece));
                        break;
                    } else {
                        break;
                    }
                }
                for (let c = pos.col - 1; c >= 0; --c) {
                    if (this.board[c][pos.row].piece === false) {
                        moveList.push(new Move(pieceList[i], c, pos.row));
                    } else if (this.board[c][pos.row].piece.color !== color) {
                        moveList.push(new Move(pieceList[i], c, pos.row, this.board[c][pos.row].piece));
                        break;
                    } else {
                        break;
                    }
                }
                //moving right
                //diagonal moves
                let colChange;
                for (let r = pos.row + 1; r <= 7; ++r) {
                    //moving up, checks if bishop is not moving off of the top of this.board
                    //beak up into 2 arrays so that the for loop can be broken
                    colChange = r - pos.row;
                    if (pos.col + colChange <= 7 && this.board[pos.col + colChange][r].piece === false) {
                        moveList.push(new Move(pieceList[i], pos.col + colChange, r));
                    } else if (pos.col + colChange <= 7 &&
                        this.board[pos.col + colChange][r].piece &&
                        this.board[pos.col + colChange][r].piece.color !== color) {
                        moveList.push(new Move(pieceList[i], pos.col + colChange, r, this.board[pos.col + colChange][r].piece));
                        break;
                    } else {
                        break;
                    }
                }
                for (let r = pos.row + 1; r <= 7; ++r) {
                    let colChange = r - pos.row;
                    if (pos.col - colChange >= 0 && this.board[pos.col - colChange][r].piece === false) {
                        moveList.push(new Move(pieceList[i], pos.col - colChange, r));
                    } else if (pos.col - colChange >= 0 &&
                        this.board[pos.col + colChange][r].piece &&
                        this.board[pos.col - colChange][r].piece.color !== color) {
                        moveList.push(new Move(pieceList[i], pos.col + colChange, r, this.board[pos.col - colChange][r].piece));
                        break;
                    } else {
                        break;
                    }
                }
                //moving left
                for (let r = pos.row - 1; r >= 0; --r) {
                    //moving up, checks if bishop is not moving off of the top of this.board
                    let colChange = pos.row - r;
                    if (pos.col + colChange <= 7 && this.board[pos.col + colChange][r].piece === false) {
                        moveList.push(new Move(pieceList[i], pos.col + colChange, r));
                    } else if (pos.col + colChange <= 7 &&
                        this.board[pos.col + colChange][r].piece &&
                        this.board[pos.col + colChange][r].piece.color !== color) {
                        moveList.push(new Move(pieceList[i], pos.col + colChange, r, this.board[pos.col + colChange][r].piece));
                        break;
                    } else {
                        break;
                    }
                }
                for (let r = pos.row - 1; r >= 0; --r) {
                    //moving down, checks if the piece is not moving off of the bottom f the this.board
                    let colChange = pos.row - r;
                    if (pos.col - colChange >= 0 && this.board[pos.col - colChange][r].piece === false) {
                        moveList.push(new Move(pieceList[i], pos.col - colChange, r));
                    } else if (pos.col - colChange >= 0 && this.board[pos.col - colChange][r].piece.color !== color) {
                        moveList.push(new Move(pieceList[i], pos.col - colChange, r, this.board[pos.col - colChange][r].piece));
                        break;
                    } else {
                        break;
                    }
                }
            } else {
                for (let c = -1; c <= 1; ++c) {
                    for (let r = -1; r <= 1; ++r) {
                        if (((pos.col + c) >= 0 && (pos.col + c) <= 7) && (pos.row + r >= 0 && pos.row + r <= 7)) {
                            if ((this.board[pos.col + c][pos.row + r].piece === false) && !(c === 0 && r === 0)) {
                                moveList.push(new Move(pieceList[i], pos.col + c, pos.row + r));
                            } else if (this.board[pos.col + c][pos.row + r].piece &&
                                this.board[pos.col + c][pos.row + r].piece.color !== color) {
                                moveList.push(new Move(pieceList[i], pos.col + c, pos.row + r, this.board[pos.col + c][pos.row + r].piece));
                            }
                        }
                    }

                }
                let rRow;
                if (color === "white") {
                    rRow = 7;
                } else {
                    rRow = 0;
                }
                if (this.board[4][rRow].piece.firstMove && (this.board[7][rRow].piece === 'R' && this.board[7][rRow].piece.firstMove)) {
                    let shortCastleCheck = true;
                    for (let c = 5; c < 7; c++) {
                        if (this.board[c][rRow].piece) {
                            shortCastleCheck = false;
                            break;
                        }
                    }
                    if (shortCastleCheck) {
                        moveList.push(new Move(pieceList[i], 6, rRow, false, false, false, false, {type: "long"
                            , rook: Object.assign(Object.create(Object.getPrototypeOf(this.board[7][rRow].piece)), this.board[7][rRow].piece)}));
                    }
                }
                //longCastle
                if (this.board[4][rRow].piece.firstMove && (this.board[0][rRow].piece === 'R' && this.board[0][rRow].piece.firstMove)) {
                    let longCastleCheck = true;
                    for (let c = 5; c < 7; c++) {
                        if (this.board[c][rRow].piece !== false) {
                            longCastleCheck = false;
                            break;
                        }
                    }
                    if (longCastleCheck) {
                        moveList.push(new Move(pieceList[i], 2, rRow, false, false, false, false, {type: "long"
                            , rook: Object.assign(Object.create(Object.getPrototypeOf(this.board[0][rRow].piece)), this.board[0][rRow].piece)}));
                    }
                }
            }
        }
    }

    copyBoard(board, display) {
        for (let property in this) {
            if (this.hasOwnProperty(property) && board.hasOwnProperty(property)) {
                if (this[property] === this.whitePieces || this[property] === this.blackPieces){
                    this[property].length = 0;
                    for (let i in board[property]){
                        this[property].push(Object.assign(Object.create(Object.getPrototypeOf(board[property][i])), board[property][i]));
                    }
                }else {
                    this[property] = Object.assign(Object.create(Object.getPrototypeOf(board[property])), board[property]);
                }
            }
        }
        if (display) {
            this.drawBoard();
        }
    }

    removeChecks() {
        console.log('started removing illegal moves');
        let illegalCastle = false;
        let testBoard = new Board(false);
        testBoard.copyBoard(this);
        let moves,realMoves, cRow, oppColor, color;
        if (testBoard.turn.color === "white") {
            color = "white";
            moves = testBoard.whiteMoves;
            realMoves = this.whiteMoves;
            oppColor = 'black';
            cRow = 7;
        }else{
            color = "black";
            moves = testBoard.blackMoves;
            realMoves = this.blackMoves;
            oppColor = 'white';
            cRow = 0;
        }
        for (let k in moves) {
            let illegalCastle = false;
            if (moves[k].piece.piece === "K" && moves[k].castle.type === "short") {
                for (let cols = 4; cols <= 6; ++ cols){
                    if (testBoard.computer.isAttacked(cols, cRow,oppColor)){
                        illegalCastle = true;
                        break;
                    }
                }
            } else if (moves[k].piece === "K" && moves[k].castle.type === "long") {
                for (let cols = 4; cols <= 2; -- cols){
                    if (testBoard.computer.isAttacked(cols, cRow, oppColor)){
                        illegalCastle = true;
                        break;
                    }
                }
            }else {
                testBoard.makeMove(moves[k]);
            }
            testBoard.moveFinder();
            if (testBoard.computer.isCheck(color) || illegalCastle) {
                console.log("removed illegal move");
                moves.splice(k, 1);
                realMoves.splice(k, 1);
                k--;
            }
            console.log(k);
            testBoard.copyBoard(this, false);

        }
    }

    getMoves() {
        this.moveFinder();
        this.removeChecks();
    }

    moveInput(pos1, pos2){
        console.log('move received');
        this.getMoves();

        let posInit = {
            col: -1,
            row: -1
        };
        let posFinal = {
            col: -1,
            row: -1
        };

        posInit.col = this.alphabet.indexOf(pos1[0]);
        posInit.row = this.inverseRow.indexOf(Number(pos1[1]));

        posFinal.col = this.alphabet.indexOf(pos2[0]);
        posFinal.row = this.inverseRow.indexOf(Number(pos2[1]));

        console.log(posInit, posFinal);

        let moves;
        if (this.turn.color === "white"){
            moves = this.whiteMoves;
        }else{
            moves = this.blackMoves;
        }
        console.log(this);
        for (let i in moves){
            if((moves[i].piece.pos.col === posInit.col && moves[i].piece.pos.row === posInit.row) &&
                (moves[i].col === posFinal.col && moves[i].row === posFinal.row)){
                console.log(moves[i]);
                this.makeMove(moves[i]);
                break;
            }
        }
    }

    makeMove(move, color="none"){
        let pieces, oppPieces, cRow;
        let col = move.col;
        let row = move.row;
        let prevPos = move.piece.pos;
        this.appendMoveList(move);
        console.log(this.prevMoves);
        if (color !== "none"){
            if (color === "white") {
                pieces = this.whitePieces;
                oppPieces = this.blackPieces;
                cRow = 7;
            } else {
                pieces = this.blackPieces;
                oppPieces = this.whitePieces;
                cRow = 0;
            }
        }else {
            if (this.turn.color === "white") {
                pieces = this.whitePieces;
                oppPieces = this.blackPieces;
                cRow = 7;
            } else {
                pieces = this.blackPieces;
                oppPieces = this.whitePieces;
                cRow = 0;
            }
        }
        if(move.capture){
            for (let i in oppPieces){
                if (oppPieces[i] === move.capture) {
                    this.board[move.capture.pos.col][move.capture.pos.row].piece = false;
                    oppPieces.splice(i, 1);
                    break;
                }
            }
        }
        if (move.castle){
            if (move.castle.type === "short"){
                for (let i in pieces){
                    if (pieces[i] === move.castle.rook){
                        pieces[i].firstMove = false;
                        pieces[i].prevPos.col = 7;
                        pieces[i].prevPos.row = cRow;
                        pieces[i].pos.col = 5;
                        pieces[i].pos.row = cRow;
                        this.board[5][cRow].piece = pieces[i];
                        this.board[7][cRow].piece = false;
                        break;
                    }
                }
            }else{
                for (let i in pieces){
                    if (pieces[i] === move.castle.rook){
                        pieces[i].firstMove = false;
                        pieces[i].prevPos.col = 0;
                        pieces[i].prevPos.row = cRow;
                        pieces[i].pos.col = 3;
                        pieces[i].pos.row = cRow;
                        this.board[3][cRow].piece = pieces[i];
                        this.board[0][cRow].piece = false;
                        break;
                    }
                }
            }
        }
        for (let i in pieces) {
            console.log(pieces[i]);
            if (pieces[i] === move.piece) {
                console.log("here");
                this.board[prevPos.col][prevPos.row].piece = false;
                pieces[i].prevPos = Object.assign(Object.create(Object.getPrototypeOf(prevPos)), prevPos);
                pieces[i].pos.col = col;
                pieces[i].pos.row = row;
                pieces[i].firstMove = false;
                this.board[col][row].piece = pieces[i];
                break;
            }
        }
        if (this.turn.color === "white"){
            this.turn.color = "black";
        }else{
            this.turn.color = "white";
            this.turn.move ++;
        }
        if (this.displayBoard) {
            this.drawBoard();
        }
        console.log(this.board);
    }

    appendMoveList(move){
        this.prevMoves.unshift(new PrevMove(move, this.turn));
    }
}

class Piece {
    constructor(piece, color, value, firstMove, col, row, prevCol, prevRow) {
        this.piece = piece;
        this.color = color;
        this.value = value;
        this.firstMove = firstMove;
        this.pos = {
            col: col,
            row: row
        };
        this.prevPos = {
            col: prevCol,
            row: prevRow
        };
    }
}

class Move {
    constructor(piece, col, row, capture = false, check = false, checkMate = false, staleMate = false, castle = false) {
        this.piece = piece;
        this.col = col;
        this.row = row;
        this.castle = castle;
        if (capture) {
            this.capture = capture;
        }
        if (check) {
            this.check = '+';
        } else if (checkMate) {
            this.check = '#';
        } else {
            this.check = false;
        }

        if (staleMate) {
            this.staleMate = true;
        } else {
            this.staleMate = false;
        }
    }
}
class PrevMove {
    constructor(move, turn){
        this.move = Object.assign(Object.create(Object.getPrototypeOf(move)), move);
        this.turn = turn;
        this.alphabet =  this.alphabet = ["a", "b", "c", "d", "e", "f", "g", "h"];
        this.text = "";
    }
    createText(){
        let piece, capture, col, row, prevPos, check;
        piece = this.move.piece.piece;
        if (this.move.capture){
            if (this.move.capture.piece === "P"){
                capture = "x";
            }else{
                capture = "x" + this.move.capture.piece;
            }
        }
    }
}

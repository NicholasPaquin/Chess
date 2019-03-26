class Computer {
            constructor(board){
                this.lines = [];
                this.evaluation = 0;
                this.board = board;
            }
            materialEval(pieceList){
                let mat = 0;
                for(let i in pieceList){
                    mat += pieceList[i].material;
                }
                return mat;
            }
            analyze(){
                let materialDiff = 0;
                materialDiff = this.materialEval(this.board.whitePieces) - this.materialEval(this.board.blackPieces);
                console.log("The difference in material is: " + materialDiff);
                this.evaluation = materialDiff;

            }
            isKingSafe(){
                if (this.board.turn.color === "white"){
                    let pieces = this.board.whitePieces;
                    let piecesOpp = this.board.blackPieces;
                    let legalMoves = this.board.whiteMoves;
                    let legalMovesOpp = this.board.blackMoves;
                    let colorOpp = "black";
                }else{
                    let pieces = pieceListBlack;
                    let piecesOpp = pieceListBlack;
                    let legalMoves = moveListBlack;
                    let legalMovesOpp = moveListWhite;
                    let colorOpp = "white";
                }
                for (let i in pieces){
                    if(pieces[i].piece === "k"){
                        let king = pieces[i];
                        break;
                    }
                }
                pieceDetect(useBoard, pieceListWhite, pieceListBlack);
                movesDetect(pieces, legalMoves, this.color, useBoard, false);
                movesDetect(piecesOpp, legalMovesOpp, colorOpp, useBoard, false);
                let beforeMoves = legalMoves.length;
                removeCheck(this.color, true);
                let afterMoves = legalMoves.length;
                if (this.turn){
                    if(this.color == "white"){
                        let testingBoard = Array[8];
                        for (let k in testingBoard){
                            testingBoard[k] = Array[8];
                        }
                        initBoard(testingBoard);
                        copyBoard(useBoard, testingBoard);
                    }else{

                    }
                    for (let i in legalMoves){
                        movesDetect()
                    }
                }
                let safety = beforeMoves - afterMoves;
                return safety;//0 is the most safe

    }
    isProfitableToAttack(useBoard, piece, moveList, moveListOpp){
        let attackers = [];
        for (let i in moveListOpp){

        }
    }
    isMoveForced(moveList){
        if (moveList.length == 1){
            return true;
        }else{
            return false;
        }
    }
    pawnStructure(useBoard, pieceList, moveList, moveListOpp){
        //returns a score based on pawn position, how many pawn islands, how well defended, pins, any passed pawns??
        for (let i in pieceList){
            if (pieceList[i].piece == "p"){
                if (this.isDefended(pieceList[i], moveList) && !this.isAttacked(pieceList[i], moveListOpp)){

                }else{

                }
            }
        }
    }

    lineContinuation(){

        //function will run through moves on a test board and add them to lines
        //after analysis of each line the lines that are unsuitable will be appended
        let moves;
        let legalMoves;
        let legalMovesOpp;
        let pieces;
        let pieceList;
        let pieceListOpp;
        let turn;
        let colorOpp;
        if (this.color == "white"){
            moves = legalMovesWhite;
            pieces = piecesWhite;
            legalMoves = testLegalMovesWhite;
            legalMovesOpp = testLegalMovesBlack;
            pieceList = testPiecesWhite;
            pieceListOpp = testPiecesBlack;
            colorOpp = "black";
        }else{
            moves = legalMovesBlack;
            pieces = piecesBlack;
            legalMoves = testLegalMovesBlack;
            legalMovesOpp = testLegalMovesWhite;
            pieceList = testPiecesBlack;
            pieceListOpp = testPiecesWhite;
            colorOpp = "white";
        }
        pieceDetect(board, piecesWhite, piecesBlack);
        movesDetect(pieces, moves, this.color, board, false);
        for (let i in moves){
            testPiecesWhite.length = 0;
            testPiecesBlack.length = 0;
            testLegalMovesWhite.length = 0;
            testLegalMovesBlack.length = 0;
            copyBoard(board, testBoard);
            let nSquare = testBoard[moves[i].col][moves[i].row];
            let oSquare = testBoard[moves[i].prevCol][moves[i].prevRow];
            nSquare.piece = moves[i].piece;
            nSquare.firstMove = false;
            nSquare.pieceColor = this.color;
            oSquare.piece = false;
            oSquare.firstMove = false;
            oSquare.pieceColor = "default";
            pieceDetect(testBoard, pieceList, pieceListOpp);
            movesDetect(pieceListOpp, legalMovesOpp, colorOpp, testBoard, false);
            if(isCheckmate(colorOpp)){
                this.lines.unshift(
                    moves[i]
                );
            }else{

            }
        }
    }
    isDefended(col, row, color){
        let moves;
        if (color === "white"){
            moves = this.board.whitePieces;
        }else{
            moves = this.board.blackPieces;
        }
        for (let i in moves){
            if(moves[i].piece.col === col && moves[i].piece.row === row){
                return true;
            }
        }
        return false;
    }
    //color will determine whose pieces are attacking that square
    isAttacked(col, row, color){
        let moves;
        if (color === "white"){
            moves = this.board.whitePieces;
        }else{
            moves = this.board.blackPieces;
        }
        for (let i in moves){
            if(moves[i].piece.col === col && moves[i].piece.row === row){
                return true;
            }
        }
        return false;
    }
    isCheck(color=false){
        let pieces, oppMoves;
        if (color){
            if (color === "white") {
                this.board.moveFinder("black");
                pieces = this.board.whitePieces;
                oppMoves = this.board.blackMoves;
            } else {
                this.board.moveFinder("white");
                pieces = this.board.blackPieces;
                oppMoves = this.board.whiteMoves;
            }
        }else {
            if (this.board.turn.color === "white") {
                this.board.moveFinder("black");
                pieces = this.board.whitePieces;
                oppMoves = this.board.blackMoves;
            } else {
                this.board.moveFinder("white");
                pieces = this.board.blackPieces;
                oppMoves = this.board.whiteMoves;
            }
        }
        for (let i in pieces){
            if (pieces[i].piece === "K"){
                for (let j in oppMoves){
                    if (oppMoves[j].capture === pieces[i]){
                        return true;
                    }
                }
            }
        }
    }
    countAttackers(legalMoves, piece){
        let attackers = {
            count: 0,
            moves: []
        };
        for (let i in legalMoves){
            if(legalMoves[i].piece.col == piece.col && legalMoves[i].row == piece.row){
                attackers.count ++;
                attackers.moves.append(legalMoves[i]);
            }
        }
        return attackers;
    }
    countDefenders(piece, pieceList, legalMoves, useBoard, color){
        let defenders = {
            count: 0,
            moves: []
        };
        let col = piece.col;
        let row = piece.row;
        let testerBoard = useBoard;
        let testerMoves = [];
        let square = testerBoard[col][row];
        square.piece = false;
        square.pieceColor = "default";
        movesDetect(pieceList, testerMoves, color, testerBoard, false);
        for (let i in testerMoves){
            if (testerMoves[i].col == col && testerMoves.row == row){
                defenders.count ++;
                defenders.moves.append(testerMoves[i]);
                let defenderSquare = testerBoard[testerMoves.piece.col][testerMoves.piece.row];
                this.uninitSquare(defenderSquare);


                //maybe I should just append to each legal move the piece object rather than prevcol, prevrow??
            }
        }


    }
    uninitSquare(square){
        square.piece = false;
        square.pieceColor = 'default';
        square.previosPos.col = NaN;
        square.previosPos.row = NaN;

    }
    bestMove(){
        let legalMoves;
        let legalMovesOpp;
        let pieces;
        let piecesOpp;
        let move;
        if (this.color == "white"){
            legalMoves = legalMovesWhite;
            legalMovesOpp = legalMovesBlack;
            pieces = piecesWhite;
            piecesOpp = piecesBlack;
        }else{
            legalMoves = legalMovesBlack;
            legalMovesOpp = legalMovesWhite;
            pieces = piecesBlack;
            piecesOpp = piecesWhite;
        }
        removeCheck("white", false);
        removeCheck("black", false);
        for (let k in pieces){
            for (let i in legalMoves){
                let lm = legalMoves[i];
                let p = pieces[k];
                if (lm.piece.piece == p.piece && lm.piece.col == p.col && lm.piece.row == p.row){
                    if(lm.captures){
                        for (let j in piecesOpp){
                            let next = lines.length;
                            if(!isDefended(piecesOpp[j], legalMovesOpp)){
                                lines[next].push(new Array[2]);
                                lines[next][0] = {
                                    eval: analyze(),
                                    length: lines[next].length
                                };
                                lines[next][1] = legalMoves[i];

                            }else if (piecesOpp[j].material >= pieces[k].material){
                                lines[next].push(new Array[2]);
                                lines[next][0] = {
                                    eval: analyze(),
                                    length: lines[next].length
                                };
                                lines[next][1] = legalMoves[i];

                            }
                        }
                    }else{
                        let wellThen = (Math.random() * legalMoves.length) - 1;
                        lines[next].push(new Array[2]);
                        lines[next][0] = {
                            eval: analyze(),
                            length: lines[next].length
                        };
                        lines[next][1] = legalMoves[wellThen];
                    }
                }
            }
        }
    }

}
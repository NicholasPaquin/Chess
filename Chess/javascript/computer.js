class Computer {
    constructor(color, level, board){
        this.color = color;
        this.level = level;
        this.lines = [];
        this.evaluation = 0;
        this.board = board;
    }
    materialEval(pieceList){
        var mat = 0;
        for(var i in pieceList){
            mat += pieceList[i].material;
        }
        return mat;
    }
    analyze(useBoard, pieceListWhite, pieceListBlack, legalMovesWhite, legalMovesBlack){
        let materialDiff = 0;
        materialDiff = this.materialEval(pieceListWhite) - this.materialEval(pieceListBlack);
        console.log("The difference in material is: " + materialDiff);
        this.evaluation = materialDiff;

    }
    isKingSafe(useBoard, pieceListWhite, pieceListBlack, moveListWhite, moveListBlack){
        if (this.color == "white"){
            var pieces = pieceListWhite;
            var piecesOpp = pieceListBlack;
            var legalMoves = moveListWhite;
            var legalMovesOpp = moveListBlack;
            var colorOpp = "black";
        }else{
            var pieces = pieceListBlack;
            var piecesOpp = pieceListBlack;
            var legalMoves = moveListBlack;
            var legalMovesOpp = moveListWhite;
            var colorOpp = "white";
        }
        for (var i in pieces){
            if(pieces[i].piece == "k"){
                var king = pieces[i];
                break;
            }
        }
        pieceDetect(useBoard, pieceListWhite, pieceListBlack);
        movesDetect(pieces, legalMoves, this.color, useBoard, false);
        movesDetect(piecesOpp, legalMovesOpp, colorOpp, useBoard, false);
        var beforeMoves = legalMoves.length;
        removeCheck(this.color, true);
        var afterMoves = legalMoves.length;
        if (this.turn){
            if(this.color == "white"){
                var testingBoard = Array[8];
                for (var k in testingBoard){
                    testingBoard[k] = Array[8];
                }
                initBoard(testingBoard);
                copyBoard(useBoard, testingBoard);
            }else{

            }
            for (var i in legalMoves){
                movesDetect()
            }
        }
        var safety = beforeMoves - afterMoves;
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
        for (var i in pieceList){
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
        var moves;
        var legalMoves;
        var legalMovesOpp;
        var pieces;
        var pieceList;
        var pieceListOpp;
        var turn;
        var colorOpp;
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
        for (var i in moves){
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
    isDefended(piece, legalMoves){
        for (var n in legalMovesOpp){
            if (legalMoves[n].piece.col == piece.col && legalMoves[n].piece.row == piece.row){
                return true;
            }
        }
        return false;
    }
    isAttacked(piece, legalMovesOpp){
        for (var i in legalMovesOpp){
            if(legalMovesOpp[i].piece.col == piece.col && legalMovesOpp[i].piece.row == piece.row){
                return true;
            }
        }
        return false;
    }
    countAttackers(legalMoves, piece){
        var attackers = {
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
        var defenders = {
            count: 0,
            moves: []
        };
        var col = piece.col;
        var row = piece.row;
        var testerBoard = useBoard;
        var testerMoves = [];
        var square = testerBoard[col][row];
        square.piece = false;
        square.pieceColor = "default";
        movesDetect(pieceList, testerMoves, color, testerBoard, false);
        for (var i in testerMoves){
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
        var legalMoves;
        var legalMovesOpp;
        var pieces;
        var piecesOpp;
        var move;
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
        for (var k in pieces){
            for (var i in legalMoves){
                var lm = legalMoves[i];
                var p = pieces[k];
                if (lm.piece.piece == p.piece && lm.piece.col == p.col && lm.piece.row == p.row){
                    if(lm.captures){
                        for (var j in piecesOpp){
                            var next = lines.length;
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
                        var wellThen = (Math.random() * legalMoves.length) - 1;
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
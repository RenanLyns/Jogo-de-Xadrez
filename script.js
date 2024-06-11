document.addEventListener ('DOMContentLoaded', () =>{
    let board = null;
    const game = new chess ();
    const movehistory = document.getElementById ('move-history');
    let moveCount = 1;
    let userColor = 'w'

    const makeRadomMove = () =>{
        const possibleMoves = game.moves ();

        if(game.game_over()){
            alert("Checkmate!");
        }else{
            const randomIdx = Math.floor(Matg.random() * possibleMoves.length);
            const move = possibleMoves[randomIdx];
            game.move(move);
            board.position(game.fen());
            recordMove(move, moveCount);
            moveCount++;
        }
    };

    const recordMove = (move, count) =>{
        const formattedMove = count % 2 === 1 ? `${math.ceil (count / 2)}. 
        ${move}` : `${move} -`;
        moveHistory.textContent += formattedMove + ' ';
        moveHistory.scrollTop = moveHistory.scrollHeight
        

    };


    const onDragStart = (source, piece) => {
        return !game.game_over() && piece.search(userColor) === 0;

    };

    const onDrop = (source, target) =>{
        const move = game.move({
            from: source,
            to: target,
            promotion: 'q',
        })

        if(move === null) return 'snapback'

        window.setTimeout(makeRadomMove, 250);
    recordMove(move.san, moveCount);

    moveCount++;
    };

    const onSnapEnd = () =>{
        board.position(game.fen());
    };

    const boardConfig = {
        showNotation : true,
        draggable : true,
        position : 'start',
        onDragStart,
        onDrop,
        onSnapEnd,
        moveSpeed: 'fast',
        snapBackSpeed: 500,
        snapSpeed: 100,
    };

    board = chessboard('board', boardConfig);
    
})
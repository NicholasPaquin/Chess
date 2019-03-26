$(document).ready(function(){
    let firstClick = false;

    let board = new Board(true);
    let btn = $('#button');
    let move = document.getElementById("moveText");
    btn.click(function(){

       move.value = "";
    });
    let pos1, pos2;
    document.addEventListener("click", function(event){
        let pos = event.target.id;
        let re = new RegExp('[a-h][1-8]');
        if(re.test(pos)) {
            if (!firstClick) {
                pos1 = pos;
                firstClick = true;
            } else {
                pos2 = pos;
                console.log(pos1, pos2);
                board.moveInput(pos1, pos2);
                firstClick = false
            }
        }else{
            firstClick = false;
        }
    });
});

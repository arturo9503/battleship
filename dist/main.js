function Ship(id, length){
    this.id = id;
    this.length = length;
    this.hits = 0;

    let arr = new Array(length);
    for (let i = 0 ; i < length ; i++){
        arr[i] = 0;
    }
    this.arr = arr;

    this.hit = function(){
        this.hits++;
    };

    this.isSunk = function(){
        if (this.hits >= this.length){
            return true;
        }
        else{
            return false;
        }
    }
}

function GameBoard(){
    let arr = new Array(10);
    for (let i = 0 ; i < 10 ; i++){
        arr[i] = new Array(10);
    }
    for (let i = 0 ; i < 10 ; i++){
        for (let j = 0  ; j < 10 ; j++){
            arr[i][j] = 0;
        }
    }
    this.arr = arr;

    this.ships = new Array(Ship);

    this.placeShip = function(length, x, y, dir){
        let id = this.ships.length;
        let ship = new Ship(id, length);
        this.ships.push(ship);
        if (dir == 'x'){
            for (let i = x ; i < x + length ; i++){
                this.arr[i][y] = id;
            }
        }
        else {
            for (let i = y ; i < y + length ; i++){
                this.arr[x][i] = id;
            }
        }
    }

    this.receiveAttack = function(x, y){
        if (this.arr[x][y] != 0 && this.arr[x][y] != -1 && this.arr[x][y] != -2){
            this.ships[arr[x][y]].hits++;
            this.arr[x][y] = -1;
        }
        else if (this.arr[x][y] == 0){
            this.arr[x][y] = -2;
        }
    }

    this.allSunk = function(){
        let len = this.ships.length;
        for (let i = 1 ; i < len ; i++){
            if (!this.ships[i].isSunk()){
                return false;
            }
        }
        return true;
    }
}

function Player(){
    function Attack(GameBoard, x, y){
        GameBoard.receiveAttack(x, y);
    }
}

function DisplayBoard(GameBoard, id){
    this.id = id;
    this.gameBoard = GameBoard;

    const content = document.querySelector('#content');
    let board = document.createElement('div');
    board.classList.add('board');

    content.appendChild(board);
    
    let row = document.createElement('div');
    board.appendChild(row);
    for (let i = 0 ; i <= 10 ; i++){
        let btn = document.createElement('button');
        btn.textContent = i;
        row.appendChild(btn);
    }
    for (let i = 0 ; i < 10 ; i++){
        let row = document.createElement('div');
        let btn = document.createElement('button');
        btn.textContent = i+1;
        row.appendChild(btn);
        for (let j = 0 ; j < 10 ; j++){
            let btn = document.createElement('button');
            if (this.id == 2 && this.gameBoard.arr[i][j] != 0){
                btn.classList.add('ship');
            }
            row.appendChild(btn);
            btn.addEventListener('click', ()=>{
                if (this.gameBoard.arr[i][j] != 0){
                    btn.classList.add('hit');

                }
                else{
                    btn.classList.add('miss');

                }
                this.gameBoard.receiveAttack(i, j);
                console.log(this.gameBoard.arr);
                console.log(this.gameBoard.allSunk());
            });

        }
        board.appendChild(row);
    }
}

let gb1 = new GameBoard();
let gb2 = new GameBoard();

gb1.placeShip(4, 2, 4, 'y');
gb1.placeShip(3, 1, 1, 'x');
gb1.placeShip(2, 6, 7, 'y');

gb2.placeShip(4, 2, 4, 'y');
gb2.placeShip(3, 1, 1, 'x');
gb2.placeShip(2, 6, 7, 'y');


gb1.receiveAttack(2, 4);
gb1.receiveAttack(0, 0);

let displayBoard1 = new DisplayBoard(gb1, 1);
let displayBoard2 = new DisplayBoard(gb2, 2);






console.log(gb1.arr);








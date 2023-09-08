let box = Array.from(document.getElementsByClassName("box"));
let level = Array.from(document.getElementsByClassName("level"));
let boxes = new Array(9);
let x;
let i;
let j;
let number;
let count = 0;
let chance = 3;
let start_btn = true;
let gameover = true;
let array = new Array(9);
let color = Array.from(document.getElementsByClassName("box"));
let interval;

color.forEach(x => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (j == 2 || j == 5 || j == 8) {
                document.getElementById(i + "" + j).classList.add("right-border");
            }
            if (i == 2 || i == 5) {
                document.getElementById(i + "" + j).classList.add("inner-bottom");
            }

        }
    }
});


let random_pattern = [
    [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7]
    ],
    [
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6]
    ],
    [
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ]

];


for (let i = 0; i < 9; i++) {
    boxes[i] = [];
    for (let j = 0; j < 9; j++) {
        boxes[i][j] = "0";
    }
}


level.forEach(x => x.addEventListener('click', (event) => {
    let lvl = event.target.innerHTML;
    count = lvl === "Easy" ? 50 : (lvl === "Medium") ? 40 : 20;
}));



function start() {

    if (start_btn === true && count != 0) {

        let count_patttern = [
            [0, 1, 2],
            [1, 2, 0],
            [2, 0, 1],
            [0, 2, 1],
            [2, 1, 0],
            [1, 0, 2]
        ];

        let value = count_patttern[Math.floor(Math.random() * 3)];

        let rows = 0;

        for (let i = 0; i < 3; i++) {
            let array_random = random_pattern[value[i]];

            let row = 0;

            for (let j = rows; j < rows + 3; j++) {
                array[j] = [];
                for (let z = 0; z < 9; z++) {

                    array[j][z] = array_random[row][z];

                }
                row++;
            }
            rows += 3;
        }

        console.log(array);

        while (count--) {
            let row = Math.floor(Math.random() * 9);
            let col = Math.floor(Math.random() * 9);

            document.getElementById(row + "" + col).innerHTML = array[row][col];
            document.getElementById(row + "" + col).classList.add("permanent");
            boxes[row][col] = array[row][col];

        }

        count = 0;
        start_btn = false;
        box.forEach(x => x.addEventListener('click', clicked));

    }

}




function clicked(e) {

    x = e.target.classList[1];
    i = x.slice(0, 1);
    j = x.slice(-1);
    document.addEventListener('keypress', (enternumber));

}

function checkwinning(boxes) {

    for (let z = 0; z < 9; z++) {
        for (let z1 = 0; z1 < 9; z1++) {
            if (boxes[z][z1] === "0") {
                return true;
            }
        }
    }
    return false;
}

function enternumber(event) {


    if (gameover === true) {

        let classlist = document.getElementById(i + "" + j).classList;

        number = event.key;
        if (!(classlist[classlist.length - 1] === "permanent")) {

            if (number >= "1" && number <= "9") {
                document.getElementById(i + "" + j).innerHTML = number;
                boxes[i][j] = event.key;
            }


            let checkgird = check_gird(i, j, boxes, number);
            let checkcolumn = check_column(i, j, boxes, number);
            let checkrow = check_row(i, j, boxes, number);


            if (checkgird == false || checkrow == false || checkcolumn == false) {

                if (checkgird === false) {

                    let row = (i <= 2) ? 0 : (i <= 5) ? 3 : 6;
                    let col = (j <= 2) ? 0 : (j <= 5) ? 3 : 6;

                    for (let i = row; i < row + 3; i++) {

                        for (let j = col; j < col + 3; j++) {
                            let id = i + "" + j;
                            document.getElementById(id).classList.add("red");

                        }
                    }
                    console.log("\nDuplicate occurs in gird!!");
                }
                if (checkrow === false) {
                    for (let z = 0; z < 9; z++) {
                        let id = z + "" + j;
                        document.getElementById(id).classList.add("red");
                    }

                    console.log("\nDuplicate occurs in row!!");
                }
                if (checkcolumn === false) {

                    for (let z = 0; z < 9; z++) {
                        let id = i + "" + z;
                        document.getElementById(id).classList.add("red");
                    }

                    console.log("\nDuplicate occurs in column!!");
                }


                setTimeout(clear_background, "1000");

            }




        }
    }
    let result = checkwinning(boxes);
    if (result === false) {
        gameover = false;
        document.getElementById("header").innerHTML = "Won!!";


        interval = setInterval(() => {
            box.forEach(x => {
                document.getElementById(x.id).classList.add("won");
            });

        }, 100);



    }
}

function check_gird(i, j, boxes, number) {

    let row = (i <= 2) ? 0 : (i <= 5) ? 3 : 6;
    let col = (j <= 2) ? 0 : (j <= 5) ? 3 : 6;


    for (let z = row; z < row + 3; z++) {

        for (let y = col; y < col + 3; y++) {

            if (!(i == z && j == y)) {

                if (number == boxes[z][y]) {
                    return false;
                }
            }
        }
    }
    return true;
}
function check_row(i, j, boxes, number) {

    for (let z = 0; z < 9; z++) {
        if (!(z == i)) {
            if (number == boxes[z][j]) {

                return false;
            }
        }
    }
    return true;
}
function check_column(i, j, boxes, number) {

    for (let z = 0; z < 9; z++) {
        if (!(z == j)) {
            if (number == boxes[i][z]) {
                return false;
            }
        }
    }
    return true;
}




function clear_background() {

    box.forEach(x => {

        let id = i + "" + j;
        document.getElementById(x.id).classList.remove("red");
        document.getElementById(id).innerHTML = " ";
        boxes[i][j] = "0";

    });

    document.getElementById("header").innerHTML = "Chance remaining :" + --chance;
    if (chance == 0) {
        document.getElementById("header").innerHTML = "Game over!!";
        gameover = false;
    }

}



function restart() {

    box.forEach(x => {
        document.getElementById(x.id).classList.remove("won");
        document.getElementById(x.id).innerHTML = "";
        document.getElementById(x.id).classList.remove("permanent");
    });

    for (let i = 0; i < 9; i++) {
        boxes[i] = [];
        array[i] = [];
        for (let j = 0; j < 9; j++) {
            boxes[i][j] = "0";
            array[i][j] = 0;
        }
    }
    clearInterval(interval);

    start_btn = true;
    gameover = true;
    chance = 3;
    document.getElementById("header").innerHTML = "Let's Play";

}





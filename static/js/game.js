import { gambling_result_func, bonus_func } from './Engine.js';
const play_btn = document.getElementById('play'),
    no_click = document.getElementById('no-click'),
    canvas_div = document.getElementById('canvas_div')

const all_boxes = document.querySelectorAll('.chest')
// after clicing button play user can click all the boxes
play_btn.addEventListener('click', function (){
    no_click.style.display = 'none';
    play_btn.disabled = true;
   all_boxes.forEach(function (chest){
        chest.style.backgroundColor = 'transparent';
        chest.style.pointerEvents = 'auto';
        chest.src = 'static/images/box1.png'
    })
})

//text after win/lose/win with bonus
const typingElement = document.getElementById("typing");

let index = 0; //for typing win/lose/bonus
let bonus = false; //there will be bonus animation when it is true. In case that user will write 'bonus= true' to the console the main mechanic is still in Engine.js so nobady will cheat
if (sessionStorage.getItem('open_boxes') === null) {
    sessionStorage.setItem('open_boxes', 0);
}//wanted to be sure nothing happends to this variable. This is for possibility to play again.


//happend after clicking on box
document.querySelectorAll('.chest').forEach(function (chest) {
    chest.addEventListener('click', function () {

        let open_boxes = sessionStorage.getItem('open_boxes');
        open_boxes++;
        sessionStorage.setItem('open_boxes', open_boxes)
        if (open_boxes === 6){
            sessionStorage.setItem('open_boxes', 0)
            setTimeout(function () {play_btn.disabled = false;}, 4000);
        }
        //result
        const result_from_engine = gambling_result_func();
        const result = result_from_engine[0];
        let text = result_from_engine[1];
        console.log(result); // Outputs 'loss', 'win', or 'win_bonus' based on random number



        //show_animation_func
        show_animation(result)

         all_boxes.forEach(function (chest) {
            chest.style.visibility = 'hidden'
        });
        function typeText() {
            const erase_text = function (){text=""; index=0; typingElement.textContent = "";  console.log(text)}
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            if (result==='loss'){typingElement.style.color= '#bdb402'}
            else if (result==='win'){typingElement.style.color= '#5DFF0B'}
            else {typingElement.style.color= '#ef11ff'}
            setTimeout(typeText, 110);
            } else {setTimeout(erase_text, 1000);}

        }

        setTimeout(typeText, 2000)



        // new picture after opening, after 1s to be sure nobody see results before animations ending
        setTimeout(function (){
            if (result === 'loss') {
                chest.src = 'static/images/box3.png';
                chest.style.backgroundColor = 'grey'
            } else if (result === 'win') {
                chest.src = 'static/images/box2.png'
                chest.style.backgroundColor = 'rgba(84,255,132,0.62)'
            } else if (result === 'win_bonus'){
                chest.src = 'static/images/box2.png'
                chest.style.backgroundColor = 'rgba(255,60,252,0.53)'
            }
            all_boxes.forEach(function (chest) {
                chest.style.visibility = 'visible'
            })

        }, 4000);

        // can't click on it
        chest.style.pointerEvents = 'none';

      });
    });


//Bonus Div activation
let bonus_points_for_animation = 0,
    bonus_points_for_animation_save = 0 //because of the animation
const bonus_div = document.getElementById('bonus_screen');
const activateBonus = () =>{

    bonus_div.style.display = 'block';
    bonus = true;
    const bonus_points = bonus_func()


    bonus_points_for_animation = bonus_points
    bonus_points_for_animation_save = bonus_points;
    //this what is below is becaouse splash on the thermometer, it doesn't effect on result and it increases emotions
    const bonus_points_animation_cant_stop = [2,3,6,7,10,11,15]
    if (bonus_points_animation_cant_stop.includes(bonus_points_for_animation)){
        bonus_points_for_animation += 2;
    }
    show_animation()
}


let canvas = document.getElementById('canvas');
const canvas2 = document.getElementById('canvas2');
const change_canvas = () => {
    canvas = canvas2
}
const default_canvas_setting = () => {
    canvas = document.getElementById('canvas');
}
// Animation before clicking at boxes
const show_animation = (result) => {
    canvas_div.style.display = 'block';
    // play_btn.style.visibility = 'hidden';
    const
        ctx = canvas.getContext('2d'),
        CANVAS_WIDTH = canvas.width = 550,
        CANVAS_HEIGHT = canvas.height = 600,
        spriteWidth = 555.5,
        spriteHeight = 553;
        const animation_img = new Image();
        animation_img.src = 'static/images/animation.webp';


    let frameX = 0,
        frameY = 0;
    let game_frame = 0 //speed control
    let stop = false,
        pause_score = 0,
        wait = 0,
        win_in_coins = 0;
    const totalFrames = 9 ;
    let r = 65, g = 105, b = 225, a = 1;  //bonus bg

    const animate = () => {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.drawImage(animation_img, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        //in case of win there is blinking and frame =1
        if (result==='win'){
                //blinking
                const blinking = () =>{
                    const golden_bg = () => {
                        document.getElementById('img_box').style.backgroundColor ='rgba(255, 215, 0, 0.5)'
                    }
                    const normal_bg = () => {
                        document.getElementById('img_box').style.backgroundColor ='#162f70'
                    }
            const timeouts = [0, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 3800];

                setTimeout(() => normal_bg(), timeouts[0]);
                setTimeout(() => golden_bg(), timeouts[1]);
                setTimeout(() => normal_bg(), timeouts[2]);
                setTimeout(() => golden_bg(), timeouts[3]);
                setTimeout(() => normal_bg(), timeouts[4]);
                setTimeout(() => golden_bg(), timeouts[5]);
                setTimeout(() => normal_bg(), timeouts[6]);
                setTimeout(() => golden_bg(), timeouts[7]);
                setTimeout(() => normal_bg(), timeouts[8]);
            };

                frameY = 1;
                if (pause_score === 0) {
                    blinking();
                }
            }

        //in case this is bonus
        if (result==='win_bonus'){
            frameY = 2
        }

        if (bonus=== true && frameX===9){
            frameY++;
        }
        //wait moment before bonus
        if (bonus=== true && wait===0){
            wait++;
            pause_score =-50
            frameY = 3
        }
        let bonus_points2 = bonus_points_for_animation-9
        // its for animation, becouse frame X will be 0 after 9
        // if somebody checking this sorry for if, elifs, i didnt find easier way, wanted only one func for animations
        if (pause_score>50) {
            if (bonus === false) {
                if (game_frame % 7 === 0) {
                    frameX++;
                    if (frameX === 9) {
                        stop = true;
                    }
                }
            //     bonus is on
            } else if (bonus === true){
                if (game_frame % 8 === 0){
                    //as bonus growing background more pink like bonus color, but not more than 255, becaouse of err

                    if (frameX<= bonus_points_for_animation){

                        r = Math.min(r + 4, 255);
                        g = Math.min(g - 2, 255);
                        b = Math.min(b - 3, 255);

                // background color changes
                        document.getElementById('bonus_screen').style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                        frameX++

                        if (frameX === 9 && frameY === 3){
                            bonus_points_for_animation -= 9
                            frameX = 0;
                            frameY = 4
                        } else if (frameX === 9 && frameY === 4){ //in case of highest amount
                            frameX = 0;
                            frameY = 5;
                            bonus_points_for_animation -= 9
                        }
                    } else{
                        console.log(bonus_points_for_animation_save, "BN")
                        if (bonus_points_for_animation_save<2){
                            win_in_coins = "No Bonus"
                        }
                        else if (bonus_points_for_animation_save<6){
                            win_in_coins = 500
                        } else if (bonus_points_for_animation_save<10){
                            win_in_coins = 1000
                        } else if (bonus_points_for_animation_save< 15){
                            win_in_coins = 1500
                        } else {win_in_coins= 2000}
                        stop= true;
                        default_canvas_setting()
                        document.getElementById("win_amount_h2").innerText = `${win_in_coins}`
                        setTimeout(function (){
                            bonus = false;
                            bonus_div.style.backgroundColor = '#3556bd'
                            bonus_div.style.display= 'none'
                            document.getElementById("win_amount_h2").innerText = ""
                        }, 3000)
                    }
                }
            }
        }

        pause_score++;

        game_frame++;

        if (stop=== false) {
            requestAnimationFrame(animate);
        } else {
            setTimeout(function (){
                pause_score = 0;
                canvas_div.style.display = 'none';
                play_btn.style.visibility = 'visible';
                ///in case of BONUS
                if (result=== "win_bonus"){change_canvas(); activateBonus();}
            }, 2000)
        }
    };


    animation_img.onload = animate;
};




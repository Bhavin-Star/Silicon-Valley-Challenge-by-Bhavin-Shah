var virus, virusImg, player, player2, player3, playerImg, playerImg2, playerImg3, bg, bg2, virusGroup, score, endSound, scoreSound,
restart1, restartImg, start, startImg, covidSound, soapSound, mask, maskImg, maskGroup, muteImg, unmuteImg, sound,
sanitizerImg, sanitizer, sanitizerGroup, next, nextImg

var gamestate = -1;
var count = 0;

// 0 - Sound Unmute
// 1 - Sound Mute

function preload(){
   
    virusImg = loadImage('images/virus.png');
    bg = loadImage('images/bg.jpg');
    bg2 = loadImage('images/bg2.jpg')
    playerImg = loadImage('images/plr.png');
    restartImg = loadImage('images/restart.png');
    startImg = loadImage('images/button.png');
    sanitizerImg = loadImage('images/sntz.jpg')
    playerImg2 = loadImage('images/plr2.png');
    playerImg3 = loadImage('images/plr3.png');
    pauseImg = loadImage('images/pause.png');
    playImg = loadImage('images/play.png');
    nextImg = loadImage('images/next.jpg');
    maskImg = loadImage('images/mask.png');
    muteImg = loadImage('images/mute.png');
    unmuteImg = loadImage('images/unmute.png');

    endSound = loadSound('sounds/end.mp3');
    scoreSound = loadSound('sounds/checkPoint.mp3');
    soapSound = loadSound('sounds/soapSound.mp3');
    
}

function setup(){
    createCanvas(windowWidth,windowHeight)

    player = createSprite(100,windowHeight/2,50,50);    
    player.addImage(playerImg);
    player.scale = 0.3;

    player2 = createSprite(100,windowHeight/2,50,50);    
    player2.addImage(playerImg2);
    player2.scale = 0.3;
    
    player3 = createSprite(100,windowHeight/2,50,50);    
    player3.addImage(playerImg3);
    player3.scale = 0.3;

    virusGroup = createGroup();
    score = 0;

    restart1 = createSprite(windowWidth/2 + 65,windowHeight/2 - 110,50,50);
    restart1.addImage(restartImg);
    restart1.scale = 0.5;

    start = createSprite(windowWidth/2 + 25,50,50,50);
    start.addImage(startImg);
    start.scale = 0.4;

    next = createSprite(windowWidth/2 + 25,100,50,50);
    next.addImage(nextImg);
    next.scale = 0.5;
    next.visible = false;
    /*
    sound = createSprite(windowWidth-75,75, 50, 50);
    sound.addImage(muteImg);
    sound.scale = 0.15;
    */
    sanitizerGroup = createGroup();
    maskGroup = createGroup();

    
    
}

function draw(){
    background('green');

    imageMode(CENTER);
    image(bg,windowWidth/2, windowHeight/2, windowWidth, windowHeight);
    console.log(count);
   
    //mousePressed();
   // mousePressed();

    if(gamestate == -1){
        
        endSound.stop();
        start.visible = false;
        restart1.visible = false;
        player.visible = true;
        player2.visible = true;
        maskGroup.destroyEach();
        sanitizerGroup.destroyEach();

        player.x = 600;
        player.y = 450;
        
        player2.x = 790;
        player2.y = 450;

        player3.x = 980;
        player3.y = 450;

        if(mousePressedOver(player) && gamestate == -1){
            player.addImage(playerImg);
            gamestate = 0;
        }

        if(mousePressedOver(player2) && gamestate == -1){
            player.addImage(playerImg2);
            gamestate = 0;
        }

        if(mousePressedOver(player3) && gamestate == -1){
            player.addImage(playerImg3);
            gamestate = 0;
        }

        textSize(40);
        fill('cyan');
        text('Corona Game by Bhavin Shah',windowWidth/2 - 240, 80);

        textSize(28)
        fill(255);
        text('Choose your character by clicking on it', windowWidth/2 - 200, 300);

        strokeWeight(4);
        stroke('yellow');
        line(400,230,1200,230);
        line(400,230,400,630);
        line(400,630,1200,630);
        line(1200,630,1200,230);

        strokeWeight(4);
        stroke('silver');
        line(465,98,1115,98);
        
        drawSprites();
    }

    if(gamestate == 0){

        endSound.stop();
        maskGroup.destroyEach();
        sanitizerGroup.destroyEach();
        start.visible = true;
        player.visible = false;
        restart1.visible = false;
        player2.destroy();
        player3.destroy();

        if(mousePressedOver(start) && gamestate == 0){
            startF();
        }

        textSize(20);
        fill('yellow');
        text('Corona Virus have spread largely over the world.', windowWidth/2-175, 110);
        text('It is harming the life of many people whether it is physical, mental or financial.', windowWidth/2-285,150);
        text('But most people are still going out of their homes just unnecessarily and this also a cause for the increase of the virus.',windowWidth/2 - 450,190);
        text('So to have fun and make people aware this game is made.',windowWidth/2-225,230)

        textSize(26);
        fill('red');
        text('Rules', windowWidth/2 - 5, 270);

        textSize(22);
        fill('cyan');
        text('The objective of the game is to prevent the player from touching the virus.', windowWidth/2 - 350, 310);
        text('If a player touches the virus or goes out of the screen, the player loses the game.', windowWidth/2 - 380, 350);
        text('Use the arrow keys to move up, down, left, right and the space key to stop.',windowWidth/2 - 350,390);
        text('Use the mask to increase the score and the sanitizer to remove the virus by touching them.',windowWidth/2 - 430,430);
        text('As the score increases, virus starts coming from different directions.', windowWidth/2 - 320,470);
        
        drawSprites();
    }
    

    if(gamestate == 1){
        
        spawnVirus();
        spawnSanitizer();
        spawnMask();
        restart1.visible = false;
        start.visible = false;
        player.visible = true; 
        player2.destroy();
        player3.destroy;
        endSound.stop();

        score = score + Math.round(getFrameRate()/60);
        textSize(28)
        fill('white');
        text ("Score: " + score, 50,50);  

        if(gamestate == 1 && score > 0 && score % 200 == 0){
            scoreSound.play();
        }

        
        if(player.isTouching(virusGroup)){
            gamestate = 2
            endSound.play();
        }

        if(player.isTouching(sanitizerGroup)){
            virusGroup.destroyEach();
            sanitizerGroup.destroyEach();
            soapSound.play();
        }

        if(player.isTouching(maskGroup)){
            maskGroup.destroyEach();
            score = score + 200;
            soapSound.play();
        }

         if(score > 500){
             spawnVirusfromUp();
         }

         if(score > 1000){
            spawnVirusfromDown();
        }

        if(score > 1500){
            spawnVirusfromLeft();
        }

        if(player.x < 0 || player.x > windowWidth || player.y < 0 || player.y > windowHeight){
            gamestate = 2;
            endSound.play();
        }

        drawSprites();
    }

    if(gamestate == 2){
        
        imageMode(CENTER);
        image(bg2,windowWidth/2, windowHeight/2, windowWidth, windowHeight);
        
        maskGroup.destroyEach();
        sanitizerGroup.destroyEach();
        start.visible = false;
        player2.destroy();
        player3.destroy;

        virusGroup.destroyEach();
        player.visible = false;

        if(mousePressedOver(restart1) && gamestate == 2){
            restart();
          }

        restart1.visible = true;

        sanitizerGroup.destroyEach();
        
        textSize(28)
        fill('white');
        text ("Your Score: " + score, windowWidth/2 - 40, windowHeight/2 + 50); 

        textSize(28)
        fill('cyan');
        text('You Lose', windowWidth/2, windowHeight/2 - 50);

        textSize(28);
        fill('yellow');
        text('You have been affected by Covid - 19', windowWidth/2 - 150, windowHeight/2);
        

        drawSprites();

            
        }
    
}   

function spawnVirus(){
    if(World.frameCount % 70 == 0){
        virus = createSprite(windowWidth,random(100,windowHeight-100),50,50)
        virus.velocityX = -3
        virus.addImage(virusImg);
        virus.scale = 0.04;  
        virusGroup.add(virus);    
        virus.lifetime = 900;  
    }

    
}

function spawnVirusfromUp(){
    if(World.frameCount % 80 == 0){
        virus = createSprite(random(300,windowWidth),0,50,50)
        virus.velocityY = 3
        virus.addImage(virusImg);
        virus.scale = 0.04;  
        virusGroup.add(virus);      
        virus.lifetime = 900;
    }

    
}

function spawnVirusfromDown(){
    if(World.frameCount % 90 == 0){
        virus = createSprite(random(300,windowWidth),windowHeight,50,50)
        virus.velocityY = -3
        virus.addImage(virusImg);
        virus.scale = 0.04;  
        virusGroup.add(virus);      
        virus.lifetime = 900;
    }

    
}

function spawnVirusfromLeft(){
    if(World.frameCount % 90 == 0){
        virus = createSprite(0,random(100,windowHeight-100),50,50)
        virus.velocityX = 3
        virus.addImage(virusImg);
        virus.scale = 0.04;  
        virus.lifetime = 900;
        virusGroup.add(virus);      
    }

    
}

function keyPressed(){

    if(gamestate == 1){
    
    if(keyCode == 39){
        player.velocityX = 4;
        player.velocityY = 0;
        
    }
    
    else if(keyCode == 38){
        player.velocityY = -4;
        player.velocityX = 0;
        
    }

    else if(keyCode == 37){
        player.velocityX = -4;
        player.velocityY = 0;
        
    }

    else if(keyCode == 40){
        player.velocityY = 4;
        player.velocityX = 0;
        
    }

    else if(keyCode == 32){

        player.velocityX = 0;
        player.velocityY = 0;
    }
    }

    
}

function restart(){

    gamestate = -1;
    score = 0;
    player.x = 100;
    player.y = displayHeight/2;
    player.velocityX = 0;
    player.velocityY = 0;
    player.addImage(playerImg);

    player2 = createSprite(100,windowHeight/2,50,50);    
    player2.addImage(playerImg2);
    player2.scale = 0.3;
    
    player3 = createSprite(100,windowHeight/2,50,50);    
    player3.addImage(playerImg3);
    player3.scale = 0.3;
    
}

function startF(){

    gamestate = 1;
    score = 0;
    player.visible = false;
    player.x = 100;
    player.y = displayHeight/2;
    player.velocityX = 0;
    player.velocityY = 0;
    
}

function spawnSanitizer(){

    if(World.frameCount % 1000 == 0 && sanitizerGroup <= 1 && gamestate == 1){
    
    sanitizer = createSprite(random(100,windowWidth - 100), random(100,windowHeight - 100), 50, 50);
    sanitizer.addImage(sanitizerImg);
    sanitizer.scale = 0.15;
    sanitizerGroup.add(sanitizer);
    }
}

function spawnMask(){

    if(World.frameCount % 800 == 0 && maskGroup <= 1 && gamestate == 1){
    
    mask = createSprite(random(100,windowWidth - 100), random(100,windowHeight - 100), 50, 50);
    mask.addImage(maskImg);
    mask.scale = 0.1;
    maskGroup.add(mask);
    }
}

/*
function mousePressed(){
   
    if(mousePressedOver(sound) && count == 0){
        count = 1;
        sound.addImage(muteImg);
       
        if(player.isTouching(virusGroup)){
            endSound.play();
        }
    
        if(player.isTouching(maskGroup) || player.isTouching(sanitizerGroup)){
            soapSound.play();
        }
    
        if(score > 0 && score % 200 == 0){
            scoreSound.play();
        }

        sound.x = windowWidth - 75;
        sound.y = 75;
    }

    else if(mousePressedOver(sound) && count == 1){
        count = 0;
        sound.addImage(unmuteImg);
       
            endSound.pause();
            soapSound.pause();
            scoreSound.pause();

            sound.x = windowWidth - 175;
            sound.y = 75;
    }

    if(count == 0){
        textSize(28);
        fill('yellow');
        text('Your speakers are unmuted!',100,100);
    }

    else if(count == 1){
        textSize(28);
        fill('yellow');
        text('Your speakers are muted!',100,100);
    }
}
*/

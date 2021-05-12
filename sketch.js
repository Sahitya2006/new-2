var dog, happyDog, database, foodS, foodStock
var dogImg, dog1Img;
var fedTime, lastFed;
var foodObj,addFood,feed;
var nameb;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  dog1Img = loadImage("images/dogImg1.png");
  bcgImage = loadImage("images/bcg.jpg");
  nameb = loadImage("images/download.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1100, 500);

  foodObj = new Food;

  dog = createSprite(850,300,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.16;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(20);

  nameB = createSprite(550,200,150,100);
  nameB.addImage(nameb);

  feed = createButton("Feed Trixy")
  feed.position(550,500)
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food For Trixy")
  addFood.position(750,500)
  addFood.mousePressed(addFoods)
 
}

function draw() {
  background(bcgImage);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);

  text("Last Feed : 12 PM",350,30);

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(dog1Img);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
  Food:foodS
  })
}



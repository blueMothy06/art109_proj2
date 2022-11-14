var canvas, stage;

var mouseTarget; // the display object currently under the mouse, or being dragged
var dragStarted; // indicates whether we are currently in a drag operation
var offset;
var update = true;
//make arrays for obj

let objs = [];

// this is to progress narration or whatever
let story = 0;

function init() {
  examples.showDistractor();
  // create stage and point it to the canvas:
  canvas = document.getElementById("testCanvas");
  stage = new createjs.Stage(canvas);

  // enable touch interactions if supported on the current device:
  createjs.Touch.enable(stage);

  // enabled mouse over / out events
  stage.enableMouseOver(20);
  stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas

  // load the source image:
  var image4 = new Image();
  image4.src = "./assets/stage3/img4.png";
  image4.onload = handleImageLoad2;
  //  image4.addEventListener("click", onClick());
  story++;

  var image = new Image();
  image.src = "./assets/stage3/img2.png";
  image.onload = handleImageLoad;

  var image2 = new Image();
  image2.src = "./assets/stage3/img3.png";
  image2.onload = handleImageLoad;

  var image3 = new Image();
  image3.src = "./assets/stage3/img1.png";
  image3.onload = handleImageLoad;
}

// FOR GENERATED OBJECTS
function handleImageLoad(event) {
  var image = event.target;
  var bitmap;
  var container = new createjs.Container();
  stage.addChild(container);

  // create and populate the screen with random objects:
  for (var i = 0; i < 30; i++) {
    bitmap = new createjs.Bitmap(image);
    container.addChild(bitmap);
    objs.push(bitmap);
    bitmap.x = canvas.width * Math.random() | 0;
    bitmap.y = canvas.height * Math.random() | 0;
    bitmap.rotation = 360 * Math.random() | 0;
    bitmap.regX = bitmap.image.width / 2 | 0;
    bitmap.regY = bitmap.image.height / 2 | 0;
    bitmap.scale = bitmap.originalScale = Math.random() * 0.4 + 0.6;
    bitmap.name = "bmp_" + i;
    bitmap.cursor = "pointer";

    // using "on" binds the listener to the scope of the currentTarget by default
    // in this case that means it executes in the scope of the button.
    bitmap.on("mousedown", function(evt) {
      this.parent.addChild(this);
      this.offset = {
        x: this.x - evt.stageX,
        y: this.y - evt.stageY
      };
    });

    // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
    bitmap.on("pressmove", function(evt) {
      this.x = evt.stageX + this.offset.x;
      this.y = evt.stageY + this.offset.y;
      // indicate that the stage should be updated on the next tick:
      update = true;
    });

    bitmap.on("rollover", function(evt) {
      this.scale = this.originalScale * 1.2;
      update = true;
    });

    bitmap.on("rollout", function(evt) {
      this.scale = this.originalScale;
      update = true;
    });

  }
console.log(objs);
  examples.hideDistractor();
  createjs.Ticker.addEventListener("tick", tick);
}

// FOR ENDING IMG
function handleImageLoad2(event) {
  var image = event.target;
  var bitmap;
  var container = new createjs.Container();
  stage.addChild(container);

  // generate image
  bitmap = new createjs.Bitmap(image);
  container.addChild(bitmap);
  bitmap.x = canvas.width * Math.random() | 0;
  bitmap.y = canvas.height * Math.random() | 0;
  bitmap.rotation = 360 * Math.random() | 0;
  bitmap.regX = bitmap.image.width / 2 | 0;
  bitmap.regY = bitmap.image.height / 2 | 0;
  bitmap.scale = bitmap.originalScale = Math.random() * 0.4 + 0.6;
  bitmap.cursor = "pointer";

  // using "on" binds the listener to the scope of the currentTarget by default
  // in this case that means it executes in the scope of the button.
  bitmap.on("mousedown", function(evt) {
    story++;
    console.log("was clicked!");
    bitmap.scale = bitmap.originalScale = 2;
    //      bitmap.regX = 0;
    // for (var i = 0; i < 90; i++) {
    //   objs.pop(objs[i]);
    // }
    stage.removeChild(evt.target);
    stage.update();
  });

  bitmap.on("rollover", function(evt) {
    this.scale = this.originalScale * 1.2;
    update = true;
  });

  bitmap.on("rollout", function(evt) {
    this.scale = this.originalScale;
    update = true;
  });

  examples.hideDistractor();
  createjs.Ticker.addEventListener("tick", tick);

}


function stop() {
  createjs.Ticker.removeEventListener("tick", tick);
}

function tick(event) {
  // this set makes it so the stage only re-renders when an event handler indicates a change has happened.
  if (update) {
    update = false; // only update once // edit by cat: remember to tinker with this once clickable stuff works
    stage.update(event);
  }
  if (story == 0) {
    console.log("start");
  } else if (story == 1) {
    console.log("TICK!!!");
    // stop();
  }
}

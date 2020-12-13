var CANVAS_ID = 'canvas';
var TIME_STEP = 1

// Event Handler for Window Size Change
function updateWindowSize() {

    width = getWidth();
    height = getHeight();

}

// Fetches Window Width
function getWidth() {

    return window.innerWidth;

}

// Fetches Window Height
function getHeight() {

    return window.innerHeight;
}

// Assigns event handler for window size change
window.onresize = updateWindowSize;

var width = getWidth();
var height = getHeight();

var items = []

function init_canvas() {
            
    // Get Canvas Element by ID
    var canvas = document.getElementById(CANVAS_ID);
    canvas.width = width*0.95
    canvas.height = height*0.95


    // Checks the canvas is available for drawing
    if (!canvas.getContext) return;

    // use getContext to use the canvas for drawing
    var ctx = canvas.getContext('2d');
    
    // Draws a single square
    a = new Square(200,200,10,10,[-5,-5])
    b = new Square(30,30,10,10,[5,5])

    items.push(a);
    items.push(b);

    requestAnimationFrame(run_sim);
    x=0;
}

var x = 0;
function run_sim() {

    clear_canvas();
    update_canvas();
    paint();
    
    window.requestAnimationFrame(run_sim); 

}

function update_canvas() {
    // Collision queue to store pending changes
    var collision_queue = []

    var canvas = document.getElementById(CANVAS_ID);     
    for (item of items) {
        item.do_step(TIME_STEP);
    }
    var action = []
    // Detect Collisions with walls
    for (item of items) {
        if (item.x+item.width>canvas.width || item.x < 0) {
            // Subtracts 2 lots of the relevant velocity
            action = [item,0,0,-2*item.v[0],0];
            collision_queue.push(action)
        }

        if (item.y+item.height>canvas.height || item.y < 0) {
            // Subtracts 2 lots of the relevant velocity
            action = [item,0,0,0,-2*item.v[1]];
            collision_queue.push(action)
        }
    }

    for (action of collision_queue) {
        i = action[0]
        i.update(action);
    }
}

function clear_canvas() {

    var canvas = document.getElementById(CANVAS_ID);     
    var c = canvas.getContext('2d');     
    c.clearRect(0,0,canvas.width,canvas.height);


}

function paint() {

    var context = canvas.getContext('2d');     
    for (shape of items) {
        shape.draw(context);
    }

}

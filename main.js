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
    a = new Square(200,200,50,50,[-5,-5])
    b = new Square(30,30,50,50,[5,5])
    c = new Square(80,400,50,50,[1,5])
    d = new Square(600,10,50,50,[1,5])

    items.push(a);
    items.push(b);
    items.push(c);
    items.push(d);

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
    var canvas = document.getElementById(CANVAS_ID);  
    // Collision queue to store pending changes
    var collision_queue = []

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

    // Bounding Box Collision Detection
    var bounding_boxes = []
    for (item of items) {
        bounding_boxes.push(item.getBoundingBox())
    }
    var i=0;
    for (i=0; i<items.length;i++) {
        for (j=i+1;j<items.length;j++) {
            if (bounding_intersection_check(bounding_boxes[i], bounding_boxes[j])) {
                console.log('COLLISION!!!')
                v1 = items[i].v
                v1_t = get_vec(bounding_boxes[i],bounding_boxes[j])
                v2 = items[j].v
                v2_t = vec_mul(v1_t,-1)
                console.log(v1_t)
                console.log(v2_t)
                v1_parallel = vec_mul(v1_t,dotp(v1,v1_t)/(mag(v1_t)**2))
                v1_perp = vec_sub(v1,v1_parallel)
                res = vec_add(v1_perp, vec_mul(v1_parallel,-1))
                t = vec_sub(res,v1)
                console.log(dotp(v1,v1_t))
                console.log(v1_perp)
                action = [items[i],0,0,t[0],t[1]];
                collision_queue.push(action)

                v2_parallel = vec_mul(v2_t,dotp(v2,v2_t)/(mag(v2_t)**2))
                v2_perp = vec_sub(v2,v2_parallel)
                res = vec_add(v2_perp, vec_mul(v2_parallel,-1))
                t = vec_sub(res,v2)

                action = [items[j],0,0,t[0],t[1]];
                collision_queue.push(action)
                console.log(action)

            }
        }
    }

    for (action of collision_queue) {
        i = action[0]
        i.update(action);
    }

       
    for (item of items) {
        item.do_step(TIME_STEP);
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

function bounding_intersection_check(box1, box2) {

    xmatch = false;
    ymatch = false;
    
    if (box1.x > box2.x && box1.x < box2.x+box2.width) {
        xmatch = true
    }
    if (box2.x > box1.x && box2.x < box1.x+box1.width) {
        xmatch = true
    }
    if (box1.y > box2.y && box1.y < box2.y+box2.height) {
        ymatch = true
    }
    if (box2.y > box1.y && box2.y < box1.y+box1.height) {
        ymatch = true
    }

    return (xmatch && ymatch)
}

function get_vec(box1, box2) {

    relx = box2.x - box1.x;
    rely = box2.y - box1.y;

    return [relx, rely]

}
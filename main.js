var CANVAS_ID = 'canvas';
var TIME_STEP = 1
var MAX_OBJS = 15
var COLOUR_TIME = 10

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
    canvas.width = width*0.99
    canvas.height = height*0.90


    // Checks the canvas is available for drawing
    if (!canvas.getContext) return;

    // Adds Click event listener
    canvas.addEventListener('mousedown', e => {
        const rect = canvas.getBoundingClientRect()
        vx = (Math.random()-0.5)*10
        vy = (Math.random()-0.5)*10
        x = e.clientX - rect.left
        y = e.clientY - rect.top
        a = new Square(x,y,50,50,[vx,vy])
        if (items.length >= MAX_OBJS) {
            items.shift()
        }
        items.push(a)
    })

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

function update_colours() {

    for (item of items) {
        item.colliding--;
    }
}



// Main Game Loop
function run_sim() {

    clear_canvas();
    update_colours();
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

    for (var i=0; i<items.length;i++) {
        for (var j=i+1;j<items.length;j++) {
            console.log(i)
            if (bounding_intersection_check(bounding_boxes[i], bounding_boxes[j])) {
                
                v1 = items[i].v
                v2 = items[j].v

                items[i].colliding = COLOUR_TIME
                items[j].colliding = COLOUR_TIME

                // Vector between bounding box centres
                vCollision = get_vec(bounding_boxes[i],bounding_boxes[j]) 

                // Unit Vector in direction between bounding box centres
                collisionDir = vec_mul(vCollision,1/(mag(vCollision))) 

                // Relative velocity of v1 to v2.
                // If vrel > 0, object 1 is moving to the right relative to object 2
                // If vrel < 0, object 1 is moving to the left relative to it object 2.
                // Can think of it as locking object 2 and watching object 1 move.
                vRel = [v1[0]-v2[0],v1[1]-v2[1]]
                
                // Resolves relative velocity parallel to collision vector.
                // Gives parallel relative speed.
                para_speed_rel = dotp(vRel,collisionDir)
                
                /* Relative motion opposite to collision vector. => Already moving apart so no more colliding needs
                    to be done. */
                if (para_speed_rel<0) {
                    continue;
                }

                action = [items[i],0,0,-para_speed_rel*collisionDir[0],-para_speed_rel*collisionDir[1]];
                collision_queue.push(action)
                console.log(action)

                action = [items[j],0,0,para_speed_rel*collisionDir[0],para_speed_rel*collisionDir[1]];
                collision_queue.push(action)

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
var CANVAS_ID = 'canvas';
var TIME_STEP = 1
var MAX_OBJS = 15
var COLOUR_TIME = 10

first = true;

COLLISION_MODE = 0
REBOUND_MODE = 0

// List of Collision Detection Functions

collision_funcs = [bounding_intersection_check, sat_check]
collision_setup = [pass, pass]

// List of Rebound Functions

rebound_funcs = [no_momentum_rebound, bad_rebound]


// Dummy function for collisions requiring no setup.
function pass() {
    console.log('No Setup')
}

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

function canvasClickHandler(e) {
    const rect = canvas.getBoundingClientRect()
    if (first) {
        vx = 20
        vy = 20
        first = false;
    } else {
        vx = (Math.random()-0.5)*20
        vy = (Math.random()-0.5)*20
    }
    
    x = e.clientX - rect.left
    y = e.clientY - rect.top
    a = new Square(x,y,50,50,[vx,vy])

    // Delete an extra item when over the count
    if (items.length > MAX_OBJS) {
        items.shift()
    }
    if (items.length >= MAX_OBJS) {
        items.shift()
    }
    items.push(a)
}

window.onclick = function(event) {

    if (!event.target.matches('.drop_button')) {
        var dropdowns = document.getElementsByClassName("options");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
        }
    }
    
}

// Set collision mode
function set_collision(mode) {
    COLLISION_MODE = mode
}

// Set collision mode
function set_rebound(mode) {
    REBOUND_MODE = mode
}

function expandDropdown(id) {
    document.getElementById(id).classList.toggle("show");
  }

// Assigns event handler for window size change
window.onresize = updateWindowSize;


var width = getWidth();
var height = getHeight();

var items = []

function init_canvas() {
            
    // Get Canvas Element by ID
    var canvas = document.getElementById(CANVAS_ID);
    canvas.width = width*0.995
    canvas.height = height*0.89


    // Checks the canvas is available for drawing
    if (!canvas.getContext) return;

    // Adds Click event listener
    canvas.addEventListener('mousedown', canvasClickHandler)

    // use getContext to use the canvas for drawing
    var ctx = canvas.getContext('2d');


    // Added starting layout to spell out the word 'ICE'
    // Block from 0 to width/3, width/3 to 2*width/3, 2*width/3 to width

    var top = canvas.height/3
    var bottom = 2*canvas.height/3
    var wd = Math.min(canvas.width,canvas.height)/15

/*
    a = new Square(50,50,50,50,[1,0])
    b = new Triangle([[100,100],[200,200],[180,100]],[1,0])
    //b = new Square(200,200,50,50,[1,1])
    items.push(a);
    items.push(b);
*/

    
    // Letter I
    var i_block_centre = canvas.width/3 * 0.5
    var offset = (bottom-top)*1/3
    a = new Square(i_block_centre,bottom-offset,wd,wd, [0,0]);
    b = new Square(i_block_centre,top+offset,wd,wd, [0,0]);
    c = new Square(i_block_centre,top,wd,wd, [0,0]);
    d = new Square(i_block_centre,bottom,wd,wd, [0,0]);

    // Letter C
    var c_block_centre = canvas.width/2
    var c_left = c_block_centre - (canvas.width/3 *0.25*0.5)
    var c_right = c_block_centre + (canvas.width/3 *0.25*0.5)
    var offset = (bottom-top)*1/3
    e = new Square(c_left,top+offset,wd,wd, [0,0]);
    f = new Square(c_left,bottom-offset,wd,wd, [0,0]);
    g = new Square(c_left,top,wd,wd, [0,0]);
    h = new Square(c_left,bottom,wd,wd, [0,0]);
    i = new Square(c_right,top,wd,wd, [0,0]);
    j = new Square(c_right,bottom,wd,wd, [0,0]);
    r = new Square(c_left+(c_right-c_left)*1/2,bottom,wd,wd, [0,0]);
    s = new Square(c_left+(c_right-c_left)*1/2,top,wd,wd, [0,0]);

    // Letter E
    var e_block_centre = (2*canvas.width/3 + canvas.width) * 0.5
    var e_left = e_block_centre - (canvas.width/3 *0.25*0.5)
    var e_right = e_block_centre + (canvas.width/3 *0.25*0.5)
    var offset = (bottom-top)*1/4
    var mid = (bottom-top)*1/2
    k = new Square(e_left,top+offset,wd,wd, [0,0]);
    l = new Square(e_left,top,wd,wd, [0,0]);
    m = new Square(e_left,bottom-offset,wd,wd, [0,0]);
    n = new Square(e_left,bottom,wd,wd, [0,0]);
    o = new Square(e_right, top,wd,wd, [0,0]);
    p = new Square(e_right, bottom,wd,wd, [0,0]);
    q = new Square(e_right, top+mid,wd,wd, [0,0]);
    t = new Square(e_left+(e_right-e_left)*1/2,bottom,wd,wd, [0,0]);
    u = new Square(e_left+(e_right-e_left)*1/2,top,wd,wd, [0,0]);
    v = new Square(e_left+(e_right-e_left)*1/2,top+mid,wd,wd, [0,0]);
    w = new Square(e_left,top+mid,wd,wd, [0,0]);

    items.push(a);
    items.push(b);
    items.push(c);
    items.push(d);
    items.push(e);
    items.push(f);
    items.push(g);
    items.push(h);
    items.push(i);
    items.push(j);
    items.push(k);
    items.push(l);
    items.push(m);
    items.push(n);
    items.push(o);
    items.push(p);
    items.push(q);
    items.push(r);
    items.push(s);
    items.push(t);
    items.push(u);
    items.push(v);
    items.push(w);
    
    requestAnimationFrame(run_sim);
}

// Decays colours over time
function update_colours() {

    for (item of items) {
        item.colliding--;
    }
}


// Main Game Loop
function run_sim() {

    clear_canvas();
    update();
    update_colours();
    paint();
    
    window.requestAnimationFrame(run_sim); 

}

function do_wall_collision() {

    var action = []
    var collision_queue = []

    // Plenty of Performance Enhancements Here
    /* Cascading else-ifs: Doesn't handle crossing both sides on the same tick
        but saves plenty of comparisons */
    /* Performs velocity checks inside the ifs because we want an immediate continue
        after them */
    //Must check velocity to ensure that a rebound hasn't already occurred
    for (item of items) {
        if (item.max_x()>canvas.width) {
            if (item.v[0]<0) {
                continue;
            }
            action = [item,0,0,-2*item.v[0],0];
            collision_queue.push(action)

        }
        else if (item.min_x()< 0) {
            if (item.v[0]>0) {
                continue;
            }
            action = [item,0,0,-2*item.v[0],0];
            collision_queue.push(action)

        }
        else if (item.max_y()>canvas.height) {
            if (item.v[1]<0) {
                continue;
            }
            action = [item,0,0,0,-2*item.v[1]];
            collision_queue.push(action)
        } 
        else if (item.min_y() < 0)   {
            if (item.v[1]>0) {
                continue;
            }
            action = [item,0,0,0,-2*item.v[1]];
            collision_queue.push(action)
        }
    }
    return collision_queue
}





// Main update function for doing simulation logic.
function update() {
    
    bounding_intersection_setup()
    console.log(bounding_boxes)
    // Collision queue to store pending changes
    // Check items for wall collisions
    var collision_queue = do_wall_collision()

    collision_setup[COLLISION_MODE]() //bounding_intersection_setup()

    for (var i=0; i<items.length;i++) {
        for (var j=i+1;j<items.length;j++) {
            if (collision_funcs[COLLISION_MODE](i,j)) {
                     
                items[i].colliding = COLOUR_TIME
                items[j].colliding = COLOUR_TIME
                collision_queue = collision_queue.concat(rebound_funcs[REBOUND_MODE](i,j))
            }
        }
    }

    // Perform all the actions
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

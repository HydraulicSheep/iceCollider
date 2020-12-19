// Axis Aligned Bounding Box Collision Method

function bounding_intersection_check(i, j) {

    box1 = bounding_boxes[i]
    box2 = bounding_boxes[j]

    xmatch = false;
    ymatch = false;

    lx1 = box1.x-box1.width/2
    lx2= box2.x-box2.width/2
    rx1 = box1.x+box1.width/2
    rx2 = box2.x+box2.width/2

    ly1 = box1.y-box1.height/2
    ly2= box2.y-box2.height/2
    ry1 = box1.y+box1.height/2
    ry2 = box2.y+box2.height/2
    
    if (lx1 > lx2 && lx1 < rx2) {
        xmatch = true
    }
    if (lx2 > lx1 && lx2 < rx1) {
        xmatch = true
    }
    if (ly1 > ly2 && ly1 < ry2) {
        ymatch = true
    }
    if (ly2 > ly1 && ly2 < ry1) {
        ymatch = true
    }

    return (xmatch && ymatch)
}

function bounding_intersection_setup() {
    // Bounding Box Collision Detection
    bounding_boxes = []

    for (item of items) {
        bounding_boxes.push(item.getBoundingBox())
    }
}
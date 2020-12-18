function no_momentum_rebound(i, j) {

    var collision_queue  = []
    var action = []
    v1 = items[i].v
    v2 = items[j].v

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
        return collision_queue
    }

    action = [items[i],0,0,-para_speed_rel*collisionDir[0],-para_speed_rel*collisionDir[1]];
    collision_queue.push(action)

    action = [items[j],0,0,para_speed_rel*collisionDir[0],para_speed_rel*collisionDir[1]];
    collision_queue.push(action)

    return collision_queue

}
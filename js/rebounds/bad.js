function bad_rebound(i,j) {

    var collision_queue = []

    v1 = items[i].v
    v1_t = vec_sub(items[j].centre(), items[i].centre())
    v2 = items[j].v
    v2_t = vec_mul(v1_t,-1)


    v1_parallel = vec_mul(v1_t,dotp(v1,v1_t)/(mag(v1_t)**2))
    v1_perp = vec_sub(v1,v1_parallel)
    res = vec_add(v1_perp, vec_mul(v1_parallel,-1))
    t = vec_sub(res,v1)

    action = [items[i],0,0,t[0],t[1]];
    collision_queue.push(action)

    v2_parallel = vec_mul(v2_t,dotp(v2,v2_t)/(mag(v2_t)**2))
    v2_perp = vec_sub(v2,v2_parallel)
    res = vec_add(v2_perp, vec_mul(v2_parallel,-1))
    t = vec_sub(res,v2)

    action = [items[j],0,0,t[0],t[1]];
    collision_queue.push(action)

    return collision_queue
}
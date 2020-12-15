function dotp(v1, v2) {

    total = 0
    for (i =0;i<v1.length;i++) {
        total += v1[i]*v2[i]
    }
    return total;
}

function mag(v1) {

    total = 0
    for (i=0;i<v1.length;i++) {
        total += v1[i]**2
    }
    return Math.sqrt(total)
}

function vec_mul(v1, t) {

    res = []
    for (i of v1) {
        res.push(i*t)
    }
    return res
}

function vec_add(v1, v2) {

    res = []

    for (i =0; i< v1.length;i++) {
        res.push(v1[i]+v2[i])
    }

    return res
}

function vec_sub(v1,v2) {
    return vec_add(v1,vec_mul(v2,-1))
}
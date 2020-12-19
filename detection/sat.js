


function sat_check(i, j) {


    box1 = items[i]
    box2 = items[j]
    
    
    for (side of box1.sides()) {

        // Normals for a 2D vector are easily hardcoded
        var normal = [-side[1],side[0]]
        var b1_min = Infinity
        var b1_max = -Infinity
        for (vertex of box1.vertices()) {

            var proj = dotp(vertex,normal) // Gives signed magnitude of the vector projection times mag(normal)
            if (proj>=b1_max) {
                b1_max = proj
            }
            if (proj<=b1_min) {
                b1_min = proj
            }

        }

        var b2_min = Infinity
        var b2_min_point = null;
        var b2_max_point = null;
        var b2_max = -Infinity
        for (vertex of box2.vertices()) {

            var proj = dotp(vertex,normal) // Gives signed magnitude of the vector projection times mag(normal)
            if (proj>=b2_max) {
                b2_max = proj
            }
            if (proj<=b2_min) {
                b2_min = proj
            }

        }

        if (b1_max < b2_min || b2_max < b1_min) {
            // No collision has occured
            return false;
        }


    }

    return true;
}
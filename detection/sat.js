


function sat_check(i, j) {

    box1 = items[i]
    box2 = items[j]
    
    
    for (side of box1.sides()) {

        // Normals for a 2D vector are easily hardcoded
        var normal = [-side[1],side[0]] // Used as an axis.
        var b1_min = Infinity
        var b1_max = -Infinity

        // Calculates max and min locations of box 1's vertices projected along the axis
        for (vertex of box1.vertices()) {

            var proj = dotp(vertex,normal) // Gives signed magnitude of the vector projection times mag(normal)
            if (proj>=b1_max) {
                b1_max = proj
            }
            if (proj<=b1_min) {
                b1_min = proj
            }

        }

        // Calculates max and min locations of box 2's vertices projected along the axis
        var b2_min = Infinity
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

        // Check if the vertices overlap when projected onto this axis
        if (b1_max < b2_min || b2_max < b1_min) {
            // No collision has occured
            return false;
        }


    }

    return true;
}
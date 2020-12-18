


function sat_check(i, j) {


    box1 = items[i]
    box2 = items[j]
    for (side of box1.sides()) {

        // Normals for a 2D vector are easily hardcoded
        var normal = [side[1],-side[0]]
        console.log(normal)
        var vertices = []
        var b1_vertices = 0;
        var i = 0;
        for (vertex of box1.vertices()) {
            var para = vec_mul(normal,dotp(vertex,normal)/dotp(normal, normal))
            
            vertices.push([1,para[0]])
            b1_vertices++;
        }
        for (vertex of box2.vertices()) {
            var para = vec_mul(normal,dotp(vertex,normal)/dotp(normal, normal))
            vertices.push([2,para[0]])
            console.log(para)
        }
        vertices.sort(function(a,b){
            if (a[1]>b[1]) {
                return -1;
            }
            if (a[1]<b[1]) {
                return 1;
            }
            if (a[0] > b[0]) {
                return -1;
            }
            if (a[0] < b[0]) {
                return 1;
            }
            return 0;});



        var i = 0;
        var intersect = false;
        var first = true;
        var type = 1;
        var count = 0;
        while (i < vertices.length) {
            if (first) {type = vertices[0][0]; 
                first = false
                count++;
            } else {
                if (count >= b1_vertices && vertices[i][0] != vertices[i-1][0]) {
                    break;
                }
                if (vertices[i][0] != type) {
                    intersect = true;
                    break;
                }
                count++;

            }
            i++;
        }

        if (!intersect) {
            console.log('Leaving')
            return false;
        }

    }


    return true;
}
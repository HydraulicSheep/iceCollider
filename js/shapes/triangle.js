class Triangle {


    constructor(vertices,v) {

        this.mass = 1;
        this.friction = 0;
        this.colliding = 0;

        // x and y of centroid are calculated
        this.x = (vertices[0][0]+vertices[1][0]+vertices[2][0])/3
        this.y = (vertices[0][1]+vertices[1][1]+vertices[2][1])/3;

        this.overtices = [vec_sub(vertices[0],[this.x,this.y]), 
                        vec_sub(vertices[1],[this.x,this.y]),
                        vec_sub(vertices[2],[this.x,this.y])]
        
        this.min_xoffset = Math.min(this.overtices[0][0],this.overtices[1][0],this.overtices[2][0])
        this.max_xoffset = Math.max(this.overtices[0][0],this.overtices[1][0],this.overtices[2][0])
        this.min_yoffset = Math.min(this.overtices[0][1],this.overtices[1][1],this.overtices[2][1])
        this.max_yoffset= Math.max(this.overtices[0][1],this.overtices[1][1],this.overtices[2][1])

        this.v = v;

    }

    draw(context) {
        if (this.colliding>0) {
            context.fillStyle = "#f78243"; 
        } else {
            context.fillStyle = "#0081b0"; 
        }

        var abs_v1 = [this.overtices[0][0]+this.x,this.overtices[0][1]+this.y]
        var abs_v2 = [this.overtices[1][0]+this.x,this.overtices[1][1]+this.y]
        var abs_v3 = [this.overtices[2][0]+this.x,this.overtices[2][1]+this.y]
            
        context.beginPath();
        context.moveTo(abs_v1[0],abs_v1[1]);
        context.lineTo(abs_v2[0],abs_v2[1]);
        context.lineTo(abs_v3[0],abs_v3[1]);
        context.fill();

    }

    do_step(time_step) {

        this.x += this.v[0]*time_step;
        this.y += this.v[1]*time_step;

        // Calculations to handle friction
        if (this.v[0] < 0) {
            this.v[0] = Math.min(0,this.v[0]+this.friction)
        }
        if (this.v[0] > 0) {
            this.v[0] = Math.max(0,this.v[0]-this.friction)
        }
        if (this.v[1] < 0) {
            this.v[1] = Math.min(0,this.v[1]+this.friction)
        }
        if (this.v[1] > 0) {
            this.v[1] = Math.max(0,this.v[1]-this.friction)
        }
        
    }

    update(action) {
        this.x += action[1];
        this.y += action[2];
        this.v[0] += action[3];
        this.v[1] += action[4];
    }

    getBoundingBox() {

        var width = this.max_xoffset-this.min_xoffset;
        var height = this.max_yoffset-this.min_yoffset;

        var x = this.x + this.min_xoffset + width/2
        var y = this.y + this.min_yoffset + height/2

        return new Square(x,y,width,height,[0,0])
    }

    sides() {

        var abs_v1 = [this.overtices[0][0]+this.x,this.overtices[0][1]+this.y]
        var abs_v2 = [this.overtices[1][0]+this.x,this.overtices[1][1]+this.y]
        var abs_v3 = [this.overtices[2][0]+this.x,this.overtices[2][1]+this.y]

        var side1 = vec_sub(abs_v1,abs_v2)
        var side2 = vec_sub(abs_v2,abs_v3)
        var side3 = vec_sub(abs_v3,abs_v1)

        return [side1, side2, side3]

    }

    vertices() {

        var abs_v1 = [this.overtices[0][0]+this.x,this.overtices[0][1]+this.y]
        var abs_v2 = [this.overtices[1][0]+this.x,this.overtices[1][1]+this.y]
        var abs_v3 = [this.overtices[2][0]+this.x,this.overtices[2][1]+this.y]

        return [abs_v1, abs_v2, abs_v3]

    }

    centre() {
        return [this.x,this.y]
    }

    min_x() {
        return this.x + this.min_xoffset
    }

    max_x() {
        return this.x + this.max_xoffset
    }

    min_y() {
        return this.y + this.min_yoffset
    }

    max_y() {
        return this.y + this.max_yoffset
    }
}
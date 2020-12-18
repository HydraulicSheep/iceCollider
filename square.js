class Square {


    constructor(x,y,width,height,v) {

        this.mass = 1;
        this.friction = 0;
        this.colliding = 0;
        this.x = x;
        this.y = y;
        this.width=width;
        this.height=height;
        this.v = v;

    }

    draw(context) {
        if (this.colliding>0) {
            context.fillStyle = "#f78243"; 
        } else {
            context.fillStyle = "#0081b0"; 
        }
            
        context.fillRect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);     



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



        return this
    }

}
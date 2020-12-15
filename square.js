class Square {


    constructor(x,y,width,height,v) {

        this.mass = 1;
        this.x = x;
        this.y = y;
        this.width=width;
        this.height=height;
        this.v = v;

    }

    draw(context) {

        context.fillStyle = "red";     
        context.fillRect(this.x,this.y,this.width,this.height);     



    }

    do_step(time_step) {

        this.x += this.v[0]*time_step;
        this.y += this.v[1]*time_step;

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
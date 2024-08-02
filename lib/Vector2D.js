let check_Vector2D = setInterval(() => {

    if (gameObject) {
        Vector2D = class Vector2D extends gameObject {
            constructor(x, y, color = "black") {
                super(x, y, color);
            }


            add = (other) => new Vector2D(this.x+other.x,this.y+other.y);

            mul = (other) => new Vector2D(this.x*other,this.y*other);

            scalarProd = (other) => this.x*other.x+this.y*other.y;

            abs = () => Math.sqrt(this.x**2+this.y**2);

            norm = (abs = 1) => new Vector2D((this.x / this.abs())*abs,(this.y / this.abs())*abs);




            draw = (g = gameObject.g) => {
                g.setStrokeStyle(this.color);
                g.translate(g.parent.center.x,g.parent.center.y);
                g.rotate(this.angle);
                g.fillLine(0,0,this.x,this.y);
                g.rotate(-this.angle);
                g.translate(-g.parent.width / 2, -g.parent.height / 2);
            };
        }
        load_vector2d = true;
        clearInterval(check_Vector2D);

    }
    else {
        console.log("wait");
    }

}, 1);
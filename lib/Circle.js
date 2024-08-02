

let check_Circle = setInterval(() => {

    if (gameObject) {
        Circle = class Circle extends gameObject {
            static type = (new Circle(0,0,0)).type;
            constructor(x, y, r, color = "black") {
                super(x, y, color);
                this.r = r;
            }


            draw = (g = gameObject.g) => {
                g.setFillStyle(this.color);
                g.translate(this.x + g.parent.center.x, this.y + g.parent.center.y);
                g.rotate(this.angle);
                g.beginPath();
                g.arc(0, 0, this.r, 0, 2 * Math.PI);
                g.fill();
                g.rotate(-this.angle);
                g.translate(-this.x - g.parent.center.x, -this.y - g.parent.center.y);
            }
            static draw = (x,y,r,color = 'black' ,g = gameObject.g) => {
                g.setFillStyle(color);
                g.translate(x + g.parent.center.x, y + g.parent.center.y);
                //g.rotate(this.angle);
                g.beginPath();
                g.arc(0, 0, r, 0, 2 * Math.PI);
                g.fill();
                //g.rotate(-angle);
                g.translate(-x - g.parent.center.x, -y - g.parent.center.y);
            }

            /**
             * 
             * @param {gameObject} other 
             */
            overlap = (other) => {
                switch (other.type) {
                    case Circle.type:
                        if(this.r + other.r > Math.sqrt((this.x-other.x)*(this.x-other.x) + (this.y-other.y)*(this.y-other.y))) return true;
                        break;
                
                    default:
                        break;
                }
                return false;
            }
        }
        load_circle = true;
        clearInterval(check_Circle);

    }
    else {
        console.log("wait");
    }

}, 1);
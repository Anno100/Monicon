



let check_Rect = setInterval(() => {

    if (gameObject) {
        Rect = class Rect extends gameObject {

            static type = (new Rect()).type;

            constructor(x=0, y=0, w=10, h=10, color = "black") {
                super(x, y, color);
                this.w = w;
                this.h = h;
            }


            draw = (g = gameObject.g) => {
                g.setFillStyle(this.color);
                g.translate(this.x + g.parent.center.x, this.y + g.parent.center.y);
                g.rotate(this.angle);
                g.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
                g.rotate(-this.angle);
                g.translate(-this.x - g.parent.center.x, -this.y - g.parent.center.y);
            };

            static draw = (x,y,w,h,angle=0,color='black',g = gameObject.g) => {

                g.setFillStyle(color);
                g.translate(x + g.parent.center.x, y + g.parent.center.y);
                g.rotate(angle);
                g.fillRect(-w / 2, -h / 2, w, h);
                g.rotate(-angle);
                g.translate(-x - g.parent.center.x, -y - g.parent.center.y);
            }


            /**
             * 
             * @param {gameObject} other 
             */
            overlap = (other) => {
                if(other.type == this.type){ //Rect
                    if(this.x + this.w/2 >= other.x - other.w/2 && other.x + other.w/2 >= this.x - this.w/2 && this.y + this.h/2 >= other.y - other.w/2 && other.y + other.h/2 >= this.y - this.h/2){
                        return true;
                    }
                }

                return false;
            }

        }
        load_rect = true;
        clearInterval(check_Rect);
    }
    else{
        console.log("wait");
    }
},1);
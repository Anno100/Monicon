



let check_Mouse = setInterval(() => {

    if (gameObject) {
        Mouse = class Mouse extends gameObject {

            static type = (new Mouse()).type;
            down = false;

            constructor() {
                super(0, 0, 'black');
            }


            draw = (g = gameObject.g) => {
                g.setFillStyle(this.color);
                g.translate(this.x + g.parent.center.x, this.y + g.parent.center.y);
                g.rotate(this.angle);
                g.fillRect(0, 0, 1, 1);
                g.rotate(-this.angle);
                g.translate(-this.x - g.parent.center.x, -this.y - g.parent.center.y);
            };
            
            static draw = (g = gameObject.g) => {
                g.parent.Mouse.draw();
            };


            /**
             * 
             * @param {gameObject} other 
             */
            overlap = (other) => {
                if(other.type == Rect.type || other.type == Image.type){ //Rect
                    if(this.x >= other.x - other.w/2 && other.x + other.w/2 >= this.x && this.y >= other.y - other.w/2 && other.y + other.h/2 >= this.y){
                        return true;
                    }
                }
                if(other.type == Circle.type){ //Rect
                    if(other.r >= (new Vector2D(this.x-other.x,this.y-other.y)).abs()){
                        return true;
                    }
                }

                return false;
            }

        }
        load_mouse = true;
        clearInterval(check_Rect);
    }
    else{
        console.log("wait");
    }
},1);
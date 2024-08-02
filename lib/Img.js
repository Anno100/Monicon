


const new_image = (src) => {
    let img = document.createElement('img');
    img.hidden = true;
    img.src = src;

    return img;
}

let check_Img = setInterval(() => {

    if (gameObject) {
        Image = class Image extends gameObject {

            static type = (new Image()).type;

            constructor(src = null,x=0,y=0,w=0,h=0) {
                super(x, y, 'white');
                this.img = src != null ? new_image(src) : '';
                this.w = w;
                this.h = h;
            }


            draw = (g = gameObject.g) => {
                g.translate(this.x + g.parent.center.x, this.y + g.parent.center.y);
                g.rotate(this.angle);
                g.parent.graphics.drawImage(this.img,-this.w / 2, -this.h / 2, this.w, this.h);
                g.rotate(-this.angle);
                g.translate(-this.x - g.parent.center.x, -this.y - g.parent.center.y);
            };


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
        load_img = true;
        clearInterval(check_Img);
    }
    else{
        console.log("wait");
    }
},1);
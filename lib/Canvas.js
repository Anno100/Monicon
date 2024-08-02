let check_Canvas = setInterval(() => {
if (Mouse) {
Canvas = class Canvas {
    constructor(width, height, id = null) {
        this.width = width;
        this.height = height;


        this.element = document.createElement('canvas');
        this.element.width = width;
        this.element.height = height;
        this.element.id = id;

        this.graphics = this.element.getContext('2d');


    }

    fillRect = (x, y, width, height, color = null) => {
        if (color) this.graphics.fillStyle = color;
        this.graphics.fillRect(x, y, width, height);
    }

    clearRect = (x, y, width, height) => {
        this.graphics.clearRect(x, y, width, height);
    }
    clear = () => {
        this.clearRect(0, 0, this.width, this.height);
    }

    setWidth = (width) => {
        this.width = width;
        this.element.width = width;
    }
    setHeight = (height) => {
        this.height = height;
        this.element.height = height;
    }




    static createElement = (width, height) => {
        return new Canvas(width, height).element;
    }


}
load_Canvas = true;
clearInterval(check_Canvas);
}
else{
console.log('wait');
}
},1);
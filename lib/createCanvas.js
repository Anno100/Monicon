
let canvas_id = 0;
/**
 * ___
 * Erstellt ein Canvas-Objekt mit direktem Zugriff auf sein Graphics-Objekt
 *
 * @param {String} p_id
 * @param {Number} width
 * @param {Number} height
 * @returns {{c:HTMLCanvasElement,g:{arc: (x: any, y: any, radius: any) => void;beginPath: () => void;clear: () => void;clearRect: (x: any, y: any, w: any, h: any) => void;fill: () => void;fillLine: (x1: any, y1: any, x2: any, y2: any) => void;fillRect: (x: any, y: any, w: any, h: any) => void;setFillStyle: (color: any) => void;rotate: (angle: any) => void;translate: (x: any, y: any) => void;},Draw:Function,id:String,width:Number,height:Number,Mouse:{x:Number,y:Number},center:{x:Number,y:Number}}}
 */
const createCanvas = (width = 100, height = 100, p_id = 'canvas_' + canvas_id++) => {

    //Canvas
    let canvas = document.createElement("canvas");
    canvas.id = p_id;
    canvas.width = width;
    canvas.height = height;
    canvas.style.border = "solid";
    document.body.appendChild(canvas);
    //document.body.innerHTML += '<br>';

    //Graphics
    let graphics = canvas.getContext("2d");


    let ret = {
        c: canvas,
        graphics: graphics,
        g: {
            /**
             * Draw a Circle
             * @param {Number} x 
             * @param {Number} y 
             * @param {Number} radius 
             * @returns 
             */
            arc: (x, y, radius) => graphics.arc(x, y, radius, 0, 2 * Math.PI),
            beginPath: () => graphics.beginPath(),
            clear: () => graphics.clearRect(0, 0, width, height),
            clearRect: (x, y, w, h) => graphics.clearRect(x, y, w, h),
            fill: () => graphics.fill(),
            fillLine: (x1, y1, x2, y2) => {
                graphics.beginPath();
                graphics.moveTo(x1, y1);
                graphics.lineTo(x2, y2);
                graphics.stroke();
            },
            fillRect: (x, y, w, h) => graphics.fillRect(x, y, w, h),
            setFillStyle: (color) => { graphics.fillStyle = color },
            fillText: (txt, x, y) => { graphics.fillText(txt, x, y) },
            setStrokeStyle: (color) => { graphics.strokeStyle = color },
            rotate: (angle) => graphics.rotate(angle),
            translate: (x, y) => graphics.translate(x, y),
        },
        id: p_id,
        Draw: () => { },
        resize: (w, h) => {
            canvas.width = w;
            canvas.height = h;
            ret.width = w;
            ret.height = h;
        },
        width: width,
        height: height,
        center: { x: width / 2, y: height / 2 },
        Mouse: new Mouse(),
        showSystem: false
    };
    ret.g.parent = ret;
    let g = ret.g;
    gameObject.g = g;

    let center = ret.center;
    ret.c.onmousemove = (e) => { ret.Mouse.x = (e.offsetX - ret.center.x); ret.Mouse.y = /*ret.height-*/e.offsetY - ret.center.y; }
    ret.c.onmousedown = () => { ret.Mouse.down = true; }
    ret.c.onmouseup = () => { ret.Mouse.down = false; }

    ret.c.addEventListener('touchstart', () => { ret.Mouse.down = true });
    ret.c.addEventListener('touchend', () => { ret.Mouse.down = false });
    //ret.graphics.transform(1,0,0,-1,0,0);
    //ret.g.translate(0,-ret.width);
    setInterval(() => {
        ret.Draw();
        if (ret.showSystem) {
            g.setStrokeStyle("black");
            g.setFillStyle("black");
            g.fillLine(0, center.y, ret.width*100, center.y);
            g.fillLine(ret.center.x, 0, center.x, ret.height*100);

            let scale = 50;
            for (let i = 0; i < 100; i++) {
                g.fillLine(center.x + i * scale, center.y - 2, center.x + i * scale, center.y + 2);
                //g.fillText(i * scale, center.x + i * scale, center.y);

                g.fillLine(center.x - i * scale, center.y - 2, center.x - i * scale, center.y + 2);
                //g.fillText(-i * scale, center.x - i * scale, center.y);

                g.fillLine(center.x - 2, center.y - i * scale, center.x + 2, center.y - i * scale);
                //g.fillText(-i * scale, center.x, center.y - i * scale);

                g.fillLine(center.x - 2, center.y + i * scale, center.x + 2, center.y + i * scale);
                //g.fillText(i * scale, center.x, center.y + i * scale);

            }

        }
    }, 1);


    return ret;
};

const createCanvas3D = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    let p_id = "SBS";

    //Canvas
    let canvas = document.createElement("canvas");
    canvas.id = p_id;
    canvas.width = width;
    canvas.height = height;
    canvas.style.border = "solid";
    document.body.appendChild(canvas);
    //document.body.innerHTML += '<br>';

    //Graphics
    let graphics = canvas.getContext("2d");


    let ret = {
        c: canvas,
        graphics: graphics,
        g: {
            arc: (x, y, radius) => graphics.arc(x, y, radius, 0, 2 * Math.PI),
            beginPath: () => graphics.beginPath(),
            clear: () => graphics.clearRect(0, 0, width, height),
            clearRect: (x, y, w, h) => graphics.clearRect(x, y, w, h),
            fill: () => graphics.fill(),
            fillLine: (x1, y1, x2, y2) => {
                graphics.beginPath();
                graphics.moveTo(x1, y1);
                graphics.lineTo(x2, y2);
                graphics.stroke();
            },
            fillRect: (x, y, w, h) => graphics.fillRect(x, y, w, h),
            setFillStyle: (color) => { graphics.fillStyle = color },
            fillText: (txt, x, y) => { graphics.fillText(txt, x, y) },
            setStrokeStyle: (color) => { graphics.strokeStyle = color },
            rotate: (angle) => graphics.rotate(angle),
            translate: (x, y) => graphics.translate(x, y),
        },
        id: p_id,
        Draw: () => { },
        resize: (w, h) => {
            canvas.width = w;
            canvas.height = h;
            ret.width = w;
            ret.height = h;
        },
        width: width,
        height: height,
        center: { x: width / 2, y: height / 2 },
        Mouse: new Mouse(),
        showSystem: false,
        gameObjects:[],
        addObject: (obj) => {
            obj.x += width / 4;
            ret.gameObjects.push(obj);
        }
    };
    ret.g.parent = ret;
    let g = ret.g;
    gameObject.g = g;
    let M = ret.Mouse;

    let center = ret.center;
    ret.c.onmousemove = (e) => { ret.Mouse.x = (e.offsetX - ret.center.x); ret.Mouse.y = /*ret.height-*/e.offsetY - ret.center.y; }
    ret.c.onmousedown = () => { ret.Mouse.down = true; }
    ret.c.onmouseup = () => { ret.Mouse.down = false; }

    ret.c.addEventListener('touchstart', () => { ret.Mouse.down = true });
    ret.c.addEventListener('touchend', () => { ret.Mouse.down = false });
    //ret.graphics.transform(1,0,0,-1,0,0);
    //ret.g.translate(0,-ret.width);
    let gameObjects = ret.gameObjects;

    setInterval(() => {


        /**************************** */
        g.clear();
        gameObjects.forEach(e => e.draw());

        g.clearRect(0, 0, canvas.width / 2, canvas.height);

        gameObjects.forEach(e => {
            e.x -= canvas.width / 2;
            e.draw();
            e.x += canvas.width / 2;

        });


        if (M.x > 0) {

            let cur = new Rect(M.x, M.y, 20, 3, 'white');
            cur.rotate(1);
            cur.draw();
            cur.x -= canvas.width / 2
            cur.draw();
            cur.x += canvas.width / 2;

            cur.rotate(-2);
            cur.draw();
            cur.x -= canvas.width / 2
            cur.draw();
            cur.x += canvas.width / 2;
        }

        else {
            (new Circle(10, M.y, 5, 'red')).draw();
            (new Circle(10 - canvas.width / 2, M.y, 5, 'red')).draw();

        }



        /************************ */

        ret.Draw();

        /******************************* */



        /************* */

        /************* */

        if (ret.showSystem) {
            g.setStrokeStyle("red");
            g.setFillStyle("red");
            g.fillLine(0, center.y, ret.width, center.y);
            g.fillLine(ret.center.x, 0, center.x, ret.height);

            let scale = 50;
            for (let i = 0; i < 100; i++) {
                g.fillLine(center.x + i * scale, center.y - 2, center.x + i * scale, center.y + 2);
                g.fillText(i * scale, center.x + i * scale, center.y);

                g.fillLine(center.x - i * scale, center.y - 2, center.x - i * scale, center.y + 2);
                g.fillText(-i * scale, center.x - i * scale, center.y);

                g.fillLine(center.x - 2, center.y - i * scale, center.x + 2, center.y - i * scale);
                g.fillText(-i * scale, center.x, center.y - i * scale);

                g.fillLine(center.x - 2, center.y + i * scale, center.x + 2, center.y + i * scale);
                g.fillText(i * scale, center.x, center.y + i * scale);

            }

        }
    }, 1);


    return ret;

}

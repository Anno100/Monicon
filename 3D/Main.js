class RectSBS{
    constructor(x,y,width,height,color){
        this.x = x;
        this.y = y;
        this.z = 0;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    /**
     * 
     * @param {Canvas3D} canvas 
     */
    draw = (canvas) => {

        canvas.fillRect(this.x,this.y,this.width,this.height,0,this.color);

    }
}


function is_touch_enabled() {
    return ( 'ontouchstart' in window ) || 
           ( navigator.maxTouchPoints > 0 ) ||
           ( navigator.msMaxTouchPoints > 0 );
}

function Main() {
    console.clear();
    createFormButton('Home');

    let canvas_3d = Canvas3D.createSBSCanvas();

    let M = { x: -100, y: -100 }
    let onLeftSide = true;
    canvas_3d.left.element.onmousemove = (e) => {
        M.x = e.offsetX;
        M.y = e.offsetY;
        onLeftSide = true;
    }
    canvas_3d.right.element.onmousemove = (e) => {
        M.x = e.offsetX;
        M.y = e.offsetY;
        onLeftSide = false;
    }

    player = canvas_3d.addGameObject(new RectSBS(50,window.innerHeight*0.7,5,10,'blue'));
    right = false;
    left = false;
    document.body.addEventListener('keydown',(e)=>{
        if(e.key == 'a') left = true;
        if(e.key == 'd') right = true;
    });
    canvas_3d.left.element.onmousedown = () => {
        left = true;
    }
    canvas_3d.left.element.onmouseup = () => {
        left = false;
    }
    canvas_3d.right.element.onmousedown = () => {
        right = true;
    }
    canvas_3d.right.element.onmouseup = () => {
        right = false;
        
    }
    canvas_3d.left.element.addEventListener('touchstart',() => {
        if(is_touch_enabled())left = true;
    })
    canvas_3d.left.element.addEventListener('touchend', () => {
        left = false;
    })
    canvas_3d.right.element.addEventListener('touchstart', () => {
        if(is_touch_enabled())right = true;
    })
    canvas_3d.right.element.addEventListener('touchend', () => {
        right = false;
    })
    document.body.addEventListener('keyup',(e)=>{
        if(e.key == 'a') left = false;
        if(e.key == 'd') right = false;
    });

    green = canvas_3d.addGameObject(new RectSBS(0,0,2,2,'green'));
    red = canvas_3d.addGameObject(new RectSBS(0,0,2,2,'red'));
    canvas_3d.Draw = () => {
            canvas_3d.clear();


            if(left) player.x-=2;
            if(right) player.x += 2;

            if(onLeftSide){
                red.x = M.x;
                red.y = M.y;
            }
            else {
                green.x = M.x-2;
                green.y = M.y;
            }
        
    };
}
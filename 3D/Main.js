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
    let toDescription = $create('a');
    toDescription.href = 'https://anno100.github.io/Monmon-Gaming/'
    toDescription.innerHTML = 'See Description'
    document.body.appendChild(toDescription);
    
    



    let canvas_3d = Canvas3D.createSBSCanvas();

    let run_button = $create('button');
    run_button.innerHTML = 'Run'
    run_button.style.width = '100px';
    run_button.style.height = '100px';
    run_button.style.marginLeft = window.innerWidth/2-50 + 'px';
    run_button.style.marginTop =  window.innerHeight/2-50 + 'px';
    run_button.onclick = () => {

        let run_anim = setInterval(()=>{
            if(Number(run_button.style.height.split('px')[0]) < window.innerHeight*2){
                run_button.style.width = (Number(run_button.style.width.split('px')[0])+100) + 'px';
                run_button.style.marginLeft = (Number(run_button.style.marginLeft.split('px')[0]) - 50) + 'px';
                run_button.style.height = (Number(run_button.style.height.split('px')[0])+100) + 'px';
                run_button.style.marginTop = (Number(run_button.style.marginTop.split('px')[0]) - 50) + 'px';
            }
            else{

                canvas_3d.view.requestFullscreen();
        
                setTimeout(() => {
                canvas_3d.left.setWidth(window.innerWidth / 2);
                canvas_3d.right.setWidth(window.innerWidth / 2);
                canvas_3d.left.setHeight(window.innerHeight);
                canvas_3d.right.setHeight(window.innerHeight);
                
            }, 100);
            if(Number(run_button.style.height.split('px')[0]) >= window.innerHeight*2)
            run_button.style.visibility = 'hidden';
        clearInterval(run_anim);
            }

        },100);
        
    };
    document.body.appendChild(run_button);

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
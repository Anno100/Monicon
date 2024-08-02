let check_Canvas3D = setInterval(() => {
if (Object) {

Canvas3D = class Canvas3D {
    /**
     * 
     * @param {HTMLElement} view 
     * @param {*} left 
     * @param {*} right 
     */
    constructor(view, left, right) {
        this.view = view;
        this.left = left;
        this.right = right;

        this.width = view.width;
        this.height = view.height;

        this.gameObjects = [];

        this.Draw = () => {};

        setInterval(()=>{
            
            this.Draw();
            this.gameObjects.forEach(e => e.draw(this));
        });
    }

    fillRect = (x, y, width, height, distance = 1, color = null) => {
        this.left.fillRect(x, y, width, height, color);
        this.right.fillRect(x, y, width, height, color);
    }
    clear = () => {
        this.left.clear();
        this.right.clear();
    }

    addGameObject = (obj) => {
        this.gameObjects.push(obj);
        return obj;
    }


    /**
     * 
     * @returns {Canvas3D}
     */
    static createSBSCanvas = () => {
        let view = document.createElement('div');
        view.style = "background-color: black;grid-template-columns: auto auto;display: grid;cursor:none"
    
        let left = new Canvas(0, 0, 'left');
        left.element.style.backgroundColor = 'black';
    
        let right = new Canvas(0, 0, 'right');
        right.element.style.backgroundColor = 'black';
    
    
        view.id = 'view';

        document.body.innerHTML += '1: Go to SBS-Mode (For Xreal-Air -> hold brightness up button until it knocks)<br>2: Doubleclick or press F2 for starting the "game"<br>Press Escape for Exit the game.<br><br>For first impression we control a blue Cube. <br>The colored points shows the position of your mouse/fingers. <br><br>As Mouseevent Red when your Mouse moves over left side, green when it moves over the right side. <br>As Touchevent red point shows position of left thumb, green shows position of right thumb.<br><br>For Mouse and Keyboard: Press a to move the player to the left side and d to move him to the right side.<br>For Touchcontrol: Hold left Screenside for left and right Screenside for right.'
    
    
        document.body.onkeydown = (e) => {
            if (e.key == 'F2') {
                view.requestFullscreen();
                setTimeout(() => {
                    left.setWidth(window.innerWidth / 2);
                    right.setWidth(window.innerWidth / 2);
                    left.setHeight(window.innerHeight);
                    right.setHeight(window.innerHeight);
    
    
                }, 100);
            }
            if (e.key == 'Escape') {
    
                left.setWidth(0);
                right.setWidth(0);
                left.setHeight(0);
                right.setHeight(0);
    
            }
            if (e.key == 'F11') {
                return false;
            }
    
        }
            
        document.ondblclick = (e) => {
                view.requestFullscreen();
                setTimeout(() => {
                    left.setWidth(window.innerWidth / 2);
                    right.setWidth(window.innerWidth / 2);
                    left.setHeight(window.innerHeight);
                    right.setHeight(window.innerHeight);
    
    
                }, 100);
            
            if (e.key == 'Escape') {
    
                left.setWidth(0);
                right.setWidth(0);
                left.setHeight(0);
                right.setHeight(0);
    
            }
                
    
        }
            
        
        document.body.append(view);
        view.append(left.element, right.element);
    
        return new Canvas3D(view, left, right);
        
    }



}

load_Canvas3D = true;
clearInterval(check_Canvas3D);
}
else{
console.log('wait');
}
},1);
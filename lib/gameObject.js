gameObject = class gameObject {
    static g;
    type = this.constructor.name;
    angle = 0;
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
    rotate = (angle) => {
        this.angle += angle;
    }
    overlap = (other) => {
        return false;
    }
    
    drawTo = (g, other) => g.fillLine(this.x + g.parent.center.x, this.y + g.parent.center.y, other.x + g.parent.center.x, other.y + g.parent.center.y);

}

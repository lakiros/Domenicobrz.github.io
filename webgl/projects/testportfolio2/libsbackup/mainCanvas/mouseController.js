function MouseController() {
    this.origin   = [0, 0, 0];
    this.velocity = [0, 0, 0];
    this.postProcessVelocityVec = [0, 0];
    this.postProcessVelocity = 0;
    this.ww       = undefined;
    this.wh       = undefined;

    var screenRatio = innerWidth / innerHeight;
    var speedMultiplier = 800;

    this.update = function(deltatime) {
        this.velocity[0] *= 0.975;//(1.0 - (0.1 - deltatime));
        this.velocity[1] *= 0.975;//(1.0 - (0.1 - deltatime));
        this.velocity[2] *= 0.975;//(1.0 - (0.1 - deltatime));

        // this.postProcessVelocityVec[0] *= 0.9915;
        // this.postProcessVelocityVec[1] *= 0.9915;

        this.postProcessVelocity *= 0.907;
    };

    var mousedown = false;
    window.addEventListener('mousedown', function(e) {
        mousedown = true;

        // IS IN NORMALIZED DEVICE COORDINATES --  -1...1
        var x = (e.clientX) / innerWidth;
        var y = ((innerHeight - e.clientY)) / innerHeight;

        this.origin = [x*2-1, y*2-1, 0];

        lastx = e.clientX; 
        lasty = e.clientY;
    }.bind(this)); 


    var lastx, lasty;
    window.addEventListener('mousemove', function(e) {
        // if(!mousedown) return;
        if(lastx === undefined) lastx = e.clientX;
        if(lasty === undefined) lasty = e.clientY;

        var deltax = e.clientX - lastx;
        var deltay = e.clientY - lasty;

        var x = (e.clientX) / innerWidth;
        var y = ((innerHeight - e.clientY)) / innerHeight;

        this.origin = [x*2-1, y*2-1, 0];
        // both needs to be divided by innerHeight, this is not a screenRatio scenario
        this.velocity = [deltax / innerHeight * speedMultiplier, -deltay / innerHeight * speedMultiplier, 0];

        this.postProcessVelocity += vec3.length(this.velocity) * 0.103;

        lastx = e.clientX;
        lasty = e.clientY;

    }.bind(this)); 
    window.addEventListener('mouseup',   function(e) {
        mousedown = false;
    }.bind(this)); 
}
let ix;
let iy;
let colors;
let index;

function setup() {
	//windowWidth = 1920 ; windowHeight = 1080
	//createCanvas(1280, 720);
	createCanvas(256, 256);
	background(100);

	index = 0;
    start();
}

function start() {
	noiseSeed(random(1000))
	
	ix = 0;
    iy = 0;
    colors = [];
	bhue = random(255);
    colorMode(HSB, 255);
    
    for (let i = 0; i < 5; ++i) {
	    colors.push(color(bhue + sqr(128), 128-sqr(128)+sqr(128),255-sqr(255)))
	    colorMode(RGB, 256)
    }
}
// TODO: finish this and figure out the color functions etc.
function sqr(x) 
{
	return(x*sq(random()))
	//return x;
}

function draw() {
	index = 0 ; //noStroke()
	noFill()
	for(iy=0;iy<windowHeight;iy++) {
		nstr = 3*max(0,1+5*(noise(ix/500+91,iy/500+19)-.5))
		nv = noise(ix/2000+19,iy/2000+91)*100+
			noise(ix/100,iy/100,20*noise(ix/200+2,iy/200+4))*nstr
		nc = lerpColor(colors[floor(nv % colors.length)],nv % 1 > .5 ? color(100) : color(200),(1-abs((nv % 1)-.5))/4)
		stroke(nc)
		point(ix,iy)
	}

	ix++
	
	if (ix > width) {
        start();
    }
}

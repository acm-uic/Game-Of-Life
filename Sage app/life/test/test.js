var test = SAGE2_App.extend( {
    init: function(data) {
        this.SAGE2Init("canvas", data);

        this.resizeEvents = "continuous";

        // application specific 'init'
        this.ctx = this.element.getContext("2d");

        this.minDim = Math.min(this.element.width, this.element.height);
        this.timer = 0.0;
        this.redraw = true;





        this.stopUpdate=0; // =1 stop updating game state, =0 update @ 60fps(if possible)
        this.neighbors=0; //Game Variable
        this.arr = new Array(); //Create an array for the current state of the game
        this.temparr = new Array(); //array for the next state of the game

        this.DrawableSpaceX=0;  //amount of drawable cells in the X-dir
        this.DrawableSpaceY=0;  //amount of drawable cells in the Y-dir
        this.sq = 30;  //colored size of the cell (cell made up of 30x30 pixels)
        this.sqPadding = 0; //no padding


        this.sqPad = this.sq+this.sqPadding;  //actual size of the cell

        this.DrawableSpaceX = Math.floor((this.element.width/(this.sqPad)));  //# of cells in the X direction
        this.DrawableSpaceY = Math.floor((this.element.width/(this.sqPad))); //# of cells in the Y direction

        this.CanvasWidth = this.element.width; //variable of the width of the canvas
        this.CanvasHeight = this.element.width; //variable of the height of the canvas

        for (var x = 0; x<this.DrawableSpaceX; x=x+1) {
            this.arr[x] = new Array();// just like in C we need to malloc space in an array if we want two dimentions.
            this.temparr[x] = new Array();// Same here
            for (var y =0; y<this.DrawableSpaceY; y=y+1) {
                this.arr[x][y] = 0; //Initalize to 0.
                this.temparr[x][y] = 0;
            }
        }
		this.temparr[11][70]=1;
		this.temparr[12][70]=1;
		this.temparr[13][70]=1;
		this.temparr[14][70]=1;
		this.temparr[15][70]=1;
		this.temparr[16][70]=1;
		this.temparr[17][70]=1;
		this.temparr[18][70]=1;
		this.temparr[19][70]=1;
		this.temparr[20][70]=1;
		this.temparr[21][70]=1;
		this.temparr[22][70]=1;
		this.temparr[23][70]=1;
		this.temparr[24][70]=1;
		this.temparr[25][70]=1;
		this.temparr[26][70]=1;
		this.temparr[27][70]=1;
		this.temparr[28][70]=1;
		this.temparr[29][70]=1;
		this.temparr[30][70]=1;
		this.temparr[31][70]=1;
		this.temparr[32][70]=1;
		this.temparr[33][70]=1;
		this.temparr[34][70]=1;
		this.temparr[35][70]=1;
		this.temparr[36][70]=1;
		this.temparr[37][70]=1;
		this.temparr[38][70]=1;
		this.temparr[39][70]=1;
		this.temparr[40][70]=1;
		this.temparr[41][70]=1;
		this.temparr[42][70]=1;
		this.temparr[43][70]=1;
		this.temparr[44][70]=1;
		this.temparr[45][70]=1;
		this.temparr[46][70]=1;
		this.temparr[47][70]=1;
		this.temparr[48][70]=1;
		this.temparr[49][70]=1;
		this.temparr[50][70]=1;
		this.temparr[51][70]=1;
		this.temparr[52][70]=1;
		this.temparr[53][70]=1;
		this.temparr[54][70]=1;
		this.temparr[55][70]=1;
		this.temparr[56][70]=1;
		this.temparr[57][70]=1;
		this.temparr[58][70]=1;
		this.temparr[59][70]=1;
        this.temparr[60][70]=1;
        this.temparr[61][70]=1;
        this.temparr[62][70]=1;
        this.temparr[63][70]=1;
        this.temparr[64][70]=1;
        this.temparr[65][70]=1;
        this.temparr[66][70]=1;
        this.temparr[67][70]=1;
        this.temparr[68][70]=1;
        this.temparr[69][70]=1;
        this.temparr[70][70]=1;
        this.temparr[71][70]=1;
        this.temparr[72][70]=1;
        this.temparr[73][70]=1;
        this.temparr[74][70]=1;
        this.temparr[75][70]=1;
        this.temparr[76][70]=1;
        this.temparr[77][70]=1;
        this.temparr[78][70]=1;
        this.temparr[79][70]=1;
        this.temparr[80][70]=1;
        this.temparr[81][70]=1;
        this.temparr[82][70]=1;
        this.temparr[83][70]=1;
        this.temparr[84][70]=1;
        this.temparr[85][70]=1;
        this.temparr[86][70]=1;
        this.temparr[87][70]=1;
        this.temparr[88][70]=1;
        this.temparr[89][70]=1;
        this.temparr[90][70]=1;
        this.temparr[91][70]=1;
        this.temparr[92][70]=1;
        this.temparr[93][70]=1;
        this.temparr[94][70]=1;
        this.temparr[95][70]=1;
        this.temparr[96][70]=1;
        this.temparr[97][70]=1;
        this.temparr[98][70]=1;
        this.temparr[99][70]=1;
        this.temparr[100][70]=1;
		this.temparr[101][70]=1;
		this.temparr[102][70]=1;
		this.temparr[103][70]=1;
		this.temparr[104][70]=1;
		this.temparr[105][70]=1;
		this.temparr[106][70]=1;
		this.temparr[107][70]=1;
		this.temparr[108][70]=1;
        this.temparr[109][70]=1;
        this.temparr[110][70]=1;
	    this.temparr[111][70]=1;
        this.temparr[112][70]=1;
        this.temparr[113][70]=1;
        this.temparr[114][70]=1;
        this.temparr[115][70]=1;
        this.temparr[116][70]=1;
        this.temparr[117][70]=1;
        this.temparr[118][70]=1;
        this.temparr[119][70]=1;
        this.temparr[120][70]=1;
        this.temparr[121][70]=1;
        this.temparr[122][70]=1;
        this.temparr[123][70]=1;
        this.temparr[124][70]=1;
        this.temparr[125][70]=1;
        this.temparr[126][70]=1;
        this.temparr[127][70]=1;
        this.temparr[128][70]=1;
        this.temparr[129][70]=1;
        this.temparr[130][70]=1;
        this.temparr[131][70]=1;
        this.temparr[132][70]=1;
        this.temparr[133][70]=1;
        this.temparr[134][70]=1;
        this.temparr[135][70]=1;
        this.temparr[136][70]=1;
        this.temparr[137][70]=1;
        this.temparr[138][70]=1;
        this.temparr[139][70]=1;
        this.temparr[140][70]=1;
        this.temparr[141][70]=1;
        this.temparr[142][70]=1;
        this.temparr[143][70]=1;
        this.temparr[144][70]=1;
        this.temparr[145][70]=1;
        this.temparr[146][70]=1;
        this.temparr[147][70]=1;
        this.temparr[148][70]=1;
        this.temparr[149][70]=1;
        this.temparr[150][70]=1;
        this.temparr[151][70]=1;
        this.temparr[152][70]=1;
        this.temparr[153][70]=1;
        this.temparr[154][70]=1;
        this.temparr[155][70]=1;
        this.temparr[156][70]=1;
        this.temparr[157][70]=1;
        this.temparr[158][70]=1;
        this.temparr[159][70]=1;
        this.temparr[160][70]=1;
        this.temparr[161][70]=1;
        this.temparr[162][70]=1;
        this.temparr[163][70]=1;
        this.temparr[164][70]=1;
        this.temparr[165][70]=1;
        this.temparr[166][70]=1;
        this.temparr[167][70]=1;
        this.temparr[168][70]=1;
        this.temparr[169][70]=1;
        this.temparr[170][70]=1;
        this.temparr[171][70]=1;
        this.temparr[172][70]=1;
        this.temparr[173][70]=1;
        this.temparr[174][70]=1;
        this.temparr[175][70]=1;
        this.temparr[176][70]=1;
        this.temparr[177][70]=1;
        this.temparr[178][70]=1;
        this.temparr[179][70]=1;
        this.temparr[180][70]=1;
        this.temparr[181][70]=1;
        this.temparr[182][70]=1;
        this.temparr[183][70]=1;
        this.temparr[184][70]=1;
        this.temparr[185][70]=1;
        this.temparr[186][70]=1;
        this.temparr[187][70]=1;
        this.temparr[188][70]=1;
        this.temparr[189][70]=1;
        this.temparr[190][70]=1;
        this.temparr[191][70]=1;
        this.temparr[192][70]=1;
        this.temparr[193][70]=1;
        this.temparr[194][70]=1;
        this.temparr[195][70]=1;
        this.temparr[196][70]=1;
        this.temparr[197][70]=1;
        this.temparr[198][70]=1;
        this.temparr[199][70]=1;



        this.MAXX=this.DrawableSpaceX-1; //right furthest boundary
        this.MAXY=this.DrawableSpaceY-1; //bottom furthest boundary









        this.log("Clock created");
    },

    load: function(date) {

    },

    draw: function(date) {
        // application specific 'draw'
        // only redraw if more than 1 sec has passed
        // this.timer = this.timer + this.dt;
        // if(this.timer >= 1.0) {
        //     this.timer = 0.0;
        //     this.redraw = true;
        // }

        // if(this.redraw) {
            // clear canvas
            this.ctx.clearRect(0,0, this.element.width, this.element.height);

            this.ctx.fillStyle = "rgba(255, 255, 255, 1.0)"
            this.ctx.fillRect(0,0, this.element.width, this.element.height)

            // var radius = 0.95 * this.minDim / 2;
            // var centerX = this.element.width / 2;
            // var centerY = this.element.height / 2;

            // // outside of clock
            // this.ctx.lineWidth = (3.0/100.0) * this.minDim;
            // this.ctx.strokeStyle = "rgba(85, 100, 120, 1.0)";
            // this.ctx.beginPath();
            // this.ctx.arc(centerX, centerY, radius, 0, Math.PI*2);
            // this.ctx.closePath();
            // this.ctx.stroke();





             for (var x = 0; x<this.DrawableSpaceX; x=x+1) {  //steps through all the cells to run game logic
                for (var y =0; y<this.DrawableSpaceY; y=y+1) {
                        this.neighbors=0;
                        //In the example below C is being checked if it alive or dead.
                        if((x-1>0)&&(y-1>0)&&this.arr[x-1][y-1]==1)                {this.neighbors++;}      
                        if((x-1>0)&&1&&this.arr[x-1][y]==1)                        {this.neighbors++;}
                        if((x-1>0)&&(y+1<this.MAXY)&&this.arr[x-1][y+1]==1)        {this.neighbors++;}
                        if((y-1>0)&&this.arr[x][y-1]==1&&1)                        {this.neighbors++;} 
                        if((y+1<this.MAXY)&&this.arr[x][y+1]==1&&1)                {this.neighbors++;} 
                        if((x+1<this.MAXX)&&(y-1>0)&&this.arr[x+1][y-1]==1)        {this.neighbors++;} 
                        if((x+1<this.MAXX)&&this.arr[x+1][y]==1&&1)                {this.neighbors++;}
                        if((x+1<this.MAXX)&&(y+1<this.MAXY)&&this.arr[x+1][y+1]==1){this.neighbors++;}

                    //if (x==4&&y==2) {console.log("Specific: "+ neighbors)}; Debugging

                    //0 dead
                    //1 alive
                    //2 was-alive perviously. (1-cycle ago or more) 
                    // console.log("Neighbors: " + neighbors);
                    if (this.arr[x][y]==1&&this.neighbors<2) {
                        // this.temparr[x][y]=0;            
                        this.temparr[x][y]=2;            
                    }
                    if(this.arr[x][y]==1&&this.neighbors>2){
                        // this.temparr[x][y]=0;
                        this.temparr[x][y]=2;
                    }
                    if(this.neighbors==3){
                        this.temparr[x][y]=1;
                    }
                    else{}
                    /* End rules from Wikipedia*/
                }
            }


            //Copy from the newly comptued state of the game to the displayed state of the game.
            //write over the previous game state with the new game state
            
            //Consider swapping X and Y for mem eff
            for (var x = 0; x<this.DrawableSpaceX; x=x+1) { //Write horizontally
                for (var y =0; y<this.DrawableSpaceY; y=y+1) {  //Write vertically
                    this.arr[x][y] = this.temparr[x][y]; //takes the newest state and stores it to be displayed
                }
            }

            // ctx.clearRect(0, 0, canvas.width, canvas.height); // could clear the canvas if we wanted, was just messing with it.
            for (var x = 0; x<this.DrawableSpaceX; x=x+1) {
                for (var y =0; y<this.DrawableSpaceY; y=y+1) {
                    // ctx.fillRect(x,y,sq,sq);
                    if (this.arr[x][y]==1) {//Currently alive
                        this.ctx.fillStyle="#00FF00"; //Green
                        this.ctx.fillRect(x*(this.sqPad),y*(this.sqPad),this.sq,this.sq);}  //offset by x and y and the size(sq)
                    else if (this.arr[x][y]==2) {//Was previously alive in the last state
                        this.ctx.fillStyle="#333333"; //Gray
                        this.ctx.fillRect(x*(this.sqPad),y*(this.sqPad),this.sq,this.sq);//offset
                    }
                    else {//Currently dead and not an active state
                        this.ctx.fillStyle="#000000"; //black
                        this.ctx.fillRect(x*(this.sqPad),y*(this.sqPad),this.sq,this.sq); //offset
                        //stored in a buffer until stroke is called and draws it to the canvas (ctx)
                        
                    }
                }
            }


            this.ctx.fillStyle="#000000"; //black
            this.ctx.fillRect(0,0,this.sq,this.sq); //offset
            this.ctx.stroke(); // display all the items.
            // clear canvas


        //     this.redraw = false;
        // }
    },

    resize: function(date) {
        this.minDim = Math.min(this.element.width, this.element.height);
        this.redraw = true;



        // this.neighbors=0;  //new temp value of neighbors
        // this.arr = new Array();  //new array (displayed array)
        // this.temparr = new Array();  //new arr (used to copy over new state)

        // this.DrawableSpaceX=0; //reset drawable space
        // this.DrawableSpaceY=0;
        // this.sqPad = this.sq+this.sqPadding;  //reset the each cell

        // this.DrawableSpaceX = Math.floor((this.element.width/(this.sqPad))); //Computing the amount of new cells in the X direction
        // this.DrawableSpaceY = Math.floor((this.element.height/(this.sqPad)));  //Computing the amount of new cells in the Y direction


        // this.CanvasHeight = this.element.clientHeight;  //Storing the canvas height and width
        // this.CanvasWidth = this.element.clientWidth; //storing the vanvas height and width

        // // init
        // for (var x = 0; x<this.DrawableSpaceX; x=x+1) { //reinitializing the array with zeros
        //     this.arr[x] = new Array();
        //     this.temparr[x] = new Array();
        //     for (var y =0; y<this.DrawableSpaceY; y=y+1) {
        //         this.arr[x][y] = 0;
        //         this.temparr[x][y] = 0;
        //     }
        // }

        // this.MAXX=DrawableSpaceX-1;  //accounts for Max drawable horizontal space
        // this.MAXY=DrawableSpaceY-1;  //accounts for Mac drawable vertical space


        // //Transfers the new state to be displayed
        // for (var x = 0; x<this.DrawableSpaceX; x=x+1) {  
        //     for (var y =0; y<this.DrawableSpaceY; y=y+1) {
        //         this.arr[x][y] = this.temparr[x][y];
        //     }
        // }


        // for (var x = 0; x<this.DrawableSpaceX; x=x+1) {  
        //     for (var y =0; y<this.DrawableSpaceY; y=y+1) {
        //         // ctx.fillRect(x,y,sq,sq);
        //         if (this.arr[x][y]==1) {//If it alive, then it is green
        //             this.ctx.fillStyle="#00FF00";
        //             this.ctx.fillRect(x*(this.sqPad),y*(this.sqPad),this.sq,this.sq);}
        //         else if (this.arr[x][y]==2) { //it it was previously alive, now it is gray
        //             this.ctx.fillStyle="#333333";
        //             this.ctx.fillRect(x*(this.sqPad),y*(this.sqPad),this.sq,this.sq);
        //         }
        //         else {  //if it is dead, then it is black
        //             this.ctx.fillStyle="#000000";
        //             this.ctx.fillRect(x*(this.sqPad),y*(this.sqPad),this.sq,this.sq);
        //         }
        //     }
        // }

        // this.ctx.stroke();//draw the image


        this.refresh(date);
    },

    event: function(type, position, user, data, date) {
        if (type==="pointerPress") {
			this.redraw = true;
			// draw();

            /*********************************/
	        /* What of this do i need to do? */
	        /*********************************/

	        //position.x?
	        // position.y?
	        // this.log("click");

	        // var xx = position.x;  //gives the horizontal position of the mouse click
	        // var yy = position.y;  //gives the vertical position of the mouse click

	        // // var canvas = document.getElementById("canvas");  //canvas object

	        // // xx -= canvas.offsetLeft;  //if the window moves around, we need to offset the mouse position
	        // // yy -= canvas.offsetTop; 

	        // /*********************************/
	        // /* What of this do i need to do? */
	        // /*********************************/

	        // //console.log("PRE: X: "+xx +", Y:"+yy+".");    Debugging

	        // this.DrawableSpaceX = Math.floor((this.element.width/(this.sqPad)));  //Gets the amount of Cells in the horizontal direction
	        // this.DrawableSpaceY = Math.floor((this.element.height/(this.sqPad)));  //Gets the amount of Cells in the veritical direction

	        // //If this is out of bounds
	        // if (Math.floor((xx/(this.sqPad)))<0||
	        // 	Math.floor((yy/(this.sqPad)))<0||
	        // 	this.MAXX<Math.floor((xx/(this.sqPad)))||
	        // 	this.MAXY<Math.floor((yy/(this.sqPad)))) //Do i have console. log****************
	        //     {/*this.log("IF: X: "+xx+", Y:"+yy+".");*/return; }//Life is bad and out of bounds. this is an error and should be displayed in the console.(This should never happen)
	        // else{
	        //     var xp = Math.floor((xx/(this.sqPad)));  //Computes which column the mouse click is in
	        //     var yp = Math.floor((yy/(this.sqPad)));  //Computes which row you are in

	        //     //allows to user to continue to simulate over and over again
	        //     if (this.arr[xp][yp]==1) {//it the cells is alive, you can kill the cell
	        //             this.arr[xp][yp]=0;
	        //             this.temparr[xp][yp]=0;
	        //             this.ctx.fillStyle="#000000";
	        //             this.ctx.fillRect(xp*(this.sqPad),yp*(this.sqPad),this.sq,this.sq); //set up for stroke
	        //     }
	        //     else{//if the cells are dead, you can bring it back
	        //             this.arr[xp][yp]=1;
	        //             this.temparr[xp][yp]=1;
	        //             this.ctx.fillStyle="#00FF00";
	        //             this.ctx.fillRect(xp*(this.sqPad),yp*(this.sqPad),this.sq,this.sq);  //set up for stroke
	        //     }

	        // //     // console.log("ELSE: X: "+xx+","+xp +", Y:"+yy+","+yp+".");    Dubugging
	        //     this.ctx.stroke(); //color it in
	        // }
		}
    },

    quit: function() {
        // done
    }
});
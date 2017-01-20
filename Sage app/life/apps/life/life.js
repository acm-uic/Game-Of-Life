/*
<!-- Tobin Hwang -->
<!-- Mac Carter -->
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Copyright (c) <2015> <Tobin Hwang, Mac Carter>



Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:



The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.



THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/

"use strict";

var life = SAGE2_App.extend( {
    init: function(data) {
        this.log("started");
        this.SAGE2Init("canvas", data);

        this.resizeEvents = "continuous";

        // application specific 'init'
        this.ctx = this.element.getContext("2d");
        // this.minDim = Math.min(this.element.width, this.element.height);

        this.stopUpdate=0; // =1 stop updating game state, =0 update @ 60fps(if possible)
        this.neighbors=0; //Game Variable
        this.arr = new Array(); //Create an array for the current state of the game
        this.temparr = new Array(); //array for the next state of the game

        this.DrawableSpaceX=0;  //amount of drawable cells in the X-dir
        this.DrawableSpaceY=0;  //amount of drawable cells in the Y-dir
        this.sq = 30;  //colored size of the cell (cell made up of 30x30 pixels)
        this.sqPadding = 0; //no padding


        this.sqPad = sq+sqPadding;  //actual size of the cell

        this.DrawableSpaceX = Math.floor((this.element.clientWidth/(sqPad)));  //# of cells in the X direction
        DrawableSpaceY = Math.floor((this.element.clientHidth/(sqPad))); //# of cells in the Y direction

        this.CanvasWidth = this.element.clientWidth; //variable of the width of the canvas
        this.CanvasHeight = this.element.clientHeight; //variable of the height of the canvas

        for (var x = 0; x<this.DrawableSpaceX; x=x+1) {
            this.arr[x] = new Array();// just like in C we need to malloc space in an array if we want two dimentions.
            this.temparr[x] = new Array();// Same here
            for (var y =0; y<this.DrawableSpaceY; y=y+1) {
                this.arr[x][y] = 0; //Initalize to 0.
                this.temparr[x][y] = 0;
            }
        }



        this.MAXX=DrawableSpaceX-1; //right furthest boundary
        this.MAXY=DrawableSpaceY-1; //bottom furthest boundary


        // this.temparr[3][3]=1; //temp test code 
        // this.temparr[2][3]=1;
        // this.temparr[4][3]=1;
        // this.temparr[5][3]=1;

        // update();//calls the function update

        this.timer = 0.0;
        this.redraw = true;
        this.log("life created");
    },

    load: function(date) {

    },

    draw: function(date) {
        this.log("updated");
        // application specific 'draw'
        // only redraw if more than 1 sec has passed
        this.timer = this.timer + this.dt;
        if(this.timer >= 1.0) {
            this.timer = 0.0;
            this.redraw = true;
        }

        if(this.redraw) {



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

            this.ctx.stroke(); // display all the items.
            // clear canvas

            this.redraw = false;
        }
    },

    resize: function(date) {
        this.minDim = Math.min(this.element.clientWidth, this.element.clientHeight);
        this.redraw = true;



        this.neighbors=0;  //new temp value of neighbors
        this.arr = new Array();  //new array (displayed array)
        this.temparr = new Array();  //new arr (used to copy over new state)

        this.DrawableSpaceX=0; //reset drawable space
        this.DrawableSpaceY=0;
        this.sqPad = this.sq+this.sqPadding;  //reset the each cell

        this.DrawableSpaceX = Math.floor((this.element.clientWidth/(this.sqPad))); //Computing the amount of new cells in the X direction
        this.DrawableSpaceY = Math.floor((this.element.clientHeight/(this.sqPad)));  //Computing the amount of new cells in the Y direction


        this.CanvasHeight = this.element.clientHeight;  //Storing the canvas height and width
        this.CanvasWidth = this.element.clientWidth; //storing the vanvas height and width

        // init
        for (var x = 0; x<this.DrawableSpaceX; x=x+1) { //reinitializing the array with zeros
            this.arr[x] = new Array();
            this.temparr[x] = new Array();
            for (var y =0; y<this.DrawableSpaceY; y=y+1) {
                this.arr[x][y] = 0;
                this.temparr[x][y] = 0;
            }
        }

        this.MAXX=DrawableSpaceX-1;  //accounts for Max drawable horizontal space
        this.MAXY=DrawableSpaceY-1;  //accounts for Mac drawable vertical space


        //Transfers the new state to be displayed
        for (var x = 0; x<this.DrawableSpaceX; x=x+1) {  
            for (var y =0; y<this.DrawableSpaceY; y=y+1) {
                this.arr[x][y] = this.temparr[x][y];
            }
        }


        for (var x = 0; x<this.DrawableSpaceX; x=x+1) {  
            for (var y =0; y<this.DrawableSpaceY; y=y+1) {
                // ctx.fillRect(x,y,sq,sq);
                if (this.arr[x][y]==1) {//If it alive, then it is green
                    this.ctx.fillStyle="#00FF00";
                    this.ctx.fillRect(x*(this.sqPad),y*(this.sqPad),this.sq,this.sq);}
                else if (this.arr[x][y]==2) { //it it was previously alive, now it is gray
                    this.ctx.fillStyle="#333333";
                    this.ctx.fillRect(x*(this.sqPad),y*(this.sqPad),this.sq,this.sq);
                }
                else {  //if it is dead, then it is black
                    this.ctx.fillStyle="#000000";
                    this.ctx.fillRect(x*(this.sqPad),y*(this.sqPad),this.sq,this.sq);
                }
            }
        }

        this.ctx.stroke();//draw the image


        // this.refresh(date);
    },

    event: function(type, position, user, data, date) {
        // this.refresh(date);
        if (type==="pointerPress") {
            click(position);
        }
    },

    click: function(position){

        /*********************************/
        /* What of this do i need to do? */
        /*********************************/

        //position.x?
        // position.y?
        this.log("click");

        var xx = position.x;  //gives the horizontal position of the mouse click
        var yy = position.y;  //gives the vertical position of the mouse click

        // var canvas = document.getElementById("canvas");  //canvas object

        // xx -= canvas.offsetLeft;  //if the window moves around, we need to offset the mouse position
        // yy -= canvas.offsetTop; 

        /*********************************/
        /* What of this do i need to do? */
        /*********************************/

        //console.log("PRE: X: "+xx +", Y:"+yy+".");    Debugging

        DrawableSpaceX = Math.floor((this.element.clientWidth/(sqPad)));  //Gets the amount of Cells in the horizontal direction
        DrawableSpaceY = Math.floor((this.element.clientHeight/(sqPad)));  //Gets the amount of Cells in the veritical direction

        //If this is out of bounds
        if (Math.floor((xx/(this.sqPad)))<0||Math.floor((yy/(this.sqPad)))<0 
        ||this.MAXX<Math.floor((xx/(this.sqPad)))||this.MAXY<Math.floor((yy/(this.sqPad)))) //Do i have console. log****************
            {this.log("IF: X: "+xx+", Y:"+yy+".");return; }//Life is bad and out of bounds. this is an error and should be displayed in the console.(This should never happen)
        else{
            var xp = Math.floor((xx/(this.sqPad)));  //Computes which column the mouse click is in
            var yp = Math.floor((yy/(this.sqPad)));  //Computes which row you are in

            //allows to user to continue to simulate over and over again
            if (this.arr[xp][yp]==1) {//it the cells is alive, you can kill the cell
                    this.arr[xp][yp]=0;
                    this.temparr[xp][yp]=0;
                    this.ctx.fillStyle="#000000";
                    this.ctx.fillRect(xp*(this.sqPad),yp*(this.sqPad),this.sq,this.sq); //set up for stroke
            }
            else{//if the cells are dead, you can bring it back
                    this.arr[xp][yp]=1;
                    this.temparr[xp][yp]=1;
                    this.ctx.fillStyle="#00FF00";
                    this.ctx.fillRect(xp*(this.sqPad),yp*(this.sqPad),this.sq,this.sq);  //set up for stroke
            }

            // console.log("ELSE: X: "+xx+","+xp +", Y:"+yy+","+yp+".");    Dubugging
            this.ctx.stroke(); //color it in
        }
    }

    quit: function() {
        // done
    }
});
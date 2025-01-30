
// console.log('in js file');

// Using the IIFE pattern to avoid polluting the global scope
( function () {
    
    var canvas1;
    var canvas2;

    function doFirst(){ // canvas1 - adding, sizing and moving pictures once loaded
        var obj = document.getElementById('canvas1'); 
        canvas1 = obj.getContext('2d');
        
        var pic = new Image();
        pic.src = "./images/smiley-face.jpg";
        
        pic.addEventListener ('load', 
            function(){canvas1.drawImage(pic, 0, 0, obj.width, obj.height)}, false); 

    }
    
    function doSecond (){
        var obj = document.getElementById('canvas2'); 
        canvas2 = obj.getContext('2d');
        
        window.addEventListener ("mousemove", mousePlay, false); 
        
    }
    
    function mousePlay(e) {
        // comment out to draw 
        canvas2.clearRect (0,0, 400, 200);
        var xPos = e.clientX ; // cause we have two canvases, could be dynamically assigned ...  
        var yPos = e.clientY ; // clientX-Y is based on the window objhect
        
        
        
        canvas2.fillRect(xPos-50, yPos-50, 10, 10); 
        
    }   

    window.addEventListener ('load', doFirst, false); 
    window.addEventListener ('load', doSecond, false); 
    
})();


    


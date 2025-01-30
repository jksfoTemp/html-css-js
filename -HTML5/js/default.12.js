
// console.log('in js file');

// Using the IIFE pattern to avoid polluting the global scope
( function () {
    
    function doFirst(){ // canvas1
        // Note that the order in which these occur is important
        // Drawing and gradients 
        var obj = document.getElementById('canvas1'); 
        var canvas1 = obj.getContext('2d');
        var g = canvas1.createLinearGradient (50, 50, 200, 150);
        g.addColorStop(0.0, 'green'); 
        g.addColorStop(0.5, 'pink'); 
        g.addColorStop(1, 'yellow'); 
        
        canvas1.fillStyle= g; // gradient
        // canvas1.fillStyle='blue'; // fill
        canvas1.strokeStyle='red'; // outline 
        
        canvas1.strokeRect(10, 10, 100, 100); 
        canvas1.fillRect(120, 10, 100, 100); 
        canvas1.clearRect(130, 12, 70, 50);
        
        canvas1.beginPath();
        canvas1.moveTo(50, 50); // Starting point
        canvas1.lineTo(70, 150); // draw
        canvas1.lineTo(120, 120); // draw
        canvas1.closePath();
        canvas1.stroke(); // actually draw it 
        
        canvas1.font="bold 36px Tahoma"; 
        canvas1.textAlign="end";
        canvas1.fillText("yuppersyuppersyuppers", 300, 50); 
        canvas1.strokeText("yuppersyuppersyuppers", 200, 100); 
    }

    function doSecond (){ // canvas2
        // Text and Shadows
        var obj = document.getElementById('canvas2'); 
        var canvas2 = obj.getContext('2d');
        
        canvas2.shadowOffsetX = 4;
        canvas2.shadowOffsetY = 4;
        canvas2.shadowBlur = 6;
        // canvas2.shadowColor = 'blue';
        canvas2.shadowColor = 'rgba(0, 0, 255, .5)';
        
        canvas2.font = "bold 36px Tahoma";
        canvas2.textAlign = "end"; 
        canvas2.fillText("Some Fill Text", 300, 100)
    }

    function doThird (){ // canvas3
        // Transformations - translate, rotate, scale
        var obj = document.getElementById('canvas3'); 
        var canvas3 = obj.getContext('2d');
        
        canvas3.font = "bold 36px Tahoma";
        canvas3.textAlign = "start"; 
        canvas3.fillText("More Fill Text", 10, 30)
        
        canvas3.translate(20, 50);
        canvas3.fillText("after translate", 0, 0)
        
        canvas3.rotate(1); // in radians 1 radian ~= 57.3 degrees
        canvas3.fillText("after rotate", 0, 0)
        
        canvas3.scale (1.5, 4);
        canvas3.fillText("after scale", 40, -10)
    }

    function doFourth (){ // canvas4
        // Transformations - translate, rotate, scale
        var obj = document.getElementById('canvas4'); 
        var canvas4 = obj.getContext('2d');
        
        canvas4.font = "bold 22px Tahoma";
        canvas4.textAlign = "start"; 
        
        // save initial state 
        canvas4.save();
        canvas4.fillText("After initial save", 10, 30)
        canvas4.rotate(1); 
        canvas4.fillText("After rotation", 60, 10)
        
        canvas4.restore();
        canvas4.fillText("After restoration", 10, 30)
    }

    window.addEventListener ('load', doFirst, false); 
    window.addEventListener ('load', doSecond, false); 
    window.addEventListener ('load', doThird, false); 
    window.addEventListener ('load', doFourth, false); 
})();


    


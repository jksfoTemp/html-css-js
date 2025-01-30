
// console.log('in js file');

// Using the IIFE pattern to avoid polluting the global scope
( function () {
    
    var someImage; // = document.getElementById('someImage');
    var leftBox; // = document.getElementById('leftBox');
    // var code = '<img scr="./images/smiley-face.jpg">';
    var code = '<img scr="smiley-face.jpg" > </img>';
        
    function doFirst(){ // 
        someImage = document.getElementById('someImage');
        someImage.addEventListener('dragstart', startDrag, false); 
        someImage.addEventListener('dragend', endDrag, false); 

        leftBox = document.getElementById('leftBox');
        // The following allows for consistent browser behaviour
        leftBox.addEventListener('dragenter', dragEnter/*function(e){e.preventDefault();}*/, false); 
        leftBox.addEventListener('dragleave', dragLeave/*function(e){e.preventDefault();}*/, false); 
        leftBox.addEventListener('dragover', function(e){e.preventDefault();}, false); 
        leftBox.addEventListener('drop', dropped, false); 
    }
    
    function startDrag (e) {
        console.log(code);
        e.dataTransfer.setData('Text', code);
    }

    function dragEnter (e) {
        e.dataTransfer.setData('Text', code);
    }

    function dragLeave (e) {
        e.dataTransfer.setData('Text', code);
    }

    function endDrag (e) {
        console.log(code);
        var pic = e.target;
        pic.style.visibility = 'hidden'; 
    }

    function dropped (e) {
        console.log(code);
        e.preventDefault();
        leftBox.innerHTML = e.dataTransfer.getData('Text');
    }

    window.addEventListener ('load', doFirst, false); 

})();


    


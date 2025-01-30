
// window.onload=alert('in js file');
console.log('in js file');

function getStuff(){
    // gets only first instance
    document.querySelector('#tuna').onclick=talk;
    
    // gets list/array of all matching elements 
    var list = document.querySelectorAll('#bacon');
    // assign fn to last element
    list[1].onclick = talk2;
    // assign fn to all elements
    for (var i=0; i<list.length; i++) {
        list[i].onclick = talk2;
    }
}

function talk(){
    alert('hi');
}

function talk2(){
    alert('bye');
}

window.onload=getStuff;

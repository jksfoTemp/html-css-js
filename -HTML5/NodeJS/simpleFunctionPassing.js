function say(word) {
  console.log(word);
}

function execute(someFunction, value) {
  someFunction(value);
}

execute(say, "Hello1");

// alternatively ... 

function execute(someFunction, value) {
  someFunction(value);
}

execute(function(word){ console.log(word) }, "Hello2");

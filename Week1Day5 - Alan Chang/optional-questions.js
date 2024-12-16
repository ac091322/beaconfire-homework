// Question 1
var dataObj = {
    data: "xyz",
    functionA: function () {
        var self = this;
        console.log("Outer function: this.data = " + this.data);
        console.log("Outer function: self.data = " + self.data);
        (function () {
            console.log("Inner function: this.data = " + this.data);
            console.log("Inner function: self.data = " + self.data);
        })();
    }
}

dataObj.functionA();
/*
output:
Outer function: this.data = xyz
Outer function: self.data = xyz
Inner function: this.data = undefined
Inner function: self.data = xyz

reasoning:
1. dataObj.functionA() invoke the function in the object at the key functionA (which is the "outer function")
2. when dataObj.functionA() is called, the context of "this" inside functionA refers to dataObj, which is why the this.data will log "xyz"
3. because var self = this, "self" stores the value of "this", which is dataObj, so both "this" and "self" will refer to the same dataObj.data and will also log "xyz"
4. the anonymous function will immediately invoke itself
5. inside the anonymous "inner function", "this" does not refer to dataObj
6. this is a non-array function, so the value of "this" depends on how the function is called
7. since the "inner function" is invoked directly as an IIFE, "this" defaults to the global object (the "window" or "global"), which is equivalent to window.data or global.data (in Node.js), and since data is not defind on the global object, this.data evalutes to "undefined"
8. in the "inner function," self.data works because the self variable is assigned the value of this in the "outer function" (functionA), which refers to dataObj, as a result, self.data consistently points to dataObj.data, regardless of the context in which the inner function is called
*/


// Question 2
var x = 1;  // doesn't matter if we change this line to let x = 1, it will still be undefined because of the var x = 2 inside the function
var fn = function () {
    console.log(x);
    var x = 2;
}

fn();
/*
output: undefined

reasoning:
1. the function fn is hoisted, meaning the declaration of fn itself is moved to the top of the scope
2. inside the function, the var x = 2 declaration is also hoisted to the top, but only the declaration (var x), not the initialization (x = 2)
3. when console.log(x) is executed, it will log "undefined" because variable declarations with var are undefined until they are initialized (unlike variable declarations with let or const which are in the temporal dead zone)
4. the global x = 1 is shadowed by the local x inside the function, so the function uses the local x and not the global one
5. if the global x were declared with let, the behavior would still be the same in this specific case because the local x inside function fn would still shadow the global x
*/


// Question 3
var b = 1;
function outer() {
    var b = 2;
    function inner() {
        b += 1;
        var b = 3;
        console.log(b);
    }
    inner();
}

outer();
/*
output: 3

reasoning:
1. the global variable b is declared and initialized in the global scope
2. the outer function is invoked, and line inside the outer function declares and initializes a local b with the value 2, which shadows the global b, but it doesn't affect the behavior inside inner function due to the b declared inside of the inner function
3. the inner function is invoked inside the outer function, and within inner, a new local variable b is declared with var b, which shadows the b in outer function and is hoisted to the top of the inner function
4. b += 1 tries to increment the local b by 1, but when b is hoisted and is undefined before initializtion, so this will get undefined += 1, which evaluates to NaN
5. now b is initialized to 3 in the line var b = 3
6. when console.log(b) executes, it prints the value of the local b because that is the value of b after it is initialized in the inner function
*/


// Question 4
(function (x) {
    return (function (y) {
        console.log(y);
    })(2);
})(1);

(function (x) {
    return (function (y) {
        console.log(x);
    })(2);
})(1);
/*
output:
2
1

reasoning:
1. in the first anonymous function, it is immediately invoked and 1 is passed in to x
2. inside the first anonymous function, a second inner anonymous function is immediately invoked, passing in 2 for y
3. console.log(y) prints 2 because it y is the variable passed to the inner function, and x is not used
4. in the second anonymous function, it is also immediately invoked and 1 is passed in to x
5. inside the second anonymous function, a second inner anonymous function is also immediatly invoked, passing in 2 for y
6. console.log(x) will print 1 from the outer function, and y is not used
*/


// Question 5
var user1 = {
    _name: "Username1",
    printName1: function () {
        console.log(this.name);
        console.log(this._name);
    }
}

var printName1 = user1.printName1;
printName1();  // prints "undefined" for this.name and "undefined" this._name
user1.printName1();  // prints "undefined" for this.name and "Username1" for this._name

var user2 = {
    _name: "Username2",
    printName2: () => {
        console.log(this._name);
    }
}

var printName2 = user2.printName2;
printName2();  // prints "undefined" for this._name
user2.printName2();  // prints "undefined" for this._name
/*
output:
undefined
undefined
Username1
undefined
undefined

reasoning:
1. when user1.printName1 is assigned to printName1, it's extracting the method from user1, so now when printName1() is called, it's no longer bound to user1; the "this" inside printName1() now refers to the global object
2. printName1() is called as a regular function, which means that it is invoked as a function that is not directly attached to an object (this distinction is important because it affects how JavaScript handles the value of "this" inside the function)
3. when user1.printName1() is invoked directly, this is correctly bound to the user1 object, but inside the function, it is trying to log this.name, while user1 has the property _name (not name) and since there is no name property on user1, this.name will be undefined
4. when user1.printName1() is called directly, this is correctly bound to user1, and this._name correctly accesses user1._name, which is "Username1"
5. inside user2, since the arrow function is defined at the global level, this points to the global object and not user2
6. since the global object does not have a _name property, nor a name property, this._name or this.name will both print "undefined"
7. when user2.printName2() is called, the arrow function still uses the same behavior: this points to the global object, not user2, so this._name is still "undefined"
*/


// Question 6
for (var i = 0; i <= 5; i += 1) {
    setTimeout(() => {
        console.log(i);
    }, 3_000);
}
/*
output: 6 6 6 6 6 6

reasoning:
1. the var i is declared and hoisted outside the loop, so it's shared across all iterations
2. the loop runs, and for each iteration, setTimeout() schedules a callback to run after 3 seconds
3. after the loop finishes, i has been incremented 6 times, and each setTimeout callback prints the valu of i, which is 6 at the end of the iteration
4. the loop runs from i = 0 to i = 5, now i will increment one last time to 6, so when i = 6, i <= 5 is no longer true, and it exits the loop
5. when it exits the loop, all the setTimeout callbacks are triggered, and each callback logs the current value of i, which is 6, and since i was incremented to 6 before the loop terminated, setTimeout() prints 6 six times
*/

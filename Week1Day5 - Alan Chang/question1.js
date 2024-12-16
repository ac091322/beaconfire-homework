/*
Create a function named add2 that does the exact same thing but can be invoked in this way: add2(num1)(num2)(num3)
*/

function add(num1, num2, num3) {
    return num1 + num2 + num3;
}

const add2 = (num1) => {
    return (num2) => {
        return (num3) => {
            return num1 + num2 + num3
        }
    }
}


console.log(add(5, 6, 7));  // output: 18
console.log(add2(5)(6)(7));  // output: 18

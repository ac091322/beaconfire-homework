// pre-ES6 syntax and method --> prototype

// constructor function for creating VehicleES5 objects (blueprint creating vehicle objects with "engine" and "speed" properties)
// instance methods will be added to this prototype
const VehicleES5 = function (engine, speed) {
    this.engine = engine;
    this.speed = speed;
}

// add the .info() method to the VehicleES5 prototype
VehicleES5.prototype.info = function () {
    console.log(`The engine type for this vehicle is ${this.engine} and can go up to ${this.speed} miles per hour.`);
}

// constructor function for CarES5 which inherits properties from VehicleES5 prototype with additional properties
const CarES5 = function (engine, speed, wheels, brake) {
    VehicleES5.call(this, engine, speed);
    this.wheels = wheels;
    this.brake = brake;
}

// set up prototype inheritance so CarES5 inherits methods from VehicleES5.prototype
CarES5.prototype = Object.create(VehicleES5.prototype);

// restore CarES5.prototype.constructor to point to CarES5 (instead of VehicleES5)
CarES5.prototype.constructor = CarES5;

// add the honk() method to the CarES5 prototype
CarES5.prototype.honk = function () {
    console.log("Honk!");
}

// add a static method to the CarES5 constructor function (not available on instances);
CarES5.isTesla = function (car) {
    return car.brake ? true : false;
}

// test vehicle constructor and .info() method
const myVehicleES5 = new VehicleES5("V8", 100);
console.log(myVehicleES5);  // output: VehicleES5 { engine: 'V8', speed: 100 }
myVehicleES5.info() // output: The engine type for this vehicle is V8 and can go up to 100 miles per hour.

// test car constructor and instance method honk()
const myCarES51 = new CarES5("V6", 90, "Goodyear", null);  // no brakes
const myCarES52 = new CarES5("V6", 90, "Goodyear", "ABS");  // has brakes
console.log(myCarES51);  // output: CarES5 { engine: 'V6', speed: 90, wheels: 'Goodyear', brake: 'ABS' }
console.log(myCarES51 instanceof VehicleES5);  // output: true
console.log(myCarES51 instanceof CarES5);  // output: true
myCarES51.honk();  // output: Honk!

// test static method isTesla()
console.log(CarES5.isTesla(myCarES51));  // output: false
console.log(CarES5.isTesla(myCarES52));  // output: true

// test that isTesla() is not an instance method
console.log(myCarES51.isTesla);  // output: undefined
console.log(myCarES52.isTesla);  // output: undefined




// ES6 syntax and method --> class

// define the VehicleES6 class (blueprint for creating new vehicle objects)
class VehicleES6 {
    constructor(engine, speed) {
        this.engine = engine;
        this.speed = speed;
    }

    // add the .info() instance method to the VehicleES6 class
    info() {
        console.log(`The engine type for this vehicle is ${this.engine} and can go up to ${this.speed} miles per hour.`);
    }
}

// declare a new ES6 class named CarES6 that extends the VehicleES5 class (establishes inheritance)
class CarES6 extends VehicleES6 {
    constructor(engine, speed, wheels, brake) {
        super(engine, speed);
        this.wheels = wheels;
        this.brake = brake;
    }

    // add the .honk() instance method to the CarES6 class
    honk() {
        console.log("Honk!");
    }

    // defines a static method isTesla on the CarES6 class (belongs only to CarES6 class, not its instances)
    static isTesla(car) {
        return car.brake ? true : false;
    }
}

// test vehicle constructor and .info() method
const myVehicleES6 = new VehicleES6("V10", 150);
console.log(myVehicleES6);  // output: VehicleES6 { engine: 'V10', speed: 150 }
myVehicleES6.info();  // output: The engine type for this vehicle is V10. that can 150 miles per hour.

// test car constructor and instance method honk()
const myCarES61 = new CarES6("V12", 200, "Michelin", null);  // no brakes
const myCarES62 = new CarES6("V12", 200, "Michelin", "hydraulic");  // has brakes
console.log(myCarES61);  // output: CarES6 { engine: 'V12', speed: 200, wheels: 'Michelin', brake: null }
console.log(myCarES61 instanceof VehicleES6);  // output: true
console.log(myCarES61 instanceof CarES6);  // output: true
myCarES61.honk();  // output: Honk!
myCarES61.info();  // output: The engine type for this vehicle is V12 and can go up to 200 miles per hour.

// test static method isTesla()
console.log(CarES6.isTesla(myCarES61));  // output: false;
console.log(CarES6.isTesla(myCarES62));  // output: true;

// test that isTesla() is not an instance method
// must use the class to access it
console.log(myCarES61.isTesla);  // output: undefined
console.log(myCarES62.isTesla);  // output: undefined

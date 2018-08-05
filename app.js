"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// Exercise 1 - Class Basics
var Car = /** @class */ (function () {
    function Car(name) {
        this.acceleration = 0;
        this.honk = function () { return console.log('Toooot'); };
        this.name = name;
    }
    Car.prototype.accelerate = function (speed) {
        this.acceleration = this.acceleration + speed;
    };
    return Car;
}());
var car = new Car('BMW');
car.honk();
console.log(car.acceleration);
car.accelerate(10);
console.log(car.acceleration);
// Exercise 2 - Inheritance
var BaseObject = /** @class */ (function () {
    function BaseObject() {
        this.width = 0;
        this.length = 0;
    }
    return BaseObject;
}());
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.calcSize = function () { return _this.width * _this.length; };
        return _this;
    }
    return Rectangle;
}(BaseObject));
var rectangle = new Rectangle();
rectangle.width = 2;
rectangle.length = 4;
console.log(rectangle.calcSize());
// Exercise 3 - setter & getter
var Person = /** @class */ (function () {
    function Person() {
        this._firstName = 'Default';
    }
    Object.defineProperty(Person.prototype, "firstName", {
        get: function () {
            return this._firstName;
        },
        set: function (name) {
            if (name.length > 3) {
                this._firstName = name;
            }
            else {
                this._firstName = 'no name';
            }
        },
        enumerable: true,
        configurable: true
    });
    return Person;
}());
var person = new Person();
console.log(person.firstName);
person.firstName = 'Ar';
console.log(person.firstName);
person.firstName = 'Armand';
console.log(person.firstName);
// Generics
var MyMap = /** @class */ (function () {
    function MyMap() {
        this.map = {};
    }
    MyMap.prototype.setItem = function (key, item) {
        this.map[key] = item;
    };
    MyMap.prototype.getItem = function (key) {
        return this.map[key];
    };
    MyMap.prototype.clear = function () {
        this.map = {};
    };
    MyMap.prototype.printMap = function () {
        for (var key in this.map) {
            console.log(key, this.map[key]);
        }
    };
    return MyMap;
}());
var numberMap = new MyMap();
numberMap.setItem('apples', 2);
numberMap.setItem('bananas', 8);
console.log(numberMap.getItem('apples'));
numberMap.printMap();
numberMap.clear();
numberMap.printMap();
var stringMap = new MyMap();
stringMap.setItem('apples', '2');
stringMap.setItem('bananas', '8');
console.log(stringMap.getItem('apples'));
stringMap.printMap();
stringMap.clear();
stringMap.printMap();
/// Decorators
function logged(constructorFn) {
    console.log(constructorFn);
}
var Person2 = /** @class */ (function () {
    function Person2() {
        console.log("Hi!");
    }
    Person2 = __decorate([
        logged,
        __metadata("design:paramtypes", [])
    ], Person2);
    return Person2;
}());
// Factory
function logging(value) {
    return value ? logged : null;
}
var Car2 = /** @class */ (function () {
    function Car2() {
    }
    Car2 = __decorate([
        logging(true)
    ], Car2);
    return Car2;
}());
// Advanced
function printable(constructorFn) {
    constructorFn.prototype.print = function () {
        console.log(this);
    };
}
var Plant2 = /** @class */ (function () {
    function Plant2() {
        this.name = "Green Plant";
    }
    Plant2 = __decorate([
        logging(false),
        printable
    ], Plant2);
    return Plant2;
}());
var plant = new Plant2();
plant.print();
// Method Decorator
// Property Decorator
function editable(value) {
    return function (target, propName, descriptor) {
        descriptor.writable = value;
    };
}
function overwritable(value) {
    return function (target, propName) {
        var newDescriptor = {
            writable: value
        };
        return newDescriptor;
    };
}
var Project2 = /** @class */ (function () {
    function Project2(name) {
        this.projectName = name;
    }
    Project2.prototype.calcBudget = function () {
        console.log(1000);
    };
    __decorate([
        overwritable(false),
        __metadata("design:type", String)
    ], Project2.prototype, "projectName", void 0);
    __decorate([
        editable(false),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Project2.prototype, "calcBudget", null);
    return Project2;
}());
var project = new Project2("Super Project");
project.calcBudget();
project.calcBudget = function () {
    console.log(2000);
};
project.calcBudget();
console.log(project);
// Parameter Decorator
function printInfo(target, methodName, paramIndex) {
    console.log("Target: ", target);
    console.log("methodName: ", methodName);
    console.log("paramIndex: ", paramIndex);
}
var Course = /** @class */ (function () {
    function Course(name) {
        this.name = name;
    }
    Course.prototype.printStudentNumbers = function (mode, printAll) {
        if (printAll) {
            console.log(10000);
        }
        else {
            console.log(2000);
        }
    };
    __decorate([
        __param(1, printInfo),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Boolean]),
        __metadata("design:returntype", void 0)
    ], Course.prototype, "printStudentNumbers", null);
    return Course;
}());
var course = new Course("Super Course");
course.printStudentNumbers("anything", true);
course.printStudentNumbers("anything", false);

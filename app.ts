// Exercise 1 - Class Basics
class Car {
  private name: string;
  acceleration: number = 0;

  accelerate(speed: number) {
    this.acceleration = this.acceleration + speed;
  }

  constructor(name: string) {
    this.name = name;
  }

  honk = () => console.log('Toooot');
}
const car = new Car('BMW');

car.honk();
console.log(car.acceleration);
car.accelerate(10);
console.log(car.acceleration);

// Exercise 2 - Inheritance
class BaseObject {
  width: number = 0;
  length: number = 0;
}

class Rectangle extends BaseObject {
  calcSize = () => this.width * this.length;
}

const rectangle = new Rectangle();

rectangle.width = 2;
rectangle.length = 4;

console.log(rectangle.calcSize());

// Exercise 3 - setter & getter
class Person {
  private _firstName: string = 'Default';

  get firstName(): string {
    return this._firstName;
  }

  set firstName(name: string) {
    if (name.length > 3) {
      this._firstName = name;
    }
    else {
      this._firstName = 'no name';
    }
  }
}

const person = new Person();

console.log(person.firstName);
person.firstName = 'Ar';
console.log(person.firstName);
person.firstName = 'Armand';
console.log(person.firstName);

// Generics
class MyMap<T> {
  private map: {[key: string]: T} = {};

  setItem(key: string, item: T) {
    this.map[key] = item;
  }

  getItem(key: string) {
    return this.map[key];
  }

  clear() {
    this.map = {};
  }

  printMap() {
    for(let key in this.map) {
      console.log(key, this.map[key]);
    }
  }
}

const numberMap = new MyMap<number>();

numberMap.setItem('apples', 2);
numberMap.setItem('bananas', 8);

console.log(numberMap.getItem('apples'));
numberMap.printMap();
numberMap.clear();
numberMap.printMap();

const stringMap = new MyMap<string>();

stringMap.setItem('apples', '2');
stringMap.setItem('bananas', '8');

console.log(stringMap.getItem('apples'));
stringMap.printMap();
stringMap.clear();
stringMap.printMap();


/// Decorators
function logged(constructorFn: Function) {
    console.log(constructorFn);
}

@logged
class Person2 {
    constructor() {
        console.log("Hi!");
    }
}

// Factory
function logging(value: boolean) {
    return value ? logged : null;
}

@logging(true)
class Car2 {

}

// Advanced
function printable(constructorFn: Function) {
    constructorFn.prototype.print = function () {
        console.log(this);
    }
}

@logging(false)
@printable
class Plant2 {
    name = "Green Plant";
}
const plant = new Plant2();
(<any>plant).print();

// Method Decorator
// Property Decorator
function editable(value: boolean) {
    return function (target: any, propName: string, descriptor: PropertyDescriptor) {
        descriptor.writable = value;
    }
}

function overwritable(value: boolean) {
    return function (target: any, propName: string): any {
        const newDescriptor: PropertyDescriptor = {
            writable: value
        };
        return newDescriptor;
    }
}

class Project2 {
    @overwritable(false)
    projectName: string;

    constructor(name: string) {
        this.projectName = name;
    }

    @editable(false)
    calcBudget() {
        console.log(1000);
    }
}

const project = new Project2("Super Project");
project.calcBudget();
project.calcBudget = function () {
    console.log(2000);
};
project.calcBudget();
console.log(project);

// Parameter Decorator
function printInfo(target: any, methodName: string, paramIndex: number) {
    console.log("Target: ", target);
    console.log("methodName: ", methodName);
    console.log("paramIndex: ", paramIndex);
}

class Course {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    printStudentNumbers(mode: string, @printInfo printAll: boolean) {
        if (printAll) {
            console.log(10000);
        } else {
            console.log(2000);
        }
    }
}
const course = new Course("Super Course");
course.printStudentNumbers("anything", true);
course.printStudentNumbers("anything", false);

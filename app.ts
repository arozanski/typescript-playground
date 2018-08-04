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

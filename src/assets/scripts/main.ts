enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

let human: Human | undefined;

class Human {
  #name: string;
  #age: number;
  #gender: Gender;

  get name(): string {
    return this.#name;
  }
  set name(value: string) {
    this.#name = value;
  }
  get age(): number {
    return this.#age;
  }
  set age(value: number) {
    this.#age = value;
  }
  get gender(): Gender {
    return this.#gender;
  }
  set gender(value: Gender) {
    this.#gender = value;
  }

  constructor(name: string, age: number, gender: Gender) {
    this.#name = name;
    this.#age = age;
    this.#gender = gender;
  }
}

if (!human) {
  human = new Human('Michi', 50, Gender.Male);
}

console.log(human);

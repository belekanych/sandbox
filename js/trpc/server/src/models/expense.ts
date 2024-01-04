import { v4 as uuid } from "uuid";

export default class Expense {
  public id: string = "";
  public name: string = "";
  public price: number = 0;

  constructor(id: string, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  static create(name: string, price: number): Expense {
    return new Expense(uuid(), name, price);
  }
}

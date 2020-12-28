import { makeObservable, observable, action } from 'mobx';

export class Counter {
  @observable count = 0;

  constructor() {
    makeObservable(this);
  }

  @action increment = () => this.count++;
}

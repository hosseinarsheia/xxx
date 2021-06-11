import {makeAutoObservable} from 'mobx';

class Mine {
  num = 1;
  constructor() {
    makeAutoObservable(this);
  }

  increase = () => {
    this.num += 1;
  };
}

export const store = new Mine();

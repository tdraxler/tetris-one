//An example of a class we can use for global variables.

class TestModule {
  constructor() {
    this.myVar = 100;
  }
}

export default (new TestModule);
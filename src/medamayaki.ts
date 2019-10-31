class Medamayaki {
  private container: {
    [name: string]: {
      closure: <T>(container: Medamayaki) => T;
      isSingleton: boolean;
    };
  } = {};
  private singletons: {
    [name: string]: any;
  } = {};

  register(name: string, closure: <T>(container: Medamayaki) => T) {
    this.container[name] = { closure, isSingleton: false };
  }

  singleton(name: string, closure: <T>(container: Medamayaki) => T) {
    this.container[name] = { closure, isSingleton: true };
  }

  resolve(name: string) {
    const registration = this.container[name];

    if (registration === undefined) {
      throw new Error(`Unknown registration ${name}`);
    }

    if (registration.isSingleton) {
      const hasInstance = this.singletons[name] !== undefined;

      if (hasInstance) {
        return this.singletons[name];
      }

      const instance = registration.closure(this);

      this.singletons[name] = instance;

      return instance;
    }

    return registration.closure(this);
  }
}

export default Medamayaki;

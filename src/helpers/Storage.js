class Storage {
  constructor(type) {
    this.storage = null;
    this.selectStorage(type);
  }
  selectStorage(type) {
    switch (type) {
      case 'local':
        try {
          window && window.localStorage.setItem('monzotask', 'ui');
          window.localStorage.removeItem('monzotask');
          this.storage = window.localStorage;
        } catch (e) {
          console.error('Local storage is not available');
        }
        break;
      default:
        break;
    }
  }
  get(key) {
    if (this.storage) {
      if (this.storage.getItem(key)) {
        try {
          return this.storage.getItem(key);
        } catch (e) {
          console.error('Local storage is not available');
        }
      }
    }
  }
  set(key, value) {
    if (this.storage) {
      try {
        this.storage.setItem(key, value);
      } catch (e) {
        console.error('Local storage is not available');
      }
    }
  }
  remove(key) {
    if (this.storage) {
      if (this.storage.getItem(key)) {
        try {
          this.storage.removeItem(key);
        } catch (e) {
          console.error('Local storage is not available');
        }
      }
    }
  }
}

const storage = new Storage('local');
export { storage };

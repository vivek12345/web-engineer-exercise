const utils = {
  to(promise) {
    return promise
      .then(resp => {
        return [null, resp];
      })
      .catch(err => {
        return [err];
      });
  }
};

export { utils };

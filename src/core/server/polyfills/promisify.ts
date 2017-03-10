export function callback2promise(f) {
  return new Promise(
    function (resolve, reject) {
      f((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
}

export function callback2promise(f): Promise<any> {
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

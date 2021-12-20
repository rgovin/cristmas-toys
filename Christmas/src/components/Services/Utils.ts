// type request = {
//   resource: string,
//   id: string,
//   verb: string,
// }

const Utils = {
  // --------------------------------
  //  Parse a url and break it into resource, id and verb
  // --------------------------------
  parseRequestURL: () => {
    const url = location.hash.slice(1).toLowerCase() || '/';
    const r  = url.split('/');
    const request = {
      resource:  r[1],
      id: r[2],
      verb: r[3],
    };

    request.resource = r[1];
    request.id = r[2];
    request.verb = r[3];

    return request;
  },

  // --------------------------------
  //  Simple sleep implementation
  // --------------------------------
  sleep: (ms:number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
};

export default Utils;
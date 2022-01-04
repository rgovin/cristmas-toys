// type request = {
//   resource: string,
//   id: string,
//   verb: string,
// }
export const getCurrentPath = () => {
  return location.pathname;
};

export const redirect = (path: string) => {
  location.href = path;
};

const Utils = {
  // --------------------------------
  //  Parse a url and break it into resource, id and verb
  // --------------------------------
  parseRequestURL: () => {
    const url = location.hash.slice(1).toLowerCase() || '/';
    const r  = url.split('/');
    r.shift();
    const [resource, id, verb] = r;

    return { resource, id, verb };
  },

  // --------------------------------
  //  Simple sleep implementation
  // --------------------------------
  sleep: (ms:number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
};

export default Utils;
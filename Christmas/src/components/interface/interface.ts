export type toy = {
  num:string,
  name:string,
  count:string,
  year:string,
  shape:string,
  color:string,
  size:string,
  favorite:boolean,
}

export interface render {
  render: () => Promise<string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  after_render: () => Promise<any>;
}
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

export interface DataSources {
    id: string,
    name: string
}


export interface render {
  render: () => Promise<string>;
  after_render: () => Promise<any>;
}
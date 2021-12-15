export interface DataNews {
  author: string,
  source: {id:string, name:string},
  publishedAt: string,
  title: string,
  description: string,
  url: string,
  urlToImage: string
}

export interface DataSources {
    id: string,
    name: string
}

export interface IData {
  sources?: DataSources [];
  articles?: DataNews [];
}

export interface render {
  render: () => Promise<string>;
  after_render: () => Promise<any>;
}
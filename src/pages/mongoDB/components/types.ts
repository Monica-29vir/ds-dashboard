//增删改查操作
export interface QueryModel {
  collectionName: string;
  dbName:         string;
  documents?:     string[];
  isMany:         boolean;
  items:          Item[];
  uuid:           string;
}

export interface Item {
  filed:  string;
  op:     Op;
  target: string;
}

export enum Op {
  Eq = "EQ",
  Gt = "GT",
  Gte = "GTE",
  LTE = "LTE",
  Lt = "LT",
  NE = "NE",
}

//自定义操作
export interface CustomizeModel{
    bsonStr: string;
    dbName:string;
    uuid:string;
  }
  


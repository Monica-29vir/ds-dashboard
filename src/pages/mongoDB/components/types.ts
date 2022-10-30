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
}

//自定义操作
export interface CustomizeModel{
     /**
     * 0 正常，其他不正常
     */
      code:  number;
      data?: Data;
      msg:   string;
  }
  
  export interface Data {
      document: string;
  }


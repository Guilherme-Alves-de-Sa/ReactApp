export class customScalarDateTime extends Date {
  constructor(value: any){
      // console.log(value);
      super(new Date(value));
  }

  parseValue(value: any){
      console.log(value);
  }

  serialize(value: any){
      console.log(value);
  }

  parseLiteral(value: any){
      console.log(value);
  }
}

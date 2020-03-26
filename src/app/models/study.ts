
export class Study {
  public _id: string;
  public id: number;
  public type: number;
  public creationDate: Date;
  public researcher: string;

  public upperAgeRange: number;
  public lowerAgeRange: number;
  public sex;

  public title: string;
  public status: number;
  public description: string;

  public component: string;

  constructor() {
      this.creationDate = new Date();
      this.type = 0;
  }
}
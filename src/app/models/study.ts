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

/**
 * This model is meant to replace the study model contained in the
 * User model.
 * @author Frederic Joly
 */
export class Study {

  /**The unique database ID of the study */
  public _id: string;
 
  /**The unique database ID of the researcher who created the study */
  public researcherId: string;
  /**The username of the researcher who created the study */
  public researcher: string;
  /**
   * Type defines whether the associated component is a diary (2), chatlog(1) or survey(0) 
   * See the database's codetable for more details
   */
  public type: number;
  /**The date on which the study was created. */
  public creationDate: Date;

  /**Represents the oldest that a participant can be to participate in this study */
  public upperAgeRange: number;
  /**Represents the youngest that a participant can be to participate in this study */
  public lowerAgeRange: number;
  /**The sex(es)/gender(s) restrictions imposed by the researcher for this study */
  public sex;

  /**This is the name of the study, and is displayed on its grid card */
  public title: string;
  /**This indicates whether the study is started, in progress or completed. */
  public status: number;
  /**The description of the study that appears on the grid cards */
  public description: string;

  /**
   * Component should contain the unique database _id field of the associated
   * survey/diary/chatlog
   */
  public component: string;

  constructor() {
      this.creationDate = new Date();
  }
}
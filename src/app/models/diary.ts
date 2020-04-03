import { Entry } from './entry';
export class Diary {
    public _id: string;
    public studyId: string;
    public entries: Entry[];

    constructor() {
        this.entries = [];
    }
}

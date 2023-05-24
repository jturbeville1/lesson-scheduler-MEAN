export default class Instructor {
    private _id: string;
    private name: string;
    private email: string;
    private password: string;
    private subject: string;

    constructor(instructor: {
        _id: string,
        name: string,
        email: string,
        password: string,
        subject: string,
    }) {
        this._id = instructor._id;
        this.name = instructor.name;
        this.email = instructor.email;
        this.password = instructor.password;
        this.subject = instructor.subject;
    }

    getId() {
        return this._id;
    }

    setId(id: string): boolean {
        if(id.length == 24) {
            this._id = id;
            return true
        } else {
            return false;
        }
    }

    getName() {
        return this.name;
    }

    setName(name: string): boolean {
        this.name = name;
        return true;
    }
}
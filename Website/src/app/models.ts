export class User {
    _id: String;
    Email: String;
    Password: String;
    FirstName: String;
    LastName: String;
    AddressStreet: String;
    AddressProvince: String;
    AddressCity: String;
    AddressZip: String;
    PhoneNum: String;
    Extension: Number;
    DayAvailable: Number[]; //Weekends & Weekdays (0, 1, 2, 3, 4, 5, 6)
    TimeAvailableStart: String[]; //Fixed time, so they can select from the given time
    TimeAvailableEnd: String[]; //Parallel array with DayAvailable/Start
    TotalHoursVolunteered: Number;
    Role: Role;
    isActive: Boolean;
    emailVerified: boolean;
}

export class Class {
    _id: string;
    ClassTitle: string;
    ClassDescription: String;
    ClassColor: String;
    ClassStart: Date;
    ClassEnd: Date;
    Volunteers: User[];
    ClassLead: User;
}



export class Role {
    _id: String;
    RoleName: String;
    RoleDescription: String;
}


// User name and password
export class Credentials {
    Email: String;
    password: String;
}

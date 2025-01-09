export interface IEntry {
 name: string;
 nickname: string;
 place: string;
 phone: string;
 email: string;
 social: string;
 dob: Date;
 createdAt: Date;
 updatedAt: Date;
 versionKey: boolean;
}

export interface IUser {
 firstName: string;
 middleName?: string;
 lastName: string;
 email: string;
 password: string;
 dateOfBirth: string;
 bio?: string;
 links: string[];
 font: string;
 theme: string;
 activeModules: string[];
}

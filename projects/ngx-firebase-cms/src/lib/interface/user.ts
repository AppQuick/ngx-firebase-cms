export interface User {
    uid: string;
    email: string;
    roles: (string)[];
    profileURL?: string;
    displayName?: string;
    emailVerified?: boolean;
    createdTime?: Date;
    updatedTime?: Date;
    lastLoginTime?: Date;
}
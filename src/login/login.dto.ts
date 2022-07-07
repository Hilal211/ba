export interface LoginDto {
    id: number;
    email: string;
    password: string;
    type: number;
    verificationToken: string;
    passwordResetToken: string;
    createdDate: Date;
    lastUpdatedDate: Date;
    archived: number;
}
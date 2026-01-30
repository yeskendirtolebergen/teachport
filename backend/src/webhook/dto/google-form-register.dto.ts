import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GoogleFormRegisterDto {
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    @IsString()
    iin: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    birthDate?: string;

    @IsOptional()
    @IsString()
    graduatedSchool?: string;

    @IsOptional()
    totalExperience?: number;

    @IsOptional()
    @IsString()
    currentWorkplace?: string;

    @IsOptional()
    experienceInCurrent?: number;

    @IsOptional()
    @IsString()
    subject?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsString()
    categoryExpiration?: string;

    @IsOptional()
    isHomeroomTeacher?: boolean | string;

    @IsOptional()
    @IsString()
    homeroomClass?: string;

    @IsOptional()
    @IsString()
    academicBackground?: string;

    @IsOptional()
    tat2024?: string;

    @IsOptional()
    tat2025?: string;

    @IsOptional()
    tat2026?: string;

    @IsOptional()
    ielts?: string;

    @IsOptional()
    toefl?: string;

    @IsOptional()
    tesol?: string;

    @IsOptional()
    celta?: string;

    @IsOptional()
    ib?: string;

    @IsOptional()
    ap?: string;

    @IsOptional()
    btsResults?: string;

    @IsOptional()
    kboResults?: string;

    @IsOptional()
    regionalResults?: string;

    @IsOptional()
    labResults?: string;
}

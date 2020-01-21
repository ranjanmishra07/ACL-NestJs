import { IsNotEmpty, IsEnum, IsNumber } from "class-validator";

export enum RoleName {
    ADMIN = 'admin',
    KAM = 'kam',
    CAPTAIN = 'captain',
    CITY = 'city',
    OPS = 'ops'
}

export class UserRoleDTO {
    @IsNotEmpty()
    @IsEnum(RoleName)
    roleName: RoleName

    priority: number
}


export class RolePermissionDTO {
    @IsNotEmpty()
    @IsNumber()
    roleId: number

    @IsNotEmpty()
    permissionsIds: number[]
}
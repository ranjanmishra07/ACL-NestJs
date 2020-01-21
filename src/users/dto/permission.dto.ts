import { IsNotEmpty } from "class-validator";

export class CreatePermissionDTO {
    @IsNotEmpty()
    pcode: string;
  
    @IsNotEmpty()
    permissionName: string;
}
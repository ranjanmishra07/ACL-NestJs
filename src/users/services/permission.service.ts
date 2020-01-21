import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "../entities/permission.entity";
import { Repository } from "typeorm";
import { CreatePermissionDTO } from "../dto/permission.dto";
import { OnModuleInit, Injectable } from "@nestjs/common";
import { permissionListArry } from "src/permission-list/permission-list";


@Injectable()
export class PermissionService implements OnModuleInit {
   
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>
    ) {}

    onModuleInit() {
        this.createPermission(permissionListArry)
    }

    async createPermission(perArr: CreatePermissionDTO[]) {
        for (let i = 0; i < perArr.length; i++) {
            const permission = await this.permissionRepository.findOne({ pcode: perArr[i].pcode });
            if (!permission) {
                let permissionObject = {
                    pcode: perArr[i].pcode,
                    permissionName: perArr[i].permissionName
                }
                await this.permissionRepository.insert(permissionObject)
            }
        }
        return null
    }
}

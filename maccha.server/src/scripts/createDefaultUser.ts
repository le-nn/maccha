import { QueryRunner } from "typeorm";
import { hash } from "bcrypt";
import { RoleType } from "@/Models/Users/role.enum";

export async function creteaDefaultUser(queryRunner: QueryRunner): Promise<void> {
    const password = await hash("admin", 10);
    await queryRunner.query("INSERT INTO `user_entity`(`userId`, `name`, `email`, `password`,`role`, `isActive`) VALUES('admin', 'admin', 'admin@admin.com','" + password + "', " + RoleType.Admin + ", 1)");
}
import { RoleType } from "@/Models/Users/role.enum";
import { hash } from "bcrypt";
import { QueryRunner } from "typeorm";
import { v4 } from "uuid";

const html = `
`;

export async function runInitialSeed(queryRunner: QueryRunner): Promise<void> {
    await addAdminUser(queryRunner);
    await addDefaultWebSite(queryRunner);
}

export async function addAdminUser(queryRunner: QueryRunner) {
    const password = await hash("admin", 10);
    await queryRunner.query("INSERT INTO `user_entity`(`userId`, `name`, `avatar`, `email`, `password`,`role`, `isActive`) VALUES('admin', '管理者ユーザー', '','admin@admin.com','" + password + "', " + RoleType.Admin + ", 1)");

}

export async function addDefaultWebSite(queryRunner: QueryRunner) {
    await queryRunner.query("INSERT INTO `web_site_entity`(`webSiteId`, `name`, `displayName`, `host`,`description`) VALUES('sample_site', 'sample_site', 'サンプルサイト', 'https://example.com','サンプルサイトです.ここに管理するサイトを追加してください.');");
}

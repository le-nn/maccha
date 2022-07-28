import { MigrationInterface, QueryRunner } from "typeorm";
import { runInitialSeed } from "../Seeds";

export class Migration1658975605765 implements MigrationInterface {
    name = 'Migration1658975605765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_entity\` (\`userId\` varchar(36) NOT NULL, \`name\` varchar(128) NOT NULL, \`email\` varchar(256) NOT NULL, \`password\` varchar(256) NOT NULL, \`role\` bigint UNSIGNED NOT NULL, \`isActive\` tinyint NOT NULL, \`avatar\` varchar(255) NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX \`IDX_3fe76ecf0f0ef036ff981e9f67\` (\`name\`), INDEX \`IDX_158f20832b16ead19dcd50c743\` (\`role\`), UNIQUE INDEX \`IDX_415c35b9b3b6fe45a3b065030f\` (\`email\`), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`web_site_entity\` (\`webSiteId\` varchar(36) NOT NULL, \`name\` varchar(128) NOT NULL, \`displayName\` varchar(128) NOT NULL, \`host\` varchar(256) NOT NULL, \`description\` varchar(1024) NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_7f6dc0460138bc643cf9427c61\` (\`name\`), PRIMARY KEY (\`webSiteId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_web_site_entity\` (\`userWebSiteId\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(255) NOT NULL, \`webSiteId\` varchar(255) NOT NULL, INDEX \`IDX_38341366302d85a21ecff6c2c5\` (\`userId\`), PRIMARY KEY (\`userWebSiteId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`taxonomy_entity\` (\`taxonomyId\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`displayName\` varchar(255) NOT NULL, \`isDeleted\` tinyint NOT NULL, \`identifier\` varchar(255) NOT NULL, INDEX \`IDX_71e9888eb6274400644240b4f8\` (\`identifier\`), PRIMARY KEY (\`taxonomyId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post_type_entity\` (\`postTypeId\` varchar(36) NOT NULL, \`taxonomyId\` varchar(128) NOT NULL, \`displayFormat\` varchar(255) NOT NULL, \`identifier\` varchar(255) NOT NULL, \`isDeleted\` tinyint NOT NULL, INDEX \`IDX_7c0a0c1c20c138016f362240f9\` (\`identifier\`), UNIQUE INDEX \`REL_4ad0a6c725ceace2c07c9df8ef\` (\`taxonomyId\`), PRIMARY KEY (\`postTypeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`scheme_entity\` (\`schemeId\` varchar(36) NOT NULL, \`taxonomyId\` varchar(255) NOT NULL, \`type\` varchar(64) NOT NULL, \`name\` varchar(64) NOT NULL, \`displayName\` varchar(64) NOT NULL, \`description\` varchar(512) NOT NULL, \`metadata\` varchar(2048) NOT NULL, \`sort\` int NOT NULL, PRIMARY KEY (\`schemeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`content_entity\` (\`contentId\` varchar(36) NOT NULL, \`identifier\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`taxonomyId\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`thumbnail\` varchar(255) NOT NULL, \`status\` int NOT NULL, \`metadata\` text NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`publishIn\` datetime NULL, \`createdBy\` varchar(255) NOT NULL, INDEX \`IDX_bd9d611a55197686ce0801062b\` (\`identifier\`), PRIMARY KEY (\`contentId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`field_entity\` (\`fieldId\` varchar(36) NOT NULL, \`name\` varchar(128) NOT NULL, \`schemeId\` varchar(128) NOT NULL, \`value\` longtext NOT NULL, \`contentId\` varchar(255) NOT NULL, \`taxonomyId\` varchar(255) NOT NULL, INDEX \`IDX_a1169144cd45b3aecb09037507\` (\`contentId\`), INDEX \`IDX_028f4e10f831a0d4026c4fc663\` (\`taxonomyId\`), PRIMARY KEY (\`fieldId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contact_email_setting_entity\` (\`contactEmailSettingId\` varchar(36) NOT NULL, \`to\` varchar(255) NOT NULL, \`from\` varchar(255) NOT NULL, \`header\` varchar(255) NOT NULL, \`titleTemplate\` varchar(512) NOT NULL, \`bodyTemplate\` longtext NOT NULL, \`contactSettingId\` varchar(255) NOT NULL, INDEX \`IDX_fa845d54680fd6600ed3e93d8b\` (\`contactSettingId\`), PRIMARY KEY (\`contactEmailSettingId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contact_content_entity\` (\`contactContentId\` varchar(36) NOT NULL, \`contactSettingId\` varchar(255) NOT NULL, \`identifier\` varchar(255) NOT NULL, \`contactedAt\` datetime NULL, INDEX \`IDX_a96d20a900d3de96dc6b239408\` (\`contactSettingId\`), INDEX \`IDX_0f770f82ff631fded9ba4bbc6a\` (\`identifier\`), PRIMARY KEY (\`contactContentId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contact_content_field_entity\` (\`contactContentFieldId\` varchar(36) NOT NULL, \`name\` varchar(128) NOT NULL, \`value\` longtext NOT NULL, \`contactSettingId\` varchar(255) NOT NULL, \`contactContentId\` varchar(255) NOT NULL, INDEX \`IDX_04fca1af41b416e2f01c3fb217\` (\`contactSettingId\`), INDEX \`IDX_3bfc2900e6aedf4b4581a0cd6a\` (\`contactContentId\`), PRIMARY KEY (\`contactContentFieldId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contact_setting_entity\` (\`contactSettingId\` varchar(36) NOT NULL, \`name\` varchar(128) NOT NULL, \`schemes\` varchar(512) NOT NULL, \`identifier\` varchar(255) NOT NULL, INDEX \`IDX_36ead2ca0a0f7488dea65cab68\` (\`identifier\`), PRIMARY KEY (\`contactSettingId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category_scheme_entity\` (\`categorySchemeId\` varchar(36) NOT NULL, \`taxonomyId\` varchar(255) NOT NULL, \`id\` int NOT NULL, \`name\` varchar(64) NOT NULL, \`slug\` varchar(32) NOT NULL, \`order\` int NOT NULL, \`order2\` int NOT NULL, \`parentId\` int NULL, INDEX \`IDX_0a7aadfe205fef90204f382063\` (\`taxonomyId\`), PRIMARY KEY (\`categorySchemeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`content_category_entity\` (\`contentCategoryId\` varchar(36) NOT NULL, \`taxonomyId\` varchar(255) NOT NULL, \`contentId\` varchar(255) NOT NULL, \`categorySchemeId\` varchar(255) NOT NULL, INDEX \`IDX_e61d16d79e256d6422d1011411\` (\`taxonomyId\`), INDEX \`IDX_798c6206a1d59db4d60ecef140\` (\`contentId\`), INDEX \`IDX_466fb0b99cc6eb524d29e3e5e3\` (\`categorySchemeId\`), PRIMARY KEY (\`contentCategoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_web_site_entity\` ADD CONSTRAINT \`FK_a893ef903a0c6804f5ebf019337\` FOREIGN KEY (\`webSiteId\`) REFERENCES \`web_site_entity\`(\`webSiteId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_type_entity\` ADD CONSTRAINT \`FK_4ad0a6c725ceace2c07c9df8ef4\` FOREIGN KEY (\`taxonomyId\`) REFERENCES \`taxonomy_entity\`(\`taxonomyId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`scheme_entity\` ADD CONSTRAINT \`FK_d36a95e76aae66ffaf6067cfd9d\` FOREIGN KEY (\`taxonomyId\`) REFERENCES \`taxonomy_entity\`(\`taxonomyId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);

        runInitialSeed(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`scheme_entity\` DROP FOREIGN KEY \`FK_d36a95e76aae66ffaf6067cfd9d\``);
        await queryRunner.query(`ALTER TABLE \`post_type_entity\` DROP FOREIGN KEY \`FK_4ad0a6c725ceace2c07c9df8ef4\``);
        await queryRunner.query(`ALTER TABLE \`user_web_site_entity\` DROP FOREIGN KEY \`FK_a893ef903a0c6804f5ebf019337\``);
        await queryRunner.query(`DROP INDEX \`IDX_466fb0b99cc6eb524d29e3e5e3\` ON \`content_category_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_798c6206a1d59db4d60ecef140\` ON \`content_category_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_e61d16d79e256d6422d1011411\` ON \`content_category_entity\``);
        await queryRunner.query(`DROP TABLE \`content_category_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_0a7aadfe205fef90204f382063\` ON \`category_scheme_entity\``);
        await queryRunner.query(`DROP TABLE \`category_scheme_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_36ead2ca0a0f7488dea65cab68\` ON \`contact_setting_entity\``);
        await queryRunner.query(`DROP TABLE \`contact_setting_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_3bfc2900e6aedf4b4581a0cd6a\` ON \`contact_content_field_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_04fca1af41b416e2f01c3fb217\` ON \`contact_content_field_entity\``);
        await queryRunner.query(`DROP TABLE \`contact_content_field_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_0f770f82ff631fded9ba4bbc6a\` ON \`contact_content_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_a96d20a900d3de96dc6b239408\` ON \`contact_content_entity\``);
        await queryRunner.query(`DROP TABLE \`contact_content_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_fa845d54680fd6600ed3e93d8b\` ON \`contact_email_setting_entity\``);
        await queryRunner.query(`DROP TABLE \`contact_email_setting_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_028f4e10f831a0d4026c4fc663\` ON \`field_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_a1169144cd45b3aecb09037507\` ON \`field_entity\``);
        await queryRunner.query(`DROP TABLE \`field_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_bd9d611a55197686ce0801062b\` ON \`content_entity\``);
        await queryRunner.query(`DROP TABLE \`content_entity\``);
        await queryRunner.query(`DROP TABLE \`scheme_entity\``);
        await queryRunner.query(`DROP INDEX \`REL_4ad0a6c725ceace2c07c9df8ef\` ON \`post_type_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_7c0a0c1c20c138016f362240f9\` ON \`post_type_entity\``);
        await queryRunner.query(`DROP TABLE \`post_type_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_71e9888eb6274400644240b4f8\` ON \`taxonomy_entity\``);
        await queryRunner.query(`DROP TABLE \`taxonomy_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_38341366302d85a21ecff6c2c5\` ON \`user_web_site_entity\``);
        await queryRunner.query(`DROP TABLE \`user_web_site_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_7f6dc0460138bc643cf9427c61\` ON \`web_site_entity\``);
        await queryRunner.query(`DROP TABLE \`web_site_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_415c35b9b3b6fe45a3b065030f\` ON \`user_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_158f20832b16ead19dcd50c743\` ON \`user_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_3fe76ecf0f0ef036ff981e9f67\` ON \`user_entity\``);
        await queryRunner.query(`DROP TABLE \`user_entity\``);
    }

}

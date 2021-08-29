import { DynamicModule } from "@nestjs/common";
import { MigrationInterface } from "typeorm";

export interface MacchaPlugin {
    modules: DynamicModule
    migrations: MigrationInterface[];
    name: string;
    description: string;
}
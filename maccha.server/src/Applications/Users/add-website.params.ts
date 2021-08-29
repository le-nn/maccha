import { IsNumber } from "class-validator";

/**
 * to add web site params that user can login.
 */
export class AddWebSiteParams {
    @IsNumber()
    identifier!: string;

    @IsNumber()
    userId!: string;
}
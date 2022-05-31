import { IMediaRepository } from "../../Models/Media/Repositories/IMediaRepository";
import { readdir, unlink } from "fs/promises";

import { from } from "rxjs";
import { mergeMap } from "rxjs/operators";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pathModule = require("path") as any;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mkdirp = require("mkdirp");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs/promises");
// eslint-disable-next-line @typescript-eslint/no-var-requires

const writeFile = async (path: string, contents: any) => {
    await mkdirp(pathModule.dirname(path));
    await fs.writeFile(path, contents);
};

export class MediaRepository implements IMediaRepository {
    /**
     * Get all file paths in your identifier directory.
     * @param identifier Your identifier.
     */
    public async getAllPathsAsync(identifier: string): Promise<string[]> {
        const names = await readdir(pathModule.join(process.cwd(), "public/uploads", identifier));
        return names.map(path => `/uploads/${identifier}/${path}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async postAsync(userId: string, file: any): Promise<string> {
        await writeFile(pathModule.join(process.cwd(), "public/uploads", userId, file.originalname), file.buffer);
        return `/uploads/${userId}/${file.originalname}`;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async saveAvatarAsync(userId: string, file: any): Promise<string> {
        await writeFile(pathModule.join(process.cwd(), "public/avaters", userId, file.originalname), file.buffer);
        return `/avaters/${userId}/${file.originalname}`;
    }

    public async getAsync(path: string): Promise<File> {
        throw new Error("Method not implemented.");
    }

    public async deleteAsync(files: string[]): Promise<void> {
        await from(files).pipe(
            mergeMap(x => from(unlink(pathModule.join(process.cwd(), "public", x))))
        ).toPromise();
    }
}
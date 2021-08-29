import { IMediaRepository } from "../../Models/Media/Repositories/IMediaRepository";
import { readdir, unlink } from "fs/promises";
import path = require("path");
import { from } from "rxjs";
import { mergeMap } from "rxjs/operators";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mkdirp = require("mkdirp");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const getDirName = require("path").dirname;


async function writeFile(path: string, contents: any) {
    return new Promise((resolve) => {
        mkdirp(getDirName(path), (err: any) => {
            fs.writeFile(path, contents, resolve);
        });
    });
}

export class MediaRepository implements IMediaRepository {
    /**
     * Get all file paths in your identifier directory.
     * @param identifier Your identifier.
     */
    public async getAllPathsAsync(identifier: string): Promise<string[]> {
        const names = await readdir(path.join(process.cwd(), "public/uploads", identifier));
        return names.map(path => `/uploads/${identifier}/${path}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async postAsync(userId: string, file: any): Promise<string> {
        await writeFile(path.join(process.cwd(), "public/uploads", userId, file.originalname), file.buffer);
        return `/uploads/${userId}/${file.originalname}`;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async saveAvatarAsync(userId: string, file: any): Promise<string> {
        await writeFile(path.join(process.cwd(), "public/avaters", userId, file.originalname), file.buffer);
        return `/avaters/${userId}/${file.originalname}`;
    }

    public async getAsync(path: string): Promise<File> {
        throw new Error("Method not implemented.");
    }

    public async deleteAsync(files: string[]): Promise<void> {
        await from(files).pipe(
            mergeMap(x => from(unlink(path.join(process.cwd(), "public", x))))
        ).toPromise();
    }
}
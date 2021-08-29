import { IUsersRepository } from "@/Models/Users/users-repository.interface";
import { ICreateUserParams } from "@/Models/Users/create-user-params";
import { User } from "@/Models/Users/user";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../Database/Entities/user.entify";
import { Repository, In } from "typeorm";
import { BadRequestException, Injectable, InternalServerErrorException, UnprocessableEntityException } from "@nestjs/common";
import { UserWebSiteEntity } from "../Database/Entities/user-web-site.entity";
import { WebSite } from "@/Models/WebSites/web-site";
import { WebSiteEntity } from "../Database/Entities/web-site.entity";
import { IUpdateUserParams } from "@/Models/Users/update-user-params";
import { from } from "rxjs";
import { concatMap } from "rxjs/operators";

@Injectable()
export class UsersRepository implements IUsersRepository {
    constructor(
        @InjectRepository(UserEntity) private readonly users: Repository<UserEntity>,
        @InjectRepository(UserWebSiteEntity) private readonly userWebSites: Repository<UserWebSiteEntity>,
        @InjectRepository(WebSiteEntity) private readonly webSites: Repository<WebSiteEntity>,
    ) { }

    /**
     * get all users.
     * @param identifier web site identifier.
     */
    public async getAll(identifiers?: string[]): Promise<User[]> {
        try {
            // search with web site identifier
            if (identifiers) {
                if (identifiers.length === 0) {
                    return [];
                }

                const userWebSites = await this.userWebSites.find({
                    where: {
                        identifier: In(identifiers)
                    },
                    relations: ["webSite"]
                });
                const users = await this.users.find({
                    where: {
                        userId: In(userWebSites.map(x => x.userId))
                    }
                });

                const mappedSites = userWebSites.reduce((x, y) => {
                    if (!x[y.userId]) {
                        x[y.userId] = [];
                    }

                    const webSite = y.webSite;
                    if (webSite) {
                        x[y.userId].push(webSite.webSiteId ?? "");
                    }
                    return x;
                }, {} as { [key: string]: string[] });

                return users.map(user => new User(
                    user.userId ?? "",
                    user.name,
                    user.email,
                    user.password ?? "",
                    Number(user.role),
                    user.isActive,
                    mappedSites[user.userId ?? ""] ?? [],
                    user.avatar
                ));

            }
            // do not search with identifier.
            else {
                const users = await this.users.find();
                if (users) {
                    const userWebSites = await this.userWebSites.find({
                        where: {
                            userId: In(users.map(u => u.userId))
                        },
                        relations: ["webSite"]
                    });

                    const mappedSites = userWebSites.reduce((x, y) => {
                        if (!x[y.userId]) {
                            x[y.userId] = [];
                        }

                        const webSite = y.webSite;
                        if (webSite) {
                            x[y.userId].push(webSite.webSiteId ?? "");
                        }
                        return x;
                    }, {} as { [key: string]: string[] });

                    return users.map(user => new User(
                        user.userId ?? "",
                        user.name,
                        user.email,
                        user.password ?? "",
                        Number(user.role),
                        user.isActive,
                        mappedSites[user.userId ?? ""] ?? [],
                        user.avatar
                    ));
                }
            }
        }
        catch (ex) {
            console.error("error traced in users repository", ex);
        }
        // throw new InternalServerErrorException("unhandle error in users repository.");
        return [];
    }

    /**
     * find a user by id async.
     * @param userId find user id
     */
    public async findByIdAsync(userId: string): Promise<User | undefined> {
        try {
            const user = await this.users.findOne({ userId });
            const webSites = await this.userWebSites.find({
                relations: ["webSite"],
                where: {
                    userId
                }
            });
            if (user) {
                return new User(
                    user.userId ?? "",
                    user.name,
                    user.email,
                    user.password ?? "",
                    Number(user.role),
                    user.isActive,
                    webSites.map(x => x.webSite?.webSiteId ?? ""),
                    user.avatar
                );
            }
            return undefined;
        }
        catch (ex) {
            console.error("error traced in users repository", ex.message);
        }
        throw new UnprocessableEntityException("unhandle error in users repository.");
    }

    /**
     * find a user by id async.
     * @param userId find user id
     */
    public async findByEmailAsync(email: string): Promise<User | undefined> {
        try {
            const user = await this.users.findOne({ email });
            if (!user) {
                return undefined;
            }

            const webSites = await this.userWebSites.find({
                relations: ["webSite"],
                where: {
                    userId: user.userId
                }
            });
            if (user) {
                return new User(
                    user.userId ?? "",
                    user.name,
                    user.email,
                    user.password ?? "",
                    Number(user.role),
                    user.isActive,
                    webSites.map(x => x.webSite?.webSiteId ?? ""),
                    user.avatar
                );
            }
            return undefined;
        }
        catch (ex) {
            console.error("error traced in users repository", ex.message);
            throw new UnprocessableEntityException("error traced in users repository");
        }
    }

    /**
     * add website that user can login async.
     * @param userId user id
     * @param webSiteId web site id
     */
    public async addWebSiteAsync(userId: string, identifier: string): Promise<void> {
        try {
            const user = await this.users.findOne({ userId });
            if (!user) {
                throw new UnprocessableEntityException("user is not exists.");
            }

            const site = await this.webSites.findOne({ webSiteId: identifier });
            if (!site) {
                throw new UnprocessableEntityException("web site is not exists.");
            }

            const webSite = await this.userWebSites.findOne({
                userId,
                webSiteId: identifier
            });
            if (webSite) {
                throw new UnprocessableEntityException("web site is already exists.");
            }

            await this.userWebSites.save(new UserWebSiteEntity({
                userWebSiteId: 0,
                webSiteId: site.webSiteId ?? "",
                userId,
            }));
        }
        catch (ex) {
            console.error("error traced in users repository", ex.message);
            throw new UnprocessableEntityException(ex.message);
        }
    }

    /**
     * create new user async.
     * @param params to create user info
     */
    public async createAsync(params: ICreateUserParams): Promise<User> {
        try {
            const email = await this.users.findOne({ email: params.email });
            if (email) {
                throw new BadRequestException("specified email address already exists");
            }

            const created = await this.users.manager.save(new UserEntity({
                name: params.name,
                isActive: params.isActive,
                role: params.role,
                password: params.password,
                email: params.email,
                avatar: ""
            }));

            await Promise.all(params.identifiers.map(async i => {
                const site = (await this.webSites.findOne({ webSiteId: i }));
                if (site && site.webSiteId) {
                    await this.userWebSites.manager.save(
                        new UserWebSiteEntity({
                            userWebSiteId: 0,
                            webSiteId: site.webSiteId,
                            userId: created.userId ?? ""
                        })
                    );
                }
            }));

            return new User(
                created.userId ?? "",
                created.name,
                created.email,
                created.password ?? "",
                Number(created.role),
                created.isActive,
                [],
                created.avatar
            );
        }
        catch (ex) {
            console.error("error traced in users repository", ex.message);
            throw new UnprocessableEntityException(ex.message);
        }
    }

    /**
     * update user async.
     * @param params to update user info
     */
    public async updateAsync(params: IUpdateUserParams): Promise<User> {
        try {
            await this.users.update(
                {
                    userId: params.userId,
                },
                {
                    userId: params.userId,
                    name: params.name,
                    isActive: params.isActive,
                    role: params.role,
                    email: params.email,
                }
            );

            await from(this.userWebSites.delete({ userId: params.userId })).pipe(
                concatMap(
                    () => from(params.identifiers.map(x => this.addWebSiteAsync(params.userId, x)))
                )
            ).toPromise();

            const created = await this.users.findOne(params.userId);

            if (created) {
                return new User(
                    created.userId ?? "",
                    created.name,
                    created.email,
                    created.password ?? "",
                    Number(created.role),
                    created.isActive,
                    [],
                    created.avatar
                );
            }
        }
        catch (ex) {
            console.error("Error traced in users repository", ex.message);
            throw new Error(ex.message);
        }

        throw new Error("Unhandled error occured. Cannot save user in repository.");
    }


    public async saveAvatarAsync(userId: string, url: string): Promise<User> {
        try {
            const user = await this.users.findOne(userId);
            await this.users.update(
                {
                    userId,
                },
                {
                    avatar: url
                }
            );

            const created = await this.users.findOne(userId);
            if (created) {
                return new User(
                    created.userId ?? "",
                    created.name,
                    created.email,
                    created.password ?? "",
                    Number(created.role),
                    created.isActive,
                    [],
                    created.avatar
                );
            }
        }
        catch (ex) {
            console.error("Error traced in users repository", ex.message);
            throw new Error(ex.message);
        }

        throw new Error("Unhandled error occured. Cannot save user in repository.");
    }
}
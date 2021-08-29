import { hash } from "bcrypt";

async function main(): Promise<void> {
    const password = process.argv[2];
    console.log(await hash(password, 10));
}
main();

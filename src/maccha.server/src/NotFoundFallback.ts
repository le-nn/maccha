import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException, Request } from "@nestjs/common";
import path from "path";
import { MacchaOption } from ".";

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    constructor(readonly option: MacchaOption) { }
    catch(exception: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest<Request>();

        if (isChild(complete(this.option.clientSpaPath), request.url)) {
            response.status(200).sendFile(path.join(
                this.option.assetsDir,
                this.option.clientSpaPath,
                "index.html"));
        }
        else {
            ctx.getNext()();
        }
    }
}

const isChild = (parent: string, dit: string) => {
    const relative = path.relative(parent, dit);
    return relative && !relative.startsWith('..') && !path.isAbsolute(relative);
};

const complete = (p: string) => {
    return p[0] !== "/" ? "/" + p : p;
};
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayloadType } from "src/common/types";


export const CurrentUser = createParamDecorator(
    (data , context : ExecutionContext) => {
   const request = context.switchToHttp().getRequest();
    const payload : JwtPayloadType = request["user"];
    return payload;
    }
)


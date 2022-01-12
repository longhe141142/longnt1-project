import {SetMetadata} from '@nestjs/common';
import {Role} from "../constants/common.constants";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
export const Router = (router) => SetMetadata("router", router);
export const Method = (method) => SetMetadata("method", method);
export const URL = (url) => SetMetadata("url", url);
export const AuthorizeDecorator = (obj) =>SetMetadata("auth", obj);

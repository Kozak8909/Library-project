import type { Request, Response, NextFunction } from "express";
export declare const verifyRoles: (...allowedRoles: Array<number>) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=verifyRoles.d.ts.map
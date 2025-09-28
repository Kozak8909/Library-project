import type { Request, Response } from "express";
declare const _default: {
    getBooks: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getBookByID: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    addBook: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateBook: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteBook: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
export default _default;
//# sourceMappingURL=routeController.d.ts.map
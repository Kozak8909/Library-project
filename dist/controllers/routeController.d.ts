import type { Request, Response } from "express";
interface BookParameters {
    title: string;
    author: string;
}
declare const _default: {
    getAllBooks: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getBookByID: (req: Request<{
        id: number;
    }, {}, {}>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    addBook: (req: Request<{}, {}, BookParameters>, res: Response) => Promise<void>;
    updateBook: (req: Request<{
        id: number;
    }, {}, BookParameters>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteBook: (req: Request<{
        id: number;
    }, {}, {}>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
export default _default;
//# sourceMappingURL=routeController.d.ts.map
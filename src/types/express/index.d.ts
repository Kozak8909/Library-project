declare namespace Express {
    export interface Request {
        user?: JWTPayload,
        roles?: Array<number>
    }
}
import jwt from "jsonwebtoken";
 
export function verifyToken(req) {
    try {
        const authHeader = req?.headers?.get?.("authorization") || req.headers?.authorization;

        if(!authHeader) return null;

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        return decoded;
    } catch(error) {
        return null;
    }
}
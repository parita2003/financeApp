import {Hono} from"hono";
import { db } from '@/db/drizzle';
import { accounts, insertAccountSchema } from "@/db/schema";
import {zValidator} from "@hono/zod-validator"
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { and, eq } from "drizzle-orm";
import {createId} from "@paralleldrive/cuid2";
import { auth } from "@clerk/nextjs/server";
import { optional, z } from "zod";

const app =new Hono()
    .get("/", 
        clerkMiddleware(),
        async (c) => {
        const auth = getAuth(c);

        if(!auth?.userId){
           return c.json({error: "unauthorized"}, 401);
        }

        const data = await db.select(
            {
                id: accounts.id,
                name: accounts.name,
            }).from(accounts)
            .where(eq(accounts.userId, auth.userId));
        return c.json({ data});
    })
    .get("/:id",
        zValidator("param", z.object(
            {
                id: z.string().optional(),
            }
        )),
        clerkMiddleware(),
        async (c) => {
            const auth = getAuth(c);
            const {id} = c.req.valid("param");

            if(!id){
                return c.json({error: "id is required"}, 400);
            }

            if(!auth?.userId){
                return c.json({error: "unauth"}, 401);
            }

            const [data] = await db.select(
                {
                    id: accounts.id,
                    name: accounts.name,
                }
            ).from(accounts)
            .where(
                and(
                    eq(accounts.userId,auth.userId),
                    eq(accounts.id,id)
                )
            )

            if(!data){
                return c.json({error: "data not found"}, 404);
            }

            return c.json({data});
        }
    )
    .post(
        "/",
        clerkMiddleware(),
        zValidator("json", insertAccountSchema.pick({
            name:true,
        })),
        async (c) => {
            const auth = getAuth(c);
            const values = c.req.valid("json");
            if(!auth?.userId){
                return c.json({error: "unauthorized"}, 401);
            }

            const data = await db.insert(accounts).values({
                id: createId(),
                userId: auth.userId,
                ...values,
            }).returning();

            return c.json({data});
        }
    )
    .patch("/:id",
        clerkMiddleware(),
        zValidator("param", z.object(
            {
                id: z.string().optional(),
            }
        ))
        ,zValidator("json", insertAccountSchema.pick({name:true,}))
        ,async (c) => {
            const auth = getAuth(c);
            const {id} = c.req.valid("param");
            const values = c.req.valid("json");

            if(!id){
                return c.json({error: "Missing id:"},400);
            }

            if(!auth?.userId){
                return c.json({error: "unauthorized"},401);
            }

            const [data]= await db.update(accounts).set(values).where(and(
                eq(accounts.userId,auth.userId),
                eq(accounts.id,id),
            ))
            .returning()

            if(!data){
                return c.json({error: "not found"},404)
            }
            return c.json({data});
        } 
    )

export default app;
import { AppTypeNew } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";

export const client = hc <AppTypeNew>(process.env.NEXT_PUBLIC_APP_URL!);

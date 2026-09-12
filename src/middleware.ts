import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Redireciona "/" para "/pt" e emite o header Link com as alternates (hreflang) automaticamente.
export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

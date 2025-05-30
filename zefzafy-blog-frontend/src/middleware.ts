import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

// ├── messages
// │   ├── en.json
// │   └── ...
// ├── next.config.ts
// └── src
//     ├── i18n
//     │   ├── routing.ts
//     │   ├── navigation.ts
//     │   └── request.ts
//     ├── middleware.ts
//     └── app
//         └── [locale]
//             ├── layout.tsx
//             └── page.tsx

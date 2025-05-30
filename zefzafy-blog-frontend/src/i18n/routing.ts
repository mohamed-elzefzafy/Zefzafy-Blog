import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ar'],
 
  // Used when no locale matches
  defaultLocale: 'en'
});


// import { defineRouting } from "next-intl/routing";
// import { createSharedPathnamesNavigation } from "next-intl/navigation";

// export const routing = defineRouting({
//   locales: ["en", "ar"], // Add your supported locales here
//   defaultLocale: "en",
//   localePrefix: "always", // or 'as-needed' depending on your preference
// });

// // Export navigation helpers
// export const { Link, redirect, usePathname, useRouter } =
//   createSharedPathnamesNavigation(routing);
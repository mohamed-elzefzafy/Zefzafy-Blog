// "use client";
// import { usePathname, useRouter } from "next/navigation";
// import { Button } from "@mui/material";

// const LanguageSwitcher = ({ targetLocale }: { targetLocale: string }) => {
//   const router = useRouter();
//   const pathname = usePathname();

//   const handleChangeLanguage = () => {
//     // Split the current path
//     const segments = pathname.split("/");

//     // Replace the first segment with the new locale
//     if (segments.length > 1) {
//       segments[1] = targetLocale;
//     }

//     // Join the segments back into a path
//     const newPath = segments.join("/");

//     router.push(newPath);
//   };

//   return (
//     <Button onClick={handleChangeLanguage} variant="outlined">
//       Switch to {targetLocale}
//     </Button>
//   );
// };

// export default LanguageSwitcher;


// "use client";

// import { usePathname, useRouter } from "next/navigation";
// import { Button } from "@mui/material";

// const LanguageSwitcher = () => {
//   const router = useRouter();
//   const pathname = usePathname();

//   const currentLocale = pathname.split("/")[1];
//   const targetLocale = currentLocale === "ar" ? "en" : "ar";

//   const handleChangeLanguage = () => {
//     const segments = pathname.split("/");

//     // Replace the locale segment
//     if (segments.length > 1) {
//       segments[1] = targetLocale;
//     }

//     const newPath = segments.join("/");
//     router.push(newPath);
//   };

//   return (
//     <Button onClick={handleChangeLanguage} variant="outlined">
//       {currentLocale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
//     </Button>
//   );
// };

// export default LanguageSwitcher;



// "use client";

// import { usePathname, useRouter } from "next/navigation";
// import { IconButton, Tooltip } from "@mui/material";

// const LanguageSwitcher = () => {
//   const router = useRouter();
//   const pathname = usePathname();

//   const currentLocale = pathname.split("/")[1];
//   const targetLocale = currentLocale === "ar" ? "en" : "ar";

//   const handleChangeLanguage = () => {
//     const segments = pathname.split("/");

//     if (segments.length > 1) {
//       segments[1] = targetLocale;
//     }

//     const newPath = segments.join("/");
//     router.push(newPath);
//   };

//   return (
//     <Tooltip title={targetLocale === "ar" ? "التبديل إلى العربية" : "Switch to English"}>
//       <IconButton
//         onClick={handleChangeLanguage}
//         size="small"
//         sx={{
//           border: "1px solid",
//           borderColor: "divider",
//           borderRadius: "8px",
//           fontSize: "0.75rem",
//           fontWeight: "bold",
//           width: 36,
//           height: 36,
//           color : "sec"
//         }}
//       >
//         {targetLocale.toUpperCase()}
//       </IconButton>
//     </Tooltip>
//   );
// };

// export default LanguageSwitcher;



"use client";

import { usePathname, useRouter } from "next/navigation";
import { IconButton, Tooltip } from "@mui/material";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.split("/")[1];
  const targetLocale = currentLocale === "ar" ? "en" : "ar";

  const handleChangeLanguage = () => {
    const segments = pathname.split("/");

    if (segments.length > 1) {
      segments[1] = targetLocale;
    }

    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <Tooltip title={targetLocale === "ar" ? "Switch to English" : "التبديل إلى العربية"}>
      <IconButton
        onClick={handleChangeLanguage}
        size="small"
        sx={{
          border: "1px solid white",
          borderRadius: "8px",
          fontSize: "0.75rem",
          fontWeight: "bold",
          width: 36,
          height: 36,
          color: "white", // text color
        }}
      >
        {currentLocale.toUpperCase()}
      </IconButton>
    </Tooltip>
  );
};

export default LanguageSwitcher;

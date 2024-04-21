// "use client"
// import { useState } from "react"
// import { usePathname } from "next/navigation"
// import Link from "next/link"
// import { cn } from "@/lib/utils"
// import { mainNavLinks } from "@/constants"
// import { Menu } from "lucide-react"
// import { useSession } from "next-auth/react"

// const MainNav = () => {
//   const [menuOpen, setMenuOpen] = useState(false)
//   const pathName = usePathname()
//   const { data: session } = useSession();
//   const rol=session?.user?.role;
//   const filteredNavLinks = mainNavLinks.filter((link) => {
//     if (rol === "admin") return true;
//     return link.title !== "Admin" && link.title !== "Tenant-Manage";
//   });
//   return (
//     <div className="flex items-center lg:space-x-6 mx-4">
//       <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
//         <Menu />
//       </button>
//       <div className={cn(
//         "absolute top-full left-0 w-full border",
//         "lg:border-none lg:static lg:flex lg:space-x-6",
//         menuOpen ? "block" : "hidden"
//       )}>
//         {filteredNavLinks.map((link) => (
//           <Link
//             key={link.title}
//             href={link.url}
//             className={cn(
//               "block py-2 px-4 text-sm transition-colors",
//               pathName === link.url ? "text-teal dark:text-white" : "text-muted-foreground"
//             )}
//           >
//             {link.title}
//           </Link>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default MainNav
"use client"
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { mainNavLinks } from "@/constants";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";

const Loader = () => (
  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-opacity-50 bg-gray-900">
    <div className="w-32 h-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:content-[''] before:animate-[spin_2s_linear_infinite] before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-[60%] before:h-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:transform after:-translate-x-1/2 after:-translate-y-1/2 after:w-[75%] after:h-[75%] after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]">
      <span className="absolute w-[85%] h-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"></span>
    </div>
  </div>

);

const MainNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathName = usePathname();
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Loader />;
  }
  const rol = session?.user?.role;
  const filteredNavLinks = mainNavLinks.filter((link) => {
    if (rol === "admin") return true;
    return link.title !== "Admin" && link.title !== "Tenant-Manage";
  });

  return (
    <div className="flex items-center lg:space-x-6 mx-4">
      <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
        <Menu />
      </button>
      <div className={cn(
        "absolute top-full left-0 w-full border",
        "lg:border-none lg:static lg:flex lg:space-x-6",
        menuOpen ? "block" : "hidden"
      )}>
        {filteredNavLinks.map((link) => (
          <Link
            key={link.title}
            href={link.url}
            className={cn(
              "block py-2 px-4 text-sm transition-colors",
              pathName === link.url ? "text-teal dark:text-white" : "text-muted-foreground"
            )}
          >
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainNav;

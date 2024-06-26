export const mainNavLinks = [
  { title: "Home", url: "/" },
  { title: "User", url: "/user" },
  { title: "Admin", url: "/admin" },
  { title: "Tenant-Manage", url: "/tenant-management" }
]
export const BASE_URL = process.env.NEXTAUTH_URL
export const FORGOT_PASSWORD_API_URL = `${BASE_URL}/api/auth/forgot-password`
export const RESET_PASSWORD_API_URL = `${process.env.NEXTAUTH_URL}/api/auth/reset-password`
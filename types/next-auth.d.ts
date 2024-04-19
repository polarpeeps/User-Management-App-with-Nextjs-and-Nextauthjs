import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    _id: string
    role: string
    provider: string
    tenant: Tenant[]
    name:string
    image:string
    email:string
  }
  interface Session {
    user: User & {
      _id: string
      role: string
      provider: string
      tenant: Tenant[]; 
      name:string,
      image:string
      email:string

    }
    token: {
      _id: string
      role: string
      provider: string
      tenants: Tenant[]
      name:string,
      image:string
      email:string

    }
  }
}
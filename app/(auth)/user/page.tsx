"use client"

import { UserCarousal } from "@/components/carousal/user-carousal"
import { useSession } from "next-auth/react"

const UserPage = () => {
  const { data: session } = useSession()
  return (
    <section>
      <h1 className="text-red-500 font-semibold">{session?.user?.role ==="admin" ? "Hi Admin" :<UserCarousal/>}</h1>
      
    </section>
  )
}

export default UserPage
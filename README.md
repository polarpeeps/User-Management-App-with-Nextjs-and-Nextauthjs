## User Management Application Using Nextauthjs and Nextjs  

## Features
- OAuth: Log in with Google.
- Credential Login: Use email and password.
- SignUp: Register with name, email, password.
- Profile Edit: Change your username and password.
- Password Change: Safely update passwords.
- Routes: Access only for logged-in users/ managers / admins.
- Tenant Mangement: Users are associated with tenants
- Admins can create, edit, delete users and also assign them tenants(for now only admins will assign tenants)

## Environment Setup
Create a .env file in the root directory and add the following variables:

```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="YOUR_NEXTAUTH_SECRET"
RESEND_API_KEY="MAILING_API_KEY"
GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"

MONGODB_URI="YOUR_MONGODB_URI"
```
## Getting Started

First, run the development server:

```bash
npm run dev
# run this command a couple of time if theres a vulnerability it will be fixed 
npm audit fix
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

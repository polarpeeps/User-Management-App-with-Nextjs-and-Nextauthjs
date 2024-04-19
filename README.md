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
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.




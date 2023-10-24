import NextAuth from "next-auth/next";
import Github from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        Github({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
              email: { label: "Email", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              // Add logic here to look up the user from the credentials supplied
              const response = await fetch(process.env.NEXTAUTH_URL + '/api/users/auth', {
                method: 'POST',
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                }),
              }).then(res => res.json())
              if (response.success) {
                return response.user
              } else {
                return null
              }
            }
          })
    ],
    pages: {
      signIn:'/login',
      // error: '/login',
      // verifyRequest: '/login',
    },
    session: {
      // Set to jwt in order to CredentialsProvider works properly
      strategy: "jwt",
    }
};

export default NextAuth(authOptions)
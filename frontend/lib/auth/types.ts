import "next-auth";
import { JWT } from "next-auth/jwt";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  token: string;
}

// Mở rộng type Session của NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      token: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    token: string;
  }
}

// Mở rộng type JWT của NextAuth
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    token: string;
  }
} 
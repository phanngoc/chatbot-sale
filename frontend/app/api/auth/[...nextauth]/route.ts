import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Mật khẩu", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Sử dụng URL đầy đủ (đảm bảo không có /api trùng lặp)
          const API_URL = process.env.API_URL || "http://localhost:5002/api";
          console.log('Gọi API login với URL:', `${API_URL}/auth/login`);
          console.log('Credentials:', { email: credentials.email, password: '***' });
          
          const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            }),
          });

          console.log('Status code:', response.status);
          console.log('Status text:', response.statusText);
          
          // Kiểm tra response có phải JSON không
          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            const text = await response.text();
            console.error("Server không trả về dữ liệu JSON:", text);
            return null;
          }

          const data = await response.json();
          console.log("Server response:", data);

          if (response.ok && data.success) {
            return {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              token: data.token
            };
          }
          
          console.error("Đăng nhập thất bại:", data);
          return null;
        } catch (error) {
          console.error("Lỗi đăng nhập:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Khi đăng nhập, thêm dữ liệu từ user vào token
      if (user) {
        token.id = user.id;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      // Gửi dữ liệu từ token đến client
      if (session.user) {
        session.user.id = token.id;
        session.user.token = token.token;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET || "supersecret",
  debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 
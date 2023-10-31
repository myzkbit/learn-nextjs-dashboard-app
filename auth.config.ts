import type { NextAuthConfig } from 'next-auth';


export const authConfig = {
    providers: [],
    // `pages` オプションをつけることによりカスタムログインページにリダイレクトすることが可能
    // 未設定の場合、NextAuthデフォルトに遷移する
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl }}) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                return isLoggedIn; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        }
    }
} satisfies NextAuthConfig;
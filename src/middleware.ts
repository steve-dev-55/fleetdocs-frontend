import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Récupération du cookie de session (à adapter selon le nom exact défini par votre backend)
  // Souvent 'session_token', 'access_token', ou 'sb-access-token'
  const token = request.cookies.get('access_token')?.value;

  const isAuthPage = pathname.startsWith('/login') || 
                     pathname.startsWith('/forgot-password') || 
                     pathname.startsWith('/reset-password');

  // 1. L'utilisateur n'est pas connecté et tente d'accéder à une page privée
  if (!token && !isAuthPage) {
    const loginUrl = new URL('/login', request.url);
    // Optionnel : conserver l'URL cible pour redirection post-login
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. L'utilisateur est déjà connecté et tente d'accéder aux pages d'authentification
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configuration du filtre du middleware
export const config = {
  matcher: [
    /*
     * Match toutes les routes sauf :
     * - api (requêtes d'API internes s'il y en a)
     * - _next/static (fichiers statiques)
     * - _next/image (optimisation d'images Next.js)
     * - favicon.ico, images publiques (png, svg, jpg)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)',
  ],
};
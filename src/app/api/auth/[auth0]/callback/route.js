import { NextResponse } from 'next/server';

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const returnTo = url.searchParams.get('returnTo') || '/';

  if (!code) {
    return NextResponse.redirect('/login');
  }

  try {
    const tokenResponse = await fetch('https://YOUR_AUTH0_DOMAIN/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        code,
        redirect_uri: process.env.AUTH0_CALLBACK_URL,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to fetch token');
    }

    const tokenData = await tokenResponse.json();

    const userInfoResponse = await fetch('/api/auth/[auth0]/insertUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenData.access_token}`,
      },
      body: JSON.stringify({ email: tokenData.email, name: tokenData.name, sub: tokenData.sub }),
    });

    if (!userInfoResponse.ok) {
      throw new Error('Failed to insert user');
    }

    return NextResponse.redirect(returnTo);
  } catch (error) {
    console.error('Error during Auth0 callback:', error);
    return NextResponse.redirect('/login');
  }
}

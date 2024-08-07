import { NextResponse } from 'next/server';

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.redirect('/login');
  }

  try {
    // Intercambia el código por un token
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

    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) {
      throw new Error('Token not received');
    }    

    return response;
  } catch (error) {
    console.error('Error during Auth0 callback:', error.message, error.stack);
    return NextResponse.redirect('/login');
  }  
}

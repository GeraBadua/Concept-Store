// pages/api/callback.js
import auth0 from '../../lib/auth';

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      redirectUri: '/products'
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}

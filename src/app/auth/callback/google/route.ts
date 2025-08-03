import config from "@/app/config/index"

export async function GET(req: Request) {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (!code) {
        return {
            statusCode: 404,
        }
    }

    const res = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            code,
            client_id: config.google.clientId!,
            client_secret: config.google.clientSecret!,
            redirect_uri: 'http://localhost:3000/callback/google',
            grant_type: 'authorization_code',
        }),
    });

    const tokenData = await res.json();

    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
        },
    });

    const userInfo = await userInfoResponse.json();

    return Response.json({user: userInfo});

}

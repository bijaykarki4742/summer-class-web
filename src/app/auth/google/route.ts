import config from "@/app/config/index"

export function GET(){
    const clientId= config.google.clientId;
    const redirectUri = config.google.redirectUri;
    const scope = encodeURIComponent('openid email profile');
    const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

    return Response.redirect(url, 302);
}

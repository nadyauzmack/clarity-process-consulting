// Exposes only whether form delivery is configured and, optionally, the PUBLIC Turnstile site key.
export function onRequestGet({env}){
 const ready=!!(env.RESEND_API_KEY&&env.CONTACT_TO_EMAIL&&env.CONTACT_FROM_EMAIL);
 const partial=!!env.TURNSTILE_SITE_KEY!==!!env.TURNSTILE_SECRET_KEY;
 return new Response(JSON.stringify({ready:ready&&!partial,turnstileSiteKey:env.TURNSTILE_SITE_KEY&&env.TURNSTILE_SECRET_KEY?env.TURNSTILE_SITE_KEY:null}),{headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}});
}
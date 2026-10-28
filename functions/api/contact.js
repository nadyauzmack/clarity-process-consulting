// Cloudflare Pages Function — deliver inquiries via a private Worker service binding.
const respond=(status,ok,message)=>new Response(JSON.stringify({ok,message}),{status,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}});
const emailOK=s=>/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(s);
const txt=(v,max)=>typeof v==="string"?v.trim().slice(0,max+1):"";
const flat=v=>v.replace(/[\r\n\u0000-\u001f\u007f]+/g," ").trim();
export async function onRequestPost({request,env}){
 const url=new URL(request.url);
 const origin=request.headers.get("Origin");
 if(!origin||!["https://www.clarityprocessconsulting.com","https://clarityprocessconsulting.com"].includes(origin)||new URL(origin).host!==url.host) return respond(403,false,"This request could not be verified.");
 if(!String(request.headers.get("Content-Type")||"").toLowerCase().startsWith("application/json"))return respond(415,false,"Invalid submission format.");
 if(Number(request.headers.get("Content-Length")||"0")>12000)return respond(413,false,"Your message is too long.");
 if(!env.CLARITY_MAILER)return respond(503,false,"The inquiry form is being configured. Please try again later.");
 if(!!env.TURNSTILE_SITE_KEY!==!!env.TURNSTILE_SECRET_KEY)return respond(503,false,"Verification is being configured.");
 let input;
 try{const raw=await request.text();if(raw.length>12000)return respond(413,false,"Your message is too long.");input=JSON.parse(raw);if(!input||typeof input!=="object"||Array.isArray(input))throw Error("Bad request");}catch{return respond(400,false,"Please check your form details and try again.");}
 if(txt(input.website,300))return respond(200,true,"Thank you for your inquiry."); // honeypot, no mail sent
 const name=flat(txt(input.name,120)),email=flat(txt(input.email,254)),company=flat(txt(input.company,120)),industry=flat(txt(input.industry,120)),service=flat(txt(input.service,90)),teamCount=flat(txt(input.teamCount,70)),timezone=flat(txt(input.timezone,70)),availability=txt(input.availability,300),message=txt(input.message,4000);
 if(name.length<2||name.length>120||!emailOK(email)||email.length>254||company.length>120||industry.length>120||service.length>90||teamCount.length>70||timezone.length>70||availability.length>300||message.length<15||message.length>4000)return respond(400,false,"Please enter your name, a valid email, and a message of at least 15 characters.");
 if(env.TURNSTILE_SECRET_KEY){
   const token=txt(input.turnstileToken,2048);
   if(!token||token.length>2048)return respond(400,false,"Please complete verification.");
   try{
     const r=await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({secret:env.TURNSTILE_SECRET_KEY,response:token,remoteip:request.headers.get("CF-Connecting-IP")||undefined})});
     const v=await r.json();
     if(!r.ok||!v.success||!["www.clarityprocessconsulting.com","clarityprocessconsulting.com"].includes(v.hostname))return respond(400,false,"Verification failed. Please try again.");
   }catch{return respond(502,false,"Verification is temporarily unavailable.");}
 }
 try{
  const result=await env.CLARITY_MAILER.deliver({name,email,company,industry,service,teamCount,timezone,availability,message});
  if(!result?.ok)return respond(502,false,"We couldn't confirm your inquiry was sent. Please try again.");
  return respond(200,true,"Your inquiry was sent.");
 }catch(error){
  console.error("Clarity consultation delivery failed",error?.message||"Unknown delivery error");
  return respond(502,false,"Your message could not be sent at this time.");
 }
}
export function onRequestGet(){return respond(405,false,"Method not allowed.");}
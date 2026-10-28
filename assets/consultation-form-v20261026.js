// The recipient inbox is never stored or accessed in browser code.
(()=>{
 const form=document.getElementById("inquiry-form");if(!form)return;
 const button=document.getElementById("inquiry-submit"),status=document.getElementById("inquiry-status"),host=document.getElementById("inquiry-turnstile");
 let enabled=false,widget=null,secured=false;
 const say=(s,k="")=>{status.textContent=s;status.dataset.state=k;};
 const busy=b=>{button.disabled=b||!enabled;button.textContent=b?"Sending request…":"Request consultation →";};
 async function setup(){
  try{
   const r=await fetch("/api/contact-config",{cache:"no-store"});if(!r.ok)throw Error("Unavailable");
   const config=await r.json();
   if(!config.ready){say("This inquiry form is being connected. Please check back soon.","error");return;}
   if(config.turnstileSiteKey){
    await new Promise((resolve,reject)=>{if(window.turnstile)return resolve();const s=document.createElement("script");s.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";s.async=true;s.onload=resolve;s.onerror=reject;document.head.append(s);});
    widget=window.turnstile.render(host,{sitekey:config.turnstileSiteKey,theme:"light",appearance:"interaction-only"});
    secured=true;
   }
   enabled=true;busy(false);say("Fields marked * are required.");
  }catch{say("The inquiry form is temporarily unavailable. Please check back soon.","error");}
 }
 form.addEventListener("submit",async e=>{
  e.preventDefault();if(!enabled||!form.reportValidity())return;
  const token=secured?window.turnstile.getResponse(widget):"";
  if(secured&&!token){say("Please complete verification before sending.","error");return;}
  const v=new FormData(form);
  const payload={name:String(v.get("name")||"").trim(),email:String(v.get("email")||"").trim(),company:String(v.get("company")||"").trim(),service:String(v.get("service")||""),teamCount:String(v.get("teamCount")||""),timezone:String(v.get("timezone")||""),availability:String(v.get("availability")||"").trim(),message:String(v.get("message")||"").trim(),website:String(v.get("website")||""),turnstileToken:token};
  busy(true);say("Sending your inquiry…");
  try{
   const r=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload),credentials:"same-origin",cache:"no-store"});
   const result=await r.json().catch(()=>({}));
   if(!r.ok||!result.ok)throw Error(result.message||"We couldn't send your inquiry.");
   form.reset();if(secured)window.turnstile.reset(widget);
   say("Thank you — your inquiry was sent. We'll reply using the email you provided.","success");
  }catch(error){if(secured)window.turnstile.reset(widget);say(error.message||"We couldn't send your inquiry. Please try again.","error");}
  finally{busy(false);}
 });
 // Select the requested package when someone arrives from a package card.
 const params=new URLSearchParams(window.location.search);
 const requested=params.get("service")||params.get("package");
 const packageNames={"why":"The Why? Package","what-next":"The What Next? Package","keep-improving":"Keep on Improving","one-small-fix":"One Small Fix","workflow-diagnostic":"Workflow Diagnostic","email-automation":"Business Email Automation","website-build":"Website Design & Build","docusign":"DocuSign Workflow Setup","training":"SOP & Employee Training Development","operations":"Operations & Workflow Improvement","launch-bundle":"Business Launch Bundle"};
 const choice=packageNames[requested]||requested;
 if(choice){const select=form.querySelector('select[name="service"]');if(select&&[...select.options].some(o=>o.value===choice))select.value=choice;}
 setup();
})();
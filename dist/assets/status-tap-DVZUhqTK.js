import{r as e,f as t,e as n,w as o,s as r}from"./index-BeBiYshY.js";import"./vendor-D95pM5Pw.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const s=()=>{const s=window;s.addEventListener("statusTap",(()=>{e((()=>{const e=s.innerWidth,i=s.innerHeight,a=document.elementFromPoint(e/2,i/2);if(!a)return;const d=t(a);d&&new Promise((e=>n(d,e))).then((()=>{o((async()=>{d.style.setProperty("--overflow","hidden"),await r(d,300),d.style.removeProperty("--overflow")}))}))}))}))};export{s as startStatusTap};

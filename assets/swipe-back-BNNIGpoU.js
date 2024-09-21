import{i as t,c as e,a as n}from"./index-CHDkpW-j.js";import"./vendor-D95pM5Pw.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const o=(o,r,i,s,a)=>{const c=o.ownerDocument.defaultView;let d=t(o);const l=t=>d?-t.deltaX:t.deltaX;return e({el:o,gestureName:"goback-swipe",gesturePriority:101,threshold:10,canStart:e=>(d=t(o),(t=>{const{startX:e}=t;return d?e>=c.innerWidth-50:e<=50})(e)&&r()),onStart:i,onMove:t=>{const e=l(t)/c.innerWidth;s(e)},onEnd:t=>{const e=l(t),o=c.innerWidth,r=e/o,i=(t=>d?-t.velocityX:t.velocityX)(t),s=i>=0&&(i>.2||e>o/2),h=(s?1-r:r)*o;let m=0;if(h>5){const t=h/Math.abs(i);m=Math.min(t,540)}a(s,r<=0?.01:n(0,r,.9999),m)}})};export{o as createSwipeBackGesture};

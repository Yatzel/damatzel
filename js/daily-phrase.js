(()=> {
 const list=Array.isArray(window.DAMATZEL_PHRASES)?window.DAMATZEL_PHRASES.map(x=>String(x).trim()).filter(Boolean):[];
 const phrase=document.getElementById("dailyPhrase");
 const dateLabel=document.getElementById("phraseDate");
 const h=document.getElementById("phraseHours"),m=document.getElementById("phraseMinutes"),s=document.getElementById("phraseSeconds");
 const pad=n=>String(n).padStart(2,"0");
 function dailyIndex(date){
  const key=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  let seed=0;for(let i=0;i<key.length;i++)seed=(seed*31+key.charCodeAt(i))>>>0;
  seed=(seed*1664525+1013904223)>>>0;
  let index=seed%list.length;
  if(list.length>1){
   const prev=new Date(date.getFullYear(),date.getMonth(),date.getDate()-1);
   const prevKey=`${prev.getFullYear()}-${prev.getMonth()+1}-${prev.getDate()}`;
   let prevSeed=0;for(let i=0;i<prevKey.length;i++)prevSeed=(prevSeed*31+prevKey.charCodeAt(i))>>>0;
   prevSeed=(prevSeed*1664525+1013904223)>>>0;
   if(index===prevSeed%list.length)index=(index+1)%list.length;
  }
  return index;
 }
 function refresh(){
  const now=new Date();
  if(phrase){
   if(list.length)phrase.textContent=list[dailyIndex(now)];
   else phrase.textContent="Aquí aparecerá la frase que prepares para hoy. ♡";
  }
  const midnight=new Date(now.getFullYear(),now.getMonth(),now.getDate()+1,0,0,0);
  const left=Math.max(0,Math.floor((midnight-now)/1000));
  if(h)h.textContent=pad(Math.floor(left/3600));
  if(m)m.textContent=pad(Math.floor(left/60)%60);
  if(s)s.textContent=pad(left%60);
 }
 refresh();setInterval(refresh,1000);
})();
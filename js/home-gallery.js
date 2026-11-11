(()=> {
 const months=[
 ["Septiembre","2025"],["Octubre","2025"],["Noviembre","2025"],["Diciembre","2025"],
 ["Enero","2026"],["Febrero","2026"],["Marzo","2026"],["Abril","2026"],
 ["Mayo","2026"],["Junio","2026"],["Julio","2026"],["Agosto","2026"],
 ["Septiembre","2026"],["Octubre","2026"]
 ];
 const grid=document.getElementById("homeMonthGrid");if(!grid)return;
 const lightbox=document.createElement("div");lightbox.className="photo-lightbox";lightbox.hidden=true;
 lightbox.innerHTML='<button class="photo-lightbox-close" type="button" aria-label="Cerrar">×</button><img alt="Fotografía ampliada"><p></p>';
 document.body.appendChild(lightbox);
 const close=()=>{lightbox.hidden=true;document.body.classList.remove("lightbox-open");};
 lightbox.addEventListener("click",e=>{if(e.target===lightbox||e.target.classList.contains("photo-lightbox-close"))close();});
 document.addEventListener("keydown",e=>{if(e.key==="Escape")close();});
 months.forEach(([name,year],i)=>{
  const n=String(i+1).padStart(2,"0"), src=`fotos/mes-${n}/foto-1.jpg`;
  const card=document.createElement("button");card.type="button";card.className="home-month-photo";card.setAttribute("aria-label",`Ver foto de ${name} ${year}`);
  const img=document.createElement("img");img.src=src;img.alt=`Recuerdo de ${name} ${year}`;img.loading="lazy";
  const placeholder=document.createElement("div");placeholder.className="home-month-placeholder";placeholder.innerHTML=`<span>♡</span><b>${name}</b><small>${year}</small>`;
  img.addEventListener("load",()=>{placeholder.hidden=true;});
  img.addEventListener("error",()=>{img.remove();});
  const label=document.createElement("div");label.className="home-month-label";label.innerHTML=`<b>${name}</b><small>${year}</small>`;
  card.append(img,placeholder,label);
  card.addEventListener("click",()=>{if(!img.isConnected || !img.complete || !img.naturalWidth)return;lightbox.querySelector("img").src=src;lightbox.querySelector("img").alt=`Fotografía de ${name} ${year}`;lightbox.querySelector("p").textContent=`${name} ${year} · D & Y`;lightbox.hidden=false;document.body.classList.add("lightbox-open");});
  grid.appendChild(card);
 });
})();
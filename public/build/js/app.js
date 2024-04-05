let paso=1;const d=document,pasoInicial=1,pasoFinal=3,cita={id:"",nombre:"",fecha:"",hora:"",servicios:[]};function iniciarApp(){mostrarSeccion(),tabs(),botonesPaginador(),paginaSiguiente(),paginaAnterior(),consultarAPI(),idCliente(),nombreCliente(),seleccionarFecha(),seleccionarHora(),mostrarResumen()}function mostrarSeccion(){const e=d.querySelector(".mostrar");e&&e.classList.remove("mostrar");const t="#paso-"+paso;d.querySelector(t).classList.add("mostrar");const a=d.querySelector(".actual");a&&a.classList.remove("actual");d.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function tabs(){d.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",(function(e){paso=parseInt(e.target.dataset.paso),mostrarSeccion(),botonesPaginador()}))})}function botonesPaginador(){const e=d.querySelector("#siguiente"),t=d.querySelector("#anterior");1===paso?(t.classList.add("ocultar"),e.classList.remove("ocultar")):3===paso?(t.classList.remove("ocultar"),e.classList.add("ocultar"),mostrarResumen()):(e.classList.remove("ocultar"),t.classList.remove("ocultar")),mostrarSeccion()}function paginaAnterior(){d.querySelector("#anterior").addEventListener("click",(function(){paso<=1||(paso--,botonesPaginador())}))}function paginaSiguiente(){d.querySelector("#siguiente").addEventListener("click",(function(){paso>=3||(paso++,botonesPaginador())}))}async function consultarAPI(){try{const e="/api/servicios",t=await fetch(e);mostrarServicios(await t.json())}catch(e){console.log(e)}}function mostrarServicios(e){e.forEach(e=>{const{id:t,nombre:a,precio:o}=e,n=d.createElement("P");n.classList.add("nombre-servicio"),n.textContent=a;const r=d.createElement("P");r.classList.add("precio-servicio"),r.textContent="$"+o;const i=d.createElement("DIV");i.classList.add("servicio"),i.dataset.idServicio=t,i.onclick=function(){seleccionarServicio(e)},i.appendChild(n),i.appendChild(r),d.querySelector("#servicios").appendChild(i)})}function seleccionarServicio(e){const{id:t}=e,{servicios:a}=cita,o=d.querySelector(`[data-id-servicio="${t}"]`);a.some(e=>e.id===t)?(cita.servicios=a.filter(e=>e.id!==t),o.classList.remove("seleccionado")):(cita.servicios=[...a,e],o.classList.add("seleccionado"))}function idCliente(){cita.id=d.querySelector("#id").value}function nombreCliente(){cita.nombre=d.querySelector("#nombre").value}function seleccionarFecha(){d.querySelector("#fecha").addEventListener("input",(function(e){const t=new Date(e.target.value).getUTCDay();[6,0].includes(t)?(e.target.value="",mostrarAlerta("Fines de semana no permitidos","error",".formulario")):cita.fecha=e.target.value}))}function seleccionarHora(){d.querySelector("#hora").addEventListener("input",(function(e){const t=e.target.value.split(":")[0];t<10||t>18?(e.target.value="",mostrarAlerta("Hora no Valida","error")):(cita.hora=e.target.value,console.log(cita))}))}function mostrarAlerta(e,t,a,o=!0){const n=d.querySelector(".alerta");n&&n.remove();const r=d.createElement("DIV");r.textContent=e,r.classList.add("alerta"),r.classList.add(t);d.querySelector(a).appendChild(r),o&&setTimeout(()=>{r.remove()},3e3)}function mostrarResumen(){const e=d.querySelector(".contenido-resumen");for(;e.firstChild;)e.removeChild(e.firstChild);if(Object.values(cita).includes("")||0===cita.servicios.length)return void mostrarAlerta("Faltan datos de servicios, Fecha u Hora","error",".contenido-resumen",!1);const{nombre:t,fecha:a,hora:o,servicios:n}=cita,r=d.createElement("H3");r.textContent="Resumen de Servicios",e.appendChild(r),n.forEach(t=>{const{id:a,precio:o,nombre:n}=t,r=d.createElement("DIV");r.classList.add("contenedor-servicio");const i=d.createElement("P");i.textContent=n;const c=d.createElement("P");c.innerHTML="<span>Precio:</span> $"+o,r.appendChild(i),r.appendChild(c),e.appendChild(r)});const i=d.createElement("H3");i.textContent="Reserva de Cita",e.appendChild(i);const c=d.createElement("P");c.innerHTML="<span>Nombre:</span> "+t;const s=new Date(a),l=s.getMonth(),u=s.getDate()+2,p=s.getFullYear(),m=new Date(Date.UTC(p,l,u)).toLocaleDateString("es-CO",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),v=d.createElement("P");v.innerHTML="<span>Fecha:</span> "+m;const h=d.createElement("P");h.innerHTML=`<span>Hora:</span> ${o} Horas`;const f=d.createElement("BUTTON");f.classList.add("boton"),f.textContent="Reservar cita",f.onclick=reservarCita,e.appendChild(c),e.appendChild(v),e.appendChild(h),e.appendChild(f)}async function reservarCita(){const{nombre:e,fecha:t,hora:a,servicios:o,id:n}=cita,r=o.map(e=>e.id),i=new FormData;i.append("usuarioId",e),i.append("fecha",t),i.append("hora",a),i.append("usuarioId",n),i.append("servicios",r);try{const e="/api/citas",t=await fetch(e,{method:"POST",body:i}),a=await t.json();console.log(a.resultado),a.resultado&&Swal.fire({icon:"success",title:"Cita Creada",text:"Tu cita fue creada correctamente",button:"OK"}).then(()=>{setTimeout(()=>{window.location.reload()},3e3)})}catch(e){Swal.fire({icon:"error",title:"Error",text:"Hubo un error al guardar la cita"})}}d.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));
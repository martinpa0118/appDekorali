const d=document;function iniciarApp(){buscarPorfecha()}function buscarPorfecha(){d.querySelector("#fecha").addEventListener("input",(function(n){const e=n.target.value;window.location="?fecha="+e}))}d.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));
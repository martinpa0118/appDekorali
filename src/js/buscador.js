const d = document;

d.addEventListener('DOMContentLoaded',function(){

    iniciarApp();
});

function iniciarApp(){
    buscarPorfecha();
}

function buscarPorfecha(){
    
    const fechaInput = d.querySelector('#fecha');
    fechaInput.addEventListener('input', function(e){
        const fechaSeleccionada = e.target.value;
        
        window.location = `?fecha=${fechaSeleccionada}`;
    })
}
let personas = JSON.parse(localStorage.getItem('personas')) || [];
const container = document.querySelector(".section__div2")

function mostrarPersonas (){
    personas.forEach((persona) =>{
        const elemento = document.createElement("div")
        elemento.classList.toggle("personas")
        elemento.innerHTML = `
            <p>${persona.nombre}</p>
            <p class="faltas">${persona.faltas} faltas<button class="btn-cantidad mas btn-persona" id="botonmas${persona.id}">+</button><button class="btn-cantidad menos btn-persona" id="botonmenos${persona.id}">-</button></p>
            `

        container.appendChild(elemento)

        const botonSumarCantidad = document.querySelector(`#botonmas${persona.id}`)
            if(persona.faltas >=0){
                botonSumarCantidad.addEventListener("click", (e)=>{
                    function sumarCantidad(e){
                    sumarCantidadFaltas(persona.id);
                    actualizarLS();
                    personas = JSON.parse(localStorage.getItem('personas'))
                    container.innerHTML=``
                  mostrarPersonas();
                    }
                    sumarCantidad(e);
                })
            }

        const botonRestarCantidad = document.querySelector(`#botonmenos${persona.id}`)
            if(persona.faltas > 0){
                botonRestarCantidad.addEventListener("click", (e)=>{
                    function restarCantidad(e){
                    restarCantidadFaltas(persona.id);
                    actualizarLS();
                    personas = JSON.parse(localStorage.getItem('personas'))
                    container.innerHTML=``
                  mostrarPersonas();
                    }
                    restarCantidad(e);
                })
            }
    })
}

mostrarPersonas();

function sumarCantidadFaltas(personaId){
    const pers = personas.find((prod) => prod.id === personaId)
    pers.faltas += 0.5;
}

function actualizarLS (){
    const aJSON = JSON.stringify(personas);
    localStorage.setItem('personas', aJSON)
}

function restarCantidadFaltas(personaId){
    const pers = personas.find((prod) => prod.id === personaId)
    pers.faltas -=0.5;
}
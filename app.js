const catalogo = document.querySelector(".catalogo");
let nucleos = [];
const carritoNucleos = JSON.parse(localStorage.getItem('carritoNucleos')) || [];
let personas = [];
const personasLS = JSON.parse(localStorage.getItem('personas')) || [];

class Nucleos{
    constructor(id, nombre, peso, categoria){
        this.id = id;
        this.nombre = nombre;
        this.peso = peso;
        this.categoria = categoria;
        this.cantidad = 0;
    }
}

class Persona{
    constructor(id, nombre, porcentaje){
        this.id = id;
        this.nombre = nombre;
        this.faltas = 0;
        this.porcentaje = porcentaje;
    }
}

personas.push(new Persona(1, "Aldo", (23/100)))
personas.push(new Persona(2, "Hernan", (27/100)))
personas.push(new Persona(3, "Dylan", (27/100)))
personas.push(new Persona(4, "Franco", (23/100)))

const aJSON = JSON.stringify(personas);
localStorage.setItem('personas', aJSON)

nucleos.push(new Nucleos(1, "T10", 56, "trifasico"));
nucleos.push(new Nucleos(2, "T16", 63, "trifasico"));
nucleos.push(new Nucleos(3, "T25", 114, "trifasico"));
nucleos.push(new Nucleos(4, "T40", 115, "trifasico"));
nucleos.push(new Nucleos(5, "T63", 158, "trifasico"));
nucleos.push(new Nucleos(6, "T100", 225, "trifasico"));
nucleos.push(new Nucleos(7, "T160", 256, "trifasico"));
nucleos.push(new Nucleos(8, "M5", 25, "monofasico"));
nucleos.push(new Nucleos(9, "M10", 40, "monofasico"));
nucleos.push(new Nucleos(10, "M25", 68.5, "monofasico"));


function agregarProductos(productoId){
    const repetido = carritoNucleos.some(prod => prod.id === productoId)
    if(repetido){
        const prod = nucleos.map(prod =>{
            if(prod.id === productoId){
                prod.cantidad++
                agregarAlLS();
            }
        })
    } else{
        const producto = nucleos.find(prod => prod.id === productoId)
        producto.cantidad++;
        carritoNucleos.push(producto)
        agregarAlLS();
    }
}

function agregarAlLS(){
    const aJSON = JSON.stringify(carritoNucleos);
    localStorage.setItem('carritoNucleos', aJSON)
}

function pintarEnElDom(){
    nucleos.forEach(producto =>{
        const elemento = document.createElement("div")
        elemento.classList.toggle("card__container")
        elemento.innerHTML=`
        <h1 class="producto-nombre">${producto.nombre}</h1>
        <p class="producto-peso">Peso: ${producto.peso}kg</p>
        <button class="btn-agregar" id="btn${producto.id}">Agregar</button>`

        catalogo.appendChild(elemento);

        const botonAgregar = document.querySelector(`#btn${producto.id}`)
        botonAgregar.addEventListener("click", ()=>{
            agregarProductos(producto.id);
            Toastify({
                text: `${producto.nombre} añadido al resumen`,
                duration: 1000,
                style: {
                    background: '#72e7c0'
                }
                }).showToast();
        })
    })
}

pintarEnElDom();
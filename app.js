const catalogo = document.querySelector(".catalogo");
let nucleos = [];
const carritoNucleos = JSON.parse(localStorage.getItem('carritoNucleos')) || [];

class Nucleos{
    constructor(id, nombre, peso, categoria){
        this.id = id;
        this.nombre = nombre;
        this.peso = peso;
        this.categoria = categoria;
        this.cantidad = 0;
    }
}

nucleos.push(new Nucleos(1, "T10", 53, "trifasico"));
nucleos.push(new Nucleos(2, "T16", 58, "trifasico"));
nucleos.push(new Nucleos(3, "T25", 108, "trifasico"));
nucleos.push(new Nucleos(4, "T40", 123, "trifasico"));
nucleos.push(new Nucleos(5, "T63", 155, "trifasico"));
nucleos.push(new Nucleos(6, "T100", 225, "trifasico"));
nucleos.push(new Nucleos(7, "T160", 256, "trifasico"));


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
        <p class="producto-peso">Peso: ${producto.peso}</p>
        <button class="btn-agregar" id="btn${producto.id}">Agregar</button>`

        catalogo.appendChild(elemento);

        const botonAgregar = document.querySelector(`#btn${producto.id}`)
        botonAgregar.addEventListener("click", ()=>{
            agregarProductos(producto.id);
            Toastify({
                text: `${producto.nombre} añadido al resumen`,
                duration: 2000,
                style: {
                    background: '#72e7c0'
                }
                }).showToast();
        })
    })
}

pintarEnElDom();
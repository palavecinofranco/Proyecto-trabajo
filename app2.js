let carritoNucleos = JSON.parse(localStorage.getItem('carritoNucleos')) || [];
const tableContainer = document.querySelector(".section__div")
const tabla = document.querySelector(".div__table")
const sectionMain = document.querySelector(".main__section")
const contenedorResumen = document.querySelector(".div__resumen")
let precioDolar;

function mostrarNucleos (){
carritoNucleos.forEach(producto => {
    const elemento = document.createElement("tbody")
            elemento.innerHTML = `
            <tr>
            <td class="table-td">${producto.nombre}</td>
            <td class="sum">x ${producto.cantidad}<button class="btn-cantidad mas" id="botonmas${producto.id}">+</button><button class="btn-cantidad menos" id="botonmenos${producto.id}">-</button</td>
            <td class="table-td"><button class="boton-borrar" id="botonborrar${producto.id}">X</button></td>
            </tr>`
            tabla.appendChild(elemento)

            const btnBorrar = document.querySelector(`#botonborrar${producto.id}`)
            btnBorrar.addEventListener("click", (e)=>{
                e.preventDefault
                const botonApretado = e.target;
                botonApretado.parentElement.parentElement.remove();
                eliminarNucleo(producto.id);
                actualizarLS();
                carritoNucleos = JSON.parse(localStorage.getItem('carritoNucleos'))
            })
            const botonSumarCantidad = document.querySelector(`#botonmas${producto.id}`)
            if(producto.cantidad >=0){
                botonSumarCantidad.addEventListener("click", (e)=>{
                    function sumarCantidad(e){
                    sumarCantidadProducto(producto.id);
                    actualizarLS();
                    carritoNucleos = JSON.parse(localStorage.getItem('carritoNucleos'))
                    tabla.innerHTML = `<thead>
                    <tr>
                      <th scope="col" class="table-th">Nucleo</th>
                      <th scope="col" class="table-th">Cantidad</th>
                      <th scope="col" class="table-th">Eliminar</th>
                    </tr>
                  </thead>`
                  mostrarNucleos();
                    }
                    sumarCantidad(e);
                })
            }

            const botonRestarCantidad = document.querySelector(`#botonmenos${producto.id}`)
            if(producto.cantidad >1){
                botonRestarCantidad.addEventListener("click", (e)=>{
                    function restarCantidad(e){
                    restarCantidadProducto(producto.id);
                    actualizarLS();
                    carritoNucleos = JSON.parse(localStorage.getItem('carritoNucleos'))
                    tabla.innerHTML = `<thead>
                    <tr>
                      <th scope="col" class="table-th">Nucleo</th>
                      <th scope="col" class="table-th">Cantidad</th>
                      <th scope="col" class="table-th">Eliminar</th>
                    </tr>
                  </thead>`
                  mostrarNucleos();
                    }
                    restarCantidad(e);
                })
            }

    });
}

mostrarNucleos();

function eliminarNucleo(productoId){
    const nucleo = carritoNucleos.find((prod) => prod.id === productoId)
    const indiceDelProducto = carritoNucleos.indexOf(nucleo)
    carritoNucleos.splice(indiceDelProducto, 1)
}

function actualizarLS (){
    const aJSON = JSON.stringify(carritoNucleos);
    localStorage.setItem('carritoNucleos', aJSON)
}



function sumarCantidadProducto(productoId){
    const producto = carritoNucleos.find((prod) => prod.id === productoId)
    producto.cantidad++
    console.log(producto.cantidad)
}

function restarCantidadProducto(productoId){
    const producto = carritoNucleos.find((prod) => prod.id === productoId)
    producto.cantidad--;
}


const botonResumen = document.querySelector(".btn-resumen")
botonResumen.addEventListener("click", ()=>{
    actualizarLS();
    contenedorResumen.innerHTML = "";
    fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
    .then((resp)=>resp.json())
    .then((data)=>{
        precioDolar = data[0].casa.venta
        contenedorResumen.innerHTML = `
        <p>Total de kg = ${carritoNucleos.reduce((acc, producto) => acc + producto.peso * producto.cantidad, 0)}kg</p>
        <p>Total en dolar = $${parseInt((carritoNucleos.reduce((acc, producto) => acc + producto.peso * producto.cantidad, 0))*0.80)}</p>
        <p>Total en pesos = $${parseInt(parseInt(precioDolar) * (carritoNucleos.reduce((acc, producto) => acc + producto.peso * producto.cantidad, 0)))}</p>
        <p>Dylan: $${parseInt((parseInt(precioDolar) * (carritoNucleos.reduce((acc, producto) => acc + producto.peso * producto.cantidad, 0)))*(27/100))}<br>
        Hernan: $${parseInt((parseInt(precioDolar) * (carritoNucleos.reduce((acc, producto) => acc + producto.peso * producto.cantidad, 0)))*(27/100))}<br>
        Franco: $${parseInt((parseInt(precioDolar) * (carritoNucleos.reduce((acc, producto) => acc + producto.peso * producto.cantidad, 0)))*(23/100))}<br>
        Aldo: $${parseInt((parseInt(precioDolar) * (carritoNucleos.reduce((acc, producto) => acc + producto.peso * producto.cantidad, 0)))*(23/100))}</p>
        `
    })
})





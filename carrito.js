let carritoDeCompras = localStorage.getItem("productos-en-el-carrito");
carritoDeCompras = JSON.parse(carritoDeCompras);

const boxCarritoVacio = document.querySelector("#carritoVacio");
const boxCarritoProductos = document.querySelector("#carritoProductos");
const boxCarritoAcciones = document.querySelector("#carritoAcciones");
const boxCompraConfirmada = document.querySelector("#compraConfirmada");
let btnEliminar = document.querySelectorAll(".carritoProductoEliminar")
const btnVaciarCarrito = document.querySelector("#vaciarCarrito");
const btnTotalCompra = document.querySelector("#precioTotal");
const btnCompraRealizada = document.querySelector("#btnComprar");

function cargarProductosEnElCarrito (){

    if (carritoDeCompras && carritoDeCompras.length > 0){
    
        boxCarritoVacio.classList.add("disabled");
        boxCarritoProductos.classList.remove("disabled");
        boxCarritoAcciones.classList.remove("disabled");
        boxCompraConfirmada.classList.add("disabled");
    
        boxCarritoProductos.innerHTML = ""; 
    
        carritoDeCompras.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carritoProducto");
            div.innerHTML = `
            <img class="imgCarrito" src="../${producto.imagen}" alt="${producto.titulo}">
                    <div class="carritoProductoTitulo">
                        <small>Titulo</small>
                        <h3>${producto.titulo}</h3>
                    </div>
                    <div class="carritoCantidad">
                        <small>Cantidad</small>
                        <p>${producto.cantidad}</p>
                    </div>
                    <div class="carritoProductoPrecio">
                        <small>Precio</small>
                        <p>${producto.precio}</p>
                    </div>
                    <div class="carritoProductoSubtotal">
                        <small>Subtotal</small>
                        <p>${producto.precio * producto.cantidad}</p>
                    </div>
                    <button class="carritoProductoEliminar" id="${producto.id}"><img src="../img/eliminar.png" alt=""></button>`
    
        boxCarritoProductos.append(div);
    
    
    
        })
     
    } else{
        boxCarritoVacio.classList.remove("disabled");
        boxCarritoProductos.classList.add("disabled");
        boxCarritoAcciones.classList.add("disabled");
        boxCompraConfirmada.classList.add("disabled");
    } 

    botonesEliminarDelCarrito();
    totalCompra();
}

cargarProductosEnElCarrito ();


function botonesEliminarDelCarrito() {
    btnEliminar = document.querySelectorAll(".carritoProductoEliminar")

    btnEliminar.forEach(btn => {
        // creamos un evento que al hacer click nos permita agregar productos al carrito 
        btn.addEventListener("click", eliminarProdCarrito);
    });
}

function eliminarProdCarrito(e){
    let idBtn = e.currentTarget.id;
    const index = carritoDeCompras.findIndex(producto => producto.id === idBtn);
    carritoDeCompras.splice(index, 1);
    cargarProductosEnElCarrito ();

    localStorage.setItem("productos-en-el-carrito", JSON.stringify(carritoDeCompras));
}

btnVaciarCarrito.addEventListener("click", vaciarCarritoDeCompras)
function vaciarCarritoDeCompras () {

    carritoDeCompras.length = 0;
    localStorage.setItem("productos-en-el-carrito" , JSON.stringify(carritoDeCompras));
    cargarProductosEnElCarrito ();

}


function totalCompra (){
    const totalParaPagar = carritoDeCompras.reduce((acc, producto) => acc +  (producto.precio * producto.cantidad), 0)
    precioTotal.innerText = `$${totalParaPagar}`;
}


btnCompraRealizada.addEventListener("click", btnComprar)
function btnComprar () {

    carritoDeCompras.length = 0;
    localStorage.setItem("productos-en-el-carrito" , JSON.stringify(carritoDeCompras));
   
    boxCarritoVacio.classList.add("disabled");
    boxCarritoProductos.classList.add("disabled");
    boxCarritoAcciones.classList.add("disabled");
    boxCompraConfirmada.classList.remove("disabled");
}


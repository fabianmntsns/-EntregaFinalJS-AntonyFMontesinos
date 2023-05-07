const carritoDeCompras = JSON.parse(localStorage.getItem("productos-en-el-carrito"));

const boxCarritoVacio = document.querySelector("#carritoVacio");
const boxCarritoProductos = document.querySelector("#carritoProductos");
const boxCarritoAcciones = document.querySelector("#carritoAcciones");
const boxCompraConfirmada = document.querySelector("#compraConfirmada");

if (carritoDeCompras){
    
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
                <button class="carritoProductoEliminar" id="${producto.id}"> Eliminar</button>`

    boxCarritoProductos.append(div);



    })
 
} else{

} 
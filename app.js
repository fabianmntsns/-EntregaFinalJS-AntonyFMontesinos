// Productos de nuestro E Commerce en Array

const productos = [
    { 
        id: "prod-hombre-01",
        titulo: "Buzo",
        imagen: "./img/RMHombre/Hombre01.jpg",
        categoria: {
            nombre: "Hombre",
            id: "hombre"
        },
        precio: 29000
    },
    {
        id: "prod-hombre-02",
        titulo: "Remera Black & Gold",
        imagen: "./img/RMHombre/Hombre02.jpg",
        categoria: {
            nombre: "Hombre",
            id: "hombre"
        },
        precio: 25000
    },
    {
        id: "prod-hombre-03",
        titulo: "Buzo con Capucha",
        imagen: "./img/RMHombre/Hombre03.jpg",
        categoria: {
            nombre: "Hombre",
            id: "hombre"
        },
        precio: 23000
    },
    {
        id: "prod-hombre-04",
        titulo: "Chaqueta Capucha Hombre",
        imagen: "./img/RMHombre/Hombre04.jpg",
        categoria: {
            nombre: "Hombre",
            id: "hombre"
        },
        precio: 29000
    },
    { 
        id: "prod-mujer-01",
        titulo: "Buzo con Capucha Mujer",
        imagen: "./img/RMMujer/Mujer01.jpg",
        categoria: {
            nombre: "Mujer",
            id: "mujer"
         },
        precio: 29000
    },
    {
        id: "prod-mujer-02",
        titulo: "Buzo Mujer",
        imagen: "./img/RMMujer/Mujer02.jpg",
        categoria: {
            nombre: "Mujer",
            id: "mujer"
        },
        precio: 15000
    },
    {
        id: "prod-mujer-03",
        titulo: "Remera Rosa Mujer",
        imagen: "./img/RMMujer/Mujer03.jpg",
        categoria: {
            nombre: "Mujer",
            id: "mujer"
        },
        precio: 29000
    },
    {
        id: "prod-mujer-04",
        titulo: "Remera Azul Mujer",
        imagen: "./img/RMMujer/Mujer04.jpg",
        categoria: {
            nombre: "Mujer",
            id: "mujer"
        },
        precio: 29000
    },
    {
        id: "prod-nino-01",
        titulo: "Gorro Azul Kids",
        imagen: "./img/RMNino/Nino01.jpg",
        categoria: {
            nombre: "Niños",
            id: "nino"
        },
        precio: 29000
    },
    {
        id: "prod-nino-02",
        titulo: "Piluso Kids",
        imagen: "./img/RMNino/Nino02.jpg",
        categoria: {
            nombre: "Niños",
            id: "nino",
        },
        precio: 14000
    },
    {
        id: "prod-nino-03",
        titulo: "Remera blanca Kids",
        imagen: "./img/RMNino/Nino03.jpg",
        categoria: {
            nombre: "Niños",
            id: "nino"
        },
        precio: 29000
    },
    {
        id: "prod-nino-04",
        titulo: "Gorro Kids",
        imagen: "./img/RMNino/Nino04.jpg",
        categoria: {
            nombre: "Niños",
            id: "nino"
        },
        precio: 29000
    },

];

const contenedorProductos = document.querySelector("#contenedorCards");
const botonesSeccion = document.querySelectorAll(".botonSeccion");
const tituloSeccion = document.querySelector("#tituloMain");
let btnAgregar = document.querySelectorAll(".buyProd")
const cantidadProductosEnCarrito = document.querySelector("#num")


// realizamos la funcion cargarProductos para manipular el DOM mediante lo que se cargó previamente en el Array de productos

function cargarProductos (productosElegidos) {

// Realizamos un forEach para iterar los productos del Array y mostramos en el DOM
contenedorProductos.innerHTML = "" // para no duplicar los productos al seccionar lo que queremos ver 

productosElegidos.forEach(producto => {
    let div = document.createElement("div");
    div.classList.add("prod");
    div.innerHTML = ` 
    <img class="imgProd" src="${producto.imagen}" alt="${producto.titulo}">
    <div class="infoProd">
    <h3 class="tituloProd">${producto.titulo}</h3>                
        <p class="precio">${producto.precio} <span>ARS</span></p>
        <button class="buyProd" id= "${producto.id}">Comprar</button>
    </div> `
    ;

    contenedorProductos.append(div);
})
actualizarEstadoBotones();
}

cargarProductos(productos);

botonesSeccion.forEach(boton => {
    // creamos un evento click que nos permita seleccionar la categoria de productos que queremos ver  
    boton.addEventListener("click", (e)=>{ 
        // hacemos un if else con dos objetivos 
        //1-> mostrar los productos segun la categoria al clickear 
        //2-> cambiar el nombre del titulo al cambiar de categoria 
        if (e.currentTarget.id != "todos") { 
        const tituloCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id); 
        tituloSeccion.innerText= tituloCategoria.categoria.nombre;

         const productosSeccion = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
         cargarProductos(productosSeccion);   
        } 
        else {
            tituloSeccion.innerText = "Todos los productos"; 
            cargarProductos(productos);
        }

    })
})

// agregar los productos al carrito desde aqui

function actualizarEstadoBotones() {
    btnAgregar = document.querySelectorAll(".buyProd")

    btnAgregar.forEach(btn => {
        // creamos un evento que al hacer click nos permita agregar productos al carrito 
        btn.addEventListener("click", agregarProductoAlCarrito);
    });
}
//creamos un array donde se alojaran los productos que agreguemos mediante los btn
const carritoDeCompras = [];
// creamos la funcion
function agregarProductoAlCarrito(e) {
    const idBtn = e.currentTarget.id;
    const productoAgregadoAlCarrito = productos.find(producto => producto.id === idBtn);

    if(carritoDeCompras.some(producto => producto.id === idBtn)){ 
        const index = carritoDeCompras.findIndex(producto => producto.id === idBtn);
        carritoDeCompras[index].cantidad++;

    } else {
        productoAgregadoAlCarrito.cantidad = 1;
        carritoDeCompras.push(productoAgregadoAlCarrito); // push para que los productos se guarden en el array de carritoDeCompras 
    }
    actCantProdCarrito();
    // LocalStorage
    localStorage.setItem("productos-en-el-carrito", JSON.stringify(carritoDeCompras));
}


// desde aqui para que cada vez que agreguemos un producto al carritoDeCompras se incremente el numero en el carrito del DOM

function actCantProdCarrito(){
    let nuevaCantidadProductosEnCarrito = carritoDeCompras.reduce((acc, producto) => acc + producto.cantidad, 0);
    cantidadProductosEnCarrito.innerText = nuevaCantidadProductosEnCarrito;
}

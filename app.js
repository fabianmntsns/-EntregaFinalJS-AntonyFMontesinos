let productos = [];

fetch("./productos.json")
    .then(response => response.json())
    .then(data =>{
        productos = data;
        cargarProductos(productos)
    })
    

const contenedorProductos = document.querySelector("#contenedorCards");
const botonesSeccion = document.querySelectorAll(".botonSeccion");
const tituloSeccion = document.querySelector("#tituloMain");
let btnAgregar = document.querySelectorAll(".buyProd")
const cantidadProductosEnCarrito = document.querySelector("#num");
const input = document.querySelector('input');

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


botonesSeccion.forEach(boton => {
    boton.addEventListener("click", (e) => {
      const productosSeccion = (e.currentTarget.id != "todos") 

      /*    if (e.currentTarget.id != "todos") { 
        const tituloCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id); 
        tituloSeccion.innerText= tituloCategoria.categoria.nombre;

         const productosSeccion = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
         cargarProductos(productosSeccion);   
        } 
        else {
            tituloSeccion.innerText = "Todos los productos"; 
            cargarProductos(productos);
        } */
        ? productos.filter(producto => producto.categoria.id === e.currentTarget.id) 
        : productos;
  
      tituloSeccion.innerText = (e.currentTarget.id != "todos") 
        ? productos.find(producto => producto.categoria.id === e.currentTarget.id).categoria.nombre 
        : "Todos los productos";
  
      cargarProductos(productosSeccion);   
    });
  });

// agregar los productos al carrito desde aqui

function actualizarEstadoBotones() {
    btnAgregar = document.querySelectorAll(".buyProd")

    btnAgregar.forEach(btn => {
        // creamos un evento que al hacer click nos permita agregar productos al carrito 
        btn.addEventListener("click", agregarProductoAlCarrito);
    });
}

let carritoDeCompras;

let carritoDeComprasLS = localStorage.getItem("productos-en-el-carrito");

/*if(carritoDeComprasLS){
    carritoDeCompras = JSON.parse(carritoDeComprasLS);
    // traemos la función de actCantProdCarrito para actualizar la el numero de productos que tenemos elegidos en la página ppal
    actCantProdCarrito()
} else {
    carritoDeCompras = [];
} */

carritoDeCompras = carritoDeComprasLS ? JSON.parse(carritoDeComprasLS) : [];
actCantProdCarrito();


// creamos la funcion
function agregarProductoAlCarrito(e) {
    Toastify({
        text: "Agregado al carrito",
        duration: 2000,
        close: true,
        gravity: "top", 
        position: "center", 
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, rgb(125, 125, 223) rgb(199, 199, 199))",
        },
        offset: {
            y: "2rem" 
          },
        onClick: function(){}
      }).showToast();

    const idBtn = e.currentTarget.id;
    const productoAgregadoAlCarrito = productos.find(producto => producto.id === idBtn);

   /* if(carritoDeCompras.some(producto => producto.id === idBtn)){ 
        const index = carritoDeCompras.findIndex(producto => producto.id === idBtn);
        carritoDeCompras[index].cantidad++;

    } else {
        productoAgregadoAlCarrito.cantidad = 1;
        carritoDeCompras.push(productoAgregadoAlCarrito); // push para que los productos se guarden en el array de carritoDeCompras 
    }*/
    carritoDeCompras.some(producto => producto.id === idBtn) ?
    (carritoDeCompras[carritoDeCompras.findIndex(producto => producto.id === idBtn)].cantidad++, null) :
    (productoAgregadoAlCarrito.cantidad = 1, carritoDeCompras.push(productoAgregadoAlCarrito), null);


    actCantProdCarrito();
    // LocalStorage
    localStorage.setItem("productos-en-el-carrito", JSON.stringify(carritoDeCompras));
}


// desde aqui para que cada vez que agreguemos un producto al carritoDeCompras se incremente el numero en el carrito del DOM

function actCantProdCarrito(){
    let nuevaCantidadProductosEnCarrito = carritoDeCompras.reduce((acc, producto) => acc + producto.cantidad, 0);
    cantidadProductosEnCarrito.innerText = nuevaCantidadProductosEnCarrito;
}

// buscador


input.addEventListener('input', buscarProductos);

function buscarProductos(e) {
    console.log(buscarProductos)
    value = e.srcElement.value.toLowerCase()
    const productosSeccion = productos.filter(producto => producto.titulo.slice (0,value.length).toLowerCase() === value);
    cargarProductos(productosSeccion)
}


// clase constructura con alerta de sweet alert para dar saludo de bienvenida al usuario
class Saludo {
    constructor(nombre) {
      this.nombre = nombre;
    }
  
    saludar() {
      if (this.nombre !== '') {
        Swal.fire({
          title: `¡Bienvenido, ${this.nombre}!`,
          text: 'Gracias por visitar nuestra página',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false
        });
      } else {
        this.pedirNombre();
      }
    }
  
    pedirNombre() {
      Swal.fire({
        title: 'Ingresa tu nombre',
        input: 'text',
        inputPlaceholder: 'Escribe tu nombre aquí',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: false,
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,
        inputValidator: (value) => {
          if (!value) {
            return 'Debes ingresar tu nombre';
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const nombreUsuario = result.value;
          const saludo = new Saludo(nombreUsuario);
          saludo.saludar();
        } else {
          this.pedirNombre();
        }
      });
    }
  }
  
  const saludo = new Saludo('');
  saludo.pedirNombre();
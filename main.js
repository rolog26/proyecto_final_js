document.getElementById("clientes").addEventListener("submit", function (e) {
  e.preventDefault();
  const ingreso = document.getElementById("ingreso").value;
  const nombre = document.getElementById("nombre").value;
  const numero = document.getElementById("numero").value;
  const dispositivo = document.getElementById("dispositivo").value;
  const diagnostico = document.getElementById("diagnostico").value;
  const presupuesto = document.getElementById("presupuesto").value;
  const encargado = document.getElementById("encargado").value;
  const estado = document.getElementById("estado").value;
  const id = obtenerId();

  const nuevoCliente = {
    id: id,
    ingreso: ingreso,
    nombre: nombre,
    numero: numero,
    dispositivo: dispositivo,
    diagnostico: diagnostico,
    presupuesto: presupuesto,
    encargado: encargado,
    estado: estado,
  };

  guardarCliente(nuevoCliente);

  agregarCliente(nuevoCliente);

  document.getElementById("clientes").reset();
});

const registrados = document.getElementById("registrados");
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

const obtenerId = () => {
  let contador = parseInt(localStorage.getItem("contadorClientes"));
  contador++;
  let nuevoId = contador;
  localStorage.setItem("contadorClientes", contador.toString());
  return nuevoId;
};

const guardarCliente = (cliente) => {
  try {
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    clientes.push(cliente);
    localStorage.setItem("clientes", JSON.stringify(clientes));
  } catch (error) {
    console.log("Error al guardar: ", error);
  }
};

document.getElementById("botonBuscar").addEventListener("click", () => {
  try {
    const clienteBuscado = document.getElementById("clienteABuscar").value;
    buscarCliente(clienteBuscado);
  } catch (error) {
    console.log("Error al buscar: ", error);
  }
});

const buscarCliente = (clienteBuscado) => {
  const clienteEncontrado = clientes.find(cliente =>
    cliente.nombre.toLowerCase() == clienteBuscado.toLowerCase() ||
    cliente.id == clienteBuscado
  );
  const resultadoBusqueda = document.getElementById("resultadoBusqueda");
  if (clienteEncontrado) {
    resultadoBusqueda.innerHTML = "";
    const div = document.createElement("div");
    div.classList.add("cliente");
    div.innerHTML = `
        <ul>
            <li>ID: ${clienteEncontrado.id}</li>
            <li>Nombre: ${clienteEncontrado.nombre}</li>
            <li>Número de teléfono: ${clienteEncontrado.numero}</li>
            <li>Fecha de ingreso: ${clienteEncontrado.ingreso}</li>
            <li>Dispositivo: ${clienteEncontrado.dispositivo}</li>
            <li>Diagnostico: ${clienteEncontrado.diagnostico}</li>
            <li>Presupuesto: ${clienteEncontrado.presupuesto}</li>
            <li>Encargado de la reparación: ${clienteEncontrado.encargado}</li>
            <li>Estado de la reparación: ${clienteEncontrado.estado}</li>
        </ul>
        `;
    resultadoBusqueda.appendChild(div);
    Swal.fire({
      background: "gray",
      color: "white",
      position: "top",
      title: "Cliente encontrado",
      icon: "success",
      showConfirmButton: false,
      toast: true,
      timer: 5000,
      timerProgressBar: true,
    });
  } else {
    resultadoBusqueda.innerHTML = "";
    Swal.fire({
      background: "gray",
      color: "white",
      position: "top",
      title: "No se encontro el cliente",
      icon: "error",
      showConfirmButton: false,
      toast: true,
      timer: 5000,
      timerProgressBar: true,
    });
  }
};

const agregarCliente = (cliente) => {
  try {
    const div = document.createElement("div");
    div.classList.add("cliente");
    div.innerHTML = ` 
        <ul>
            <li>ID: ${cliente.id}</li>
            <li>Nombre: ${cliente.nombre}</li>
            <li>Número de teléfono: ${cliente.numero}</li>
            <li>Fecha de ingreso: ${cliente.ingreso}</li>
            <li>Dispositivo: ${cliente.dispositivo}</li>
            <li>Diagnóstico: ${cliente.diagnostico}</li>
            <li>Presupuesto: ${cliente.presupuesto}</li>
            <li>Encargado de la reparación: ${cliente.encargado}</li>
            <li>Estado de la reparación: ${cliente.estado}</li>
            </ul>
            <button class="eliminarCliente">Eliminar cliente</button>
            `;
    registrados.appendChild(div);

    const botonEliminar = div.querySelector(".eliminarCliente");
    botonEliminar.addEventListener("click", () => {
      Swal.fire({
        background: "gray",
        color: "white",
        title: "¿Estás seguro de eliminar este cliente?",
        icon: "warning",
        showDenyButton: true,
        confirmButtonColor: "#d33",
        denyButtonColor: "darkgray",
        confirmButtonText: "Si",
        denyButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          eliminarCliente(cliente);
          div.remove();

          Swal.fire({
            background: "gray",
            color: "white",
            title: "Cliente eliminado",
            icon: "success",
            confirmButtonColor: "darkgray",
            iconColor: "#f27474",
          });
        } else if (result.isDenied) {
          Swal.fire({
            background: "gray",
            color: "white",
            title: "No se eliminó el cliente",
            confirmButtonColor: "darkgray",
          });
        }
      });
    });
    Swal.fire({
      background: "gray",
      color: "white",
      position: "top",
      title: "Cliente agregado",
      icon: "success",
      showConfirmButton: false,
      toast: true,
      timer: 5000,
      timerProgressBar: true,
    });
  } catch (error) {
    Swal.fire({
      background: "gray",
      color: "white",
      position: "top",
      title: "Hubo un error y no se pudo agregar el cliente",
      icon: "error",
      confirmButtonColor: "darkgray",
    });
    console.log("No se pudo agregar el cliente: ", error);
  }
};

const eliminarCliente = (clienteAEliminar) => {
  let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  const cliente = clientes.find((cliente) => cliente.id == clienteAEliminar.id);
  const index = clientes.indexOf(cliente);
  clientes.splice(index, 1);
  localStorage.setItem("clientes", JSON.stringify(clientes));
};

const body = document.getElementsByTagName("body");
const botonModo = document.getElementById("modo");
let modoOscuro = localStorage.getItem("oscuro");
let modo;

if (modoOscuro == null) {
  localStorage.setItem("oscuro", "desactivado");
  modo = "oscuro";
} else if (modoOscuro == "activado") {
  body[0].classList.add("modoOscuro");
  modo = "claro";
} else {
  modo = "oscuro";
}

botonModo.textContent = `Modo ${modo}`;

botonModo.addEventListener("click", () => {
  body[0].classList.toggle("modoOscuro");
  if (body[0].classList.contains("modoOscuro")) {
    localStorage.setItem("oscuro", "activado");
    modo = "claro";
  } else {
    localStorage.setItem("oscuro", "desactivado");
    modo = "oscuro";
  }
  botonModo.textContent = `Modo ${modo}`;
});

const llamadoAJson = async (URL) => {
  const res = await fetch(URL);
  const data = await res.json();
  llenarEncargados(data);
};

const llenarEncargados = (data) => {
  const selectEncargado = document.getElementById("encargado");
  data.forEach((encargado) => {
    const option = document.createElement("option");
    option.value = encargado.nombre;
    option.textContent = encargado.nombre + " (" + encargado.sector + ")";
    selectEncargado.appendChild(option);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  llamadoAJson("data.json");

  let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  clientes.forEach((cliente) => {
    agregarCliente(cliente);
  });
  if (localStorage.getItem("contadorClientes") == null) {
    localStorage.setItem("contadorClientes", 0);
  }
});

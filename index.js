// Un fetch recibe dos parametros,
// uno obligatorio y uno optativo

// El parametro obligatorio es un string que representa una URL

// Si no pongo un segundo parametro JS asume que quiero hacer un GET


////////////// EJERCICIOS

// 1 En el HTML se debe ver en forma de <ul> y <li>, la lista de usuarios (solo el nombre). No es necesario ningun estilado.

// 2 Una vez logrado eso, agregar al lado de cada usuario un boton que diga "borrar". Al hacerse click, debe enviarse el metodo DELETE a la ruta /users/${id} con el id del usuario.

// 3 Una vez logrado eso, que la lista de usuarios se actualice luego de borrar.

// 4 Luego, crear un formulario con los campos Nombre, Email, Direccion y Telefono. Al enviar ese formulario, se debe enviar el metodo POST a la ruta /users para crear un usuario nuevo. La lista debe actualizarse e incluir al final el usuario recientemente creado.



// GET
// Traerme informacion para que yo pueda leerla

const obtenerUsuariosyHacerHTML = () => {
    fetch('https://601da02bbe5f340017a19d60.mockapi.io/users')
      .then(res => res.json())
      .then(data => {
        const lista = document.querySelector('ul');
  
              lista.innerHTML = ''
        data.map(usuario => {
          lista.innerHTML += `<li>
          ${usuario.fullname}
          <button data-userId=${usuario.id} class="boton-borrar">Borrar</button>
          </li>`;
        });
        const listaDeBotones = document.querySelectorAll('.boton-borrar');
  
        // tengo que usar forEach, en lugar de map, porque listaDeBotones es una lista de nodos
        // de HTML, que no se puede recorrer con map (pero si con forEach)
        listaDeBotones.forEach(boton => {
          boton.onclick = () => {
            const id = boton.dataset.userid;
  
                      // DELETE
                      // Borra informacion de la API. con el id del usuario que quiero borrar
            fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${id}`, {
              method: 'delete',
            })
              .then(res => res.json())
              .then(usuarioBorrado => {
  
                              // funcion recursiva (se llama a si misma, para hacer de nuevo el HTML)
                              obtenerUsuariosyHacerHTML()
                          });
          };
        });
      });
  };
  
  obtenerUsuariosyHacerHTML();
  
  const formulario = document.querySelector("form")
  
  formulario.onsubmit = (e) => {
      e.preventDefault()
  
      const fullname = document.querySelector("#fullname").value
      const address = document.querySelector("#address").value
      const phone = document.querySelector("#phone").value
      const email = document.querySelector("#email").value
      // POST
      fetch('https://601da02bbe5f340017a19d60.mockapi.io/users', {
          method: 'post', 
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              fullname: fullname, 
              addres: address, 
              phone: phone, 
              email: email
          })
      })
      .then(res => res.json())
      .then(data => {
          obtenerUsuariosyHacerHTML()
      })
  }
let todosLosProveedores
let listaCheckBox
let allArticulos
let pedido=[]
document.addEventListener("DOMContentLoaded",async function() {
    console.log("DOM fully loaded and parsed");
    await listarProveedores()
    await traerPedidos()
    await traerArticulos()
     
  document.getElementById("searchList").addEventListener('input', function() {
    const searchTerm = document.getElementById("searchList").value.toLowerCase();

    listaCheckBox.forEach(item => {
        const itemText = item.textContent.toLowerCase();
        if (itemText.includes(searchTerm)) {
            item.style.display = 'flex'; // Mostrar el elemento
        } else {
            item.style.display = 'none'; // Ocultar el elemento
        }
    });
});


document.getElementById("formPedido").addEventListener("submit",async (e)=>{
  e.preventDefault()
  toastr.warning('Creando un pedido. Espere un momento.')
  let form=new FormData(document.getElementById("formPedido"))
  let response = await fetch("php/addPedido.php",{
    method:"POST",
    body:form
  });
  let res = await response.json();
  console.log(res);
  if(res=="exito"){
    toastr.success('Pedido creado con exito')
    
    $("#modalListaPedido").modal("hide")
    document.getElementById("formPedido").reset()
    document.getElementById("listaCargada").innerHTML=""
    document.getElementById("seleccionados").innerHTML=0
    pedido=[]
    traerPedidos()
  }

})






});
function vaciarFromPro() {
  document.getElementById("nombreProveedor").value=""
  document.getElementById("direccionProveedor").value=""
  document.getElementById("telefonoProveedor").value=""
  document.getElementById("informacionExtra").value=""
}

async function listarProveedores() {
    fetch('php/listarProveedores.php')
    .then(response => response.json())
    .then((data)=> {
        console.log(data)
        let listar=``
        dibujarSelectProveedores(data)
        data.forEach(element => {
            listar+=`<div class="row">
                        <div style="padding: 2%;background: #383742b8;border-radius: 22px;margin-left: 6%;margin-right: 6%;box-shadow: 0px 0px 20px 0px #00000047;" class="col">
                        <h3>${element.nombreP}</h3>
                        </div>
                    </div>
                    <div style="margin-bottom: 3%;padding-top: 6% !important;background: #7188a0c9;border-radius: 12px;padding: 1%;margin-top: -6%;box-shadow: 0px 0px 20px 0px #00000059;">
                        <div class="row">
                            <div class="col">
                            <h4 style="    text-shadow: 0px 0px 20px black;">Direccion</h4>
                            <h5>${element.direccionP}</h5>
                            </div>
                            <div class="col">
                            <h4 style="    text-shadow: 0px 0px 20px black;">Telefono</h4>
                            <h5>${element.telefonoP}</h5>
                            </div>
                            <div class="col-sm">
                            <h4 style="    text-shadow: 0px 0px 20px black;">Info extra</h4>
                            <h5>${element.informacionExtra}</h5>
                            </div>
                        </div>
                        <div class="row">
                            <div style="color:red;" class="col">
                            <button onclick="abrirModalEdit(${element.idProveedor})" class="btn btn-blue">Editar</button>
                            <button onclick="abrirModalDelete(${element.idProveedor},'${element.nombreP}')" class="btn btn-danger">Eliminar</button>
                            </div>
                        </div>
                    </div>
                    `

        });
        document.getElementById("proveedores").innerHTML=listar

        return todosLosProveedores=data
    
    });
}

document.getElementById("addNewproveedor").addEventListener("click",()=>{
    let proveedorNew = {
        nombre:document.getElementById("nombreProveedor").value,
        direccion:document.getElementById("direccionProveedor").value,
        telefono:document.getElementById("telefonoProveedor").value,
        informacionExtra:document.getElementById("informacionExtra").value,
      };
    let trueOfalse=true
      for (const property in proveedorNew) {
          if(proveedorNew[property]==""){
            trueOfalse=false
        }
        
      }
    if (trueOfalse) {
        let datosEnviar = new FormData();
        datosEnviar.append("proveedorNew", JSON.stringify(proveedorNew));
      
        fetch("php/addProveedor.php", {
          method: 'POST',
          body: datosEnviar,
          }).then(respuesta => respuesta.json())
              .then(async decodificado => {
                console.log(decodificado)
                  if (decodificado=="perfecto") {
                    $("#centralModalSuccess").modal("hide")
                    /* AQUI VA EL LISTAR TODOS LOS PROVEEDORES */
                    await listarProveedores()
                    vaciarFromPro()
                    /* AQUI VA EL LISTAR TODOS LOS PROVEEDORES */
                    $("#exito").modal("show")
                  }
              });
    }else{
        if(document.getElementById("error")){
            /* $("#centralModalSuccess").modal("hide") */
            $("#error").modal("show")
        }else{
            /* $("#centralModalSuccess").modal("hide") */
            let modalError=`<div class="modal fade" id="error" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-sm modal-notify modal-danger" role="document">
                <!--Content-->
                <div class="modal-content text-center">
                    <!--Header-->
                    <div class="modal-header d-flex justify-content-center">
                    <p class="heading">Error completar todos los campos para guardar!</p>
                    </div>
                
                    <!--Body-->
                    <div class="modal-body">
                
                    <i class="fas fa-times fa-5x animated rotateIn"></i>
                
                    </div>
                
                    <!--Footer-->
                    <div class="modal-footer">
                
                    <a type="button" class="btn btn-danger waves-effect" onclick="cerrarYabrirOtroModal()">Cerrar</a>
                    </div>
                </div>
                <!--/.Content-->
                </div>
                </div>`
                $(modalError).modal({backdrop: 'static', keyboard: false})
                /* $(modalError).modal("show") */

        }
        
    }
})
function cerrarYabrirOtroModal() {
    $("#error").modal("hide")
    $("#centralModalSuccess").modal("show")
}



async function abrirModalEdit(id) {
    let filtroArray= todosLosProveedores.find((m) => m.idProveedor == id);
    console.log("Es: " + filtroArray.nombreP );
    
    /* creo el select de categorias en el modal editar */
  
      if(document.getElementById(`proveedorEdit${id}`)){
        $(document.getElementById(`proveedorEdit${id}`)).modal("show")
      }else{
        let modalEdit=`
        <div class="modal fade" id="proveedorEdit${id}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div style="margin: 5.75rem auto !important;" class="modal-dialog modal-notify modal-info" role="document">
          <!--Content-->
          <div class="modal-content">
            <!--Header-->
            <div style="margin-left: 5%;margin-right: 5%;margin-top: -5%;box-shadow: 0px 0px 20px 0px #00000073;" class="modal-header">
              <p style="padding: 3%;" class="heading lead">Editar ${filtroArray.nombreP}</p>
     
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" class="white-text">&times;</span>
              </button>
            </div>
           <form>
            <!--Body-->
            <div class="modal-body">
              
               <div class="md-form">
                 <input required type="text" name="nombreProveedor" id="nombreProveedor${id}" value="${filtroArray.nombreP}" class="form-control">
                 <label for="nombreProveedor${id}" class="active">Nombre</label>
               </div>
               <div class="md-form">
                 <input required type="text" name="direccionProveedor" id="direccionProveedor${id}" value="${filtroArray.direccionP}" class="form-control">
                 <label for="direccionProveedor${id}" class="active">Direccion</label>
               </div>
               <div class="md-form">
                 <input required type="number" name="telefonoProveedor" id="telefonoProveedor${id}" value="${filtroArray.telefonoP}" class="form-control">
                 <label for="telefonoProveedor${id}" class="active">Telefono</label>
               </div>
               <div class="md-form">
                 <textarea required name="informacionExtra" id="informacionExtra${id}" class="md-textarea form-control" cols="30" rows="3">${filtroArray.informacionExtra}</textarea>
                 <label for="informacionExtra${id}" class="active">Informacion Extra</label>
               </div>
     
              </div>
            
     
            <!--Footer-->
            <div class="modal-footer">
              <a type="button" data-dismiss="modal" class="btn btn-danger">Cerrar</a>
              <a onclick="guardarEditarProveedor(${id})" class="btn btn-success">Guardar</a>
            </div>
            </form>
          </div>
          <!--/.Content-->
        </div>
      </div>`
          
        $(modalEdit).modal("show")
      }
     
   }

   function guardarEditarProveedor(id) {
    console.log(id)
    let proveedorEdit = {
     idProveedor:id,
     nombreP:document.getElementById("nombreProveedor"+id).value,
     direccionP:document.getElementById("direccionProveedor"+id).value,
     telefonoP:document.getElementById("telefonoProveedor"+id).value,
     infoExtra:document.getElementById("informacionExtra"+id).value,
   };
 
   let datosEnviar = new FormData();
   datosEnviar.append("proveedor", JSON.stringify(proveedorEdit));
 
   fetch("php/editProveedor.php?id=", {
     method: 'POST',
     body: datosEnviar,
     }).then(respuesta => respuesta.json())
         .then(async decodificado => {
           console.log(decodificado)
             if (decodificado=="perfecto") {
               $("#proveedorEdit"+id).modal("hide")
               await listarProveedores()
             }
         });
 
   console.log(proveedorEdit)
  }

  function abrirModalDelete(id,nombre) {
    $("#modalEliminar").modal("show")
    document.getElementById("tituloEliminarP").innerHTML=nombre
    let boton=`<button class="btn btn-danger" onclick="borrarProveedor(${id})">Eliminar</button>`
    document.getElementById("cambiarBoton").innerHTML=boton
  }
  function borrarProveedor(id) {
      console.log(id)
      fetch('php/deleteProveedor.php?id='+id)
    .then(response => response.json())
    .then(async (data) => {
        console.log(data)
        if (data=="perfecto") {
            $("#modalEliminar").modal("hide")
            await listarProveedores()
          }
    });
  }

  function dibujarSelectProveedores(params) {
    let options=`<option value="" selected >Selecciona un proveedor</option>`
    params.forEach((element)=>{
      options+=`<option value="${element.idProveedor}" >${element.nombreP}</option>`
    })
    document.getElementById("proveedorList").innerHTML=options
  }

  function dibujarArticulosCheck(params) {
    let divsCheckBox=``
    params.forEach((element)=>{
      divsCheckBox+=`<div class="optionCheck mb-1" style="cursor:pointer;display:flex;background: #f4f4f4;padding: 1%;border-radius: 5px;">
                          <div onclick="dibujarEnLista(this,${element.articulo})" style="width: 100%;display: flex;flex-direction: column;">
                            <span>${element.nombre}</span>
                            <label style="margin: 0px;font-size: 70%;">En stock ${element.cantidad}</label>
                          </div>
                    </div>`
    })
    document.getElementById("listaCheckBox").innerHTML=divsCheckBox
    listaCheckBox=document.querySelectorAll('.optionCheck')
  }
  function dibujarEnLista(e, id) {
    pedido.push(id);
    document.getElementById("seleccionados").innerHTML = pedido.length;
    console.log(e.childNodes[1].innerHTML);

    let cardList = document.createElement('div');
    cardList.className = 'cardList';

    let div1 = document.createElement('div');
    div1.style.width = '15%';
    let a = document.createElement('a');
    a.onclick = function() { borrar(this, id); };
    a.textContent = 'X';
    let input1 = document.createElement('input');
    input1.style.display = 'none';
    input1.type = 'number';
    input1.name = 'articulo[]';
    input1.value = id;
    div1.appendChild(a);
    div1.appendChild(input1);

    let div2 = document.createElement('div');
    div2.style.width = '70%';
    let span = document.createElement('span');
    span.style.fontSize = '65%';
    span.textContent = e.childNodes[1].innerHTML;
    div2.appendChild(span);

    let div3 = document.createElement('div');
    div3.style.width = '15%';
    let input2 = document.createElement('input');
    input2.style.cssText = 'width: 100%; padding: 1%; border-radius: 5px; border: 0px; box-shadow: 0px 0px 0px 1px #0084c8; outline: none;';
    input2.type = 'number';
    input2.required=true
    input2.name = 'cantidad[]';
    div3.appendChild(input2);

    cardList.appendChild(div1);
    cardList.appendChild(div2);
    cardList.appendChild(div3);

    document.getElementById("listaCargada").prepend(cardList);
}


  async function traerArticulos() {
    const response = await fetch("php/traerArticulos.php");
    const articulos = await response.json();
    console.log(articulos);
    dibujarArticulosCheck(articulos)
    allArticulos=articulos
  }
  async function traerPedidos() {
    const response = await fetch("php/traerPedidos.php");
    const pppedidos = await response.json();
    console.log(pppedidos);
    dibujarPedidos(pppedidos)

  }
  function borrar(e,id) {
    const index = pedido.findIndex((elemento) => elemento == id);
    pedido.splice(index, 1);
    document.getElementById("seleccionados").innerHTML=pedido.length
    e.parentElement.parentElement.remove()
  }
  function dibujarPedidos(params) {
    let cols=``
    let detalle
    let p=``
    let producId
    
    params.forEach((element)=>{
      if(params.length!=0){
        detalle=element.detalle.split(",")
        
        detalle.forEach((detail)=>{
          producId=detail.split(":")
          console.log(producId)
          p+=`<a style="border: 0px;border-radius: 5px;display: flex;justify-content: space-between;align-items: center;" href="#" class="list-group-item list-group-item-action">
          <div>
            ${producId[0]}
            <br>
            Cantidad:${producId[2]}
          </div>
          <div>
            <button onclick="eliminarArticuloPedido(this,${producId[1]})" class="btn btn-sm btn-blue">X</button>
          </div>
          
          </a>`
        })

      }

      cols+=`<div class="col-12 mb-2">
                  <!-- Div que al hacer clic se expande y muestra una lista -->
                <div class="list-group">
                  <div href="#" style="box-shadow: 2px -1px 1px 1px #323b9e;border: 0px;display: flex;flex-direction: row;justify-content: space-between;align-items: center !important;background: #246daf;padding: 1%;border-radius: 5px;color: white;" class="list-group-item list-group-item-action" data-toggle="collapse" data-target="#collapseExample${element.idPedido}" aria-expanded="false" aria-controls="collapseExample${element.idPedido}">
                    <div>
                      <p style="margin:0;">NRO: ${element.idPedido}</p>
                      <p style="margin:0;">${element.nombreP}</p>
                    </div>
                    <p style="margin:0;">${element.fechaHora}</p>
                  </div>

                  <!-- Lista desplegable -->
                  <div style="border-radius: 5px;box-shadow: #323b9e 1px 1px 1px 1px;margin: 0% 1% 0% 1%;" class="collapse" id="collapseExample${element.idPedido}">
                    ${p}
                  </div>
                </div>
              </div>`
              p=``
    })
    document.getElementById("listaPedidosXd").innerHTML=cols
  }
  

  async function eliminarArticuloPedido(e,id) {
    toastr.warning('Quitando un articulo de un pedido...')
    await fetch('php/deleteArPedido.php?id='+id)
    .then(response => response.json())
    .then(async (data) => {
        toastr.success('Articulo removido con exito.')
        e.parentElement.parentElement.remove()
        
    }).catch(()=>{

    });
  }
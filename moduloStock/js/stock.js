let allArticulosLimitado
let allArticulosTodos
let allLaboratorios
let categorias
let proveedores
let page = 1;
let perPage = 3000;
function cargando(){
        document.getElementById("articulosTabla").innerHTML=`
        <div class="row text-center mb-1" style="font-weight: bold;font-size: 150%;background: #33b5e5;display: flex;border-radius: 5px;box-shadow: 1px 1px 1px 1px #1c7fa3;justify-content: space-around;color: #ffffff;padding: 1%;">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Cargando...</span>
              </div>
          </div>
        `
}
async function listarArticulos() {
    let esta=JSON.parse(localStorage.getItem("user")).establecimiento
  await fetch('php/listarArticulos.php?establecimiento='+esta+`&page=${page}&perpage=${perPage}`)
  .then(response => response.json())
  .then(async (data)=>{
    console.log(data)
      
    return allArticulosLimitado=data
  });
    
}
async function listarArticulosTodos() {
    let esta=JSON.parse(localStorage.getItem("user")).establecimiento
  await fetch('php/listarArticulosTodos.php?establecimiento='+esta)
  .then(response => response.json())
  .then(async (data)=>{
    console.log(data)
      
    return allArticulosTodos=data
  });
    
}
async function listarProveedores() {
  await fetch('php/listarProveedores.php')
  .then(response => response.json())
  .then(async (data)=>{
    console.log(data)
    proveedores=data
    let option=`<option value="" selected disabled>Seleccionar proveedor</option>`
    data.forEach(element => {
      option+=`<option value="${element.idProveedor}">${element.nombreP}</option>`
    });
    document.getElementById("selectProvedorAumentar").innerHTML=option
  });
    
}
async function listarLaboratorios() {
  await fetch('php/listarLaboratorios.php')
  .then(response => response.json())
  .then(async (data)=>{
    allLaboratorios=data
    console.log(data)
    let option=`<option value="" selected disabled>Seleccionar Laboratorio</option>`
    data.forEach(element => {
      option+=`<option value="${element.idLaboratorio}">${element.nombreLaboratorio}</option>`
    });
 
    document.getElementById("laboratoriosSearch").innerHTML=option
  });
    
}
async function listarCategorias() {
  await fetch('php/listarCategorias.php')
  .then(response => response.json())
  .then(async (data)=>{
    console.log(data)
    categorias=data
    dibujarCategorias(data)
    let option=`<option value="" selected disabled>Seleccionar Categoria</option>`
    data.forEach(element => {
      option+=`<option value="${element.idCategoria}">${element.nombreCategoria}</option>`
    });
    /* document.getElementById("selectLaboratorioAumentar").innerHTML=option */
    document.getElementById("selectLaboratorioAumentar").innerHTML=option
  });
    
}

async function subirPorcentajeEnPreciosProveedor() {
  let porcentaje=document.getElementById("porcentajeFiltro").value
  let proveedor=document.getElementById("selectProvedorAumentar").value
  if(proveedor&&porcentaje){
    await fetch("php/aumentarPrecio.php?porcentaje="+porcentaje+"&idPro="+proveedor)
          .then(async respuesta => {
                $("#modalPorcentaje").modal("hide")
                await listarArticulos()
                dibujarTabla(allArticulosLimitado)
             }
          );
  }else{
    if(!porcentaje){
      document.getElementById("porcentajeFiltro").style.borderColor="red"
    }
    if(!proveedor){
      document.getElementById("selectProvedorAumentar").style.borderColor="red"
    }
  }
  
}
document.getElementById("porcentajeFiltro").addEventListener("click",()=>{
  document.getElementById("porcentajeFiltro").style.borderColor=""
})
document.getElementById("selectProvedorAumentar").addEventListener("click",()=>{
  document.getElementById("selectProvedorAumentar").style.borderColor=""
})




/* console.log(todosLosArticulosCategorias) */


$(document).ready(async function(){

  document.getElementById('next').addEventListener('click', async () => {
      page++;
      cargando()
      await listarArticulos();
      await dibujarTabla(allArticulosLimitado)
    });
    
    document.getElementById('prev').addEventListener('click', async () => {
      if (page > 1) {
        page--;
        cargando()
          await listarArticulos();
          await dibujarTabla(allArticulosLimitado)
      }
  });
    
    document.getElementById("codActForm").addEventListener("submit",(e)=>{
    e.preventDefault()
    
    let codigo=document.getElementById('codigoBAc').value

    let pro=allArticulosLimitado

    pro= pro.find((m) => m.codBarra === codigo);
    console.log(pro)
    
    if(pro!=undefined){
        let tablaEscondida=document.getElementById("tablaEscondida").style.display="block"
        let tbody=document.getElementById("addProducto")
        let primerHijo=tbody.firstChild
        
        
 
        let proveedor=``
              proveedores.forEach(element => {
                proveedor+=`
                <option ${(element.idProveedor==pro.idProveedor)?"selected":""} value="${element.idProveedor}">${element.nombreP}</option>
                `
              });


    





        let tr=document.createElement('tr')
        
        for (let index = 0; index <= 6; index++) {
            let td=document.createElement('td')
            
            
            let nombre=document.createTextNode(pro.nombre)
            if(index==0){

            }else if(index==1){
                td.appendChild(nombre)
                tr.appendChild(td)
            }else if(index==2){
                /* CANTIDADDDDDDDDDDDDDDDDDDDDDDDDD */
                let inputCantidad=document.createElement('input')
                inputCantidad.className="form-control"
                inputCantidad.type="number"
                inputCantidad.step="0.01"
                inputCantidad.name="cantidad[]"
                td=document.createElement('td')
                td.style.display="none"
                td.appendChild(inputCantidad)
                tr.appendChild(td)
            }else if(index==3){
                /* COSTOOOOOOOOOOOOOOOOOOOOOO */
                let inputCosto=document.createElement('input')
                let inputFantasma=document.createElement('input')
                inputCosto.className="form-control"
                inputCosto.required=true
                inputCosto.type="number"
                inputCosto.step="0.01"
                inputCosto.name="costo[]"
                inputCosto.addEventListener("keyup",(e)=>{
                  sumaLocalIniciandoEnCosto(e.target)
                })
                inputCosto.value=pro.costo
                inputFantasma.value=pro.articulo
                inputFantasma.name="idArticulo[]"
                inputFantasma.style.display="none"
               
              
              
              
              let select=document.createElement('select')
                select.innerHTML=proveedor
                select.name="prove[]"
                select.classList.add("form-control")


                tr.style.position="relative"
                td=document.createElement('td')
                td.appendChild(inputFantasma)
                td.appendChild(inputCosto)
                td.appendChild(select)
                tr.appendChild(td)
                
            }else if(index==4){
              let diva=document.createElement("div")
              diva.className="input-group"
              let input2=document.createElement('input')
              input2.type = "text";
              input2.step="0.01"
              input2.style="text-align: center;"
              input2.name = "precioventa[]";
              input2.className = "form-control";
              input2.addEventListener("keyup",(e)=>{
                ponerPorcentajeMayorReversa(e.target)
              })
              
              let input=document.createElement('input')
                input.className="form-control"
                input.required=true
                input.name="meno[]"
                input.style.width="20%"
                input.type="number"
                input.step="0.01"
                input.style="text-align: center;"
                input.value=pro.menorCentaje
                input.addEventListener("keyup",(e)=>{
                  sumaLocalIniciandoEnPorcentaje(e.target)
                })
                


                td=document.createElement('td')
                tr.appendChild(td)
                diva.appendChild(input)
                let p=document.createElement("h3")
                p.innerHTML="$"
                diva.appendChild(p)
                diva.appendChild(input2)
                td.appendChild(diva)
                let divGanancia=document.createElement("div")
                divGanancia.className="md-form"
                let inputGanancia=document.createElement("input")
                inputGanancia.className="form-control"
                inputGanancia.disabled=true
                inputGanancia.step="0.01" 
                inputGanancia.id="meno"+pro.articulo
                let labelGanancia=document.createElement("label")
                labelGanancia.className="active"
                labelGanancia.innerHTML="Ganancia"

                divGanancia.appendChild(inputGanancia)
                divGanancia.appendChild(labelGanancia)
                td.appendChild(divGanancia)
                sumaLocalIniciandoEnPorcentaje(input)

            }else if(index==5){
           
            }else if(index==6){
              let boton=document.createElement('a')
              boton.className="btn btn-sm btn-primary borrar"
              boton.innerText="x"
              td.appendChild(boton)
              tr.appendChild(td)
          }

        }

        tbody.insertBefore(tr, primerHijo);
        
        document.getElementById('codActForm').reset()
        document.getElementById('codigoBAc').focus()
        
        let borrar=document.getElementsByClassName("borrar")

    
/* CAMBIAR ESTO POR UNA FUNCION CON THIS PARA ELIMINAR  */
        borrar.forEach(element => {
         
          element.addEventListener("click",(e)=>{
                console.log(e.target.parentNode.parentNode.parentNode)
                console.log(e.target.parentNode.parentNode)
                e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode)
                if (tbody.childElementCount==0) {
                    document.getElementById("tablaEscondida").style.display="none"
                }
            })
    });
    }else{
        
        alert("El producto no existe")
        document.getElementById('codActForm').reset()
        document.getElementById('codigoBAc').focus()
    }
    
    
    
    
    
    
    
    
    
    
    
    
})
  $("#filtroProductos").keyup(function(){
        // La palabra que estás buscando
    let palabraBuscada = document.getElementById("filtroProductos").value;

    // Obtén todos los elementos hijos del div
    let articulos = document.querySelectorAll('#articulosTabla .row');

    // Convierte la NodeList a un array para poder usar un bucle for
    articulos = Array.from(articulos);

    // Usa un bucle for para recorrer cada elemento
    for (let i = 0; i < articulos.length; i++) {
      console.log(articulos[i].children[0].children[0].innerHTML)
        // Obtén el nombre del artículo
        let nombreArticulo = articulos[i].children[0].children[0].innerHTML.toLowerCase();

        // Verifica si el nombre contiene la palabra buscada
        if(palabraBuscada){
          if (nombreArticulo.includes(palabraBuscada.toLowerCase())) {
              // Si la condición se cumple, oculta el artículo
              articulos[i].style.display = 'flex';
            } else {
              // Si no se cumple la condición, muestra el artículo
              articulos[i].style.display = 'none';
            }
          }else{
              articulos[i].style.display = 'flex';

        }
    }


  });


  
 /*  console.log(document.getElementsByClassName("dropdown-content select-dropdown")) */
    cargando()
  await listarArticulos().then(async()=>{
    await dibujarTabla(allArticulosLimitado)
    /* 
    await dibujarCategorias(todosLosArticulosCategorias[0])
    await dibujarSelect(todosLosArticulosCategorias[2]) */
    await listarProveedores()
    await listarLaboratorios()
    await listarCategorias()
    await listarArticulosTodos() 
    await dibujarSelectFiltro(allArticulosTodos)
    $('.mdb-select').materialSelect();
  })
  document.getElementsByClassName("dropdown-content select-dropdown").forEach((element)=>{
    console.log(element.parentElement.childNodes[1])
    element.parentElement.childNodes[1].addEventListener("click",()=>{
      element.children[0].children[0].children[0].focus()
      console.log("hola")
    })

  })
  
  

  
});


 async function abrirModalEdit(id) {
  let filtroArray= allArticulosLimitado.find((m) => parseInt(m.articulo) === parseInt(id));
  console.log("Es: " + filtroArray.nombre );
  
  /* creo el select de categorias en el modal editar */

    if(document.getElementById(`articulo${id}`)){
      /* borro el modal y vulevo a llamar a la funcion para crear uno nuevo */
      document.getElementById(`articulo${id}`).remove()
      abrirModalEdit(id)
    }else{
      let optionsCategoria=``
      categorias.forEach(element => {
        optionsCategoria+=`
        <option ${(element.idCategoria==filtroArray.categoria)?"selected":""} value="${element.idCategoria}">${element.nombreCategoria}</option>
        `
      });

      let proveedor=``
      proveedores.forEach(element => {
        proveedor+=`
        <option ${(element.idProveedor==filtroArray.idProveedor)?"selected":""} value="${element.idProveedor}">${element.nombreP}</option>
        `
      });
      let optionsLabor=``
      allLaboratorios.forEach(element => {
        optionsLabor+=`
        <option ${(element.idLaboratorio==filtroArray.keyTwoLabor)?"selected":""} value="${element.idLaboratorio}">${element.nombreLaboratorio}</option>
        `
      });
      let modalEdit=`
                <div class="modal fade" id="articulo${id}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div style="background:#33b5e5;" class="modal-header text-white">
                          <h4 class="modal-title heading lead" id="myModalLabel">Editar un producto</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span style="color: white;" aria-hidden="true">&times;</span>
                      </button>
                            
                        </div>
                        <div class="modal-body">
                  <div class="container-fluid">
                  <form enctype="multipart/form-data">
                    <div class="row">
                      <div class="col">
                        <div class="md-form">
                            <input required type="text" id="nombreEdit${id}" value="${filtroArray.nombre}" name="nombreEdit" class="form-control">
                            <label for="nombreEdit${id}" class="active">Nombre del articulo</label>
                        </div>
                      </div>
                        <div class="col">
                          <div class="md-form">
                              <input type="text" id="codBarraEdit${id}" name="codBarraEdit" value="${filtroArray.codBarra}" class="form-control">
                              <label for="codBarraEdit${id}" class="active">Codigo de barra</label>
                          </div>
                        </div>
                    </div>
                    

                      <div class="row">
                        <div style="display:none;" class="col">
                          <div class="md-form">
                            <input required type="number" id="stockminEdit${id}" value="${filtroArray.stockmin}" name="stockminEdit" class="form-control">
                            <label for="stockminEdit${id}" class="active">Stock minino</label>
                          </div>
                        </div>
                        <div class="col">
                          <div class="md-form">
                            <input type="number" id="cantidadEdit${id}" value="${filtroArray.cantidad}" name="cantidad" class="form-control">
                            <label for="cantidadEdit${id}" class="active">Cantidad</label>
                          </div>
                        </div>
                      </div>
                      


                      <div class="md-form">
                          <textarea id="descripcionEdit${id}" name="descripcionEdit" class="md-textarea form-control" rows="2">${filtroArray.descripcion}</textarea>
                          <label for="descripcionEdi${id}t" class="active">Descripcion</label>
                      </div>


                    <div class="form-group">
                        <div class="row">
                          <div class="col">
                            <div class="md-form">
                              <input required type="text" id="costoArticuloEdit${id}" onkeyup="separatorthis(this)" value="${separator(filtroArray.costo)}" name="costoArticulo" class="form-control">
                              <label for="costoArticuloEdit${id}" class="active">Costo</label>
                            </div>
                          </div>
                    
                          <div class="col">
                            <div class="md-form">
                              <input type="text" id="precioMayo${id}" onkeyup="separatorthis(this)" value="${separator(filtroArray.mayoritario)}" name="precioArticulo" class="form-control">
                              <label for="precioMayo${id}" class="active">Precio de venta</label>
                            </div>
                          </div>
                        </div>
                    </div>
                    
                    <div class="row">
                  
                    <div class="col">
                        <select id="selectCategoriaEdit${id}" required class="form-control">
                        <option value="">Categoria</option>
                        ${optionsCategoria}
                        
                        </select>
                    </div>
                    <div class="col">
                        <select id="selectProve${id}" required class="form-control">
                        <option value="">Proveedor</option>
                        ${proveedor}
                        
                        </select>
                    </div>
                     <div class="col">
                        <select id="selectLaborEdit${id}" required class="form-control">
                        <option value="">Laboratorios</option>
                        ${optionsLabor}
                        
                        </select>
                    </div>
                  
                    
                    </div>
                        </div> 
                  </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal"><span class="fa fa-close"></span> Cancelar</button>
                            <button onclick="guardarEditArticulo(${id})" name="add" class="btn btn-primary"><span class="fa fa-save"></span> Guardar</a>
                  </form>
                        </div>

                    </div>
                </div>
              </div>`
  
              $(modalEdit).modal("show")
    }
   
 }



 async function dibujarTabla(articulosStock) {
  let tablaArticulos=``
  let imagen=``
  console.log(articulosStock)
  document.getElementById("totalProductos").innerHTML=articulosStock.length
  articulosStock.forEach(element => {
  
      tablaArticulos+=`
      

      <div class="row text-center mb-1" style="background:${(element['cantidad']<=3&&element['cantidad']>0)?"#d56363":""}${(element['cantidad']<=0)?"#d56363":""}${(element['cantidad']>3)?"#63ced5":""};display: flex;border-radius: 5px;box-shadow: 1px 1px 1px 1px ${(element['cantidad']<=3&&element['cantidad']>0)?"#bc1e1e":""}${(element['cantidad']<=0)?"#bc1e1e":""}${(element['cantidad']>3)?"#1bbac4":""};justify-content: space-around;color: #ffffff;padding: 1%;">
          <div class="col-1">
          <img style="width:50%;border-radius:100%;" src="${(element.imagen)?element.imagen:"imagen.png"}" />
          </div>
          <div class="col-4"  onclick="verSinPuntos(this)"><span class="${acortarTextoMasLargo(element['nombre'])}">${element['nombre']}</span></div>
          <div class="col-1" ><span>$${separator(element['costo'])}</span></div>
          <div class="col-1" ><span>$${separator(element['mayoritario'])}</span></div>
          <div class="col-1" ><span>${element['cantidad']}</span></div>
          <div class="col-1 d-none d-md-block" onclick="verSinPuntos(this)" ><span class="${acortarTexto((element['nombreP'])?element['nombreP']:"Sin proveedor")}">${(element['nombreP'])?element['nombreP']:"Sin proveedor"}</span></div>
          <div class="col-1 d-none d-md-block" onclick="verSinPuntos(this)" ><span class="${acortarTexto((element['nombreLaboratorio'])?element['nombreLaboratorio']:"Sin laboratorio")}">${(element['nombreLaboratorio'])?element['nombreLaboratorio']:"Sin laboratorio"}</span></div>
          <div class="col-1"  style="display:none;"><span>${element['codBarra']}</span></div>
          <div class="col-1  d-none d-md-block" onclick="verSinPuntos(this)" ><span class="${acortarTexto((element['fechaVence'])?element['fechaVence']:"Sin vencimiento")}">${(element['fechaVence'])?element['fechaVence']:"Sin vencimiento"}</span></div>
          <div class="col-12"  style="display: flex;gap: 5px;">
          <span class="lapiz" onclick="abrirModalEdit(${element['articulo']})"><i style="color:#1976d2;" class="fas fa-pencil-alt"></i></span>
          <span class="vasurero" onclick="deleteProduct(${element['articulo']},this)"><i style="color:#d21919;" class="fas fa-trash-alt"></i></span>
          <span class="qr" onclick="abrirModalImprimirQr(${element['articulo']})">
            <i class="fas fa-qrcode"></i>
          </span>
          </div>
      </div>`
  
   
  });

  if(articulosStock.length==0){
    tablaArticulos=`
    <div class="row text-center mb-1" style="font-weight: bold;font-size: 150%;background:grey;display: flex;border-radius: 5px;box-shadow: 1px 1px 1px 1px gray;justify-content: space-around;color: #ffffff;padding: 1%;">
      Sin articulos
    </div>
    `
  }


  document.getElementById("articulosTabla").innerHTML=tablaArticulos
 }

 async function dibujarSelect(options) {
  let dibujarOptions=`<option disabled value="" selected>Establecimiento</option>
                      <option value="">Todos los articulos</option>`
  options.forEach(element => {
    
  
    dibujarOptions+=`
    <option value="${element.idEsta}">${element.nombreEsta}</option>
    `
  });
  /* SELECT DE TODOS LOS ESTABLECIMIENTOS */
  document.getElementById("establecimientos").innerHTML=dibujarOptions

  /* SELECT DEL MODAL AÃ‘ADIR NUEVO PRODUCTO *//* SELECT DEL MODAL AÃ‘ADIR NUEVO PRODUCTO */
  document.getElementById("newArticuloEnEstablecimiento").innerHTML=dibujarOptions
  /* REMUEVO LA OPCION TODOS LOS ARTICULOS */
  document.getElementById("newArticuloEnEstablecimiento").children[1].remove()

  

 }
 async function dibujarCategorias(categorias) {
  let dibujarCategorias=`<option value="" disabled selected>Categorias</option>`
  categorias.forEach(element => {
    
  
    dibujarCategorias+=`
    <option value="${element.idCategoria}">${element.nombreCategoria}</option>
    `
  });
  document.getElementById("categoriaNew").innerHTML=dibujarCategorias
 }

 /* async function traerPoductoGalpon(id) {
     cargando()
  let esta=JSON.parse(localStorage.getItem("user")).establecimiento
  await fetch('php/listarArticulos.php?id='+id+'&establecimiento='+esta)
  .then(response => response.json())
  .then(async (data)=>{
    console.log(data)
    await dibujarTabla(data)

    return allArticulosLimitado=data
  });
   
 } */

 /* //////////////////////////////////////////////////////////////////////////////////// */
 /* //////////////////////////////////////////////////////////////////////////////////// */
 document.getElementById("guardarEstablecimiento").addEventListener("click",()=>{
   let nombreEsta=document.getElementById("nombreEstablecimiento").value
   if(nombreEsta==""){
     console.log(nombreEsta)
     document.getElementById("nombreEstablecimiento").style.borderColor="red";
     document.getElementById("labelIdEstablecimineto").style.color="red";
     document.getElementById("errorEstablecimiento").classList.add("zoomIn")
     document.getElementById("errorEstablecimiento").style.display="block"
     $('#errorEstablecimiento').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ()=>{
       document.getElementById("errorEstablecimiento").classList.remove("zoomIn")
    });
   }else{
     fetch('php/addEstablecimiento.php?nEstablecimineto='+nombreEsta)
      .then(response => response.json())
      .then(async (data)=>{
        if(data=="perfecto"){
          listarArticulos().then(async()=>{
            await dibujarSelect(todosLosArticulosCategorias[2])
            vaciarEstablecimiento()
            $("#modalNewEstablecimiento").modal("hide")
          })
        }
      });
   }
 })
 document.getElementById("nombreEstablecimiento").addEventListener("click",()=>{
   if(document.getElementById("nombreEstablecimiento").style.borderColor=="red"){
      document.getElementById("nombreEstablecimiento").style.borderColor="";
      document.getElementById("labelIdEstablecimineto").style.color="";
      document.getElementById("errorEstablecimiento").classList.add("zoomOut")
      $('#errorEstablecimiento').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ()=>{
        document.getElementById("errorEstablecimiento").classList.remove("zoomOut")
        document.getElementById("errorEstablecimiento").style.display="none"
    });
  }
 })
  /* //////////////////////////////////////////////////////////////////////////////////// */
 /* //////////////////////////////////////////////////////////////////////////////////// */
 document.getElementById("form").addEventListener("submit",async(e)=>{
      e.preventDefault()
      cargando()
      let input22 = document.querySelector('#file');
      let image = input22.files[0];
      let formData = new FormData(document.getElementById("form"));
      formData.append('image', image);
      await fetch("php/addNewProduct.php", {
          method: 'POST',
          body: formData,
      }).then(respuesta => respuesta.json())
          .then(decodificado => {
            console.log(decodificado)
              if (decodificado=="perfecto") {
                $("#addnew").modal("hide")
               
                vaciarFormularioNew()
                listarArticulos().then(async()=>{
                  await dibujarTabla(allArticulosLimitado)
                })
              }
          });
    
  
 })

 async function guardarEditArticulo(id) {
  $("#articulo"+id).modal("hide")
  toastr.warning("Actualizando el articulo.")
    cargando()
   console.log(id)
   let articuloEditado = {
    articulo:id,
    nombreEdit:document.getElementById("nombreEdit"+id).value,
    costoEdit:document.getElementById("costoArticuloEdit"+id).value.replace(/,/g, ""),
    stockMinEdit:document.getElementById("stockminEdit"+id).value,
    cantidadEdit:document.getElementById("cantidadEdit"+id).value,
    descripcionEdit:document.getElementById("descripcionEdit"+id).value,
    categoriaEdit:document.getElementById("selectCategoriaEdit"+id).value,
    labor:document.getElementById("selectLaborEdit"+id).value,
    codBarraEdit:document.getElementById("codBarraEdit"+id).value,
    proveedor:document.getElementById("selectProve"+id).value,
    precioMayo:document.getElementById("precioMayo"+id).value.replace(/,/g, "")
  };

  let datosEnviar = new FormData();
  datosEnviar.append("articulo", JSON.stringify(articuloEditado));

  await fetch("php/editarArticulo.php?id=", {
    method: 'POST',
    body: datosEnviar,
    }).then(respuesta => respuesta.json())
        .then( async decodificado => {
          console.log(decodificado)
            if (decodificado=="perfecto") {
              
              editAddListarOK(id,articuloEditado)

            }
        });

  console.log(articuloEditado)
 }

 async function subirPorcentajeEnPrecios() {
   let porcentaje=document.getElementById("porcentaje").value
   if(porcentaje){
    await fetch("php/aumentarPrecio.php?porcentaje="+porcentaje)
          .then(async respuesta => {
                $("#modalPorcentaje").modal("hide")
                await listarArticulos()
                dibujarTabla(allArticulosLimitado)
            }
          );
    }else{
      document.getElementById("porcentaje").style.borderColor="red"
    }
 }
 document.getElementById("porcentaje").addEventListener("click",()=>{
  document.getElementById("porcentaje").style.borderColor=""
 })
/* MODAL DONDE CAMBIO EL TIPO DE FILTRO PARA PONER UN PORCENTAJE GENERAL O ESPECIFICO */
 document.getElementById("botonAvanzadoPorcentaje").addEventListener("click",()=>{
  document.getElementById("modalBody").classList.add("fadeOutRight")
  document.getElementById("exampleModalPreviewLabel").innerHTML="Aumentar precio por proveedor"
  /* oculto un boton y muestro el otro en el modal  */
  document.getElementById("porcentajeNormal").style.display="none"
  document.getElementById("porcentajePorProveedor").style.display="block"
  /* oculto un boton y muestro el otro en el modal  */
  $('#modalBody').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ()=>{
    document.getElementById("modalBody").classList.remove("fadeOutRight")
    document.getElementById("modalBody").style.display="none"
    document.getElementById("modalBody2").classList.add("fadeInRight")
    document.getElementById("modalBody2").style.display="block"
    
  });
 })
 /* MODAL DONDE CAMBIO EL TIPO DE FILTRO PARA PONER UN PORCENTAJE GENERAL O ESPECIFICO */
 document.getElementById("botonAvanzadoPorcentaje2").addEventListener("click",()=>{
  document.getElementById("exampleModalPreviewLabel").innerHTML="Aumentar precio general"
   document.getElementById("porcentajePorProveedor").style.display="none"
    document.getElementById("porcentajeNormal").style.display="block"
   document.getElementById("modalBody2").style.display="none"
   document.getElementById("modalBody").classList.add("fadeInRight")
   document.getElementById("modalBody").style.display="block"
   $('#modalBody').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ()=>{
    document.getElementById("modalBody").classList.remove("fadeOutRight")
    
  });
 })

 function vaciarFormularioNew() {
  document.getElementById("form").reset()
 }

 function vaciarEstablecimiento() {
  document.getElementById("nombreEstablecimiento").value=""
  console.log("vacioEsta")
 }

 async function subirPorcentajeEnPreciosLaboratorio() {
  let porcentaje=document.getElementById("porcentajeFiltroLaboratorio").value
  let laboratorio=document.getElementById("selectLaboratorioAumentar").value
  if(laboratorio&&porcentaje){
    await fetch("php/aumentarPrecioLaboratorio.php?porcentaje="+porcentaje+"&idLab="+laboratorio)
          .then(async respuesta => {
                console.log(respuesta)
                $("#modalPorcentajeLaboratorio").modal("hide")
                await listarArticulos()
                dibujarTabla(allArticulosLimitado)
             }
          );
  }else{
    if(!porcentaje){
      document.getElementById("porcentajeFiltroLaboratorio").style.borderColor="red"
    }
    if(!laboratorio){
      document.getElementById("selectLaboratorioAumentar").style.borderColor="red"
    }
  }
  
}
async function deleteProduct(id,e) {
  let a=confirm("Desea eleminar el producto?")
  console.log(a)
  if(a){
    await fetch('php/deleteProducto.php?id='+id)
    .then(response => response.json())
    .then(async(data)=>{ 
      if(data=="exito"){
        console.log(data)
        eliminarLocalhost(id)
        document.getElementById("totalProductos").innerHTML=allArticulosLimitado.length
          e.parentElement.parentElement.remove()
        }
      })
  }
    
}
function separator(numb) {
    
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}
function separatorthis(numb) {
   
    let numeroSinComas=numb.value.replace(/,/g, "");
    console.log(numeroSinComas)
    var str = numeroSinComas.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    numb.value=str.join(".");
}


function pesosGuarani(e){
   
    let cambio=e.parentElement.children[0].value.replace(/,/g, "")
    let peso=e.parentElement.children[1].value.replace(/,/g, "")
    let conversion=peso*cambio
    console.log("total: "+conversion)
    e.parentElement.children[2].value=separator(conversion)
}











function addNewProductFrom(id) {
    
    /* console.log((parseInt(id))) */
   
        let pro=allArticulosLimitado
    
        pro= pro.find((m) => parseInt(m.articulo) === parseInt(id));
        console.log("Es: " + pro);
    
        let tablaEscondida=document.getElementById("tablaEscondida").style.display="block"
        let tbody=document.getElementById("addProducto")
        let primerHijo=tbody.firstChild
        
        
        let proveedor=`<option value="">SIN PROVEDOR</option>`
      proveedores.forEach(element => {
        proveedor+=`
        <option ${(element.idProveedor==pro.idProveedor)?"selected":""} value="${element.idProveedor}">${element.nombreP}</option>
        `
      });
        
        
 









        let tr=document.createElement('tr')
        
        for (let index = 0; index <= 6; index++) {
            let td=document.createElement('td')
            
            
            let nombre=document.createTextNode(pro.nombre)
            if(index==0){
                /* let img=document.createElement('img')
                img.setAttribute("height", "80");
                img.setAttribute("width", "80")
                img.setAttribute("src", data.imagen.replace('../', ''))
                td.appendChild(img)
                tr.appendChild(td) */
            }else if(index==1){
                td.appendChild(nombre)
                tr.appendChild(td)
            }else if(index==2){
                /* CANTIDADDDDDDDDDDDDDDDDDDDDDDDDD */
                let inputCantidad=document.createElement('input')
                inputCantidad.className="form-control"
                inputCantidad.type="number"
                inputCantidad.step="0.01"
                inputCantidad.name="cantidad[]"
                td=document.createElement('td')
                td.style.display="none"
                td.appendChild(inputCantidad)
                tr.appendChild(td)
            }else if(index==3){
                /* COSTOOOOOOOOOOOOOOOOOOOOOO */
                let inputCosto=document.createElement('input')
                let inputFantasma=document.createElement('input')
                inputCosto.className="form-control"
                inputCosto.required=true
                inputCosto.type="number"
                inputCosto.step="0.01"
                inputCosto.name="costo[]"
                inputCosto.addEventListener("keyup",(e)=>{
                  sumaLocalIniciandoEnCosto(e.target)
                })
                inputCosto.value=pro.costo
                inputFantasma.value=pro.articulo
                inputFantasma.name="idArticulo[]"
                inputFantasma.style.display="none"
               
                let select=document.createElement('select')
                select.innerHTML=proveedor
                select.name="prove[]"
                select.classList.add("form-control")

                tr.style.position="relative"
                td=document.createElement('td')
                td.appendChild(inputFantasma)
                td.appendChild(inputCosto)
                td.appendChild(select)
                tr.appendChild(td)
                
            }else if(index==4){
              let diva=document.createElement("div")
              diva.className="input-group"
              let input2=document.createElement('input')
              input2.type = "text";
              input2.step="0.01"
              input2.style="text-align: center;"
              input2.name = "precioventa[]";
              input2.className = "form-control";
              input2.addEventListener("keyup",(e)=>{
                ponerPorcentajeMayorReversa(e.target)
              })
              
              let input=document.createElement('input')
                input.className="form-control"
                input.required=true
                input.name="meno[]"
                input.style.width="20%"
                input.type="number"
                input.step="0.01"
                input.style="text-align: center;"
                input.value=pro.menorCentaje
                input.addEventListener("keyup",(e)=>{
                  sumaLocalIniciandoEnPorcentaje(e.target)
                })
                


                td=document.createElement('td')
                tr.appendChild(td)
                diva.appendChild(input)
                let p=document.createElement("h3")
                p.innerHTML="$"
                diva.appendChild(p)
                diva.appendChild(input2)
                td.appendChild(diva)
                let divGanancia=document.createElement("div")
                divGanancia.className="md-form"
                let inputGanancia=document.createElement("input")
                inputGanancia.className="form-control"
                inputGanancia.disabled=true
                inputGanancia.step="0.01" 
                inputGanancia.id="meno"+pro.articulo
                let labelGanancia=document.createElement("label")
                labelGanancia.className="active"
                labelGanancia.innerHTML="Ganancia"

                divGanancia.appendChild(inputGanancia)
                divGanancia.appendChild(labelGanancia)
                td.appendChild(divGanancia)
                sumaLocalIniciandoEnPorcentaje(input)
              
            }else if(index==5){
             
           
            }else if(index==6){
              let boton=document.createElement('a')
              boton.className="btn btn-sm btn-primary borrar"
              boton.innerText="x"
              td.appendChild(boton)
              tr.appendChild(td)
          }

        }

        tbody.insertBefore(tr, primerHijo);
        
        let borrar=document.getElementsByClassName("borrar")

    
/* CAMBIAR ESTO POR UNA FUNCION CON THIS PARA ELIMINAR  */
        borrar.forEach(element => {
         
          element.addEventListener("click",(e)=>{
                console.log(e.target.parentNode.parentNode.parentNode)
                console.log(e.target.parentNode.parentNode)
                e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode)
                if (tbody.childElementCount==0) {
                    document.getElementById("tablaEscondida").style.display="none"
                }
            })
    });

   /*  sumarTodoTodito() */
    
  



    
       
    




  
}




function sumaLocalIniciandoEnPorcentaje(e) { 
  console.log(e.parentElement.parentElement.parentElement.children[2].children[1].value)
  let costo=parseFloat(e.parentElement.parentElement.parentElement.children[2].children[1].value)
  let porcentajeCapo=e.value
  /* let precioVenta=e.parentElement.parentElement.children[3].children[0].children[2].value */

  let precioVenta=((costo*parseFloat(porcentajeCapo))/100)+parseFloat(costo)
  /* PRECIO DE VENTA */
  e.parentElement.parentElement.parentElement.children[3].children[0].children[2].value=(isNaN(precioVenta))?0:Math.ceil(precioVenta/10)*10
  /* GANANCIA */
  e.parentElement.parentElement.parentElement.children[3].children[1].children[0].value=(isNaN((precioVenta-parseFloat(costo)).toFixed(2)))?0:((Math.ceil(precioVenta/10)*10)-parseFloat(costo)).toFixed(2)
  console.log("precio venta "+precioVenta)
}

function ponerPorcentajeMayorReversa(e){
  let precioMayor=parseFloat(e.value)
  let porcentaje=e.parentElement.parentElement.children[0].children[0]
  let costo=parseFloat(e.parentElement.parentElement.parentElement.children[2].children[1].value)
  let ganancia=e.parentElement.parentElement.children[1].children[0]
  /* console.log(precioMayor)
  console.log(porcentaje) */
  let ecuacion=(((precioMayor-costo)*100)/costo).toFixed(2)
  porcentaje.value=ecuacion
  ganancia.value=(isNaN((precioMayor-costo).toFixed(2)))?0:(precioMayor-costo).toFixed(2)
}
function sumaLocalIniciandoEnCosto(e) { 
  console.log(e.parentElement.parentElement.children[3].children[1].children[0])
  let costo=parseFloat(e.value)
  let porcentajeCapo=e.parentElement.parentElement.children[3].children[0].children[0].value
  /* let precioVenta=e.parentElement.parentElement.children[3].children[0].children[2].value */
 
  
  let precioVenta=((costo*parseFloat(porcentajeCapo))/100)+parseFloat(costo)
  /* PRECIO DE VENTA */
  e.parentElement.parentElement.children[3].children[0].children[2].value=(isNaN(precioVenta))?0:Math.ceil(precioVenta/10)*10
  /* GANANCIA */
  e.parentElement.parentElement.children[3].children[1].children[0].value=(isNaN((precioVenta-parseFloat(costo)).toFixed(2)))?0:((Math.ceil(precioVenta/10)*10)-parseFloat(costo)).toFixed(2)
  console.log("precio venta "+precioVenta)
}



function calcularDias(f) {
  if(f){
    let vencimiento = new Date(f);
    let fechaActual = new Date();
    let milisegundosDiferencia = vencimiento - fechaActual;
    let diasDiferencia = Math.floor(milisegundosDiferencia / (1000 * 60 * 60 * 24));
    console.log(diasDiferencia);
    return "Dias "+diasDiferencia
  }else{
    return ""
  }

  // Cambiar el estilo del campo según la cantidad de días restantes (similar al ejemplo anterior)
}

async function dibujarSelectFiltro(articulos) {
  let option=`<option value="" selected disabled >Seleccione un articulo</option>`
  articulos.forEach(element => {
    option+=`<option value="${element.articulo}">${element.nombre}</option>`
  });
  document.getElementById("selectSeachJs").innerHTML=option
}

async function eliminarLocalhost(id) {
  
/*  console.log(e) */
 
  // Encuentra el índice del artículo en el array
  const res = allArticulosLimitado.filter((m) => m.articulo != id);
  allArticulosLimitado=res
  toastr.success("Se elimino un articulo.")
  
   
  }
async function editAddListarOK(id,artiEdit) {
  // Encuentra el índice del artículo en el array
  let pro= proveedores.find((m) => parseInt(m.idProveedor) === parseInt(artiEdit.proveedor));
  let cat= categorias.find((m) => parseInt(m.idCategoria) === parseInt(artiEdit.categoriaEdit));
  let lal= allLaboratorios.find((m) => parseInt(m.idLaboratorio) === parseInt(artiEdit.labor));

  const res = allArticulosLimitado.findIndex((m) => m.articulo == id);
  allArticulosLimitado[res]={
    articulo: id,
    cantidad: artiEdit.cantidadEdit,
    categoria: (cat)?cat.idCategoria:"",
    codBarra: artiEdit.codBarraEdit,
    costo: artiEdit.costoEdit,
    descripcion: "",
    fechaVence: null,
    idProveedor: (pro)?pro.idProveedor:"",
    keyTwoLabor: (lal)?pro.idLaboratorio:"",
    mayoritario: artiEdit.precioMayo,
    menorCentaje: "26.76",
    nombre: artiEdit.nombreEdit,
    nombreCategoria: (cat)?cat.nombreCategoria:"",
    nombreLaboratorio: (lal)?lal.nombreLaboratorio:"",
    nombreP: (pro)?pro.nombreP:""
  }
  
  toastr.success("Articulo actualizado.")
    dibujarTabla(allArticulosLimitado)
  console.log(allArticulosLimitado);
  }
  
  function acortarTexto(texto) {
    if (texto.length > 6) {
        return "texto-acortado";
    } else {
        return "";
    }
}
  function acortarTextoMasLargo(texto) {
    if (texto.length > 10) {
        return "texto-acortado2";
    } else {
        return "";
    }
}

function verSinPuntos(elemento) {
  console.log(elemento.children[0])
  elemento.children[0].classList.remove("texto-acortado")
  setTimeout(() => {
    elemento.children[0].classList.add("texto-acortado")
  }, 3000);
}
function abrirModalImprimirQr(id) {
  $('#modalQR').modal("show")
  let qr = new QRious({
    element: document.getElementById('codigoQR'),
    value: 'https://xn--cristiannuez-jhb.com/sistema/vista.php?id='+id, // El enlace que quieres codificar
    size: 400 // El tama帽o en pixeles del c贸digo QR
  });
}
function imprimir(){
  let canvas = document.querySelector('#codigoQR');
let win = window.open('', 'Print', 'height=400,width=600');
win.document.write('<img src="' + canvas.src + '" onload="window.print();window.close()" style="display: block; margin: auto;" />');win.document.close();
}
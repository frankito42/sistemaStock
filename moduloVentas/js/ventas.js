let qrIntvalo
let elInput = document.getElementById('codigoDeBarra');
elInput.addEventListener('keypress', async (e) => {
    /* console.log(e.key) */
    if(e.key=="Enter"){
        await cargarProductoTablaVenta()
        elInput.value=""
    }
});
const loader = document.querySelector('.loader');

async function expandirDiv() {
    interesTarjeta(1,"Pago QR",4)
    document.getElementById("totalQR").innerHTML="$"+document.getElementById("segundoTotal").innerHTML
    let circulo = document.getElementById("circulo");
      circulo.style.display = "block";
      setTimeout(function() {
        circulo.classList.add("activo");
      }, 10);
   
  }
async function cerrarDiv() {
    clearInterval(qrIntvalo)
    let circulo = document.getElementById("circulo");
    circulo.classList.remove("activo");
    setTimeout(function() {
        circulo.style.display = "none";
    }, 800);
   
  }
async function cerrarDivPago() {
    let circulo = document.getElementById("circuloPago");
    circulo.classList.remove("activo");
    setTimeout(function() {
        circulo.style.display = "none";
    }, 800);
   
  }
async function expandirDivPago() {
    let circulo = document.getElementById("circuloPago");
      circulo.style.display = "block";
      setTimeout(function() {
        circulo.classList.add("activo");
      }, 10);
   
  }

  async function ponerQR() {
      let total=parseFloat((document.getElementById("segundoTotal").innerHTML).replace(/,/g, ""))
        const response = await fetch("php/mp.php?total="+total);
        const responseData = await response.text();
        console.log(responseData);

        if(responseData!="" && responseData!="error"){
            qrIntvalo=setInterval(async () => {
                const verif = await fetch("https://salvatoreminishop.com/notificaciones/notificaciones.php?verificar=verificar&pago="+responseData);
                const verifData = await verif.text();
                console.log(verifData);
                if(verifData=="pagado"){
                    $("#metodoDePago").modal("hide")
                    await guardarVenta("QR")
                    clearInterval(qrIntvalo)
                    cerrarDiv()
                    expandirDivPago()
                    setTimeout(() => {
                        cerrarDivPago()
                    }, 2000);
                }
            }, 1000);
        }else{
            alert("error")
        }

}


function showLoader() {
  loader.style.display = 'flex';
}

function hideLoader() {
  loader.style.display = 'none';
}



async function cargarProductoTablaVenta(codi,idPro,mayoriOminori) {
    let codigo
    if(codi){
        codigo=codi
    }else{
        codigo=document.getElementById('codigoDeBarra').value
    }

    let pro=JSON.parse(localStorage.getItem("productosModuloVentas"))

    pro= pro.find((m) => parseInt(m.articulo) === parseInt(idPro) || m.codBarra=== codigo);
   /*  console.log("Es: " + pro); */
    
    
    if(codigo){
      
            /* console.log(data) */

            if(pro===undefined){
                alert("El producto no existe.")
            }else{
                fila = document.createElement("tr");
                celda1 = document.createElement("td");
                celda2 = document.createElement("td");
                celda3 = document.createElement("td");
                celda4 = document.createElement("td");
                celda5 = document.createElement("td");
                input1 = document.createElement("input")
                input2 = document.createElement("input")
                input1.value=1
                input1.type="number"
                input1.style.width="71px"
                
                input1.addEventListener("change", async()=>{
                   await sumarTodo()
                })
                input1.addEventListener("keyup",async ()=>{
                   await sumarTodo()
                })
                let maOmi
               
                    maOmi=pro.mayoritario
                  
    
                input2.value=separator(maOmi)
                input2.type="text"
                input2.style.width="87px"
                input2.addEventListener("change",async ()=>{
                    this.value=separator(maOmi)
                   await sumarTodo()
                })
                input2.addEventListener("keyup",async ()=>{
                    this.value=separator(maOmi)
                   await sumarTodo()
                })
                input3=document.createElement("input")
                input3.type="number"
                input3.value=pro.articulo
                input3.style.display="none"
                textoCelda1 = document.createTextNode(`${pro.nombre}`);
                /* console.log(mayoriOminori) */

                
                
                celda1.appendChild(textoCelda1);
                celda2.appendChild(input1);
                celda2.appendChild(input3); 
                celda3.appendChild(input2);
                
                celda5.innerHTML=`<button onclick="deleteTdTable(this)" class="btn btn-danger btn-sm">x</button><input style="display:none;" type="text" />`
                
                fila.appendChild(celda1);
                fila.appendChild(celda2);
                fila.appendChild(celda3);
                fila.appendChild(celda4);
                fila.appendChild(celda5);
               /*  let tr=`
                <tr>
                    <td>${data[0].nombre}</td>
                    <td><input onkeyup="sumarTodo()" style="width: 71px;" onchange="sumarTodo()" type="number" value="1"><input style="display:none;" type="number" value="${data[0].articulo}"></td>
                    <td><input onkeyup="sumarTodo()" style="width: 83px;" onchange="sumarTodo()" type="number"  value="${data[0].precioVenta}"></td>
                    <td></td>
                    <td><button onclick="deleteTdTable(this)" class="btn btn-danger btn-sm">x</button></td>
                </tr>
                ` */
                document.getElementById("ProductosVender").insertBefore(fila,document.getElementById("ProductosVender").children[0])
                /* document.getElementById("ProductosVender").innerHTML+=tr */
    
                sumarTodo()

            }

     
        /* escondo el modal al hacer click en un boton */
        $("#mostarProductElegir").modal("hide")
    }else{
        abreModalPregunta()
    }
}

async function deleteTdTable(e) {
    e.parentNode.parentNode.remove()
    await sumarTodo()
    
}

async function sumarTodo() {
    let acumulador=0
    let no=true
    document.getElementById("ProductosVender").children.forEach(element => {
        /* console.log(parseFloat(element.children[1].children[0].value.replace(/,/g, "")))
        console.log(parseFloat((element.children[2].children[0].value.replace(/,/g, "")))) */
        let suma=parseFloat(element.children[1].children[0].value.replace(/,/g, ""))*parseFloat((element.children[2].children[0].value.replace(/,/g, "")))

        acumulador=acumulador+parseFloat(suma.toFixed(2))
        /* console.log(acumulador) */
        element.children[3].innerHTML=separator(suma.toFixed(2))
        document.getElementById("total").innerHTML=separator(acumulador.toFixed(2))
        document.getElementById("segundoTotal").innerHTML=separator(acumulador.toFixed(2))
        no=false
    });

    if(no){
        document.getElementById("total").innerHTML=0
        document.getElementById("segundoTotal").innerHTML=0
    }
}

async function guardarVenta(tipoPago) {
    $("#pregunta").modal("hide")
    if (document.getElementById("ProductosVender").children.length>0) {
        let venta=[]
        let ventas=[]
        document.getElementById("ProductosVender").children.forEach((element)=>{
            /* primero el id */
            /* console.log(element.children[0]) */
            venta.push(element.children[1].children[1].value.replace(/,/g, ""))
            venta.push(element.children[0].innerHTML.replace(/,/g, ""))
            venta.push(element.children[1].children[0].value.replace(/,/g, ""))
            venta.push(element.children[2].children[0].value.replace(/,/g, ""))
            /* venta[array()].push(element.children[2].children[0].value) */
            ventas.push(venta)
            venta=[]
        })
        console.log(ventas)
        let userEsta=localStorage.getItem("user")
        let productosVender = new FormData();
        productosVender.append("productos", JSON.stringify(ventas));
        productosVender.append("userEsta", userEsta);
        
        console.log(tipoPago)
        if (tipoPago==undefined) {
            console.log("undi")
            tipoPago="efectivo"
            productosVender.append("tipoPago", JSON.stringify(tipoPago));
        }else{
            productosVender.append("tipoPago", JSON.stringify(tipoPago));
        }

      
        await fetch("php/venderProducto.php", {
          method: 'POST',
          body: productosVender,
          }).then(respuesta => respuesta.json())
              .then(decodificado => {
                console.log(decodificado)
                  if (decodificado!="") {
                    document.getElementById("ProductosVender").innerHTML=""
                    sumarTodo()
                    /* alert("Venta finalizada.") */
                    toastr.success('venta', 'Venta exitosa.')
                    let deco=decodificado.split("-")
                    /* console.log(deco) */
                    deco[0]=parseFloat(deco[0])
                    deco[1]=parseFloat(deco[1])
                    let ver=JSON.parse(localStorage.getItem("miCajaUser"))
                    let miCaja = (ver !== null && ver !== undefined) ? ver : [];
                    let productosVen = [];
                    for (let pair of productosVender.entries()) {
                        productosVen.push({
                            name: pair[0],
                            value: pair[1]
                        });
                        
                    }
                    /* para saber cual subir y cual no */
                    productosVen.push("subido")
                    
                 
                    deco.push(productosVen)
                    console.log(productosVen)
                    miCaja.push(deco)
                    localStorage.setItem("miCajaUser",JSON.stringify(miCaja))
                    cargarCaja()
                    
                    /* $("#exito").modal("show") */
                    document.getElementById('codigoDeBarra').focus()
                  }
              }).catch(()=>{
                    document.getElementById("ProductosVender").innerHTML=""
                    sumarTodo()
                    toastr.success('venta', 'Venta exitosa OFFLINE.')
                    console.log(localStorage.getItem("ultimaVentaOffLine"))
                    let ver=JSON.parse(localStorage.getItem("miCajaUser"))
                    let miCaja = (ver !== null && ver !== undefined) ? ver : [];
                    let productosVen = [];
                    let deco=[]
                    let sum=0
                    for (let pair of productosVender.entries()) {
                        productosVen.push({
                            name: pair[0],
                            value: pair[1]
                        });
                    }
                    console.log(JSON.parse(productosVen[0].value))
                    JSON.parse(productosVen[0].value).forEach(element => {
                        sum+=parseFloat(element[2])*parseFloat(element[3])
                    });
                    console.log(sum)
                    deco.push(parseInt(localStorage.getItem("ultimaVentaOffLine")))
                    deco.push(sum)
                    deco.push(tipoPago)
                   
                    
                    /* para saber cual subir y cual no */
                    productosVen.push("offline")
                    deco.push(productosVen)
                    miCaja.push(deco)
                    localStorage.setItem("miCajaUser",JSON.stringify(miCaja))
                    cargarCaja()
                    document.getElementById('codigoDeBarra').focus()
                    localStorage.setItem("ultimaVentaOffLine",parseInt(localStorage.getItem("ultimaVentaOffLine"))+1)
                });


    }else{
        console.log("error")
    }
}


document.getElementById("btnGuardarVenta").addEventListener("click",abreModalPregunta)
document.getElementById("imprimeTicket").addEventListener("click",async ()=>{
    await guardarVenta("efectivo")
})
document.getElementById("cobro").addEventListener("keyup",()=>{
    let totalDescont=parseFloat((document.getElementById("totalDescont").innerHTML).replace(/,/g, ""))
    let cobro=parseFloat(document.getElementById("cobro").value)
    /* console.log(totalDescont)
    console.log(cobro) */
    let vuelto=cobro-totalDescont
    document.getElementById("vuelto").innerHTML="Vuelto $"+vuelto
})



function abreModalPregunta() {
    /* console.log(document.getElementById("ProductosVender").children.length) */
    if (document.getElementById("ProductosVender").children.length>0){
       /*  $("#pregunta").modal("show") */
        metodoPago()
        document.getElementById("totalDescont").innerHTML=document.getElementById("total").innerHTML
    }else{
    
        toastr.error('Cargue productos antes de continuar')
        document.getElementById('codigoDeBarra').focus()
    }
}

async function listarTodosLosProductos() {
    let esta=JSON.parse(localStorage.getItem("user")).establecimiento
    /* console.log(esta) */
    await fetch("php/listarProductos.php?idEsta="+esta)
    .then(respuesta => respuesta.json())
    .then(data => {
        localStorage.setItem("productosModuloVentas",JSON.stringify(data))
             /*  console.log(data)  */
              let elementos=``
              data.forEach(element => {
                  elementos+=`
                  <tr class="hoverProduct" onclick="cargarProductoTablaVenta('${(element.codBarra)?element.codBarra:'no'}',${element.articulo},'mayo')">
                    <td>${element.nombre}</td>
                    <td style="display:none;">$${separator(element.precioVenta)} <button class="btn btn-blue btn-sm" onclick="cargarProductoTablaVenta('${(element.codBarra)?element.codBarra:'no'}',${element.articulo})"><i class="fas fa-plus fa-1x"></i></button></td>
                    <td>$${separator(element.mayoritario)}</td>
                  </tr>
                  `
              });
              document.getElementById("aquiMostrarTodo").innerHTML=elementos
    });
}

let integrantes

$(document).ready(async function(){
    
    await maxTicket()
    showLoader();
    cargarCaja()
    await listarTodosLosProductos().then(()=>{
         hideLoader();
    })
    await traerClientes()
    $("#filtroProductos").keyup(function(){
    _this = this;
    // Show only matching TR, hide rest of them
    $.each($("#mytable tbody tr"), function() {
    if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
    $(this).hide();
    else
    $(this).show();
    });
    });
   });
 function separator(numb) {
    /* console.log(numb) */
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}
function separatorthis(numb) {
    /* console.log(numb.value) */
    let numeroSinComas=numb.value.replace(/,/g, "");
    /* console.log(numeroSinComas) */
    var str = numeroSinComas.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    numb.value=str.join(".");
}

document.addEventListener("keyup", function(event) {
    /*  console.log(event.key)
     console.log(event.target.id) */
     if (event.key === "Enter" && event.target.id!="codigoDeBarra" && event.target.id!="cobro" && event.target.id!="imprimeTicket" && event.target.id!="pregunta" && event.target.id!="libreta") {
         console.log("entro aqui")
         
         $("#mostarProductElegir").modal("hide")
         abreModalPregunta()
     }
 });
 document.getElementById("pregunta").addEventListener("keyup", async function(event) {
    if (event.key === "Enter") {
        console.log("cobrado")
        await guardarVenta()
    }
});



 document.getElementById("abrirModalBuscarProductoBtn").addEventListener("click", function(event) {
     $("#mostarProductElegir").modal("show")
});

async function metodoPago() {
    $("#metodoDePago").modal("show")
}
document.getElementById("metodoDePago").addEventListener("keyup", async function(event) {
    console.log(event.key)
    if (event.key === "1") {
        $("#metodoDePago").modal("hide")
        $("#pregunta").modal("show")
    }else if(event.key === "2"){
        document.getElementById("totalLibreta").innerHTML=document.getElementById("total").innerHTML
        $("#metodoDePago").modal("hide")
        $("#libreta").modal("show")
        
    }else if(event.key === "3"){
        guardarVenta("MP/Tarjeta etc") 
        $("#metodoDePago").modal("hide")
        
    }else if(event.key === "4"){
        
        await expandirDiv()
        await ponerQR()
    }
});
async function traerClientes() {
    await fetch('php/listarIntegrantes.php')
  .then((response) => response.json())
  .then(async (data) => {
    console.log(data)
    await dibujarIntegrantes(data)
    integrantes=data
});
}
async function dibujarIntegrantes(params) {
    option=`<option selected value="" disabled>Selecciona un cliente</option>`
    params.forEach(element => {
        option+=`<option value="${element.idIntegrante}">${element.nombre}</option>`
    });
    document.getElementById("listarIntegrantes").innerHTML=option
}






document.getElementById("addLibretaIntegranteProducto").addEventListener("submit", async function(event) {
    event.preventDefault()
    await guardarVentaEnLibreta()
});



async function guardarVentaEnLibreta() {
    $("#libreta").modal("hide")
    if (document.getElementById("ProductosVender").children.length>0) {
        let venta=[]
        let ventas=[]
        document.getElementById("ProductosVender").children.forEach((element)=>{
            /* primero el id */
            /* console.log(element.children[0]) */
            venta.push(element.children[1].children[1].value.replace(/,/g, ""))
            venta.push(element.children[0].innerHTML.replace(/,/g, ""))
            venta.push(element.children[1].children[0].value.replace(/,/g, ""))
            venta.push(element.children[2].children[0].value.replace(/,/g, ""))
            venta.push(document.getElementById("listarIntegrantes").value)
            /* venta[array()].push(element.children[2].children[0].value) */
            ventas.push(venta)
            venta=[]
        })
       /*  console.log(ventas) */
       let filtroArray= integrantes.find((m) => parseInt(m.idIntegrante) === parseInt(document.getElementById("listarIntegrantes").value));
       console.log(filtroArray);

       let productosVender = new FormData();
       productosVender.append("productos", JSON.stringify(ventas));
       productosVender.append("familia", filtroArray.idFamilia);
      
        await fetch("php/venderEnLibreta.php", {
          method: 'POST',
          body: productosVender,
          }).then(respuesta => respuesta.json())
              .then(decodificado => {
                console.log(decodificado)
                  if (decodificado=="perfecto") {
                    document.getElementById("ProductosVender").innerHTML=""
                    sumarTodo()
                    /* let deco=decodificado.split("-")
                    let ver=JSON.parse(localStorage.getItem("miCajaUser"))
                    let miCaja = (ver !== null && ver !== undefined) ? ver : [];
                    miCaja.push(deco)
                    localStorage.setItem("miCajaUser",JSON.stringify(miCaja))
                    cargarCaja() */
                    /* alert("Venta finalizada.") */
                    toastr.success('Libreta', 'se agrego a la libreta del cliente.')
                    
                    /* $("#exito").modal("show") */
                    document.getElementById('codigoDeBarra').focus()
                  }
              }).catch(()=>{
                toastr.error("Sin conexion. Error")
              });


    }else{
        console.log("error")
    }
}


$('#libreta').on('shown.bs.modal', function (e) {
    document.getElementById("listarIntegrantes").focus()
  })

  /* document.getElementById("listarIntegrantes").addEventListener("change", async function(event) {
     
        console.log("cobrado")
        await guardarVentaEnLibreta()
    
}); */

function imprimirElemento(){
   /*  var ficha = ticketVenta;
    var ventimp = window.open(' ', 'popimpr');
    ventimp.document.write( ficha.innerHTML );
    ventimp.document.close();
    ventimp.print( );
    ventimp.close(); */
    let div=document.createElement("div")
    $(div).load('../moduloTicket/index.php',function(){
        var printContent = div
        var WinPrint = window.open('', '', 'width=900,height=650');
        WinPrint.document.write(printContent.innerHTML);
        WinPrint.document.close();
        WinPrint.focus();
       setTimeout(() => {
    WinPrint.print();
    WinPrint.close();
}, 1000);
    });

  }
  
  
  document.getElementById("printFacturaX").addEventListener("click",()=>{
      imprimirElemento()
  })
  
  
  
  document.getElementById("montoExtra").addEventListener("click",()=>{
   
   let nombreExtra=prompt("Ingrese un nombre para un producto")
    if(nombreExtra){
        
        
   
        
        
                    fila = document.createElement("tr");
                    celda1 = document.createElement("td");
                    celda2 = document.createElement("td");
                    celda3 = document.createElement("td");
                    celda4 = document.createElement("td");
                    celda5 = document.createElement("td");
                    input1 = document.createElement("input")
                    input2 = document.createElement("input")
                    input1.value=1
                    input1.type="number"
                    input1.style.width="71px"
                    
                    input1.addEventListener("change", async()=>{
                       await sumarTodo()
                    })
                    input1.addEventListener("keyup",async ()=>{
                       await sumarTodo()
                    })
                    let maOmi=0
                   
                        
                      
        
                    input2.value=separator(maOmi)
                    input2.type="number"
                    input2.style.width="87px"
                    input2.addEventListener("change",async ()=>{
                        this.value=separator(maOmi)
                       await sumarTodo()
                    })
                    input2.addEventListener("keyup",async ()=>{
                        this.value=separator(maOmi)
                       await sumarTodo()
                    })
                    input3=document.createElement("input")
                    input3.type="number"
                    input3.value=0
                    input3.style.display="none"
                    textoCelda1 = document.createTextNode(nombreExtra);
                    /* console.log(mayoriOminori) */
    
                    
                    
                    celda1.appendChild(textoCelda1);
                    celda2.appendChild(input1);
                    celda2.appendChild(input3); 
                    celda3.appendChild(input2);
                    
                    celda5.innerHTML=`<button onclick="deleteTdTable(this)" class="btn btn-danger btn-sm">x</button>`
                    
                    fila.appendChild(celda1);
                    fila.appendChild(celda2);
                    fila.appendChild(celda3);
                    fila.appendChild(celda4);
                    fila.appendChild(celda5);
                   /*  let tr=`
                    <tr>
                        <td>${data[0].nombre}</td>
                        <td><input onkeyup="sumarTodo()" style="width: 71px;" onchange="sumarTodo()" type="number" value="1"><input style="display:none;" type="number" value="${data[0].articulo}"></td>
                        <td><input onkeyup="sumarTodo()" style="width: 83px;" onchange="sumarTodo()" type="number"  value="${data[0].precioVenta}"></td>
                        <td></td>
                        <td><button onclick="deleteTdTable(this)" class="btn btn-danger btn-sm">x</button></td>
                    </tr>
                    ` */
                    document.getElementById("ProductosVender").appendChild(fila)
                    /* document.getElementById("ProductosVender").innerHTML+=tr */
        
                    sumarTodo()
                    input2.focus()
    
            
    
        
    }
   
   
       

    
})
        
    async function numeroClick(a) {
    console.log(a)
    if (a === "1") {
        $("#metodoDePago").modal("hide")
        $("#pregunta").modal("show")
    }else if(a === "2"){
        document.getElementById("totalLibreta").innerHTML=document.getElementById("total").innerHTML
        $("#metodoDePago").modal("hide")
        $("#libreta").modal("show")
        
    }else if(a === "3"){
        guardarVenta("MP/Tarjeta etc") 
        /* toastr.success('MP/Ttarjeta etc.', 'Venta exitosa') */
       /*  document.getElementById("totalLibreta").innerHTML=document.getElementById("total").innerHTML */
        $("#metodoDePago").modal("hide")
       /*  $("#libreta").modal("show") */
        
    }else if(a === "4"){
        
        await expandirDiv()
        await ponerQR()
    }
};

async function cargarCaja(){
    let ver=JSON.parse(localStorage.getItem("miCajaUser"))
    let miCaja = (ver !== null && ver !== undefined) ? ver : [];
    let lista=``
    let sumaF=0
    let sumaM=0
    let sumaOFFLINE=0
    miCaja.forEach(elemento => {
        /* console.log(elemento) */
        if (elemento[2]=="efectivo") {
            sumaF+=parseFloat(elemento[1])
            style=`
            border-radius: 5px;
            color: #0bec03;`
            icon=`<i class="fas fa-money-bill-alt"></i>`
        }else if(elemento[2]=="QR"){
            sumaM+=parseFloat(elemento[1])
            style=`
            border-radius: 5px;
            color: #1571b7;`
            icon=`<i class="fa-solid fa-qrcode"></i>`
        }else{
            sumaM+=parseFloat(elemento[1])
            style=`
            border-radius: 5px;
            color: #1571b7;`
            icon=`<i class="fas fa-credit-card"></i>`
        }
        

        elemento[3].forEach(element => {
            if(element=="offline"){
                enVivo=`<i style="color:grey;" class="fa-solid fa-wifi"></i><i style="color:red;" class="fa-solid fa-exclamation"></i>`
                sumaOFFLINE+=1
            }else{
                enVivo=""
            }
        });




        lista+=`
                <div style="margin: 1%;" id="subir${elemento[0]}" onclick="subir(${elemento[0]})" class="row">
                        <div style="padding: 1%;background: #f3f3f3;border-radius: 5px;" class="hoverCaja col-12 text-center">
                            <div style="display: flex;justify-content: space-between;">
                                <h4><span>Nro#${elemento[0]} ${formatAmount(elemento[1])}</span></h4>
                                <h4 style="${style}">${icon}${enVivo}</h4>
                            </div>
                            <div style="width: 100%;height: 2px;background: #00a824;display:none;" id="progress${elemento[0]}"></div>
                        </div>
                </div>
                `
    });
    document.getElementById("totalVEntasModalCaja").innerHTML=miCaja.length
    document.getElementById("totalVEntasModalCajaOffLine").innerHTML=sumaOFFLINE
    document.getElementById("cajaVenta").innerHTML=`
        <div class="row">
            <div class="col-12 text-center">
                <h2 style="background: #0bec03;border-radius: 5px;color: white;text-shadow: 1px 1px black;">Efectivo ${formatAmount(sumaF)}</h2>
                <h2 style="background: #1873b8;border-radius: 5px;color: white;text-shadow: 1px 1px black;">Mercado pago ${formatAmount(sumaM)}</h2>
                <h2 style="background: #0bec03;border-radius: 5px;color: white;text-shadow: 1px 1px black;">Total ${formatAmount(sumaF+sumaM)}</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-12 text-center">
                <h6 style="background: #00a824;border-radius: 5px;color: #ffffff;text-shadow: 0 0 1px black;">Mis ventas</h6>
            </div>
        </div>`
        
        if(miCaja.length<1){
            lista=`
            <div class="row">
            <div class="col-12 text-center">
                <h4 style="background: #e6e6e6;border-radius: 5px;">Realiza una venta.</h4>
            </div>
        </div>`
        }
    document.getElementById("cajaVenta").innerHTML+=`<div style="overflow-y: auto;height: 66% !important">${lista}</div>`
    
}

async function maxTicket() {
    let ultimaVentaOffLine = localStorage.getItem("ultimaVentaOffLine");
  
    if (ultimaVentaOffLine) {
      // Usa el valor almacenado en localStorage
      console.log(ultimaVentaOffLine);
    } else {
      localStorage.setItem("ultimaVentaOffLine", 1);
    }
  }

async function subir(id) {
    let div = document.querySelector("#subir"+id);
    let progress = document.querySelector("#progress"+id);

    let ver=JSON.parse(localStorage.getItem("miCajaUser"))
    let result = ver.find(array => array.includes(id));
    // Cambia el valor en el array
    let index = ver.indexOf(result);
    console.log(result)
    if (result && result[3][3]=="offline") {
      console.log("Se encontró el id en el array:", result);

        
        /* console.log(index)
        console.log(ver)
        console.log(ver[index][3])
        console.log(ver) */
    

    // Guarda el array modificado en localStorage
        



      let formData = new FormData();

      ver[index][3].forEach(item => {
        formData.append(item.name, item.value);
    });
    /* formData.append("idVenta", parseInt(result[0])-1); */

         // Muestra la barra de progreso
    progress.style.display = "block";
  
    // Realiza el fetch
    /* console.log(result[3]) */
    let resul
    await fetch("php/venderProducto.php",{
        method:"POST",
        body:formData,
    })
      .then(async response => {
          // Obtiene el tamaño total de los datos a recibir
          
        // Clona la respuesta para poder consumir el cuerpo dos veces
        let clonedResponse = response.clone();

        // Obtiene el resultado en formato JSON
        resul = await clonedResponse.json();

          
        let totalSize = response.headers.get("Content-Length");
  
        // Crea un reader para leer los datos en chunks
        let reader = response.body.getReader();
        let bytesReceived = 0;
        /* console.log("SUBIDOOOOOO") */
    /*     console.log("SUBIDOOOOOO") */
        // Lee los datos en chunks y actualiza la barra de progreso
        
        
        await reader.read().then(async function processChunk({ done, value }) {
          if (done) {

            let deco=resul.split("-")
            console.log(deco)
            ver[index][0]=parseFloat(deco[0])
            ver[index][1]=parseFloat(deco[1])


           /*  console.log(ver[index][0]) */


            console.log(ver[index][3][3])
            
            ver[index][3][3]="subido"
            // Se completó el fetch, oculta la barra de progreso
            localStorage.setItem("miCajaUser", JSON.stringify(ver));
            progress.style.display = "none";
            cargarCaja()
            toastr.success('Subido correctamente.', 'Venta guardada.')

            /* localStorage.setItem("ultimaVentaOffLine",parseInt(localStorage.getItem("ultimaVentaOffLine"))+1) */
            return;
          }
  
          // Actualiza la barra de progreso
          bytesReceived += value.length;
          progress.value = bytesReceived / totalSize;
  
          // Continúa leyendo los datos en chunks
          
          
          return reader.read().then(processChunk);
        });
      }).catch(()=>{
            progress.style.display = "none";
            toastr.error('Lo sentimos hubo un error. Intente nuevamente o revise su conexión.', 'ERROR!')
      });







    } else {
      console.log("No se encontró el id en ningún array.");



      toastr.warning('Esta venta ya esta en la nube!')









    }

   
  }


  function formatAmount(amount) {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 }).format(amount);
  }

  /* muestro el icono de que esta sin internet */
  var img = document.getElementById('noWifi');

  img.addEventListener('animationend', function() {
      if (img.classList.contains('disappear')) {
          img.classList.remove('disappear');
          img.style.display = 'none';
      }
  });
  
  window.addEventListener('offline', function() {
      img.style.display = 'block';
      toastr.success('MODO OFFLINE ACTIVADO', 'EXITO')
  });
  
  window.addEventListener('online', function() {
      img.classList.add('disappear');
      toastr.success('MODO ONLINE ACTIVADO', 'EXITO')
  });


  document.getElementById("subirOfflinesAll").addEventListener("click",async ()=>{
    await subirTodosLosOffLine()
  })


  async function subirTodosLosOffLine() {
    let ver = JSON.parse(localStorage.getItem("miCajaUser"));
    let miCaja = (ver !== null && ver !== undefined) ? ver : [];
    console.log(miCaja);
    let contador=0
    for (let i = 0; i < miCaja.length; i++) {
        let element = miCaja[i];
        console.log(element[3][3]);
        if (element[3][3] == "offline") {
            contador+=1
            await subir(element[0]);
        }
    }
    if (contador==0) {
        toastr.error("No hay ventas OFFLINE")
    }
}






 





document.getElementById("extraPorciento5").addEventListener("click",
interesTarjeta)

async function interesTarjeta(e=1,tituloxdddd="Tarjeta",porcentajeInteres=8){
    let numeroTotalMasInteres=document.getElementById("segundoTotal").innerHTML.replace(/,/g, "")
    
    numeroTotalMasInteres=(porcentajeInteres*parseFloat(numeroTotalMasInteres))/100
    console.log(numeroTotalMasInteres)


    fila = document.createElement("tr");
    celda1 = document.createElement("td");
    celda2 = document.createElement("td");
    celda3 = document.createElement("td");
    celda4 = document.createElement("td");
    celda5 = document.createElement("td");
    input1 = document.createElement("input")
    input2 = document.createElement("input")
    input1.value=1
    input1.type="number"
    input1.style.width="71px"
    
    input1.addEventListener("change", async()=>{
       await sumarTodo()
    })
    input1.addEventListener("keyup",async ()=>{
       await sumarTodo()
    })
    let maOmi=0
   
        
      

    input2.value=redondearDecena(separator(numeroTotalMasInteres.toFixed(0)))
    input2.type="number"
    input2.style.width="87px"
    input2.addEventListener("change",async ()=>{
        this.value=redondearDecena(separator(numeroTotalMasInteres.toFixed(0)))
       await sumarTodo()
    })
    input2.addEventListener("keyup",async ()=>{
        this.value=redondearDecena(separator(numeroTotalMasInteres.toFixed(0)))
       await sumarTodo()
    })
    input3=document.createElement("input")
    input3.type="number"
    input3.value=0
    input3.style.display="none"
    textoCelda1 = document.createTextNode(tituloxdddd);
     console.log(tituloxdddd) 

    
    
    celda1.appendChild(textoCelda1);
    celda2.appendChild(input1);
    celda2.appendChild(input3); 
    celda3.appendChild(input2);
    
    celda5.innerHTML=`<button onclick="deleteTdTable(this)" class="btn btn-danger btn-sm">x</button>`
    
    fila.appendChild(celda1);
    fila.appendChild(celda2);
    fila.appendChild(celda3);
    fila.appendChild(celda4);
    fila.appendChild(celda5);
   /*  let tr=`
    <tr>
        <td>${data[0].nombre}</td>
        <td><input onkeyup="sumarTodo()" style="width: 71px;" onchange="sumarTodo()" type="number" value="1"><input style="display:none;" type="number" value="${data[0].articulo}"></td>
        <td><input onkeyup="sumarTodo()" style="width: 83px;" onchange="sumarTodo()" type="number"  value="${data[0].precioVenta}"></td>
        <td></td>
        <td><button onclick="deleteTdTable(this)" class="btn btn-danger btn-sm">x</button></td>
    </tr>
    ` */
    document.getElementById("ProductosVender").appendChild(fila)
    /* document.getElementById("ProductosVender").innerHTML+=tr */

    sumarTodo()
    input2.focus()






}



function redondearDecena(numero) {
    return Math.ceil(numero / 10) * 10;
}





















  

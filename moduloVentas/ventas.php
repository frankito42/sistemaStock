<?php 
session_start();
$local="";
require "../conn/conn.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../mdb/css/bootstrap.min.css">
    <link rel="stylesheet" href="../mdb/css/mdb.min.css">
    <link rel="stylesheet" href="../mdb/css/all.min.css">
    <link rel="stylesheet" href="lib/toastr.min.css">
    <title>Inicio</title>
        <style>
        /* Estilo para el modal */
.modal.right .modal-dialog {
    position: fixed;
    right: 0;
    margin: auto;
    width: 400px;
    height: 100%;
    -webkit-transform: translate3d(0%, 0, 0);
    -ms-transform: translate3d(0%, 0, 0);
    transform: translate3d(0%, 0, 0);
}

/* Estilo para la transici贸n del modal */
.modal.right .modal-content {
    height: 100%;
    /* overflow-y: auto; */
}

/* Estilo para el bot贸n de cierre del modal */
.modal.right .modal-header .close {
    margin-top: 0;
}

.hoverProduct{
  cursor: pointer;
}
.hoverProduct:hover{
    background: #2db6e8;
    color: white;
}
#circulo {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 700px;
      height: 700px;
      background-color: blue;
      border-radius: 100%;
      display:none;
      opacity: 0;
      z-index: 9999;
      transition: all 0.5s ease-in-out;
    }
    #circulo.activo {
      width: 150%;
      height: 150%;
      opacity: 1;
    }
    #texto {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 300%;
      text-align: center;
      background: #0000d6;
      padding: 1%;
      border-radius: 10px;
    }
#circuloPago {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 700px;
      height: 700px;
      background-color: #3fbb3f;
      border-radius: 100%;
      display:none;
      opacity: 0;
      z-index: 9999;
      transition: all 0.5s ease-in-out;
    }
    #circuloPago.activo {
      width: 150%;
      height: 150%;
      opacity: 1;
    }
    #textoPago {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 300%;
      text-align: center;
      background: #2f9d2f;
      padding: 1%;
      border-radius: 77px;
    }

    </style>
</head>
<body>
  <div id="circulo">
    <div id="texto">
      <i class="fa-solid fa-qrcode"></i>
      <span>Esperando pago...</span>
      <br>
      <span>Total <span id="totalQR"></span></span>
      <br>
      <button onclick="cerrarDiv()" class="btn btn-blue" style="text-align: center;border-radius: 5px;border: 0px;">Cancelar</button>
    </div>
  </div>
  <div id="circuloPago">
    <div id="textoPago">
      <i class="fa-solid fa-qrcode"></i>
      <span>Pago Exitoso!</span>
    </div>
  </div>
    <section>
        <nav class="mb-1 navbar navbar-expand-lg navbar-dark info-color">
        <a class="navbar-brand" href="#"><?php echo $local["nombre"]?></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-4" aria-controls="navbarSupportedContent-4" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent-4">
            <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <a class="nav-link waves-effect waves-light" href="../index.php">inicio
                <span class="sr-only">(current)</span>
                </a>
            </li>
            <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle waves-effect waves-light" id="navbarDropdownMenuLink-5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Productos
                  </a>
                  <div class="dropdown-menu dropdown-default" aria-labelledby="navbarDropdownMenuLink-5">
                  <a class="dropdown-item waves-effect waves-light" href="../moduloStock/stock.php">Stock</a>
                  <a class="dropdown-item waves-effect waves-light" href="../moduloCategorias/categorias.php">Categorias</a>
                  <!-- <a class="dropdown-item waves-effect waves-light" href="#">Something else here</a> -->
                  </div>
              </li>
            <li class="nav-item">
                <a class="nav-link waves-effect waves-light" href="../moduloCompras/compras.php">Compras</a>
            </li>
            <li class="nav-item active">
                <a class="nav-link waves-effect waves-light" href="ventas.php">Ventas</a>
            </li>
            <li class="nav-item">
                <a class="nav-link waves-effect waves-light" href="../moduloLibreta/libreta.php">Libreta</a>
              </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle waves-effect waves-light" id="navbarDropdownMenuLink-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Admin
                </a>
                <div class="dropdown-menu dropdown-default" aria-labelledby="navbarDropdownMenuLink-3">
                  <a class="dropdown-item waves-effect waves-light" href="../moduloProvedor/provedor.php">Proveedores</a>
                  <a class="dropdown-item waves-effect waves-light" href="../moduloClientes/clientes.php">Clientes</a>
<!--                 <a class="dropdown-item waves-effect waves-light" href="../moduloLaboratorios/laboratorios.php">Laboratorios</a>
 -->                <a class="dropdown-item waves-effect waves-light" href="../moduloVentasDetalle/todasLasVentas.php">Caja</a>
                </div>
            </li>
            </ul>
            <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link waves-effect waves-light" href="#">
                <i class="fas fa-envelope"></i> Contacto
                <span class="sr-only">(current)</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link waves-effect waves-light" href="#">
                <i class="fas fa-gear"></i> Configuraciones</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle waves-effect waves-light" id="navbarDropdownMenuLink-4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-user"></i> <span id="userNameID"></span> </a>
                <div class="dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbarDropdownMenuLink-4">
                <a class="dropdown-item waves-effect waves-light" href="#">My account</a>
                <a class="dropdown-item waves-effect waves-light" id="cerrarSession">Cerrar sesion</a>
                </div>
            </li>
            </ul>
        </div>
        </nav>
    </section>
    <section>
        <div class="container">
            <div class="row">
                <div class="col-sm-3">
                    <button class="btn btn-blue" id="abrirModalBuscarProductoBtn">Buscar por nombre</button>
                </div>
                <div class="col-sm-3">
                    
                    
                    <!-- Basic dropdown -->
                    <button class="btn btn-cyan dropdown-toggle mr-4" type="button" data-toggle="dropdown"
                      aria-haspopup="true" aria-expanded="false">Opciones</button>
                    
                    <div class="dropdown-menu">
                      <a class="dropdown-item" id="montoExtra" href="#">Monto extra</a>
                      <a class="dropdown-item" id="extraPorciento5" href="#">Tarjeta</a>
                    </div>
 
                </div>
                <div style="background: #00ff89;border-radius: 5px;padding: 0.5%;box-shadow: 0px 0px 20px 3px #00000014;" class="col-sm-6 text-center">
                    <h2 style="color:white;text-shadow: 1px 1px 1px darkslategrey;">$<span id="segundoTotal" style="color: white;text-shadow: 1px 1px 1px darkslategrey;">0</span></h2>
                </div>
            </div>
            
            <br>
            <div class="row">
                    <div class="col-8">
                        <div class="md-form md-outline input-with-pre-icon">
                        <!-- <i class="fas fa-envelope  input-prefix"></i> -->
                        <i class="fas fa-barcode input-prefix"></i>
                        <input autofocus style="font-size: 125%;" type="number" id="codigoDeBarra" class="form-control">
                        <label for="codigoDeBarra">Codigo de barra</label>
                        </div> 
                    </div>
                    <div class="col">
                        <button id="btnEscanear" class="btn btn-blue btn-sm"><i class="fas fa-camera fa-3x"></i></button>  
                    </div>
            </div>
            
            <div class="table-responsive">
                <table class="table table-sm table-hover">
                    <thead>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>subTotal</th>
                        <th></th>
                    </thead>
                    <tbody id="ProductosVender"> 
                        
                    </tbody>
                    <tfoot>
                        <td colspan="3">TOTAL $$$$$$</td>
                        <td id="total">0</td>
                        <td></td>
                    </tfoot>
                </table>
            </div> 
            <button id="btnGuardarVenta" class="btn btn-blue">Cobrar</button>
          
        </div>
    </section>
    
    <section>
    <!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
 <!-- Central Modal Medium Success -->
 <div class="modal fade" id="pregunta" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
   aria-hidden="true">
   <div class="modal-dialog modal-notify modal-success" role="document">
     <!--Content-->
     <div class="modal-content">
       <!--Header-->
       <div class="modal-header">
         <p class="heading lead">Desea terminar la operacion?</p>

         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
           <span aria-hidden="true" class="white-text">&times;</span>
         </button>
       </div>
       <!--Body-->
       <div class="modal-body text-center">
        <div class="row">
          <div class="col">
            <h2>Total $<span id="totalDescont"></span></h2>
            <div class="md-form form-group">
                      <input style="text-align: center;font-size: 200%;" type="text" id="cobro" class="form-control validate">
                      <label style="font-size: 200%;" for="cobro" class="">Monto</label>
              </div>
            <h2 id="vuelto"></h2>
          </div>
        </div>
         
         <!-- <div class="text-center">
           <i class="fas fa-check fa-4x mb-3 animated rotateIn"></i>
      
         </div> -->
       </div>

       <!--Footer-->
       <div class="modal-footer">
         <a type="button" class="btn btn-success waves-effect" data-dismiss="modal">Cerrar</a>
         <button class="btn btn-success waves-effect" id="imprimeTicket">Cobrar</button>
       </div>
     </div>
     <!--/.Content-->
   </div>
 </div>
 <!-- Central Modal Medium Success-->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->


<div class="modal fade" id="mostarProductElegir" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable" role="document">
    <div class="modal-content">
      <div style="background: #2db6e8;color: white;" class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel" style="background: #01d4ff;
    padding: 1%;
    border-radius: 5px;">Productos</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div id="eligeProductoNombre" class="modal-body">
                 <div style="margin: -2%;" class="md-form form-group">
                    <i class="fa fa-search prefix"></i>
                    <input type="text" id="filtroProductos" class="form-control validate">
                    <label for="filtroProductos" >Nombre del producto</label>
                </div>
                <table id="mytable" class="table table-sm">
                    <thead style="background: #2db6e8;color: #005776;">
                        <tr> 
                        <th style="font-weight: bold;" scope="col">Nombre</th>
<!--                         <th scope="col">Precio en pesos</th> -->
                        <th style="font-weight: bold;" scope="col">Precio</th>
                        </tr>
                    </thead>
                    <tbody id="aquiMostrarTodo">
                        
                    </tbody>
                    </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<div class="modal fade" id="metodoDePago" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
   aria-hidden="true">
   <div class="modal-dialog modal-notify modal-info" role="document">
     <!--Content-->
     <div class="modal-content">
       <!--Header-->
       <div class="modal-header">
         <p style="background: #01d4ff;
    padding: 1%;
    border-radius: 5px;" class="heading lead">Seleccionar el metodo de pago</p>

         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
           <span aria-hidden="true" class="white-text">&times;</span>
         </button>
       </div>
       <!--Body-->
       <div class="modal-body">
        
              <div  class="row text-center">
                <div onclick="numeroClick('1')" style="display:relative;" class="col-6">
                  <h4 class="waves-effect waves-ligh" style="background-image: linear-gradient(to left bottom, #0ebe08, #10c110, #03ab07, #33c339, #12eb21);color: white;border-radius: 5px;padding: 10%;box-shadow: 0px 0px 20px 0px #00000078;">Efectivo</h4>
                  <div class="waves-effect waves-ligh" style="background-image: linear-gradient(to left bottom, #0ebe08, #10c110, #03ab07, #33c339, #12eb21);box-shadow: 0px 0px 3px 0px #00000078;border-radius: 5px;color: white;">Nro 1</div>
                </div>
                <div onclick="numeroClick('2')" style="display:relative;" class="col-6 mb-4">
                  <h4 class="waves-effect waves-ligh aqua-gradient" style="color: white;border-radius: 5px;padding: 10%;box-shadow: 0px 0px 20px 0px #00000078;">Libreta</h4>
                  <div class="waves-effect waves-ligh aqua-gradient" style="box-shadow: 0px 0px 3px 0px #00000078;border-radius: 5px;color: white;">Nro 2</div>
                </div>
                <div onclick="numeroClick('3')" style="display:relative;" class="col-6">
                  <h4 class="waves-effect waves-ligh blue-gradient" style="background: #33cce5;color: white;border-radius: 5px;padding: 10%;box-shadow: 0px 0px 20px 0px #00000078;">MP/Tarjeta etc.</h4>
                  <div class="waves-effect waves-ligh blue-gradient" style="background: #33cce5;box-shadow: 0px 0px 3px 0px #00000078;border-radius: 5px;color: white;">Nro 3</div>
                </div>
                <div onclick="numeroClick('4')" style="display:relative;" class="col-6">
                  <h4 class="waves-effect waves-ligh blue-gradient" style="background: #33cce5;color: white;border-radius: 5px;padding: 10%;box-shadow: 0px 0px 20px 0px #00000078;"><i class="fa-solid fa-qrcode"></i></h4>
                  <div class="waves-effect waves-ligh blue-gradient" style="background: #33cce5;box-shadow: 0px 0px 3px 0px #00000078;border-radius: 5px;color: white;">Nro 4</div>
                </div>
              </div>
        
       </div>

       <!--Footer-->
       <!-- <div class="modal-footer">
         <a type="button" class="btn btn-success waves-effect" data-dismiss="modal">Cerrar</a>
         <button class="btn btn-success waves-effect" >Cobrar</button>
       </div> -->
     </div>
     <!--/.Content-->
   </div>
 </div>
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->









<div class="modal fade" id="libreta" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
   aria-hidden="true">
   <div class="modal-dialog modal-notify modal-success" role="document">
     <!--Content-->
     <div class="modal-content">
       <!--Header-->
       <form id="addLibretaIntegranteProducto">
       <div class="modal-header">
         <p style="background: #4ed584;
    padding: 1%;
    border-radius: 5px;" class="heading lead">Seleccionar el cliente</p>

         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
           <span aria-hidden="true" class="white-text">&times;</span>
         </button>
       </div>
       <!--Body-->
       <div class="modal-body">
        
            <div class="row">
              <div class="col text-center">
                <h3>Total $<span id="totalLibreta">Cargando...</span></h3>
              </div>
            </div>
            <div class="row">
              <div class="col text-center">
                <select required id="listarIntegrantes" name="idDeInteGra" class="browser-default custom-select">
                </select>
              </div>
            </div>
        
       </div>

       <!--Footer-->
       <div class="modal-footer">
         <a type="button" class="btn btn-success waves-effect" data-dismiss="modal">Cerrar</a>
         <button id="addLibretaBtnInte" class="btn btn-success waves-effect" >Agregar a su libreta</button>
         </form>
       </div>
     </div>
     <!--/.Content-->
   </div>
 </div>





<div class="loader">
  <div class="spinner"></div>
</div>


<div style="position: fixed;bottom: 1%;right: 1%;">
    <button id="printFacturaX" class="btn" style="background:#19c9d2e3;"><i class="fa-solid fa-file-invoice-dollar fa-2x"></i></button>
    
 <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#MiCajaOnline">
  Ver Mi Caja
</button>
    
    </div>





<style>
    .loader {
  position: fixed;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #ffffff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes shrink {
    from { width: 100%; }
    to { width: 5%; }
}

@keyframes disappear {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(-100%); opacity: 0; }
}

#noWifi {
    animation-name: shrink;
    animation-duration: 3s;
}

#noWifi.disappear {
    animation-name: disappear;
    animation-duration: 2s;
}


</style>

<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// --> 
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
<!-- ////////////////////////////////////MODAL MODAL MODAL MODAL//////////////////////////////// -->
    </section> 
     
     
   <!-- 
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('sw.js')
            .then(function(registration) {
              console.log('Service Worker registrado con éxito:', registration);
            })
            .catch(function(error) {
              console.log('Error al registrar el Service Worker:', error);
            });
        }
    -->
   <script> 
    
    if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('sw.js')
            .then(function(registration) {
              console.log('Service Worker registrado con éxito:', registration);
            })
            .catch(function(error) {
              console.log('Error al registrar el Service Worker:', error);
            });
        }
   
    </script>
    







  <img id="noWifi" style="display:none;position: fixed;bottom: 1%;left: 1%;width: 5%;" src="no-wifi.png">  
</body>









<!-- Modal -->
<div class="modal fade right" id="MiCajaOnline" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div style="background: #33b5e5;color: white;" class="modal-header">
        <h5 class="modal-title" style="    background: #01d4ff;border-radius: 5px;padding: 1%;" id="exampleModalLabel">Mi Caja</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div style="height: 0% !important" class="modal-body" id="cajaVenta">

      </div>
      <div style="display: flex;justify-content: space-around;">
        <button type="button" class="btn btn-blue btn-sm">Total Ventas <span id="totalVEntasModalCaja"></span></button>
        <button type="button" class="btn btn-danger btn-sm" id="subirOfflinesAll">offLine <span id="totalVEntasModalCajaOffLine"></span></button>
        <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Minimizar</button>
      </div>
    </div>
  </div>
</div>













<script src="../mdb/js/jquery.min.js"></script>
<script src="../mdb/js/popper.min.js"></script>
<script src="../mdb/js/bootstrap.min.js"></script>
<script src="../mdb/js/mdb.min.js"></script>
<script src="../mdb/js/all.min.js"></script>
<script src="lib/toastr.min.js"></script>
<script src="../localstorage/localstorage.js"></script>
<script src="js/ventas.js"></script>
<script src="script.js"></script>

<style>
  .hoverCaja:hover{
  background:#bbbbbb !important;
}
</style>
</html>
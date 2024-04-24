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
    <link rel="stylesheet" href="../lib/toastr.min.css">
    <title>Inicio</title>
</head>
<body>
    <style>
        .texto-acortado {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    display: inline-block;
}
        .lapiz{
           
            
            border-radius: 5px;
            display: flex;
            align-items: center;
            height: 100%;
            width: 50%;
            justify-content: center;

        }
        .lapiz:hover{
            background: #5fafff;
            cursor: pointer;
        }
        .vasurero{
           
            
            border-radius: 5px;
            display: flex;
            align-items: center;
            height: 100%;
            width: 50%;
            justify-content: center;

        }
        .vasurero:hover{
            background: #ff5f5f;
            cursor: pointer;
        }
        .qr{
           
            color: #565555;
            border-radius: 5px;
            display: flex;
            align-items: center;
            height: 100%;
            width: 50%;
            justify-content: center;

        }
        .qr:hover{
            background: #43ac93;
            cursor: pointer;
            color: black;
        }
    </style>
    <section>
        <?php require "../navBar/navCarpeta.php";?>
    </section>
    
    <section>
        <div class="container">
            <div class="row">
                <div style="display: flex;justify-content: center;align-items: center;" class="col">
                
                    <!-- Basic dropdown -->
                    <button class="btn btn-blue btn-sm btn-block" type="button" data-toggle="modal" data-target="#addnew">Nuevo producto</button>
                    
                </div>
                
                
                    <div style="display: flex;justify-content: center;align-items: center;" class="col-sm">
                        <!-- Basic dropdown -->
                    <button class="btn btn-blue btn-sm btn-block dropdown-toggle mr-4" type="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">Actualizar</button>
                    
                    <div class="dropdown-menu">
                    <a class="dropdown-item" data-toggle="modal" data-target="#addEntradaProducto">Actualizar precios</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" data-toggle="modal" data-target="#modalPorcentaje">Actualizar precios general</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" data-toggle="modal" data-target="#modalPorcentajeLaboratorio">Actualizar por categoria</a>
                    </div>
                    <!-- Basic dropdown -->
                    </div>

                
               
        </div>
        <div class="d-flex" style="justify-content: space-between;align-items: center;">
            
            <div>
                <button id="prev" class="btn btn-sm btn-brown">prev</button>
                <button id="next" class="btn btn-sm btn-brown">next</button>
            </div>
            <div>
                    <div style="margin: 0;" class="md-form form-group">
                        <i class="fa fa-search prefix"></i>
                        <input style="margin-bottom: 0.5rem;" type="text" id="filtroProductos" class="mt-1 form-control validate">
                        <label for="filtroProductos" >Nombre del producto</label>
                    </div>
                </div>

        </div>
        <div style="margin-bottom: 10%;" class="row">
            <div class="col-12 mb-1">
                <div class="row" style="background: #1976d2;display: flex;border-radius: 5px;box-shadow: 1px 1px 1px 1px #025db7;justify-content: space-around;color: white;padding: 1%;">
                    <div class="col-1"><span>Imagen</span></div>
                    <div class="col-4 text-center"><span>Nombre</span></div>
                    <div class="col-1"><span>Costo</span></div>
                    <div class="col-1"><span>Venta</span></div>
                    <div class="col-1"><span>Stock</span></div>
                    <div class="col-1 d-none d-md-block"><span>Proveedor</span></div>
                    <div class="col-1 d-none d-md-block"><span>Laboratorio</span></div>
                    <div class="col-1" style="display:none;"><span>Cod</span></div>
                    <div class="col-1  d-none d-md-block"><span>Vence</span></div>
                </div>
            </div>
            <div id="articulosTabla" class="col-12">
               
            </div>
        </div>







        </div>
    </section>
    <section>
    <!-- ///////////////////////////MODALES MODALES MODALES/////////////////////////////////// -->
    <!-- ///////////////////////////////////////////////////////////////////////////////////// -->
    <!-- Agregar Nuevo -->
<div class="modal fade" id="addnew" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form action="" id="form" method="post">
            <div style="background:#33b5e5;" class="modal-header text-white">
            	<h4 class="modal-title heading lead" style="background: #01d4ff;
    padding: 1%;
    border-radius: 5px;" id="myModalLabel">Agregar producto</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span style="color: white;" aria-hidden="true">&times;</span>
		      </button>
                
            </div>
            <div style="padding-top: 0px;" class="modal-body">
			<div class="container-fluid">
				<div class="row">
					<div class="col">

						<div class="md-form">
  							<input required type="text" id="newNombreA" name="newNombreA" class="form-control">
  							<label for="newNombreA">Nombre del articulo</label>
						</div>
					</div>
					<div style="margin-top: 6%;display:none;" class="col">
						
								<select id="newArticuloEnEstablecimiento" name="newArticuloEnEstablecimiento" class="form-control">
								</select>	
								
							
						
					</div>
				</div>
               <!--  <div class="row">
                    <div style="display:none;" class="col">
                    <div class="md-form">
  						<input required type="number" id="stockMinA" name="stockMinA" class="form-control">
  						<label for="stockMinA">Stock minino</label>
					</div>

                    </div>
           
                </div>
					 -->

				
					<!-- <div class="md-form">
  						<input type="number" id="cantidad" name="cantidad" class="form-control">
  						<label for="cantidad">Cantidad</label>
					</div> -->

                <div class="row">
                    <div class="col">
                        
					<div class="md-form">
  						<textarea id="descripcionNewA" name="descripcionNewA" class="md-textarea form-control" rows="2"></textarea>
  						<label for="descripcionNewA">Descripcion</label>
					</div>
                    </div>
                </div>


				<div class="row form-group">
					<div class="col">
                            <div class="md-form">
                              <input type="text" id="costoArticulo" onkeyup="separatorthis(this)" value="" name="costoArticulo" class="form-control">
                              <label for="costoArticulo" class="active">Costo <span style="font-size:70%;">(Opcional)</span></label>
                            </div>
                          </div>
                          <div style="display:none;" class="col">
                            <div class="md-form">
                              <input type="text" id="precioArticulo" onkeyup="separatorthis(this)" value="" name="precioArticulo" class="form-control">
                              <label for="precioArticulo" class="active">Peso</label>
                            </div>
                          </div>
                          <div class="col">
                            <div class="md-form">
                              <input type="text" id="precioArticulo2" onkeyup="separatorthis(this)" value="" name="precioArticulo2" class="form-control">
                              <label for="precioArticulo2" class="active">Precio de venta <span style="font-size:70%;">(Opcional)</span></label>
                            </div>
                          </div>
				</div>
				
				<div class="row">
				<div class="col">
			
                <select id="categoriaNew" name="categoriaNew" required autofocus class="mdb-select md-form" searchable="Buscar">
				</select>
				</div>
                <!-- ////////////////////////////////////////////////// -->
                <!-- ////////////////////////////////////////////////// -->
				<div class="col">
                <select id="laboratoriosSearch" name="laboratoriosSearch" autofocus class="mdb-select md-form" searchable="Buscar">
                </select>
				</div>
                <!-- ////////////////////////////////////////////////// -->
                <!-- ////////////////////////////////////////////////// -->
				</div>
                    <div class="row">
                        <div class="col">
                            <div class="md-form">
                                <input type="text" id="codBarraNew" name="codBarraNew" class="form-control">
                                <label id="labelCodBarra" for="codBarraNew">Codigo de barra</label>
                            </div>
                        </div>
                        <div class="col">
                        <a id="btnEscanear" class="btn btn-blue btn-lg"><i class="fa fa-camera"></i> <i class="fas fa-barcode"></i></a>
                        </div>
                    </div>
                    <div class="row">
                        <input type="file" name="file" id="file">
                    </div>
            </div> 
            <!-- /////////////////////////////ERROR ERROR//////////////////////////////////////////// -->
            <p id="erroAddNewProducto" class="animated" style="text-align:center;color:red;display: none;">Rellenar los campos vacios.</p>
            <!-- /////////////////////////////ERROR ERROR//////////////////////////////////////////// -->
			</div>

            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal"><span class="fa fa-close"></span> Cancelar</button>
                <button name="add" type="submit" id="guardarNewProducto" class="btn btn-primary"><span class="fa fa-save"></span> Guardar</a>
            </div>
        </form>

        </div>
    </div>
</div>
    <!-- ///////////////////////////////////////////////////////////////////////////////////// -->
    <!-- ///////////////////////////////////////////////////////////////////////////////////// -->
    <div class="modal fade" id="modalNewEstablecimiento" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
   aria-hidden="true">
   <div class="modal-dialog modal-notify" role="document">
     <!--Content-->
     <div class="modal-content">
       <!--Header-->
       <div style="background: #a160b6e6;" class="modal-header">
         <p class="heading lead">Añadir nuevo establecimiento </p>

         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
           <span aria-hidden="true" class="white-text">&times;</span>
         </button>
       </div>

       <!--Body-->
       <div class="modal-body">
        <div class="md-form">
            <input type="text" name="nombreEstablecimiento" id="nombreEstablecimiento" class="form-control">
        <label id="labelIdEstablecimineto" for="nombreEstablecimiento">Nombre del establecimiento</label>
        </div>
        <p id="errorEstablecimiento" class="animated" style="color:red;display: none;">Ingrese el nombre del establecimiento.</p>
       </div>

       <!--Footer-->
       <div class="modal-footer">
         <a type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</a>
         <button id="guardarEstablecimiento" class="btn btn-success">Guardar</button>
       </div>
     </div>
     
     <!--/.Content-->
   </div>
 </div>
    <!-- ///////////////////////////////////////////////////////////////////////////////////// -->
    <!-- ///////////////////////////////////////////////////////////////////////////////////// -->
    <!-- Modal -->
    <div class="modal fade right" id="modalPorcentaje" tabindex="-1" role="dialog" aria-labelledby="exampleModalPreviewLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content text-white">
                <div style="background: #aa66cc;" class="modal-header">
                    <h5 class="modal-title" id="exampleModalPreviewLabel">Aumentar precio general</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                    <div id="modalBody" style="background: white;" class="modal-body animated">
                        <div style="text-align: right;margin:0px;" class="md-form">
                            <button id="botonAvanzadoPorcentaje" class="btn btn-success">Por provedor</button>
                        </div>
                        <div class="md-form">
                            <input type="number" id="porcentaje" class="form-control validate">
                            <label for="porcentaje">Porcentaje</label>
                        </div>
                    </div>
                    <div id="modalBody2" style="background: white;display:none;" class="modal-body animated">
                        <div style="text-align: right;margin:0px;" class="md-form">
                            <button id="botonAvanzadoPorcentaje2" class="btn btn-blue">Porcentaje general</button>
                        </div>
                        <div class="md-form">
                            <select name="" class="form-control" id="selectProvedorAumentar">
                            <option value="">Seleccionar proovedor</option>
                            </select>
                        </div>
                        <div class="md-form">
                            <input type="number" id="porcentajeFiltro" class="form-control validate">
                            <label for="porcentajeFiltro">Porcentaje</label>
                        </div>
                    </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button type="button" id="porcentajeNormal" onclick="subirPorcentajeEnPrecios()" class="btn btn-primary">guardar</button>
                    <button type="button" id="porcentajePorProveedor" style="display:none;" onclick="subirPorcentajeEnPreciosProveedor()" class="btn btn-primary">guardar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <!-- Modal -->
    <div class="modal fade right" id="modalPorcentajeLaboratorio" tabindex="-1" role="dialog" aria-labelledby="exampleModalPreviewLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content text-white">
                <div style="background: #ea5aaa;" class="modal-header">
                    <h5 class="modal-title" id="exampleModalPreviewLabel">Aumentar precio por categoria</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                    <div style="background: white;" class="modal-body animated">
                        <div class="md-form">
                            <select name="" class="form-control" id="selectLaboratorioAumentar">
                            <option value="">Seleccionar Laboratorio</option>
                            </select>
                        </div>
                        <div class="md-form">
                            <input type="number" id="porcentajeFiltroLaboratorio" class="form-control validate">
                            <label for="porcentajeFiltroLaboratorio">Porcentaje</label>
                        </div>
                    </div>
                <div class="modal-footer">
                    <button type="button" style="background:#ea5aaa !important;" class="btn btn-blue" data-dismiss="modal">Cerrar</button>
                    <button type="button" id="porcentajeNormal" onclick="subirPorcentajeEnPreciosLaboratorio()" class="btn btn-primary">guardar</button>                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <!-- ///////////////////////////////////////////////////////////////////////////////////// -->
    <!-- ///////////////////////////////////////////////////////////////////////////////////// -->
    </section>

    <h4 style="position: fixed;bottom: 0.5%;background: #33b5e5;color: white;border-radius: 5px;padding: 1%;left: 0.5%;box-shadow: 0px 0px 13px 0px #00000085;" class="text-center">Total productos<br><span id="totalProductos">Cargando...</span></h4>
</body>
<style>
li:hover{
    background:#33b5e5ab;
    color:white;
    border-radius: 8px;
}
.select-dropdown{
    position: absolute;
    top: 24px;
    left: 0px;
    background: white;
    z-index: 1;
    box-shadow: 0 11px 20px black;
    position: initial;
    list-style-type: none; 
    padding: 3%;
    max-height: 300px !important;
    overflow-y: scroll;/*le pones scroll*/
}
.initialized{
  display:none;
}
.caret{
  display:none;
}
input[type="text"]{
    text-transform:capitalize;
}
</style>





<div class="modal fade right" id="addEntradaProducto" tabindex="-1" role="dialog" aria-labelledby="exampleModalPreviewLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div style="background: #33b5e5;" class="modal-header">
        <h5 style="background: #01d4ff;
    padding: 1%;
    border-radius: 5px;" class="modal-title text-white" id="exampleModalPreviewLabel">Actualizador de precios</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div style="padding:0px;" class="modal-body">
     <div style="padding:2%;padding-bottom: 0px;" class="row">

<div class="col-6">
            <form id="codActForm">
                <div class="md-form">
                  <input type="text" id="codigoBAc" class="form-control">
                  <label for="codigoBAc">Codigo de barra</label>
                </div>
            </form>
        </div>

    
   
      <div class="col-6">
      <div class="md-form text-center">


 
          <select autofocus onchange="addNewProductFrom(this.value)" id="selectSeachJs" class="mdb-select md-form" searchable="Buscar">
        
        
          </select>



      </div>
      </div>
        

        <form action="php/newFactu.php" method="POST">


        <!-- Shopping Cart table -->
        <div class="table-responsive">
        <table id="tablaEscondida" style="display:none;" class="table table-hover">
        <thead style="background:#00b8ffa3;">
        <!-- <th>imagen</th> -->
        <th>Nombre</th>
        <th style="display:none">Cantidad</th>
        <th>Costo</th>
        <th>Porcentaje / precio de venta</th> 
        <!-- <th>Venta por mayor</th> -->
        <th></th>
        </thead>
        <tbody id="addProducto">
        </tbody>
        </table>
        </div>
    
      </div>
      <div style="position:relative;" class="modal-footer">



        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Guardar</button>
</form>
       
      </div>
    </div>
  </div>
</div>

</div>
<!-- Modal -->


<!-- //////////////////////////////////////// -->
<!-- //////////////////////////////////////// -->
<!-- //////////////////////////////////////// -->
<!-- //////////////////////////////////////// -->
<!-- //////////////////////////////////////// -->
<!-- //////////////////////////////////////// -->
<!-- //////////////////////////////////////// -->
<div class="modal fade" id="modalQR" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div style="background: #ad4c4c;" class="modal-header">
        <h5 style="background: #872f2f;padding: 1%;border-radius: 5px;color: white;font-weight: bold;" class="modal-title" id="exampleModalLabel">Imprimir QR</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row">
            <div style="display: flex;text-align: center;justify-content: center;" class="col">
                <img style="padding: 5%;border-radius: 5px;box-shadow: 0px 0px 10px 0px #00000036;" alt="C贸digo QR" id="codigoQR">
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button id="printtxd" onclick="imprimir()" type="button" class="btn btn-primary">Imprimir</button>
      </div>
    </div>
  </div>
</div>
<!-- //////////////////////////////////////// -->
<!-- //////////////////////////////////////// -->
<!-- //////////////////////////////////////// -->
<!-- //////////////////////////////////////// -->
<!-- //////////////////////////////////////// -->
<!-- //////////////////////////////////////// -->
<!-- //////////////////////////////////////// -->
<!-- //////////////////////////////////////// -->









 



<script src="../mdb/js/jquery.min.js"></script>
<script src="../mdb/js/popper.min.js"></script>
<script src="../mdb/js/bootstrap.min.js"></script>
<script src="../mdb/js/mdb.min.js"></script>
<script src="../mdb/js/all.min.js"></script>
<script src="../lib/toastr.min.js"></script>
<script src="https://unpkg.com/qrious@4.0.2/dist/qrious.js"></script>
<script src="js/stock.js?pinocho=pinocho"></script>
<script src="js/script.js?pinocho=pinocho"></script>
<script src="../localstorage/localstorage.js?pocnho=pocnho"></script>
</html> 
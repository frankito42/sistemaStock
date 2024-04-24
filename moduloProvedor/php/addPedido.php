<?php
require "../../conn/conn.php";
$articuloId=$_POST['articulo'];
$cantidad=$_POST['cantidad'];
$idProveedor=$_POST['proveedorList'];
//HAGO EL INSERT DEL PEDIDO
$sqlInsertPedido="INSERT INTO `pedidoproveedor`(`fechaHora`, `idProveedor`) VALUES 
(NOW(),:idP)";
$pedido=$conn->prepare($sqlInsertPedido);
$pedido->bindParam(":idP",$idProveedor);



if($pedido->execute()){
    $pedidoId=$conn->lastInsertId();
    foreach ($articuloId as $key=>$value) {
        
        $insertArticuloPedido="INSERT INTO `pedidos`(`idPedidoProveedor`, `idArticulo`, `cantidad`) VALUES 
        (:idPedidoProveedor,:arti,:c)";
        $articuloPedido=$conn->prepare($insertArticuloPedido);
        $articuloPedido->bindParam(":idPedidoProveedor",$pedidoId);
        $articuloPedido->bindParam(":arti",$articuloId[$key]);
        $articuloPedido->bindParam(":c",$cantidad[$key]);

        $articuloPedido->execute();
    }



    echo json_encode("exito");

}else{
    echo json_encode("ERROR! intentelo nuevamente");
}






/* $sqlAddProveedor="INSERT INTO `proveedores`(`nombreP`, `direccionP`, `telefonoP`, `informacionExtra`) 
                        VALUES (:nombre,:direccionP,:telefonoP,:informacionExtra)";
$addProveedor=$conn->prepare($sqlAddProveedor);
$addProveedor->bindParam(":nombre",$proveedor->nombre);
$addProveedor->bindParam(":direccionP",$proveedor->direccion);
$addProveedor->bindParam(":telefonoP",$proveedor->telefono);
$addProveedor->bindParam(":informacionExtra",$proveedor->informacionExtra);

if($addProveedor->execute()){
    echo json_encode("perfecto");
} */



?>
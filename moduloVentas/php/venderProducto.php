<?php
session_start();
require "../../conn/conn.php";
$productos=json_decode($_POST['productos']);
$userEsta=json_decode($_POST['userEsta']);

$_SESSION['imprimir']=$productos;
$total=0;
$tipoPago=json_decode($_POST['tipoPago']);
$pre=0;
foreach ($productos as $key) {
    $pre=($key[4])?$key[3]-(($key[4]*$key[3])/100):$key[3];
    $total+=$key[2]*$pre;
    $cantidad=$key[2];
    $sqlTraerArticulo="UPDATE `articulos` SET `cantidad`=cantidad-:canti WHERE `articulo`=:id";
    $producto=$conn->prepare($sqlTraerArticulo);
    $producto->bindParam(":canti",$cantidad);
    $producto->bindParam(":id",$key[0]);
    $producto->execute();
}
$fecha=date("Y-m-d");
$addNewVenta="INSERT INTO `ventas`(`fechaV`, `totalV`, `idUser`,idEstablecimiento,tipoPago) VALUES (:fecha,:total,:idUser,:idEsta,:tipoPago)";
$addVenta=$conn->prepare($addNewVenta);

$addVenta->bindParam(":fecha",$fecha);
$addVenta->bindParam(":total",$total);
$addVenta->bindParam(":idUser",$userEsta->id);
$addVenta->bindParam(":idEsta",$userEsta->establecimiento);
$addVenta->bindParam(":tipoPago",$tipoPago);
$addVenta->execute();

$idVenta=$conn->lastInsertId();


foreach ($productos as $key) {
    $sqlInsetDetailVenta="INSERT INTO `detalleventa`(`idV`, `nombreProducto`, `cantidadV`, `precio`, `fecha`,idArticulo)
                        VALUES (:idVenta,:nombre,:cantidadV,:precio,:fecha,:idArticulo)";
    $insertDetailVenta=$conn->prepare($sqlInsetDetailVenta);
    $insertDetailVenta->bindParam(":idVenta",$idVenta);
    $insertDetailVenta->bindParam(":nombre",$key[1]);
    $insertDetailVenta->bindParam(":cantidadV",$key[2]);
    $pre=($key[4])?$key[3]-(($key[4]*$key[3])/100):$key[3];
    $insertDetailVenta->bindParam(":precio",$pre);
    $insertDetailVenta->bindParam(":fecha",$fecha);
    $insertDetailVenta->bindParam(":idArticulo",$key[0]);
    $insertDetailVenta->execute();
}

/* require "../../moduloTicket/index.php"; */
echo json_encode($idVenta."-".$total."-".$tipoPago);
?>
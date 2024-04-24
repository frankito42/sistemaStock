<?php 
require "../conn/connAdmin.php";

$sql="SELECT a.costo,p.`idP`, p.`idPedidoProveedor`, p.`idArticulo`, a.nombre,p.`cantidad`,a.mayoritario,a.menorCentaje FROM `pedidos` as p 
join articulos as a on a.articulo=p.idArticulo
WHERE idPedidoProveedor=$_GET[id]";
$pedidos=$conn->prepare($sql);
$pedidos->execute();
$pedidos=$pedidos->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($pedidos);


?>
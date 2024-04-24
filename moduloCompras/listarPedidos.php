<?php 
require "../conn/connAdmin.php";

$sql="SELECT pp.`idPedido`, pp.`fechaHora`,p.nombreP FROM `pedidoproveedor` pp
JOIN proveedores as p on p.idProveedor=pp.idProveedor";
$pedidos=$conn->prepare($sql);
$pedidos->execute();
$pedidos=$pedidos->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($pedidos);


?>
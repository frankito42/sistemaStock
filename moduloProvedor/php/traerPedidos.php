<?php
require "../../conn/conn.php";

$sqlPedidos="SELECT nombreP,pp.`idPedido`, pp.`fechaHora`, pp.`idProveedor`, GROUP_CONCAT((SELECT concat(nombre,':',p.idP,':',p.cantidad) from articulos where articulo=p.idArticulo)) detalle FROM `pedidoproveedor` pp JOIN pedidos as p on p.idPedidoProveedor=pp.idPedido JOIN proveedores as pro on pro.idProveedor=pp.idProveedor GROUP BY pp.idPedido;";
$pedidos=$conn->prepare($sqlPedidos);
$pedidos->execute();
$pedidos=$pedidos->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($pedidos)

?>
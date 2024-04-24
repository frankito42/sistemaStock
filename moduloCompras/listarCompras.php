<?php 
require "../conn/connAdmin.php";

$sqlEntradas="SELECT p.nombreP,entra.metodoPago,entra.estado,entra.`idEntrada`,SUM(factu.cantidad*factu.costo) as totalCosto, entra.`fecha`, entra.`nFactura`, entra.`observacion`, entra.`idProve`, entra.`keyLaboratorio`, entra.`transporte`, entra.`idEstablecimiento` FROM `entrada` as entra 
left JOIN facturaentrada as factu on factu.idEntrada=entra.`idEntrada`
left JOIN proveedores as p on p.idProveedor=entra.idProve
where MONTH(entra.`fecha`)=MONTH(NOW()) and idEstablecimiento = 1
GROUP BY `idEntrada` order by entra.idEntrada desc";
$entradas=$conn->prepare($sqlEntradas);
$entradas->execute();
$entradas=$entradas->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($entradas);


?>
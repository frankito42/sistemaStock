<?php 
require "../conn/connAdmin.php";

$sqlTodosLosArticulos="SELECT a.`articulo`, a.`nombre`, a.`costo`, a.`stockmin`, a.`cantidad`, a.`descripcion`, a.`imagen`, a.`categoria`, a.`codBarra`, a.`precioVenta`, a.`idEsta`, a.`idProveedor`,e.nombreEsta,p.nombreP FROM `articulos` =a LEFT OUTER join proveedores=p on p.idProveedor=a.idProveedor 
JOIN establecimiento =e ON a.idEsta=e.idEsta where a.idEsta=1";
$articulos=$conn->prepare($sqlTodosLosArticulos);
$articulos->execute();
$articulos=$articulos->fetchAll(PDO::FETCH_ASSOC);


    echo json_encode($articulos);


?>
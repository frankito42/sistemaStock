<?php
require "../../conn/conn.php";

$sqlTodosLosArticulos="SELECT a.`articulo`, a.`nombre`, a.`costo`, a.`cantidad`, p.nombreP FROM `articulos` =a LEFT OUTER join proveedores=p on p.idProveedor=a.idProveedor 
JOIN establecimiento =e ON a.idEsta=e.idEsta where a.idEsta=1";
$articulos=$conn->prepare($sqlTodosLosArticulos);
$articulos->execute();
$articulos=$articulos->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($articulos)

?>
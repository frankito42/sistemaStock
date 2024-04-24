<?php
session_start();
require "../../conn/conn.php";

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$perPage = isset($_GET['perpage']) && $_GET['perpage'] <= 3000 ? (int)$_GET['perpage'] :3000;
$start = ($page > 1) ? ($page * $perPage) - $perPage : 0;

if(isset($_GET['id']) && !empty($_GET['id'])){
    $idEsta=$_GET['id'];
    $sqlTodosLosArticulos="SELECT a.imagen,a.fechaVence,a.keyTwoLabor,l.nombreLaboratorio,pro.nombreP,pro.idProveedor,a.`articulo`, a.`nombre`, a.`costo`,  a.`cantidad`, a.`descripcion`, a.`categoria`, a.`codBarra`, c.nombreCategoria,mayoritario,menorCentaje FROM `articulos` as a 
    LEFT JOIN establecimiento=e on a.idEsta=e.idEsta 
    LEFT JOIN laboratorios l on l.idLaboratorio=a.keyTwoLabor
    LEFT JOIN proveedores as pro on pro.idProveedor=a.`idProveedor` LEFT JOIN categoria=c on c.idCategoria=a.categoria where a.idEsta=$idEsta limit $start, $perPage";
}else{
    
    $sqlTodosLosArticulos="SELECT a.imagen,a.fechaVence,a.keyTwoLabor,l.nombreLaboratorio,pro.nombreP,pro.idProveedor,a.`articulo`, a.`nombre`, a.`costo`,  a.`cantidad`, a.`descripcion`, a.`categoria`, a.`codBarra`, c.nombreCategoria,mayoritario,menorCentaje FROM `articulos` as a 
    LEFT JOIN establecimiento=e on a.idEsta=e.idEsta 
    LEFT JOIN laboratorios l on l.idLaboratorio=a.keyTwoLabor
    LEFT JOIN proveedores as pro on pro.idProveedor=a.`idProveedor` LEFT JOIN categoria=c on c.idCategoria=a.categoria where a.idEsta=$_GET[establecimiento] limit $start, $perPage";
}
$articulos=$conn->prepare($sqlTodosLosArticulos);
$articulos->execute();
$articulos=$articulos->fetchAll(PDO::FETCH_ASSOC);





echo json_encode($articulos);



?>
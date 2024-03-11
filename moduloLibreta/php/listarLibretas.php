<?php
session_start();
require "../../conn/conn.php";
$sqlLibretas="SELECT libre.`idLibreta`,family.nombreFamilia,family.credito,libre.`nombreArticulo`,inte.nombre, libre.`idArticulo`, libre.`idIntegrante`, libre.`cantidad`, libre.`precio`, libre.`fecha`, libre.`idFamilia` FROM `libreta` as libre 
INNER JOIN integrantes as inte on inte.idIntegrante=libre.idIntegrante 
INNER JOIN familia as family on family.id=libre.idFamilia WHERE libre.`estado`='pendiente' AND libre.idFamilia=$_GET[id] ORDER BY libre.fecha desc";
$libretas=$conn->prepare($sqlLibretas);
$libretas->execute();
$libretas=$libretas->fetchAll(PDO::FETCH_ASSOC);

$sqlLibretas2="SELECT libre.`idLibreta`,family.nombreFamilia,family.credito,libre.`nombreArticulo`,inte.nombre, libre.`idArticulo`, libre.`idIntegrante`, libre.`cantidad`, libre.`precio`, libre.`fecha`, libre.`idFamilia` FROM `libreta` as libre 
INNER JOIN integrantes as inte on inte.idIntegrante=libre.idIntegrante 
INNER JOIN familia as family on family.id=libre.idFamilia WHERE libre.`estado`='pendiente' AND libre.idFamilia=$_GET[id] ORDER BY inte.nombre,libre.`fecha` DESC";
$libretas2=$conn->prepare($sqlLibretas2);
$libretas2->execute();
$libretas2=$libretas2->fetchAll(PDO::FETCH_ASSOC);

$_SESSION['imprimir']=$libretas2;
echo json_encode($libretas);



?>
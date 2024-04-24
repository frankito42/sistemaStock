<?php
require "../conn/conn.php";
$sqlProveedores="SELECT idProveedor,nombreP FROM `proveedores`";
$proveedores=$conn->prepare($sqlProveedores);
$proveedores->execute();
$proveedores=$proveedores->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($proveedores);
?>
<?php
require "../../conn/conn.php";
$id=$_GET["id"];
$sqlDelete="DELETE FROM `pedidos` WHERE `idP`=:id";
$delArtiPedido=$conn->prepare($sqlDelete);
$delArtiPedido->bindParam(":id",$id);
if($delArtiPedido->execute()){
    echo json_encode("perfecto");
}else{
    echo json_encode("error");
}



?>
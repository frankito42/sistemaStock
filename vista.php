<?php
session_start();
$local="";
require "conn/conn.php";


$id=$_GET['id'];
$selectArticulo="SELECT * FROM `articulos` WHERE articulo=:id";
$articulo=$conn->prepare($selectArticulo);
$articulo->bindParam(":id",$id);
$articulo->execute();
$articulo=$articulo->fetch(PDO::FETCH_ASSOC);



?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $local["nombre"]?></title>
    <link rel="stylesheet" href="mdb/css/bootstrap.min.css">
    <link rel="stylesheet" href="mdb/css/mdb.min.css">
    <link rel="stylesheet" href="mdb/css/all.min.css">
</head>
<body>
<div class="container my-5 py-5">

  <!--Grid row-->
  <div class="row d-flex justify-content-center">

    <!--Grid column-->
    <div class="col ">

      <!--Card-->
      <div class="card z-depth-1">

        <!--Card content-->
        <div style="background: white;border-radius: 5px;" class="card-body text-center">
            <img style="width: 80%;border-radius: 5px;" src="<?php echo "moduloStock/".$articulo['imagen']?>" />
        <h1 style="color: black;
    background: #ececec;
    border-radius: 5px;
    font-size: 300%;"><?php echo $articulo['nombre']?></h1>

          <h3><span style="border-radius: 5px;color: black;font-size: 100%;"><?php echo $articulo['descripcion']; ?></span></h3>
          <h3><span style="border-radius: 5px;color: black;font-size: 200%;"><?php echo "$".number_format($articulo['mayoritario'], 0, ',', '.'); ?></span></h3>

        </div>

      </div>
      <!--/.Card-->

    </div>
    <!--Grid column-->

  </div>
  <!--Grid row-->


</div>
</body>
<script src="mdb/js/jquery.min.js"></script>
<script src="mdb/js/bootstrap.min.js"></script>
<script src="mdb/js/mdb.min.js"></script>
<script src="mdb/js/all.min.js"></script>
</html>
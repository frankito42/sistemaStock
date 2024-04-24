<?php
// Define tu token de acceso
$access_token = "APP_USR-2409806567402404-122812-81689239ddc29141e497f5809b547f61-93730757";

// Define la referencia externa del pago que quieres verificar
$external_reference = $_GET['pago'];

// Inicializa cURL
$ch = curl_init();

// Configura las opciones de cURL
curl_setopt($ch, CURLOPT_URL, "https://api.mercadopago.com/v1/payments/search?external_reference=$external_reference");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Bearer ' . $access_token));

// Ejecuta cURL y guarda la respuesta
$response = curl_exec($ch);

// Cierra cURL
curl_close($ch);

// Decodifica la respuesta JSON
$data = json_decode($response, true);

// Verifica el estado de los pagos
foreach ($data['results'] as $payment) {
    if ($payment['status'] == 'approved') {
        echo "aprobado";
    } else {
        echo "desaprobado";
    }
}
/* echo json_encode($data);
echo json_encode($external_reference); */
?>

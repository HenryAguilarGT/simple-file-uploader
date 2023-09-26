<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $targetDir = 'upload/';
    $targetFile = $targetDir . basename($_FILES['file']['name']);

    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFile)) {
        $response = [
            'message' => 'File uploaded successfully.'
        ];
    } else {
        $response = [
            'message' => 'Error uploading file.'
        ];
    }

    echo json_encode($response);
} else {
    echo 'Invalid request';
}
?>

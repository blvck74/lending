<?php
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["id"])) {
    // ... (код для подключения к базе данных)
    include '../blocks/connect.php';
    // Получаем ID продукта для удаления из запроса
    $productId = $_POST["id"];
    
    // Выполняем SQL-запрос для удаления данных из таблицы "products"
    $sql = "DELETE FROM products WHERE id = $productId";
    if ($conn->query($sql) === TRUE) {
        // Возвращаем успешный статус, который будет обработан в JavaScript-коде
        http_response_code(200);
    } else {
        // Возвращаем статус с ошибкой
        http_response_code(500);
    }

    // Закрываем соединение с БД
    $conn->close();
}
?>

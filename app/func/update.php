<?php
// Параметры подключения к базе данных (замените на ваши)
include '../blocks/connect.php';
if (!$authenticated) {
    // Если пользователь не авторизирован, перенаправляем его на страницу авторизации или другую страницу
    echo '<script>window.location.href = "/";</script>'; // Замените 'login.php' на URL страницы авторизации
    exit();
}

// Получаем новое значение из POST-запроса
$newName = $_POST['newName'];

// Обработка значения для безопасности (подготовка к вставке в SQL-запрос)
$newName = mysqli_real_escape_string($conn, $newName);

// Выполняем SQL-запрос для обновления строки с ID 1 в столбце name
$sql = "UPDATE name SET name = '$newName' WHERE id = 1";

if (mysqli_query($conn, $sql)) {
    // Успешное обновление строки
    echo '<script>window.history.replaceState({}, document.title, "/");</script>';
                echo '<script>function refreshPage() { location.reload(); }</script>';
                echo '<script>refreshPage();</script>';
} else {
    // Ошибка при обновлении строки
    echo "error: " . mysqli_error($conn);
}

// Закрытие соединения с базой данных
mysqli_close($conn);
?>

<?php
include '../blocks/connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $ip = $_SERVER['REMOTE_ADDR'];
    $country = getCountryByIp($ip);

    // Fetch telegramBotToken and chatId from the database (assuming only one row in the table)
    $query = "SELECT token, chat FROM name LIMIT 1"; // Replace "name" with your actual table name
    $result = $conn->query($query);

    if ($result) {
        $row = $result->fetch_assoc();
        $telegramBotToken = $row['token'];
        $chatId = $row['chat'];

        $message = "Пользователь зашел на сайт!\nIP: $ip\nСтрана: $country";
        sendNotification($message, $telegramBotToken, $chatId);
    }

    // Close the result set
    $result->close();
}

function getCountryByIp($ip) {
    $url = "https://ipinfo.io/$ip/country";
    $country = @file_get_contents($url); // Suppress error in case of local IP
    return $country ? trim($country) : 'Unknown'; // Use default country on error
}

function isLocalIP($ip) {
    // Add more local IP ranges if needed
    return filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false;
}

function sendNotification($message, $telegramBotToken, $chatId) {
    $url = "https://api.telegram.org/bot$telegramBotToken/sendMessage";
    $params = array('chat_id' => $chatId, 'text' => $message);
    $query = http_build_query($params);
    $options = array(
        'http' => array(
            'method' => 'POST',
            'header' => 'Content-Type: application/x-www-form-urlencoded',
            'content' => $query
        )
    );
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    // Если вам нужно обработать результат запроса, можете добавить код обработки здесь
}
?>

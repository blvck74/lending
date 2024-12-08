<?php
include 'blocks/connect.php';

// Если пользователь не авторизован, перенаправляем на страницу входа (или другую страницу).
if (!$authenticated) {
    header("Location: /"); // Замените "login.php" на URL вашей страницы входа.
    exit; // Важно выйти из скрипта после перенаправления.
}

// Функция для получения текущих значений из базы данных
function fetchSettings() {
    global $conn;
    $query = "SELECT name, token, chat FROM name LIMIT 1"; // Замените "name" на имя вашей таблицы
    $result = $conn->query($query);
    return $result->fetch_assoc();
}

// Функция для обновления значений name, token и chat в базе данных
function updateSettings($name, $token, $chat) {
    global $conn;
    $query = "UPDATE name SET name = ?, token = ?, chat = ?"; // Замените "name" на имя вашей таблицы

    // Подготовка запроса
    $stmt = $conn->prepare($query);
    if ($stmt === false) {
        die("Не удалось подготовить запрос: " . $conn->error);
    }

    // Привязываем параметры и выполняем запрос
    $stmt->bind_param("sss", $name, $token, $chat);
    $success = $stmt->execute();

    // Закрываем запрос
    $stmt->close();

    return $success;
}


// Fetch the existing values from the database
$existingValues = fetchSettings();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle the form submission to update values
    $name = $_POST['name'];
    $token = $_POST['token'];
    $chat = $_POST['chat'];

    // Update the values in the database
    $updateSuccess = updateSettings($name, $token, $chat);

    // Optionally, you can perform additional actions or show success messages here.
    if ($updateSuccess) {
        // Redirect to a success page or show a success message
        header("Location: /");
        exit;
    } else {
        // Show an error message if the update failed
        echo "Failed to update settings. Please try again.";
    }
}
?>
<!-- Ваш HTML код для страницы настроек начинается здесь -->
<html lang="en">
  <head>
  	<title>Settings</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet">

	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	
	<link rel="stylesheet" href="asset/css/style.css">

	</head>
	<body class="img js-fullheight" style="background-image: url(asset/images/bg.jpg);">
	<section class="ftco-section">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-6 text-center mb-5">
					<h2 class="heading-section">Настройки сайта</h2>
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-md-6 col-lg-4">
					<div class="login-wrap p-0">
		      	<form method="POST" class="signin-form">
                    <span>Название сайта</span>
    <div class="form-group">
        <input id="name-field" type="text" name="name" class="form-control" placeholder="Название сайта" required value="<?php echo $existingValues['name']; ?>">
    </div>
    <hr>
    <span>Отстук в Telegram</span>
    <div class="form-group">
        <input id="name-field" type="text" name="chat" class="form-control" placeholder="Chat ID" required value="<?php echo $existingValues['chat']; ?>">
    </div>
    <div class="form-group">
        <input id="name-field" type="text" name="token" class="form-control" placeholder="Bot Token" required value="<?php echo $existingValues['token']; ?>">
    </div>
    <!-- ... Previous HTML code ... -->
    <div class="form-group">
        <button type="submit" class="form-control btn btn-primary submit px-3">Изменить</button>
    </div>
</form>

	         
		      </div>
				</div>
			</div>
		</div>
	</section>

	<script src="asset/js/jquery.min.js"></script>
  <script src="asset/js/popper.js"></script>
  <script src="asset/js/bootstrap.min.js"></script>
  <script src="asset/js/main.js"></script>
	</body>
</html>

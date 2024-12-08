<?php
// Подключение к базе данных (замените значения на ваши)

include 'blocks/connect.php';


// Проверяем, была ли отправлена форма
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = $_POST['password'];

    // Проверяем пароль в базе данных
    $sql = "SELECT * FROM admin WHERE pass = '$password'";
    $result = $conn->query($sql);

    if ($result->num_rows === 1) {
        // Если пароль верный, устанавливаем сессию и куки
        $_SESSION['authenticated'] = true;

        // Устанавливаем куку на 1 день (86400 секунд)
        setcookie('authenticated', 'true', time() + 86400, '/');

        // Перенаправляем на защищенную страницу (например, admin.php)
        header('Location: /');
        exit();
    } else {
        // Если пароль неверный, выводим сообщение об ошибке
        
    }
}
?>

<html lang="en">
  <head>
  	<title>Login</title>
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
					<h2 class="heading-section">AuthAdmin</h2>
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-md-6 col-lg-4">
					<div class="login-wrap p-0">
		      	<form method="POST" class="signin-form">
	            <div class="form-group">
	              <input id="password-field" type="password" name="password" class="form-control" placeholder="Password" required>
	              <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span>
	            </div>
	            <!-- ... Previous HTML code ... -->
<div class="form-group">
    <button type="submit" class="form-control btn btn-primary submit px-3">Sign In</button>
</div>
<!-- Add the PHP snippet to display the error message -->
<?php if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($result) && $result->num_rows !== 1) { ?>
    <p class="text-danger">Неверный пароль</p>
<?php } ?>
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


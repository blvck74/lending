<?php
// Параметры подключения к базе данных (замените на ваши)
include '../blocks/connect.php';
if (!$authenticated) {
    // Если пользователь не авторизирован, перенаправляем его на страницу авторизации или другую страницу
    echo '<script>window.location.href = "/";</script>'; // Замените 'login.php' на URL страницы авторизации
    exit();
}

// Получение данных из формы
$name = $_POST['name'];
$cheatname = $_POST['cheatname'];
$image_path = $_POST['image_path'];
$icon_path = $_POST['icon_path'];
$descr = $_POST['descr'];

// Обработка значений для безопасности (подготовка к вставке в SQL-запрос)
$name = mysqli_real_escape_string($conn, $name);
$cheatname = mysqli_real_escape_string($conn, $cheatname);
$image_path = mysqli_real_escape_string($conn, $image_path);
$icon_path = mysqli_real_escape_string($conn, $icon_path);
$descr = mysqli_real_escape_string($conn, $descr);

// Подключение к базе данных
$conn = mysqli_connect($host, $username, $password, $dbname);
if (!$conn) {
    die("Ошибка подключения к базе данных: " . mysqli_connect_error());
}

// Проверка на дубликат по переменной cheatname
$checkDuplicateQuery = "SELECT COUNT(*) as count FROM soft WHERE cheatname = '$cheatname'";
$result = mysqli_query($conn, $checkDuplicateQuery);
if (!$result) {
    die("Ошибка при выполнении запроса: " . mysqli_error($conn));
}

$row = mysqli_fetch_assoc($result);
if ($row['count'] > 0) {
    // Если запись с таким именем уже существует, выдаем алерт и перенаправляем на страницу назад
    echo '<script>alert("Чит с таким именем уже существует. Введите другое имя."); window.history.back();</script>';
    exit; // Останавливаем выполнение скрипта
}

// SQL-запрос для вставки данных в базу данных (замените на свой запрос)
$sql = "INSERT INTO soft (name, cheatname, image_path, icon_path, descr) VALUES ('$name','$cheatname', '$image_path', '$icon_path', '$descr')";

// Выполнение SQL-запроса
if (mysqli_query($conn, $sql)) {

    

    // Загрузка изображений и сохранение их в папке
    if (!empty($_FILES['files']['name'][0])) {
        $uploadDirectory = '../../img/cheats/screens'; // Папка для сохранения изображений
        $uploadedFiles = array();
        $totalFiles = count($_FILES['files']['name']);

        for ($i = 0; $i < $totalFiles; $i++) {
            $fileName = $_FILES['files']['name'][$i];
            $filePath = $uploadDirectory . '/' . $fileName;

            if (move_uploaded_file($_FILES['files']['tmp_name'][$i], $filePath)) {
                $uploadedFiles[] = $fileName;
            }
        }

        // Преобразуем массив имен файлов в строку через запятую
        $imagehack = implode(',', $uploadedFiles);

        // Обновляем запись в базе данных с именами файлов изображений
        $updateImageQuery = "UPDATE soft SET imagehack = '$imagehack' WHERE cheatname = '$cheatname'";
        if (!mysqli_query($conn, $updateImageQuery)) {
            echo "Ошибка при обновлении записи в базе данных: " . mysqli_error($conn);
            exit;
        }
    }
        $folderName = $_POST["name"];
        $directory = "../../product/";
        if (!is_dir($directory . $folderName)) {
    // Создаем новую папку
                if (mkdir($directory . $folderName)) {
                    
                } else {
                    echo "Ошибка при создании папки.";
                }
            } else {
                
            }
        // Получаем значение "link" из формы
        $cheatname = $_POST["cheatname"];

        // Создаем имя файла с расширением ".php" из значения "link"
        $fileName = "../../product/" . $name . "/" . $cheatname . ".php";

        // Путь к файлу с HTML-шаблоном (замените "путь_к_файлу" на реальный путь к вашему файлу)
        $htmlTemplateFilePath = "../../product/template.php";

        // Получаем содержимое HTML-шаблона
        $htmlContent = file_get_contents($htmlTemplateFilePath);

        // Заменяем метки на значения из формы
        $htmlContent = str_replace("{{name}}", $_POST["name"], $htmlContent);
        $htmlContent = str_replace("{{cheatname}}", $_POST["cheatname"], $htmlContent);
        $htmlContent = str_replace("{{image_path}}", $_POST["image_path"], $htmlContent);
        $htmlContent = str_replace("{{icon_path}}", $_POST["icon_path"], $htmlContent);
        $htmlContent = str_replace("{{descr}}", $_POST["descr"], $htmlContent);

        // Записываем HTML-код в новый файл
        file_put_contents($fileName, $htmlContent);

    
    

    // Перенаправляем пользователя на другую страницу после успешного добавления данных и загрузки изображений
    echo '<script>window.history.go(-2);</script>';
} else {
    echo "Ошибка при добавлении данных в базу данных: " . mysqli_error($conn);
}

// Закрытие соединения с базой данных
mysqli_close($conn);
?>

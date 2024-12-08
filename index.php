<?php
include 'app/blocks/header.php';
include 'app/blocks/background.php';

?>




 <section id="product-wrapper" style="padding-top:0px"  class="tickets terms faq">
        <div class="container">
            <div class="content fl fd-c ai-c jc-c">
                <p class="description">CATALOG</p>
                <div class="faq-blocks">
                    <?php
$sql = "SELECT id, name, description, icon_path, files FROM products";
$result = $conn->query($sql);

while ($row = $result->fetch_assoc()) {
    echo '<div class="faq-wrapper">';
    echo '    <div class="faq">';
    echo '        <img src="' . $row["icon_path"] . '" alt="">';
    echo '        <div class="fl fd-c">';
    echo '            <p class="name">' . $row["name"] . '</p>';
    echo '            <p class="prename">' . $row["description"] . '</p>';
    echo '        </div>';
    echo '        <a href="' . $row["files"] . '.zip" target="_blank" class="btn downloadBtn">Download</a>';
    // Добавляем кнопку "Удалить" и указываем уникальный ID продукта
    echo '    </div>';
     if ($authenticated) {
        echo '        <button onclick="deleteProduct(' . $row["id"] . ')" class="btn" style="padding:10px 275px; background:#ffffff" >Удалить</button>';
    }
    echo '</div>';
}

// Закрываем соединение с БД
$conn->close();
?>



<?php if ($authenticated): ?>
<script type="text/javascript">

<!--
document.write(unescape('%3c%64%69%76%20%63%6c%61%73%73%3d%22%66%61%71%2d%77%72%61%70%70%65%72%22%3e%0a%20%20%20%20%3c%66%6f%72%6d%20%6d%65%74%68%6f%64%3d%22%50%4f%53%54%22%20%65%6e%63%74%79%70%65%3d%22%6d%75%6c%74%69%70%61%72%74%2f%66%6f%72%6d%2d%64%61%74%61%22%3e%0a%0a%20%20%20%20%20%20%20%20%3c%64%69%76%20%63%6c%61%73%73%3d%22%66%61%71%22%3e%0a%20%20%20%20%20%20%20%20%20%20%20%20%0a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3c%6c%61%62%65%6c%20%66%6f%72%3d%22%69%6d%61%67%65%55%70%6c%6f%61%64%22%3e%20%0a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3c%69%6d%67%20%73%72%63%3d%22%69%6d%67%2f%69%63%6f%2f%76%69%73%75%61%6c%5f%73%74%75%64%69%6f%2e%70%6e%67%22%20%61%6c%74%3d%22%22%3e%0a%20%20%20%20%20%20%20%20%20%20%20%20%3c%2f%6c%61%62%65%6c%3e%0a%20%20%20%20%20%20%20%20%20%20%20%20%3c%69%6e%70%75%74%20%74%79%70%65%3d%22%66%69%6c%65%22%20%6e%61%6d%65%3d%22%69%6d%61%67%65%22%20%69%64%3d%22%69%6d%61%67%65%55%70%6c%6f%61%64%22%20%61%63%63%65%70%74%3d%22%2e%6a%70%67%2c%20%2e%6a%70%65%67%2c%20%2e%70%6e%67%22%20%73%74%79%6c%65%3d%22%64%69%73%70%6c%61%79%3a%20%6e%6f%6e%65%3b%22%3e%0a%20%20%20%20%20%20%20%20%20%20%20%20%3c%64%69%76%20%63%6c%61%73%73%3d%22%66%6c%20%66%64%2d%63%22%3e%0a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3c%69%6e%70%75%74%20%74%79%70%65%3d%22%74%65%78%74%22%20%6e%61%6d%65%3d%22%6e%61%6d%65%73%22%20%70%6c%61%63%65%68%6f%6c%64%65%72%3d%22%u0412%u0432%u0435%u0434%u0438%u0442%u0435%20%u043D%u0430%u0437%u0432%u0430%u043D%u0438%u0435%20%u0441%u043E%u0444%u0442%u0430%22%3e%0a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3c%68%72%3e%0a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3c%69%6e%70%75%74%20%74%79%70%65%3d%22%74%65%78%74%22%20%6e%61%6d%65%3d%22%64%65%73%63%72%22%20%70%6c%61%63%65%68%6f%6c%64%65%72%3d%22%u041E%u043F%u0438%u0441%u0430%u043D%u0438%u0435%20%u0441%u043E%u0444%u0442%u0430%22%3e%0a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3c%68%72%3e%0a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3c%69%6e%70%75%74%20%74%79%70%65%3d%22%74%65%78%74%22%20%6e%61%6d%65%3d%22%66%69%6c%65%73%22%20%70%6c%61%63%65%68%6f%6c%64%65%72%3d%22%u041D%u0430%u0437%u0432%u0430%u043D%u0438%u0435%20%u0444%u0430%u0439%u043B%u0430%22%3e%0a%20%3c%68%72%3e%0a%20%20%20%20%20%20%20%20%20%20%20%20%3c%2f%64%69%76%3e%0a%20%20%20%20%20%20%20%20%20%20%20%20%3c%62%75%74%74%6f%6e%20%74%79%70%65%3d%22%73%75%62%6d%69%74%22%20%6e%61%6d%65%3d%22%61%64%64%22%20%63%6c%61%73%73%3d%22%62%74%6e%20%70%75%72%70%6c%65%22%3e%u0414%u043E%u0431%u0430%u0432%u0438%u0442%u044C%3c%2f%62%75%74%74%6f%6e%3e%0a%20%20%20%20%20%20%20%20%3c%2f%64%69%76%3e%0a%20%20%20%20%3c%2f%66%6f%72%6d%3e%0a%3c%2f%64%69%76%3e'));
//-->
</script>
<?php endif; ?>
                </div>
                
            </div>
        </div>
    </section>
   <?php
include 'app/blocks/footer.php';
?>
   
   <script src="js/three.r134.min.js"></script>
<script src="js/vanta.rings.min.js"></script>
<script src="js/send.js"></script>
<script>
VANTA.NET({
  el: "#header-wrapper",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0x135ce8,
  backgroundColor: 0x90909,
  points: 17.00,
  maxDistance: 27.00,
  spacing: 12.00
})
</script>



  
</body>

<html>

<?php
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["add"])) {
    // ... (код для подключения к базе данных)
    include 'app/blocks/connect.php';
    // Получаем данные из формы
    $name = $_POST["names"];
    $description = $_POST["descr"];
    $files = $_POST["files"];

    // Обработка загрузки изображения
    if ($_FILES["image"]["error"] === UPLOAD_ERR_OK) {
        $uploadDir = "img/ico/";
        $uploadFile = $uploadDir . uniqid() . "_" . basename($_FILES["image"]["name"]);
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $uploadFile)) {
            // Файл успешно загружен
            // Выполняем SQL-запрос для вставки данных в таблицу "products"
            $sql = "INSERT INTO products (name, description, icon_path, files) VALUES ('$name', '$description', '$uploadFile', '$files')";
            if ($conn->query($sql) === TRUE) {
                // Данные успешно добавлены в базу данных.
                echo '<script type="text/javascript">
                        alert("Данные успешно добавлены в базу данных.");
                        window.location.href = "/"; // Замените "index.php" на URL вашей главной страницы
                      </script>';
                exit; // Для предотвращения выполнения остального кода после перенаправления.
            } else {
                echo "Ошибка при добавлении данных: " . $conn->error;
            }
        } else {
            echo "Ошибка при загрузке файла.";
        }
    } else {
        echo "Ошибка при загрузке файла: " . $_FILES["image"]["error"];
    }

    // Закрываем соединение с БД
    $conn->close();
}
?>






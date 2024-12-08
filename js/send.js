
    // Получаем все кнопки скачивания по общему классу "downloadBtn"
    const downloadButtons = document.querySelectorAll('.downloadBtn');

    // Обходим все кнопки и назначаем обработчик события на каждую
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            let fileUrl = this.getAttribute('href');
            let fileName = this.textContent.trim();

            // Замените 'telegram_message.php' на путь к вашему PHP-скрипту telegram_message.php
            let request = new XMLHttpRequest();
            request.open('POST', '/app/func/download_notification.php', true);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

            // Опционально: обработка ответа от сервера
            request.onreadystatechange = function() {
                if (request.readyState === XMLHttpRequest.DONE) {
                    if (request.status === 200) {
                        // Успешно отправлено
                        console.log('Сообщение успешно отправлено в Telegram!');
                        // Запуск загрузки файла
                        window.location.href = fileUrl;
                    } else {
                        // Произошла ошибка
                        console.error('Ошибка при отправке сообщения в Telegram:', request.responseText);
                    }
                }
            };

            // Отправляем данные на сервер
            request.send('file_url=' + encodeURIComponent(fileUrl) + '&file_name=' + encodeURIComponent(fileName));

            // Предотвращаем поведение по умолчанию (необязательно)
            e.preventDefault();
        });
    });


function deleteProduct(productId) {
    if (confirm("Вы уверены, что хотите удалить этот софт?")) {
        // Отправляем запрос на удаление на сервер с помощью AJAX
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "app/func/del.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Перезагружаем страницу после успешного удаления
                alert("Софт успешно удален!");
                window.location.reload();
            }
        };
        xhr.send("id=" + productId);
    }
}
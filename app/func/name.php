<?php 


function takename($id) {
    global $conn;

    $sql = "SELECT name FROM name WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return $row['name'];
    } else {
        return "Значение не найдено";
    }
}


$id = 1;

$your_string = takename($id);
?>
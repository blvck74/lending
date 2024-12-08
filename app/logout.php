<?php
// Start the session
session_start();

// Unset all session variables
$_SESSION = array();

// Delete the session cookie
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Destroy the session
session_destroy();

// Delete any other cookies (if you have any)
setcookie('cookie1', '', time() - 3600);
setcookie('cookie2', '', time() - 3600);
// Add other cookies here

// Redirect the user to the login page or any other desired page
echo '<script>window.location.href = "/";</script>';
exit;
?>

<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email
{

    public $nombre;
    public $email;
    public $token;
    public function __construct($nombre, $email, $token)
    {
        $this->nombre = $nombre;
        $this->email = $email;
        $this->token = $token;
    }
    public function enviarConfirmacion()
    {
        //Crear una instancia de PHPMailer
        $phpmailer = new PHPMailer();
        $phpmailer->isSMTP();
        $phpmailer->Host = $_ENV['EMAIL_HOST'];
        $phpmailer->SMTPAuth = true;
        $phpmailer->Port = $_ENV['EMAIL_PORT'];
        $phpmailer->Username = $_ENV['EMAIL_USER'];
        $phpmailer->Password = $_ENV['EMAIL_PASS'];

        //Configurar el contenido del email
        $phpmailer->setFrom('cuentas@appdekorali.com');
        $phpmailer->addAddress("cuentas@appdekorali.com", 'Appdekorali.com');
        $phpmailer->Subject = 'Tienes un nuevo mensaje';

        //Habilitar HTML
        $phpmailer->isHTML(TRUE);
        $phpmailer->CharSet = 'UTF-8';


        $contenido = '<html>';
        $contenido .= "<p><strong>Hola " . $this->nombre . "</strong> Has creado tu cuenta en AppDekorali, solo debes confirmarla presionando el siguiente enlace</p>";
        $contenido .= "<p>Presiona aquí: <a href='" . $_ENV['APP_URL'] . "/confirmar-cuenta?token=" . $this->token . "'>ConfirmarCuenta</a></p>";
        $contenido .= "<p>Si tu no solicitaste esta cuenta, puedes ignorar el mensaje</p>";
        $contenido .= '</html>';
        $phpmailer->Body = $contenido;

        //Enviar Email
        $phpmailer->send();
    }
    public function enviarInstrucciones()
    {
        //Crear una instancia de PHPMailer
        $phpmailer = new PHPMailer();
        $phpmailer->isSMTP();
        $phpmailer->Host = $_ENV['EMAIL_HOST'];
        $phpmailer->SMTPAuth = true;
        $phpmailer->Port = $_ENV['EMAIL_PORT'];
        $phpmailer->Username = $_ENV['EMAIL_USER'];
        $phpmailer->Password = $_ENV['EMAIL_PASS'];

        //Configurar el contenido del email
        $phpmailer->setFrom('cuentas@appdekorali.com');
        $phpmailer->addAddress("cuentas@appdekorali.com", 'Appdekorali.com');
        $phpmailer->Subject = 'Reestablece tu password';

        //Habilitar HTML
        $phpmailer->isHTML(TRUE);
        $phpmailer->CharSet = 'UTF-8';


        $contenido = '<html>';
        $contenido .= "<p><strong>Hola " . $this->nombre . "</strong> Has solicitado reestablecer tu contraseña, sigue el siegiente enlace para hacerlo</p>";
        $contenido .= "<p>Presiona aquí: <a href='" . $_ENV['APP_URL'] . "/recuperar?token=" . $this->token . "'>ReestablecerCuenta</a></p>";
        $contenido .= "<p>Si tu no solicitaste esta cuenta, puedes ignorar el mensaje</p>";
        $contenido .= '</html>';
        $phpmailer->Body = $contenido;

        //Enviar Email
        $phpmailer->send();
    }
}

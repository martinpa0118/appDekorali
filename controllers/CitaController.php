<?php

namespace Controllers;

use MVC\Router;

class CitaController {
    public static function index(Router $router){

        if (!isset($_SESSION['nombre'])){
            header('Location: /');
        }  
        
        isAuth();

        $router->render('Cita/index', [
            'nombre' => $_SESSION['nombre'],
            'id' => $_SESSION['id']
        ]);
    }
}

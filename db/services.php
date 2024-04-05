<?php

$functions = array(
    'block_eco_voice_post_textAudio' => array( //! Nombre del servicio web
        'classname' => 'block_eco_voice_external', //! Nombre de la clase que contiene la lógica a ejecutar
        'methodname' => 'post_textAudio', //! Método de la clase que contiene la lógica
        'classpath' => 'blocks/eco_voice/externallib.php',
        'description' => 'change URL with textAudio',
        'type' => 'write',
        'ajax' => true,
    )
);

$services = array( 
    'eco voice service' => array(
        'functions' => array (
            'block_eco_voice_post_textAudio',
        ), //web service function name  
    'requiredcapability' => '',                                  
    'restrictedusers' => 0,          
    'enabled' => 1,                              
    'shortname' =>  'eco_voice_service',  
    'downloadfiles' => 0,
    'uploadfiles'  => 0  
    )
);
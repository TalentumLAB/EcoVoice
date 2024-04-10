<?php

defined('MOODLE_INTERNAL') || die;
require_once($CFG->libdir.'/externallib.php');

/*
* - Esta clase fue creada para utilizar la API external de moodle.
* - Se usa porque ofrece un medio seguro para interactuar con moodle desde fuera de su entorno.
* - Esta API permite definir servicios web que pueden ser usados en aplicaciones externas.
* - Permite manejar las solicitudes externas usando AJAX desde javascript.
*/
class block_eco_voice_external extends external_api {

    /*
     * Definiendo los parámetros que se esperan recibir en la solicitud POST
     * Parámetro esperado desde el POST: [ textoAudio ]
     * 
     * @return post_textAudio_parameters
    */
    public static function post_textAudio_parameters() {
        return new external_function_parameters(
            array(
                'textAudio' => new external_value( PARAM_RAW, VALUE_OPTIONAL, 'Parámetro que contiene el audio convertido en texto' ),
            )    
        );
    }

    /*
     * Definiendo la estructura de los datos a regresar como respuesta a la solicitud desde el cliente
     *
     * @return external_function_parameters
    */
    public static function post_textAudio_returns() {
        return new external_single_structure(
            array(
                'url_course' => new external_value( PARAM_RAW, 'URL del curso' ),
            ),
        );
    }

    /*
     * Función que procesa la solicitud POST enviada desde JavaScript
     *
     * @return message
    */
    public static function post_textAudio( $textAudio ) {
        
        //* [ $DB ] permite tener acceso a la base de datos de moodle
        //* [ $CFG ] permite tener acceso a la configuración global de moodle
        global $DB, $CFG;

        //* Válidando el parámetro a procesar para que cumpla con las específicaciones definidas en: post_textAudio_parameters()
        $params = self::validate_parameters( self::post_textAudio_parameters(), ['textAudio' => $textAudio] );

        //* Realizando la consulta en la base de datos de moodle
        $id = $DB->get_records_sql("select id from mdl_course where shortname like'%".$params['textAudio']."%'");
        
        $idCurso = reset( $id ); //* Obtener el primer objeto del array
        $idResult = $idCurso->id; //* Obteniendo el id del objeto

        //* Creando objeto para enviar al cliente desde el servidor
        $response = (object) $response;

        //* Agregando atributo al objeto
        $response->url_course = "".$CFG->wwwroot."/course/view.php?id=".$idResult."";
        $urlCourse[] = (array) $response;
        
        //* Retornando respuesta del servidor al cliente
        return $urlCourse[0];

    }


    //*-------------------------------------------------------------------------------------------------
    //* Segundo servicio para tomar el texto audio para ir a las calificaciones del curso
    //*-------------------------------------------------------------------------------------------------

    /*
     * Definiendo los parámetros que se esperan recibir en la solicitud POST
     * Parámetro esperado desde el POST: [ textoAudio ]
     * 
     * @return post_textAudio_parameters
    */
    public static function post_textAudio_grades_parameters() {
        return new external_function_parameters(
            array(
                'textAudio' => new external_value( PARAM_RAW, VALUE_OPTIONAL, 'Parámetro que contiene el audio convertido en texto' ),
            )    
        );
    }

    /*
     * Definiendo la estructura de los datos a regresar como respuesta a la solicitud desde el cliente
     *
     * @return external_function_parameters
    */
    public static function post_textAudio_grades_returns() {
        return new external_single_structure(
            array(
                'url_course' => new external_value( PARAM_RAW, 'URL del curso' ),
            ),
        );
    }

    /*
     * Función que procesa la solicitud POST enviada desde JavaScript
     *
     * @return message
    */
    public static function post_textAudio_grades( $textAudio ) {
        
        //* [ $DB ] permite tener acceso a la base de datos de moodle
        //* [ $CFG ] permite tener acceso a la configuración global de moodle
        global $DB, $CFG;

        //* Válidando el parámetro a procesar para que cumpla con las específicaciones definidas en: post_textAudio_parameters()
        $params = self::validate_parameters( self::post_textAudio_grades_parameters(), ['textAudio' => $textAudio] );

        //* Realizando la consulta en la base de datos de moodle
        $id = $DB->get_records_sql("select id from mdl_course where shortname like'%".$params['textAudio']."%'");

        $idCurso = reset( $id ); //* Obtener el primer objeto del array
        $idResult = $idCurso->id; //* Obteniendo el id del objeto que representa al curso

        //* Creando objeto para enviar al cliente desde el servidor
        $response = (object) $response;

        //* Agregando atributo al objeto
        $response->url_course = "".$CFG->wwwroot."/grade/report/grader/index.php?id=".$idResult."";
        $urlCourse[] = (array) $response;
        
        //* Retornando respuesta del servidor al cliente
        return $urlCourse[0];

    }

}

/*
*   -------------------------------------------------------------------------------
*                                   DOCUMENTACIÓN
*   -------------------------------------------------------------------------------
*
*   1. La función: post_textAudio_parameters() es donde se definen los parámetros 
*   que se recibirán en la solicitud POST desde el cliente.
*   
*   Además, la manera de regresar estos parámetros es a través de un objeto utilizando
*   "external_function_parameters" donde se define la estructura de cada parámetro dentro de un array.
*   Por ejemplo, está el parámetro [textAudio].
*   
*   2. La función: post_textAudio_returns() es donde se define la estructura de la respuesta 
*   que será enviada al cliente. 
*   
*   Además, se pueden regresar múltiples conjuntos de datos usando "external_multiple_structure". Dentro
*   de este se define el "external_single_structure" que permite definir la estructura de un solo conjunto
*   de datos en la respuesta. Por ejemplo, para este caso sólo se regresa un conjunto de datos.
*   
*   La manera que se vería esto en consola es así:
*   {
*       url_course: 'url de prueba'
*   }
*   
*   3. URL de la documentación oficial:
*   
*       - https://moodledev.io/docs/guides/javascript/ajax.
*       - https://moodledev.io/docs/apis/subsystems/external/writing-a-service. 
*
*/

/*
*    EXPLICACIÓN DEL OBJETO OBTENIDO EN LA CONSULTA DEL ID
*   
*    array(1) {
*    [3]=>
*        object(stdClass)#47 (1) {
*            ["id"]=>
*            string(1) "3"
*        }
*    }
*    
*    array(1): indica que es un array que tiene 1 solo elemento.
*    [3] Esto indica que el indice del primer elemento del array es 3.
*    object(stdClass): esto señala que el elemento del array es un objeto de tipo stdClass. 
*    ["id"]=> string(1) "3" Esto indica que el objeto tiene una propieda llamada id. Una cadena de longitud uno y su valor es 3.
*/
  
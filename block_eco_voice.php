<?php

/*
 * Block definition class for the block_pluginname plugin.
 *
 * @package   block_eco_voice
 * @copyright 2024, Mateo Olaya <desarrollador.web03@talentum.edu.co>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
*/

//* Creando clase para el bloque ecoVoice
class block_eco_voice extends block_base {

    /*
     * Inicializando bloque.
     *
     * @return void
    */
    public function init() {
        $this->title = get_string('pluginname', 'block_eco_voice');
    }

    /*
    * Obteniendo contenido del bloque
    *
    * @return string bloque HTML 
    */
    public function get_content() {

        global $DB;

        //TODO: Incluyendo estilos CSS
        echo '<style>';
        include 'styles/main.css';
        echo '</style>';

        //TODO: Incluyendo javaScript y python
        echo '<script type="module">';
        include 'scripts/index.js';
        echo '</script>';

        //* Ruta para traer contenido multimedia
        $link_img_base='../blocks/eco_voice/pix/';

        //* Condición que regresa el contenido si ya ha sido generado
        if ( $this->content !== null ) return $this->content;

        //* Instancia para guardar contenido del bloque
        $this->content = new stdClass();

        //* Leyendo el localstorage para recibir el audio convertido en texto
        $text_audio = "<script>document.write( localStorage.getItem('result-text-audio') );</script>";
        if ( is_null( $text_audio ) ) {
            
            $id = $DB->get_records_sql("select id from mdl_course where shortname='$text_audio'");
            var_dump( $id );

        }

        //* ------------------------------------------------------------
        //* CREANDO CONTENIDO DEL BLOQUE
        //* ------------------------------------------------------------

        //* Botón para activar el micrófono
        $this->content->text .= html_writer::start_tag( 'div', ['class' => 'button-ecoVoice', 'data-toggle' => 'modal', 'data-target' => '#ecoVoiceModal'] );
        $this->content->text .= html_writer::empty_tag( 'img', ['src' => $link_img_base.'microfono.png', 'alt' => 'Icono para activar opción de voz'] );
        $this->content->text .= html_writer::end_tag( 'div', [] );

        //* ------------------------------------------------------------
        //* VENTANA MODAL CON BOOTSTRAP
        //* ------------------------------------------------------------
        $modal_content = include_once( '../blocks/eco_voice/components/modal_content.php' ); //Importando modal
        $this->content->text .= $modal_content;

        return $this->content;

    }

}
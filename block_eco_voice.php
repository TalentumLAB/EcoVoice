<?php
// This file is part of Moodle - https://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Plugin version and other meta-data are defined here.
 *
 * @package     local_greetings
 * @copyright   2024, Mateo Olaya <desarrollador.web03@talentum.edu.co>
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

// Creando clase para el bloque ecoVoice.
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
    * Obteniendo contenido del bloque.
    *
    * @return string bloque HTML
    */
    public function get_content() {

        // Incluyendo estilos CSS.
        echo '<style>';
        include 'styles/main.css';
        echo '</style>';

        // Incluyendo javaScript.
        echo '<script type="module">';
        include 'scripts/index.js';
        echo '</script>';

        // Ruta para traer contenido multimedia.
        $linkimgbase = '../blocks/eco_voice/pix/';

        // Condición que regresa el contenido si ya ha sido generado.
        if ( $this->content !== null ) {
            return $this->content;
        }

        // Instancia para guardar contenido del bloque.
        $this->content = new stdClass();

        // CREANDO CONTENIDO DEL BLOQUE.

        // Botón para activar el micrófono.
        $this->content->text .= html_writer::start_tag(
            'div',
            [
                'class' => 'button-ecoVoice',
                'data-toggle' => 'modal',
                'data-target' => '#ecoVoiceModal',
            ]
        );
        $this->content->text .= html_writer::empty_tag(
            'img',
            [
                'src' => $linkimgbase.'microfono.png',
                'alt' => 'Icono para activar opción de voz',
            ]
        );
        $this->content->text .= html_writer::end_tag( 'div', [] );

        // VENTANA MODAL CON BOOTSTRAP.

        $modalcontent = include_once( '../blocks/eco_voice/components/modal_content.php' ); // Importando modal.
        $this->content->text .= $modalcontent;

        return $this->content;

    }

}

<?php
// This file is part of Moodle - http://moodle.org/
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
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Block definition class for the block_pluginname plugin.
 *
 * @package   block_pluginname
 * @copyright Year, You Name <your@email.address>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

class block_chatbot_EcoVoice extends block_base {

    /**
     * Initialises the block.
     *
     * @return void
     */
    public function init() {
        $this->title = get_string('titleblock', 'block_chatbot_EcoVoice');
    }

    /**
     * Gets the block contents.
     *
     * @return string The block HTML.
     */
    public function get_content() {
       global $USER, $DB;

        echo '<style>';
        include 'styles/main.css';
        echo '</style>';

        echo '<script>';
        include 'scripts/index.js';
        echo '</script>';
        $link_img_base='../blocks/chatbot_EcoVoice/pix/';

        if ($this->content !== null) {
            return $this->content;
        }

        $this->content =  new stdClass;

        // Div con el icono del chat
        $contenido .= html_writer::start_tag('div', array('id' => 'chat-icon', 'onclick' => 'toggleChat()'));
        $contenido .=html_writer::empty_tag('img' ,array('src'=> $link_img_base.'robot.svg', 'alt' => '','onload'=>'showMessages()'));
        // $contenido .=html_writer::empty_tag('img' ,array('src'=> $link_img_base.'robot.svg', 'alt' => '','onload'=>'showMessages()'));
        $contenido .= html_writer::end_tag('div');
        $contenido .= html_writer::start_tag('div', array('id' => 'chat-container-wrapper', ));
        $contenido .= html_writer::start_tag('div', array('id' => 'chat-container'));
        // Encabezado del chat
        $contenido .= html_writer::start_tag('div', array('id' => 'chat-header'));
        $contenido .= html_writer::start_tag('div', array('id' => ''));
        $contenido .= html_writer::empty_tag('img', array('src' => $link_img_base . 'avatar.png', 'alt' => 'EcoVoice Avatar'));
        $contenido .= html_writer::tag('span', 'EcoVoice');
        $contenido .= html_writer::end_tag('div');
        $contenido .= html_writer::empty_tag('img', array('id' => 'close-btn', 'src' => $link_img_base . 'ic_round-close.svg', 'alt' => 'EcoVoice Avatar', 'onclick' => 'toggleChat()'));
        $contenido .= html_writer::end_tag('div');
    
        // Contenedor del historial del chat
        $contenido .= html_writer::start_tag('div', array('id' => 'chatbox'));
        // Burbuja de respuesta con el avatar
        $contenido .= html_writer::start_tag('div', array('class' => 'message received'));
        $contenido .= html_writer::empty_tag('img', array('class' => 'avatar', 'src' => $link_img_base . 'avatar.png', 'alt' => 'EcoVoice Avatar'));
        $contenido .= '¡Hola! ' . $USER->username . ' ¿En qué puedo ayudarte?';
        $contenido .= html_writer::end_tag('div');
        $contenido .= html_writer::end_tag('div');
    
        // Contenedor de la entrada del usuario
        $contenido .= html_writer::start_tag('div', array('id' => 'user-input-container'));
        $contenido .= html_writer::tag('input', '', array('type' => 'text', 'id' => 'user-input', 'placeholder' => 'Escribe aquí...'));
                
        $contenido .= html_writer::start_tag('button', array('onclick' => 'sendMessageChat()'));
        $contenido .= html_writer::empty_tag('img', array('src' =>  $link_img_base. 'audio.svg', 'alt' => 'Texto alternativo de la imagen'));
        $contenido .= html_writer::end_tag('button');
        $contenido .= html_writer::start_tag('button', array('onclick' => 'sendMessage()'));
        $contenido .= html_writer::empty_tag('img', array('src' =>  $link_img_base. 'Buttons.svg', 'alt' => 'Texto alternativo de la imagen'));
        $contenido .= html_writer::end_tag('button');
               
        $contenido .= html_writer::end_tag('div');
        $contenido .= html_writer::end_tag('div');

       
        $this->content->text = $contenido;


        return $this->content;
    }

    /**
     * Defines in which pages this block can be added.
     *
     * @return array of the pages where the block can be added.
     */
    public function applicable_formats() {
        return [
            'admin' => false,
            'site-index' => false,
            'course-view' => false,
            'mod' => false,
            'my' => true,
        ];
    }

    public function instance_allow_multiple() {
        return true;
    }
    public function hide_header() {
        return true;
    }
}

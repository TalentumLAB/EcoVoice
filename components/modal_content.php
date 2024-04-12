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
 * @copyright   2024 Mateo Olaya Aricapa <desarrollador.web03@talentum.edu.co>
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die;

// VENTANA MODAL CON BOOTSTRAP.
$modalcontent .= html_writer::start_tag( 'div', [
    'class' => 'modal fade',
    'id' => 'ecoVoiceModal',
    'tabindex' => '-1',
    'role' => 'dialog',
    'aria-labelledby' => 'exampleModalLabel',
    'aria-hidden' => 'true',
] );
$modalcontent .= html_writer::start_tag( 'div', ['class' => 'modal-dialog', 'role' => 'document'] );
$modalcontent .= html_writer::start_tag( 'div', ['class' => 'modal-content'] );

// Div que contiene el título y el botón de cerrar modal.
$modalcontent .= html_writer::start_tag( 'div', ['class' => 'modal-header'] );
$modalcontent .= html_writer::tag( 'h5', 'EcoVoice Moodle', ['class' => 'modal-title', 'id' => 'exampleModalLabel'] );
$modalcontent .= html_writer::start_tag(
    'button',
    [
        'type' => 'button',
        'class' => 'close',
        'data-dismiss' => 'modal',
        'aria-label' => 'Close',
    ]
);
$modalcontent .= html_writer::tag( 'span', '&times;', ['aria-hidden' => 'true'] );
$modalcontent .= html_writer::end_tag( 'button' );
$modalcontent .= html_writer::end_tag( 'div' );

// Div para agregar contenido a la modal -- IMPORTANTE.
$modalcontent .= html_writer::start_tag( 'div', ['class' => 'modal-body container_modal'] );

$modalcontent .= html_writer::tag( 'button', 'Activar Voz', ['onclick' => 'reconocimientoVoz()', 'id' => 'button-voice'] );

$modalcontent .= html_writer::start_tag( 'div', ['class' => 'container-instructions'] );
$modalcontent .= html_writer::tag( 'h1', 'Instrucciones para asistente de voz' , [] );
$modalcontent .= html_writer::tag( 'p', '1. Debes mencionar palabras como "muéstrame".' , [] );
$modalcontent .= html_writer::tag( 'p', '2. Debes mencionar el "grado" y la "categoría".' , [] );
$modalcontent .= html_writer::tag( 'p', '3. Por ejemplo: Muéstrame el curso de matemáticas de tercero.' , [] );
$modalcontent .= html_writer::end_tag( 'div' );

$modalcontent .= html_writer::start_tag( 'div', ['class' => 'container-text-audio', 'id' => 'output'] );
$modalcontent .= html_writer::end_tag( 'div' );

$modalcontent .= html_writer::end_tag( 'div' );

// Div que contiene los botones al final del div.
$modalcontent .= html_writer::start_tag( 'div', ['class' => 'modal-footer'] );
$modalcontent .= html_writer::tag(
    'button',
    'Close',
    [
        'type' => 'button',
        'class' => 'btn btn-secondary',
        'data-dismiss' => 'modal',
    ]
);
$modalcontent .= html_writer::end_tag( 'div' );

$modalcontent .= html_writer::end_tag( 'div' );
$modalcontent .= html_writer::end_tag( 'div' );
$modalcontent .= html_writer::end_tag( 'div' );

return $modalcontent;

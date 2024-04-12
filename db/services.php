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

defined('MOODLE_INTERNAL') || die();

$functions = [
    'block_eco_voice_post_textaudio' => [ // Nombre del servicio web.
        'classname' => 'block_eco_voice_external', // Nombre de la clase que contiene la lógica a ejecutar.
        'methodname' => 'post_textaudio', // Método de la clase que contiene la lógica.
        'classpath' => 'blocks/eco_voice/externallib.php',
        'description' => 'change URL with textAudio',
        'type' => 'write',
        'ajax' => true,
    ],
    'block_eco_voice_post_textaudio_grades' => [ // Nombre del servicio web.
        'classname' => 'block_eco_voice_external', // Nombre de la clase que contiene la lógica a ejecutar.
        'methodname' => 'post_textaudio_grades', // Método de la clase que contiene la lógica.
        'classpath' => 'blocks/eco_voice/externallib.php',
        'description' => 'change URL with textAudio for grades',
        'type' => 'write',
        'ajax' => true,
    ],
];

$services = [
    'eco voice service' => [
        'functions' => [
            'block_eco_voice_post_textaudio',
            'block_eco_voice_post_textaudio_grades',
        ], // Web service function name.
        'requiredcapability' => '',
        'restrictedusers' => 0,
        'enabled' => 1,
        'shortname' => 'eco_voice_service',
        'downloadfiles' => 0,
        'uploadfiles' => 0,
    ],
];

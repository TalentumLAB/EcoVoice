<?php
//* ------------------------------------------------------------
//* VENTANA MODAL CON BOOTSTRAP
//* ------------------------------------------------------------
$modal_content .= html_writer::start_tag( 'div', [
    'class' => 'modal fade',
    'id' => 'ecoVoiceModal',
    'tabindex' => '-1',
    'role' => 'dialog',
    'aria-labelledby' => 'exampleModalLabel',
    'aria-hidden' => 'true'
] );
$modal_content .= html_writer::start_tag( 'div', ['class' => 'modal-dialog', 'role' => 'document'] );
$modal_content .= html_writer::start_tag( 'div', ['class' => 'modal-content'] );

//! Div que contiene el título y el botón de cerrar modal
$modal_content .= html_writer::start_tag( 'div', ['class' => 'modal-header'] );
$modal_content .= html_writer::tag( 'h5', 'EcoVoice Moodle', ['class' => 'modal-title', 'id' => 'exampleModalLabel'] );
$modal_content .= html_writer::start_tag( 'button', ['type' => 'button', 'class' => 'close', 'data-dismiss' => 'modal', 'aria-label' => 'Close'] );
$modal_content .= html_writer::tag( 'span', '&times;', ['aria-hidden' => 'true'] );
$modal_content .= html_writer::end_tag( 'button' );
$modal_content .= html_writer::end_tag( 'div' );

//! Div para agregar contenido a la modal -- IMPORTANTE
$modal_content .= html_writer::start_tag( 'div', ['class' => 'modal-body container_modal'] );

$modal_content .= html_writer::tag( 'button', 'Activar Voz', ['onclick' => 'reconocimientoVoz()', 'id' => 'button-voice'] );

$modal_content .= html_writer::start_tag( 'div', ['class' => 'container-instructions'] );
$modal_content .= html_writer::tag( 'h1', 'Instrucciones para asistente de voz' , [] );
$modal_content .= html_writer::tag( 'p', '1. Debes mencionar palabras como "muéstrame".' , [] );
$modal_content .= html_writer::tag( 'p', '2. Debes mencionar el "grado" y la "categoría".' , [] );
$modal_content .= html_writer::tag( 'p', '3. Por ejemplo: Muéstrame el curso de matemáticas de tercero.' , [] );
$modal_content .= html_writer::end_tag( 'div' );

$modal_content .= html_writer::start_tag( 'div', ['class' => 'container-text-audio', 'id' => 'output'] );
$modal_content .= html_writer::end_tag( 'div' );

$modal_content .= html_writer::end_tag( 'div' );

//! Div que contiene los botones al final del div
$modal_content .= html_writer::start_tag( 'div', ['class' => 'modal-footer'] );
$modal_content .= html_writer::tag( 'button', 'Close', ['type' => 'button', 'class' => 'btn btn-secondary', 'data-dismiss' => 'modal'] );
$modal_content .= html_writer::end_tag( 'div' );

$modal_content .= html_writer::end_tag( 'div' );
$modal_content .= html_writer::end_tag( 'div' );
$modal_content .= html_writer::end_tag( 'div' );

return $modal_content;
?>
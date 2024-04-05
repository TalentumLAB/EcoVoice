import { procesoCadenaBusquedaGradoCategoria } from "./functionsTests.mjs";

//* Función que prueba si el textoAudio es procesado para obtener la cadena [ grado + categoría ]
function testProcesoCadenaBusquedaGradoCategoria() {

    const textoAudioPrueba = 'Muestráme el curso de contenido audiovisual de primero';
    const textoConsultaBaseDatos = 'primero - contenido audiovisual';

    //* Ejecutando función a probar
    const resultado = procesoCadenaBusquedaGradoCategoria( textoAudioPrueba );

    if ( resultado === textoConsultaBaseDatos ) {
        console.log( `Test success: ${ resultado }` );
    } else {
        console.error( `Text fail: ${ resultado }` );
    }

}

//* Ejecutando prueba 
testProcesoCadenaBusquedaGradoCategoria();

//* COLOCAR EL SIGUIENTE COMANDO EN LA CONSOLA
//* node scripts\tests\index.test.mjs
import { SpeechRecognize } from "../blocks/eco_voice/scripts/SpeechVoice/speechRecognize.js";

//* Arreglos que abarcan los grados de cada nivel educativo y las categorías o guías o focos
const grados = [
    'transición', 
    'primero', 
    'segundo',
    'tercero',
    'cuarto',
    'quinto',
    'sexto',
    'séptimo',
    'octavo',
    'noveno',
    'décimo',
    'once'
];
const categorias = [
    'matemáticas',
    'ciencias',
    'steam',
    'tecnología'
];

//* Función que activa el botón para reconocer audio por voz
const reconocimientoVoz = async() => {

    //* Obteniendo elementos HTML
    const divOutput = document.getElementById( 'output' );
    const buttonVoice = document.getElementById( 'button-voice' );

    try {
        
        //* Método estático de la clase que ejecuta el proceso de reconocimiento por voz
        //! Recibe: el botón y el div
        const textAudio = await SpeechRecognize.start(divOutput, buttonVoice);

        //* Variable que guarda el grado y la categoría
        let gradosCategorias = '';

        //* Dividiendo la cadena de texto obtenida
        const textoAudioSplit = textAudio.toLowerCase().split(' ');

        //* Función que busca alguna coincidencia con grados o categorías
        const coincidenciaTextoAudio = ( listTextoAudio, listGradosCategorias ) => {

            for ( const texto of listTextoAudio ) {

                for ( const gradoCategoria of listGradosCategorias ) {

                    if ( texto === gradoCategoria ) return gradoCategoria;

                }

            }

        }

        //* Buscando si la cadena contiene algún grado
        gradosCategorias += `${ coincidenciaTextoAudio( textoAudioSplit, grados ) }`;

        //* Buscando si la cadena contiene alguna categoría
        gradosCategorias += `-${ coincidenciaTextoAudio( textoAudioSplit, categorias ) }`;
        
        //* Verificando que la variable gradosCategorias no esté vacía
        if ( gradosCategorias === '' ) {
            console.log( 'Sin coincidencias' );
        } else {
            console.log( gradosCategorias );
            localStorage.setItem( 'result-text-audio', gradosCategorias );
        }

        //* Obteniendo url del navegador
        //const urlNavegador = window.location.href;
        //console.log( urlNavegador );

    } catch (error) {
        console.error('Error en el reconocimiento de voz:', error);
    }

}

/* 
* Permitiendo que la función "reconocimientoVoz"
* se encuentre en el ámbito global de todo el navegador
* de esa manera se puede utilizar en el HTML
*/
window.reconocimientoVoz = reconocimientoVoz;
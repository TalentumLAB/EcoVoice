import { SpeechRecognize } from "../blocks/eco_voice/scripts/SpeechVoice/speechRecognize.js";
import { VoiceAssistant } from "../blocks/eco_voice/scripts/SpeechVoice/voiceAssistant.js";

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
    'tecnología',
    'robótica y electrónica',
    'contenido audiovisual',
    'programación',
    'cuidado de la naturaleza'
];

//* Función que activa el botón para reconocer audio por voz
const reconocimientoVoz = async() => {

    //* Obteniendo elementos HTML
    const divOutput = document.getElementById( 'output' );
    const buttonVoice = document.getElementById( 'button-voice' );

    try {

        //* Volviendo a colocar el div como estaba al inicio
        divOutput.textContent = '';
        divOutput.style.backgroundColor = '#D9D9D9';

        //* ---------------------------------------------------------------------------------------
        //*                             Asistente de texto a voz
        //* ---------------------------------------------------------------------------------------
        const optionsAssistant = { 
            textSayAssistant: 'Hola, soy tu asistente EcoVoice, en qué te puedo ayudar?', 
            language: 'es-ES', 
            volume: 1 
        };
        
        //* Clase que ejecuta el reconocimiento de texto a voz
        await VoiceAssistant.start( optionsAssistant );

        //* ---------------------------------------------------------------------------------------
        //*                             Asistente de voz a texto
        //* ---------------------------------------------------------------------------------------
        //* Clase que ejecuta el reconocimiento de voz a texto
        const textAudio = await SpeechRecognize.start( divOutput, buttonVoice );

        //* Obteniendo cadena [ grado + categoría ]
        const cadenaProcesada = procesoTextoAudioBusqueda( textAudio.toLowerCase() );
        
        //* Verificando que la cadena [ grado + categoría ] sea válido para enviar
        const isValidCadena = procesoValidarTextoAudio( cadenaProcesada );
        
        if ( isValidCadena.ok ) {

            if ( cadenaProcesada === 'Mostrar hora' ) {

                //* Ejecutando asistente de voz
                await VoiceAssistant.start({ textSayAssistant: 'La hora actual es 12:17 p.m.' });

            } else {

                //TODO: organizar el post para mirar si solo es ir a cursos o ir a las calificaciones del curso
                postTextAudioAJAX( cadenaProcesada, divOutput );

            }
        
        } else {

            //* Imprimiendo mensaje de error en la modal de voz
            divOutput.textContent = isValidCadena.error;
            divOutput.style.backgroundColor = '#FDF1F5';
            divOutput.style.color = '#D22F5F';
            divOutput.style.fontWeight = 'bold';

            //* Ejecutando asistente de voz
            await VoiceAssistant.start({ textSayAssistant: isValidCadena.error });

        }

    } catch (error) {
        console.error( `Error en el proceso de voz: ${ error }` );
    }

}

/* 
* Esta función permite obtener la cadena de [ grado + categoría ] 
* para buscar en la base de datos de moodle
*/
const procesoTextoAudioBusqueda = ( textoAudio ) => {

    //TODO: poner cada proceso de búsqueda en una clase con métodos estáticos

    //* Buscando en la cadena si es para mostrar hora actual
    if ( textoAudio.includes( 'hora actual' ) || textoAudio.includes( 'hora' ) ) return 'Mostrar hora';

    //* Variable que guarda el grado y la categoría
    let gradoCategoria = '';

    //* Función que busca si el grado o categoría está incluido en el texto de audio
    const coincidenciaTextoAudio = ( textoVoz, gradosCategorias ) => {

        for ( const valor of gradosCategorias ) {

            //* Revisa si el grado o categoría aparece en el texto
            const esPalabraClaveIncluido = textoVoz.includes( valor );

            //* Regresa el texto para concatenarse en la variable "gradoCategoria"
            if ( esPalabraClaveIncluido ) return valor;

        }

    }

    //* Buscando si la cadena contiene algún grado. Se concatena
    gradoCategoria += `${ coincidenciaTextoAudio( textoAudio, grados ) }`;

    //* Buscando si la cadena contiene alguna categoría. Se concatena
    gradoCategoria += ` - ${ coincidenciaTextoAudio( textoAudio, categorias ) }`;

    return gradoCategoria;

}

/* 
* Esta función se encarga de verificar o validar que la cadena 
* de [ grado + categoría ] sea la adecuada para enviar a AJAX
*/
const procesoValidarTextoAudio = ( cadena ) => {

    const splitCadena = cadena.split(' - ');
    
    //* Sección donde se crean los posibles errores de validación
    if ( cadena === 'undefined - undefined' ) return { ok: false, error: 'No se reconoció la categoria del curso' };
    if ( cadena === '' ) return { ok: false, error: 'No se reconoció la categoria del curso'};
    if ( splitCadena[0] === 'undefined' ) return { ok: false, error: 'Texto de audio incompleto para redirección' };
    if ( splitCadena[1] === 'undefined' ) return { ok: false, error: 'Texto de audio incompleto para redirección'};

    return { ok: true };

}

/* 
* Función que usa AJAX para comunicarse con la API de moodle
*/
const postTextAudioAJAX = ( text, divOutput ) => {

    require(['core/ajax','core/notification'], ( ajax, notification ) => {

        //* Creando promesa
        let promises = ajax.call([{
            methodname: 'block_eco_voice_post_textAudio',
            args: { textAudio: text },
            done: notification.success,
            fail: notification.exception
        }]);

        //* Resolviendo la promesa cuando todo fue éxitoso o hubo fallos
        promises[0].done( async ( response ) => {
            
            //* Revisando si el id no viene vacío en la url del curso
            const id = response.url_course.split('=')[1];

            //* Mostrando mensaje si el id está vacío
            if ( id !== '' ) {

                //* Obteniendo la url del objeto
                window.location.href = response.url_course;

            } else {

                //* Imprimiendo mensaje de error en la modal de voz
                divOutput.textContent = 'Curso no encontrado';
                divOutput.style.backgroundColor = '#FDF1F5';
                divOutput.style.color = '#D22F5F';
                divOutput.style.fontWeight = 'bold';

                //* Ejecutando asistente de voz
                await VoiceAssistant.start({textSayAssistant: 'Curso no encontrado'});

            }

        }).fail(( ex ) => {
            
            notification.addNotification({
                message: 'Error en el proceso de redirección URL curso',
                type: "Error"
            });
            
        });

    });

}

/* 
* Permitiendo que la función "reconocimientoVoz"
* se encuentre en el ámbito global de todo el navegador
* de esa manera se puede utilizar en el HTML
*/
window.reconocimientoVoz = reconocimientoVoz;
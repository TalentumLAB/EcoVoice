import { SpeechRecognize } from "../blocks/eco_voice/scripts/SpeechVoice/speechRecognize.js";
import { VoiceAssistant } from "../blocks/eco_voice/scripts/SpeechVoice/voiceAssistant.js";
import { ProcessTextAudio } from "../blocks/eco_voice/scripts/ProcessTextAudio/process.js";
import { MethodAJAX } from "../blocks/eco_voice/scripts/AJAX/methodAjax.js";

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

            //* Revisando si la cadena es para decir la hora actual
            if ( cadenaProcesada.includes('hora es') ) {

                //* Ejecutando asistente de voz
                await VoiceAssistant.start({ textSayAssistant: cadenaProcesada });

            } else {

                //* Condición para mirar si solo es ir a cursos o ir a las calificaciones del curso
                if ( cadenaProcesada.includes('calificaciones') ) {

                    //* Ejemplo: [ tercero - matemáticas - calificaciones ]
                    const splitCadena = cadenaProcesada.split(' - ');
                    postTextAudioGradesAJAX( `${ splitCadena[0] } - ${ splitCadena[1] }`, divOutput );
                    //MethodAJAX.postTextAudio({
                    //    methodName: 'block_eco_voice_post_textAudio_grades',
                    //    dataPost: { textaudio: `${ splitCadena[0] } - ${ splitCadena[1] }` },
                    //    divOutput,
                    //    VoiceAssistant
                    //});

                } else {

                    postTextAudioAJAX( cadenaProcesada, divOutput );
                    //MethodAJAX.postTextAudio({
                    //    methodName: 'block_eco_voice_post_textAudio',
                    //    dataPost: { textaudio: cadenaProcesada },
                    //    divOutput,
                    //    VoiceAssistant
                    //});

                }

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

    //TODO: primero va calificaciones, después cursos y otros
    
    if ( textoAudio.includes('calificación') || textoAudio.includes('calificaciones') ) {

        //* Procesando [textoAudio] para regresar [grado + categoría + calificaciones]
        const result = ProcessTextAudio.processCalificaciones( textoAudio );

        return result;

    } else if ( textoAudio.includes('curso') ) {

        //* Procesando [textoAudio] para regresar [grado + categoría]
        const result = ProcessTextAudio.processGradoCategoria( textoAudio );

        return result;

    } else {

        //* Procesando [textoAudio] para regresar un resultado como la hora, el día, saludo, etc
        const result = ProcessTextAudio.processOthers( textoAudio );

        return result;

    }

}

/* 
* Esta función se encarga de verificar o validar que la cadena 
* de [ grado + categoría ] sea la adecuada para enviar a AJAX
*/
const procesoValidarTextoAudio = ( cadena ) => {

    //* Error si dice otra cosa que no está definido para el reconocimiento por voz
    if ( cadena === null ) return { ok: false, error: 'No se reconoció el audio. Intentalo de nuevo' };
    
    //* Sección donde se crean los posibles errores de validación
    const splitCadena = cadena.split(' - ');

    if ( cadena === '' ) return { ok: false, error: 'No se reconoció el audio'};
    if ( cadena === 'undefined - undefined' ) return { ok: false, error: 'No se reconoció la categoria del curso' };
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
            methodname: 'block_eco_voice_post_textaudio',
            args: { textaudio: text },
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
                await VoiceAssistant.start({ textSayAssistant: 'Curso no encontrado' });

            }

        }).fail(( ex ) => {

            console.log( ex );
            
            notification.addNotification({
                message: 'Error en el proceso de redirección URL curso',
                type: "Error"
            });
            
        });

    });

}

/* 
* Función que usa AJAX para comunicarse con la API de moodle
* y trae la URL que lleva a las calificaciones de un curso
*/
const postTextAudioGradesAJAX = ( text, divOutput ) => {

    require(['core/ajax','core/notification'], ( ajax, notification ) => {

        //* Creando promesa
        let promises = ajax.call([{
            methodname: 'block_eco_voice_post_textaudio_grades',
            args: { textaudio: text },
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
            
            console.error( ex );

            notification.addNotification({
                message: `Error en el proceso de redirección URL curso`,
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
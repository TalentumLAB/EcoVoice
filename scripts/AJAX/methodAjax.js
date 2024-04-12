export class MethodAJAX {

    constructor(){};

    static postTextAudio( options ) {

        //* Recibiendo atributos para configurar el uso de AJAX
        const { methodName, dataPost, divOutput, VoiceAssistant, assistantResponse = 'Te llevaré a' } = options;

        require(['core/ajax','core/notification'], ( ajax, notification ) => {

            //* Creando promesa
            let promises = ajax.call([{
                methodname: methodName,
                args: dataPost,
                done: notification.success,
                fail: notification.exception
            }]);
    
            //* Resolviendo la promesa cuando todo fue éxitoso o hubo fallos
            promises[0].done( async ( response ) => {
                
                //* Revisando si el id no viene vacío en la url del curso
                const id = response.url_course.split('=')[1];
    
                //* Mostrando mensaje si el id está vacío
                if ( id !== '' ) {

                    //* Ejecutando asistente de voz para que le diga al usuario hacía donde lo redireccionará
                    await VoiceAssistant.start({ textSayAssistant: `${ assistantResponse } ${ dataPost.textaudio }` });
    
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
                
                console.error( ex );
    
                notification.addNotification({
                    message: `Error en el proceso de redirección URL curso`,
                    type: "Error"
                });
                
            });
    
        });

    }

}
//* ----------------------------------------------------------------------------------------------------------------

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

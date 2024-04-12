export class MethodAJAX {

    constructor(){};

    static postTextAudio( options ) {

        //* Recibiendo atributos para configurar el uso de AJAX
        const { methodName, dataPost, divOutput, VoiceAssistant } = options;

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
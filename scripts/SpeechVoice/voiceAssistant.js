/*
* Esta clase utiliza SpeechSynthesisUtterance
* para generar una voz virtual a partir de un texto ingresado
* Documentación: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance 
*/
export class VoiceAssistant {

    static start( options ) {

        return new Promise((resolve, reject) => {

            //* Obteniendo atributos para configurar el asistente de voz
            const { textSayAssistant, language = 'es-ES', volume = 1 } = options;

            //* Verificando que SpeechSynthesisUtterance esté disponible para el navegador
            //if ( !"speechSynthesis" in window ) alert( 'Actualizar el navegador' );

            //* Creando instancia para usar speechSynthesis en el navegador
            const synth = window.speechSynthesis;

            //* Creando solicitud para que el navegador pueda modular el texto a voz
            const utterThis = new SpeechSynthesisUtterance( textSayAssistant );

            //* CONFIGURACIONES
            utterThis.lang = language; //* Idioma para la voz
            utterThis.volume = volume; //* Volumen para la voz

            //* Ejecutando proceso para hablar de texto a voz
            synth.speak( utterThis );

            //* Esta función se activa cuando el asistente de voz finaliza
            //* Se resuelve la promesa para continuar con otros procesos
            utterThis.onend = () => {
                resolve();
            };

        }) ;

    }

}
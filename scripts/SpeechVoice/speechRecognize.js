export class SpeechRecognize {

    constructor(){};

    static start( outputDiv, startButton ) {

        return new Promise((resolve, reject) => {

            const recognition = new (
                window.SpeechRecognition || 
                window.webkitSpeechRecognition || 
                window.mozSpeechRecognition || 
                window.msSpeechRecognition
            )();
    
            //* Configurando el idioma
            recognition.lang = 'es-ES';
    
            //* Este método se ejecuta cuando empieza el reconocimiento por voz
            recognition.onstart = () => {
                startButton.disabled = true;
                startButton.textContent = 'Escuchando...';
            };
    
            //* Este método se ejecuta cuando se obtiene un resultado por voz
            recognition.onresult = ( event ) => {
                const transcript = event.results[0][0].transcript;
                outputDiv.textContent = transcript;
    
                //* Regresando el texto para poder procesarlo en otro lado de la aplicación
                resolve( transcript );
            };
    
            //* Este método se ejecuta cuando se finaliza el reconocimiento por voz
            recognition.onend = () => {
                startButton.disabled = false;
                startButton.textContent = 'Activar Voz';
            };
    
            //* Este método se ejecuta cuando no se reconoce nada de lo que el usuario ha dicho
            recognition.onnomatch = () => {
                outputDiv.textContent = 'No se reconocio voz. Repetir de nuevo';
                reject( new Error('No se reconoció voz. Repetir de nuevo') );
            };
    
            //* Método que se ejecuta cuando no se dice nada en el micrófono
            //recognition.onaudioend = () => {
            //    outputDiv.textContent = 'El usuario no dijo nada';
            //}
    
            //* Ejecutando todo el proceso
            recognition.start();

        });

    }

}
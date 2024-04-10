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

/*
* Clase que realiza el proceso de [textoAudio] para obtener 
* una cadena de texto que permita buscar datos en moodle
*/
export class ProcessTextAudio {
    
    constructor(){};

    //* Esta función regresa un texto diferente a las funcionalidades de búsqueda en moodle
    static processOthers( textoAudio ) {

        if ( textoAudio.includes('hora') || textoAudio.includes('hora actual') ) {

            const fecha = new Date(); //* Obteniendo fecha y hora actual
            
            //* Estableciendo la fecha con el formato local conocido
            const opcionesFormato = {
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit', 
                hour: 'numeric',
                minute: 'numeric', 
                hour12: true 
            };

            //* Sacando solo la hora que se necesita
            const horaActual = fecha.toLocaleString('en-US', opcionesFormato).split(', ');

            return `La hora es: ${ horaActual[1] }`;

        }

        return null;

    }

    //* Esta función encuentra la cadena que une el [grado + categoría]
    static processGradoCategoria( textoAudio ) {

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

    //* Esta función  encuentra la cadena que une el [grado + categoría + calificaciones]
    static processCalificaciones( textoAudio ) {

        let gradoCategoriaCalificacion = '';

        //* Función que busca si el grado o categoría está incluido en el texto de audio
       const coincidenciaTextoAudio = ( textoVoz, gradosCategorias ) => {

           for ( const valor of gradosCategorias ) {

               //* Revisa si el grado o categoría aparece en el texto
               const esPalabraClaveIncluido = textoVoz.includes( valor );

               //* Regresa el texto para concatenarse en la variable "gradoCategoriaCalificacion"
               if ( esPalabraClaveIncluido ) return valor;

           }

       }

       //* Buscando si la cadena contiene algún grado. Se concatena
       gradoCategoriaCalificacion += `${ coincidenciaTextoAudio( textoAudio, grados ) }`;

       //* Buscando si la cadena contiene alguna categoría. Se concatena
       gradoCategoriaCalificacion += ` - ${ coincidenciaTextoAudio( textoAudio, categorias ) }`;

       //* Añadiendo a la cadena la palabra "calificación"
       gradoCategoriaCalificacion += ' - calificaciones'

       return gradoCategoriaCalificacion;

    }

}
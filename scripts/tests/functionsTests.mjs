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

export const procesoCadenaBusquedaGradoCategoria = ( textoAudio ) => {

    //* Variable que guarda el grado y la categoría
    let gradoCategoria = '';

    //* Función que busca si el grado o categoría está incluido en el texto de audio
    const coincidenciaTextoAudio = ( textoVoz, gradosCategorias ) => {

        for ( const valor of gradosCategorias ) {

            //* Revisa si el grado o categoría aparece en el texto
            const esIncluidoGradoCategoria = textoVoz.includes( valor );

            //* Regresa el texto para concatenarse en la variable "gradoCategoria"
            if ( esIncluidoGradoCategoria ) return valor;

        }

    }

    //* Buscando si la cadena contiene algún grado. Se concatena
    gradoCategoria += `${ coincidenciaTextoAudio( textoAudio, grados ) }`;

    //* Buscando si la cadena contiene alguna categoría. Se concatena
    gradoCategoria += ` - ${ coincidenciaTextoAudio( textoAudio, categorias ) }`;

    return gradoCategoria;

}
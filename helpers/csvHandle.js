const fs = require('fs');
const reader = require('csv-reader');
const assert = require('assert');
const autodetecDecoder = require('autodetect-decoder-stream');
const { reset } = require('nodemon');



const file = 'data/amostra-30.csv';

function mostraBlocos(dados) {
    console.log(dados);
}

readCsvNew(file, 1000, mostraBlocos);

function readCsvNew(filepath, chunkLenght, callback) {

    let dataChunk = [];
    let inputStream = fs.createReadStream(filepath)
        .pipe(new autodetecDecoder({ defaultEncoding: '1255' })); // If failed to guess encoding, default to 1255

    inputStream
        .pipe(new reader({ trim: true, delimiter: ';', skipHeader: true }))
        .on('header', validateHeader)
        .on('error', handleError)
        .on('data', handleData)
        .on('end', handleData);


    function validateHeader(headerObteined) {
        let headerExpected = ['id', 'pesid', 'data_inversa', 'dia_semana', 'horario', 'uf', 'br', 'km', 'municipio', 'causa_principal', 'causa_acidente', 'ordem_tipo_acidente', 'tipo_acidente', 'classificacao_acidente', 'fase_dia', 'sentido_via', 'condicao_metereologica', 'tipo_pista', 'tracado_via', 'uso_solo', 'id_veiculo', 'tipo_veiculo', 'marca', 'ano_fabricacao_veiculo', 'tipo_envolvido', 'estado_fisico', 'idade', 'sexo', 'ilesos', 'feridos_leves', 'feridos_graves', 'mortos', 'latitude', 'longitude', 'regional', 'delegacia', 'uop'];
        return assert.deepStrictEqual(headerObteined, headerExpected, 'O cabeçalho não coincide com o template.')
    }

    function handleError(err) {
        throw err;
    }

    function handleData(data) {

        if (dataChunk.length < chunkLenght && data) {
            for (let d = 0; d < data.length; d++) {
                if (data[d] == 'NA' || data[d] == '')
                    data[d] = undefined;
            }
        }
        else {
            //process the chunk of data
            callback(dataChunk);

            //reset the chunk
            dataChunk = [];
        }
        dataChunk.push(data);
    }
}
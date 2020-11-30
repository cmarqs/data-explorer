const fs = require('fs');
const reader = require('csv-reader');
const assert = require('assert');

function readCsvNew(filepath, encoding, separator, columnSet, chunkLenght, callback) {

    let dataChunk = [];
    let inputStream = fs.createReadStream(filepath, encoding)

    inputStream
        .pipe(new reader({ trim: true, delimiter: separator, skipHeader: false, parseNumbers:true, allowQuotes: true, parseBooleans: true, trim:true, asObject: true,  }))
        .on('header', validateHeader)
        .on('error', handleError)
        .on('data', handleData)
        .on('end', handleFinish);


    function validateHeader(headerObteined) {
        let headerExpected = columnSet;// ['id', 'pesid', 'data_inversa', 'dia_semana', 'horario', 'uf', 'br', 'km', 'municipio', 'causa_principal', 'causa_acidente', 'ordem_tipo_acidente', 'tipo_acidente', 'classificacao_acidente', 'fase_dia', 'sentido_via', 'condicao_metereologica', 'tipo_pista', 'tracado_via', 'uso_solo', 'id_veiculo', 'tipo_veiculo', 'marca', 'ano_fabricacao_veiculo', 'tipo_envolvido', 'estado_fisico', 'idade', 'sexo', 'ilesos', 'feridos_leves', 'feridos_graves', 'mortos', 'latitude', 'longitude', 'regional', 'delegacia', 'uop'];
        return assert.deepStrictEqual(headerObteined, headerExpected, 'O cabeçalho não coincide com o template.')
    }

    function handleError(err) {
        throw err;
    }

    function handleData(data) {

        if (data) {
            Object.keys(data).forEach(function (key) {
                if (data[key] === 'NA' || data[key] === '') {
                    data[key] = undefined;
                }
            });
            dataChunk.push(data);
        }

        if (dataChunk.length >= chunkLenght) {
            //process the chunk of data
            callback(dataChunk);

            //reset the chunk
            dataChunk = [];
        }
    }

    function handleFinish() {
        if (dataChunk.length > 0)
            callback(dataChunk);
    }
}

module.exports = { readCsvNew };
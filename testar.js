const csv = require('./helpers/csvHandle');
const pgp = require('pg-promise')({ capSQL: true });
const db = pgp(
    {
        "host": "localhost",
        "port": 5432,
        "database": "pgpromisedemo",
        "user": "appuser",
        "password": "100grilo"
    }      
);

const columnSet = ['id', 'pesid', 'data_inversa', 'dia_semana', 'horario', 'uf', 'br', 'km', 'municipio', 'causa_principal', 'causa_acidente', 'ordem_tipo_acidente', 'tipo_acidente', 'classificacao_acidente', 'fase_dia', 'sentido_via', 'condicao_metereologica', 'tipo_pista', 'tracado_via', 'uso_solo', 'id_veiculo', 'tipo_veiculo', 'marca', 'ano_fabricacao_veiculo', 'tipo_envolvido', 'estado_fisico', 'idade', 'sexo', 'ilesos', 'feridos_leves', 'feridos_graves', 'mortos', 'latitude', 'longitude', 'regional', 'delegacia', 'uop'];
const columnSetObjectArray = [];
columnSet.forEach(column => {
    columnSetObjectArray.push({ name: column });
});
const cs = new pgp.helpers.ColumnSet(columnSetObjectArray, { table: 'prf_data_raw' });

const chunks = 10000;
csv.readCsvNew('data/full.csv', 'latin1', columnSet, chunks, (data) => {

    const insert = pgp.helpers.insert(data, cs);

    db.none(insert)
        .then(() => {
            // success, all records inserted
            console.log('sucesso');
        })
        .catch(error => {
            // error
            console.error(error);
        });
});
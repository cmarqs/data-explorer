const { acidentes: sql } = require('../sql');

class AcidentesRepository{
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }

    // Cria tabelas e views de acidentes com base na PRF
    async create() {
        return this.db.none(sql.create);
    }

    async por_mes_ano() {
        return this.db.any(sql.por_ano);
    }

    async semana_mes_ano(year) {
        return this.db.any(sql.semana_mes_ano, {
            ano: year
        });
    }

    async vitimas_causas_por_ano(year) {
        return this.db.any(sql.vitimas_causas_por_ano, {
            ano: year
        });
    }
}

module.exports = AcidentesRepository;
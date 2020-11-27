

const cs = {};

class JobRepository{
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;

        createColumnset(pgp);
    }
}

function createColumnset(pgp) {
    if (!cs.insert) {
        const table = new pgp.helpers.TableName({ table: 'jobs', schema: 'public' });

        cs.insert = new pgp.helpers.ColumnSet([''])
    }
}
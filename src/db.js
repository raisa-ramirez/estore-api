import pg from 'pg'

const pool = new pg.Pool({
    database: "estore_api",
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432
})

export {
    pool
}

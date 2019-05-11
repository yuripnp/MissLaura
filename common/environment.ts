
export const environment = {
  server: {port: process.env.MONGOLAB_URI || 3000},
  db: {url: process.env.DB_URL || 'mongodb://localhost/nailhear'},
  security: {saltRounds: process.env.SALT_ROUNDS || 10},
  
}

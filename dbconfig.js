const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('expressjwtauth', 'postgres', 'Root8888!', {
    dialect: "postgres",
    host: "localhost",
    logging: false
});

// Fonction pour initialiser la base de données
function init() {
    sequelize.sync({
        force: true
    })
    .then(res => {
        console.log("Les modèles ont été synchronisés avec succès !");
    })
    .catch(err => console.log("Erreur lors de la synchronisation des modèles", err));
}

// Fonction pour connecter à la base de données
async function connect() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Fonction pour fermer la connexion à la base de données
function close() {
    sequelize.close();
}

module.exports = {
    sequelize,
    connect,
    close,
    init
};


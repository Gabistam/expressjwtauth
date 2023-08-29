const User = require('./User');
const Team = require('./Team');
const Club = require('./Club');


Team.hasMany(Club, {
    foreignKey: {
        allowNull: true
    }
});
Team.hasMany(User, {
    foreignKey: {
        name: "team_id",
        allowNull: true
    }
});


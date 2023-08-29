const { Op } = require("sequelize");
const { objectCleaner } = require("../helpers/objectHelper");
const { Club } = require("../models/Club");

exports.ClubController = {
  async create(req, res) {
    const club = await Club.create({
      name: req.body.name, 
    });

    res.send(club);
  },

  async update(req, res) {
    const body = objectCleaner(req.body);

    const club = await Club.update(body, {
      where: {
        id: req.params.id,
      },
    });

    res.send({ message: "Club info updated successfully" });
  },

  async delete(req, res) {
    const club = await Club.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.send({ message: "Club deleted successfully" });
  },

  async getClubById(req, res) {
    const club = await Club.findByPk(req.params.id);
    res.send(club);
  },

  async getClubsByTeam(req, res) {
    const clubs = await Club.findAll({
      where: {
        teamId: req.params.team_id,
      },
    });
    res.send(clubs);
  },

  async getAllClubs(req, res)
  {
        res.send(await Club.findAll())
  },

  async searchClub(req, res) {
    // const clubs = await Club.findAll({
    //   where: {
    //     [Op.and]: [
    //       {
    //         teamId: req.params.team_id,
    //         name: {
    //           [Op.like]: `%${req.query.search}%`,
    //         },
    //       },
    //     ],
    //   },
    // });

    const clubs = await Club.findAll({
      where: {
        name: {
            [Op.like]: `%${req.query.name}%`,
          },
      },
    });
    
    res.send(clubs);
  },
};

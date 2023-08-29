const { ClubController } = require("../controllers/ClubController")
const { clubValidator } = require("../validators/clubValidator")

const router = require("express").Router()


router.post("/", clubValidator, ClubController.create)
router.get("/", ClubController.getAllClubs)
router.get("/search", ClubController.searchClub)
router.get("/by_team/:team_id", ClubController.getClubsByTeam)
router.put("/:id", ClubController.update)
router.delete("/:id", ClubController.delete)
router.get("/:id", ClubController.getClubById)

module.exports = router
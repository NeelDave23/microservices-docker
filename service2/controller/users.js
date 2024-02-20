const User = require("../model/users");

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(400).json({ Message: "User Not Found" });
    } else {
      const updatedName = req.body.name;
      const updatedEmail = req.body.email;
      const updatedUser = await User.update(
        {
          name: updatedName,
          email: updatedEmail,
        },
        {
          where: {
            id: id,
          },
        }
      );

      res.status(200).json("User Updated ");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(400).json({ Message: "User Not Found" });
    } else {
      const deleteuser = User.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({ Message: "User Deleted" });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = { updateUser, deleteUser };

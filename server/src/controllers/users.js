const { tb_users, tb_profiles } = require("../../models");

exports.getUsers = async (req, res) => {
  try {
    const users = await tb_users.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
      include: {
        model: tb_profiles,
        as: "profile",
      },
    });

    res.send({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.editUser = async (req, res) => {
  try {
    let id = req.user.id;

    console.log(id);

    let data = {
      image: req?.file?.filename,
      fullName: req?.body?.fullName,
      email: req?.body?.email,
      bio: req?.body?.bio,
    };

    const user = await tb_users.update(data, {
      where: {
        id,
      },
    });

    const userData = await tb_users.findOne({
      where: {
        id,
      },
    });

    let newData = JSON.parse(JSON.stringify(userData));

    newData = {
      ...newData,
      image: process.env.FILE_PATH + newData.image,
    };

    res.send({
      status: "success",
      message: `Edit finished`,
      data: {
        data: newData,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await tb_users.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Delete user id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await tb_users.findAll({
      where: {
        id,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.check = async (req, res) => {
  try {
    const date = new Date();
    date.setTime(1932403882988);

    let now = new Date();
    now = now.getMilliseconds();

    res.send({
      date,
      now,
    });
  } catch (error) {
    console.log(error);
  }
};

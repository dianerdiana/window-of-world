const { tb_profiles, tb_users } = require("../../models");

exports.editProfile = async (req, res) => {
  const user_id = req.user.id;
  const { gender, phone, address } = req.body;
  const data = {
    gender,
    phone,
    address,
  };

  try {
    const userProfile = await tb_profiles.update(data, {
      where: {
        user_id,
      },
    });

    const updatedProfile = await tb_profiles.findOne({
      where: {
        user_id,
      },
      include: {
        model: tb_users,
        as: "user",
        attributes: {
          exclude: [
            "password",
            "email",
            "role",
            "subscribe",
            "createdAt",
            "updatedAt",
          ],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "user_id"],
      },
    });

    res.send({
      status: "success",
      data: {
        profile: updatedProfile,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

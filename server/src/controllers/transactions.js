const { tb_transactions, tb_users } = require("../../models");

exports.addTransaction = async (req, res) => {
  const user_id = req.user.id;
  const transferProof = req.file.filename;
  const data = {
    user_id,
    transferProof,
    remainingActive: 0,
  };

  try {
    const transaction = await tb_transactions.create(data);

    let dataTransaction = await tb_transactions.findOne({
      where: {
        user_id,
      },
      include: {
        model: tb_users,
        as: "purchaser",
        attributes: {
          exclude: [
            "password",
            "role",
            "subscribe",
            "email",
            "createdAt",
            "updatedAt",
          ],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "user_id"],
      },
    });

    dataTransaction = JSON.parse(JSON.stringify(dataTransaction));

    dataTransaction = {
      ...dataTransaction,
      transferProof: process.env.IMAGE_PATH + dataTransaction.transferProof,
    };

    res.send({
      status: "success",
      data: {
        transaction: dataTransaction,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.editTransaction = async (req, res) => {
  const { id } = req.params;
  const data = {
    payment_status: "Approve",
  };

  try {
    const updateTransaction = await tb_transactions.update(data, {
      where: {
        id,
      },
    });

    // const updateUser = await tb_users.update(
    //   { subscribe: "subscribed" },
    //   {
    //     where: {
    //       id,
    //     },
    //   }
    // );

    const updatedTransaction = await tb_transactions.findOne({
      where: {
        id,
      },
      include: {
        model: tb_users,
        as: "purchaser",
        attributes: {
          exclude: [
            "password",
            "role",
            "subscribe",
            "email",
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
        transaction: updatedTransaction,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await tb_transactions.findOne({
      where: {
        id,
      },
      include: {
        model: tb_users,
        as: "purchaser",
        attributes: {
          exclude: [
            "password",
            "role",
            "subscribe",
            "email",
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
        transaction,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await tb_transactions.findAll({
      include: {
        model: tb_users,
        as: "purchaser",
        attributes: {
          exclude: [
            "password",
            "role",
            "subscribe",
            "email",
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
        transactions,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

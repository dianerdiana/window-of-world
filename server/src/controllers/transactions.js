const { tb_transactions, tb_users } = require("../../models");

exports.addTransaction = async (req, res) => {
  const user_id = req.user.id;
  const transferProof = req.file.filename;
  let remainingActive = new Date();
  remainingActive.setDate(remainingActive.getDate() + 30);

  const data = {
    user_id,
    transferProof,
    remainingActive,
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

    let distance = dataTransaction.remainingActive - new Date();

    dataTransaction = JSON.parse(JSON.stringify(dataTransaction));

    dataTransaction = {
      ...dataTransaction,
      remainingActive: Math.round(distance / (1000 * 3600 * 24)),
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
  let remainingActive = new Date();
  remainingActive.setDate(remainingActive.getDate() + 30);

  const data = {
    payment_status: "Approve",
    remainingActive,
  };

  try {
    const updateTransaction = await tb_transactions.update(data, {
      where: {
        id,
      },
    });

    let updatedTransaction = await tb_transactions.findOne({
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

    let distance = updatedTransaction.remainingActive - new Date();

    updatedTransaction = JSON.parse(JSON.stringify(updatedTransaction));

    updatedTransaction = {
      ...updatedTransaction,
      transferProof: process.env.IMAGE_PATH + updatedTransaction.transferProof,
      remainingActive: Math.round(distance / (1000 * 3600 * 24)),
    };

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
    let transactions = await tb_transactions.findAll({
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

    transactions = JSON.parse(JSON.stringify(transactions));

    transactions = transactions.map((item) => {
      return (transactions = {
        ...item,
        transferProof: process.env.IMAGE_PATH + item.transferProof,
        remainingActive: Math.round(
          (new Date(item.remainingActive) - new Date()) / (1000 * 3600 * 24)
        ),
      });
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

exports.check = async (req, res) => {
  try {
    let now = new Date();
    now.getTime(1649622847188);
    let timeNow = new Date();

    let d = new Date();
    d.setDate(d.getDate() + 30);

    let distance = d - timeNow;

    let distanceDay = Math.floor(distance / (1000 * 3600 * 24));

    res.send({
      now,
      distance,
      distanceDay,
      d,
    });
  } catch (error) {
    console.log(error);
  }
};

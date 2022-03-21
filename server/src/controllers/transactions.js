const { tb_transactions, tb_users } = require("../../models");

exports.addTransaction = async (req, res) => {
  const user_id = req.user.id;
  const transferProof = req.file.filename;
  // let remainingActive = new Date();
  // remainingActive.setDate(remainingActive.getDate() + 30);

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

    // let distance = dataTransaction.remainingActive - new Date();

    // dataTransaction = JSON.parse(JSON.stringify(dataTransaction));

    // dataTransaction = {
    //   ...dataTransaction,
    //   remainingActive: Math.round(distance / (1000 * 3600 * 24)),
    //   transferProof: process.env.IMAGE_PATH + dataTransaction.transferProof,
    // };

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
  const { role } = req.user;
  // let remainingActive = new Date();
  // remainingActive.setDate(remainingActive.getDate() + 30);

  const data = {
    user_status: "Active",
    payment_status: "Approve",
    remainingActive: 30,
  };

  try {
    if (role != "admin") {
      return res.status(403).send({
        status: "Failed",
        message: "You don't have permitted to access!",
      });
    }

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

    let updateUser = await tb_users.update(
      { subscribe: "subscribed" },
      {
        where: {
          id: updatedTransaction.purchaser.id,
        },
      }
    );
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
    let transaction = await tb_transactions.findOne({
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

    // transaction = JSON.parse(JSON.stringify(transaction));

    // transaction = {
    //   ...transaction,
    //   transferProof: process.env.IMAGE_PATH + transaction.transferProof,
    //   remainingActive: Math.round(
    //     (new Date(transaction.remainingActive) - new Date()) /
    //       (1000 * 3600 * 24)
    //   ),
    // };

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

    // transactions = JSON.parse(JSON.stringify(transactions));

    // transactions = transactions.map((item) => {
    //   return (transactions = {
    //     ...item,
    //     transferProof: process.env.IMAGE_PATH + item.transferProof,
    //     remainingActive: Math.round(
    //       (new Date(item.remainingActive) - new Date()) / (1000 * 3600 * 24)
    //     ),
    //   });
    // });

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

exports.updateRemainingActive = async (req, res) => {
  try {
    // dataTransactions = JSON.parse(JSON.stringify(dataTransactions));

    // dataTransactions = dataTransactions.map((data) => {
    //   return (dataTransactions = {
    //     ...data,
    //   });
    // });

    // let dataTransaction = await tb_transactions.findOne({
    //   where: {
    //     id: 2,
    //   },
    // });

    // const update = await dataTransactions.decrement("remainingActive", {
    //   by: 1,
    // });

    let update = await tb_transactions.decrement(
      { remainingActive: 1 },
      { where: { user_status: "Active" } }
    );

    // const dataTransactions = await tb_transactions.findAll();

    // res.send({
    //   status: "success",
    // });
  } catch (error) {
    console.log(error);
  }
};

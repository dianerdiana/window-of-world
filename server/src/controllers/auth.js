// import model
const { tb_users } = require("../../models");

// import joi validation
const Joi = require("joi");
// import bcrypt
const bcrypt = require("bcrypt");
//import jsonwebtoken
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
    fullName: Joi.string().min(5).required(),
  });

  // do validation and get error object from schema.validate
  const { error } = schema.validate(req.body);

  // if error exist send validation error message
  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await tb_users.create({
      email: req.body.email,
      password: hashedPassword,
      fullName: req.body.fullName,
    });

    const token = jwt.sign({ id: newUser.id }, process.env.TOKEN_KEY);

    res.status(200).send({
      status: "success",
      data: {
        user: {
          email: newUser.email,
          fullName: newUser.fullName,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  // our validation schema here
  const schema = Joi.object({
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  // do validation and get error object from schema.validate
  const { error } = schema.validate(req.body);

  // if error exist send validation error message
  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const userExist = await tb_users.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!userExist) {
      return res.send({
        status: "failed",
        message: "Email & password not match",
      });
    }

    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    if (isValid == false) {
      return res.send({
        status: "failed",
        message: "Email & password not match",
      });
    }

    const tokenData = {
      id: userExist.id,
      name: userExist.fullName,
      email: userExist.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_KEY);

    res.status(200).send({
      status: "success",
      data: {
        user: {
          email: userExist.email,
          fullName: userExist.fullName,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const id = req.user.id;

    const dataUser = await tb_users.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.status(404).send({
        status: "failed",
      });
    }

    res.send({
      status: "success",
      data: {
        user: {
          id: dataUser.id,
          fullName: dataUser.fullName,
          email: dataUser.email,
          bio: dataUser.bio,
          image: dataUser.image,
          username: dataUser.username,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};

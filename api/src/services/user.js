const { Category, Services, Solicitud, User, Reviews } = require("../db");
const sendEmail = require("./Emails/registerMail");

const register = async (req, res) => {
  const {
    firstName,
    lastName,
    birthDate,
    email,
    description,
    img,
    offerer,
    admin,
    banned,
    location
  } = req.body;

  try {
    const users = await User.findAll({
      include: {
        model: Services,
        as: "services",
        include: {
          model: Category,
          as: "category",
        },
      },
    });
    if (!firstName || !lastName || !birthDate || !email)
      return res.send("Los datos ingresados estan incompletos");
    const filterEmail = users.filter((e) => e.email === email);
    if (filterEmail[0]) {
      return res.send("El email ya se encuentra registrado");
    } else {
      const newUser = await User.create({
        firstName,
        lastName,
        birthDate,
        email,
        img,
        description,
        location,
        offerer,
        admin,
        banned,
      });
      res.status(201).send(newUser);
    }
  } catch (error) {
    return res.status(400).send(console.log(error.message));
  }
  sendEmail.registerMail(email);
};

const getUsers = async (req, res) => {
  const { id } = req.body;

  const users = await User.findAll({
    include: [
      {
        model: Services,
        as: "services",
        include: {
          model: Category,
          as: "category",
        },
      },
      {
        model: Reviews,
        as: "reviews",
      },
    ],
  });

  return res.status(200).send(users);
};

const updateUser = async (req, res) => {
  const { firstName, lastName, birthDate, description, img, location } = req.body;
  const { email } = req.params;

  await User.update(
    {
      firstName,
      lastName,
      birthDate,
      description,
      img,
      location
    },
    {
      where: {
        email,
      },
    }
  );

  return res.status(201).send("Usuario actualizado");
};

const filterUser = async (req, res) => {
  const { email } = req.params;
  if (email) {
    const users = await User.findAll({
      include: {
        model: Services,
        as: "services",
        include: {
          model: Category,
          as: "category",
        },
      },
    });
    const filterEmail = users.filter((e) => e.email === email);
    if (filterEmail) {
      return res.send(filterEmail);
    } else {
      return res.send("No se encontro el email solicitado");
    }
  }
};


const userById = async (req, res) => {
  const {id} = req.params 
  if (id) {

    try {
      const user = await User.findAll({
      // include: {
      //   model: Services,
      //   as: "services",
      //   include: {
      //     model: Category,
      //     as: "category",
      //   },
      // },
      where: {
        id
      }
    });
    if(user) {
      return res.json(user)
    }
    } catch (error) {
      return res.send("No se encontro el usuario solicitado");
    }
  }

}

module.exports = {
  register,
  getUsers,
  updateUser,
  filterUser,
  userById
};

const isEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

const hasSpace = (string) => {
  const regEx = /\s/;
  if (string.match(regEx)) return true;
  else return false;
};

const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

exports.validateSignupData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Este campo é obrigatório!";
  } else if (!isEmail(data.email)) {
    errors.email = "Email inválido!";
  }

  if (hasSpace(data.userName))
    errors.userName = "O nome de usuário não deve ter espaços!";
  if (isEmpty(data.password)) errors.password = "Este campo é obrigatório!";
  if (isEmpty(data.userName)) errors.userName = "Este campo é obrigatório!";
  if (isEmpty(data.displayName))
    errors.displayName = "Este campo é obrigatório!";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateLoginData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "Este campo é obrigatório!";
  if (isEmpty(data.password)) errors.password = "Este campo é obrigatório!";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

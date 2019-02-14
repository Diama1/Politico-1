

const validate = {

  create(body) {
    function checkName(name) {
      if (!name || name.trim().length === 0) {
        return false;
      }
      return true;
    }
    function checkType(type) {
      if (!type || type.trim().length === 0) {
        return false;
      }
      return true;
    }


    if (checkName(body.name) && checkType(body.type)) {
      return true;
    }

    return false;
  },

  edit(body) {
    function checkName(name) {
      if (typeof (name) === 'undefined') {
        return true;
      }
      if (name && name.trim().length !== 0) {
        return true;
      }
      return false;
    }
    function checkType(type) {
      if (typeof (type) === 'undefined') {
        return true;
      }
      if (type && type.trim().length !== 0) {
        return true;
      }
      return false;
    }

    if (checkName(body.name) && checkType(body.type)) {
      return true;
    }

    return false;
  },
};

export default validate;

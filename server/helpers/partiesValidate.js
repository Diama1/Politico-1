

const validate = {

  create(body) {
    function checkName(name) {
      if (!name || name.trim().length === 0) {
        return false;
      }
      return true;
    }
    function checkHqAddress(hqAddress) {
      if (!hqAddress || hqAddress.trim().length === 0) {
        return false;
      }
      return true;
    }
    function checkLogoUrl(logoUrl) {
      if (!logoUrl || logoUrl.trim().length === 0) {
        return false;
      }
      return true;
    }


    if (checkName(body.name) && checkHqAddress(body.hqAddress) && checkLogoUrl(body.logoUrl)) {
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
    function checkHqAddress(hqAddress) {
      if (typeof (hqAddress) === 'undefined') {
        return true;
      }
      if (hqAddress && hqAddress.trim().length !== 0) {
        return true;
      }
      return false;
    }
    function checkLogoUrl(logoUrl) {
      if (typeof (logoUrl) === 'undefined') {
        return true;
      }
      if (logoUrl && logoUrl.trim().length !== 0) {
        return true;
      }
      return false;
    }


    if (checkName(body.name) && checkHqAddress(body.hqAddress) && checkLogoUrl(body.logoUrl)) {
      return true;
    }

    return false;
  },
};

export default validate;

const moment = require('moment');


class PoliticalOffice {
  constructor() {
    this.politicalOffices = [];
  }

  create(data) {
    const check = this.findName(data.name);
    if (check) {
      return {
        status: false,
        message: 'This name already exists',
      };
    }
    const officeLength = this.politicalOffices.length;
    let id = officeLength + 1;

    if (this.politicalOffices.find(office => office.id === id)) {
      id = this.politicalOffices[officeLength - 1].id + 1;
    }

    const newPoliticalOffice = {
      id,
      type: data.type || '',
      name: data.name || '',
      createdDate: moment.now(),
    };
    this.politicalOffices.push(newPoliticalOffice);
    return {
      status: true,
      data: newPoliticalOffice,
    };
  }

  getAll() {
    return this.politicalOffices;
  }

  getOne(id) {
    return this.politicalOffices.find(office => office.id === parseInt(id, 10));
  }

  update(id, body) {
    const check = this.findName(body.name);
    if (check) {
      return {
        status: false,
        message: 'This name already exists',
      };
    }
    const office = this.getOne(id);
    const index = this.politicalOffices.indexOf(office);
    this.politicalOffices[index].type = body.type || office.type;
    this.politicalOffices[index].name = body.name || office.name;
    return {
      status: true,
      data: this.politicalOffices[index],
    };
  }

  delete(id) {
    const office = this.getOne(id);
    const index = this.politicalOffices.indexOf(office);
    this.politicalOffices.splice(index, 1);
    return {};
  }

  findName(name) {
    return this.politicalOffices.find(office => office.name === name);
  }
}


export default new PoliticalOffice();

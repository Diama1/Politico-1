const moment = require('moment');


class PoliticalParty {
  constructor() {
    this.politicalParties = [];
  }


  create(data) {
    const check = this.findName(data.name);
    if (check) {
      return {
        status: false,
        message: 'This name already exists',
      };
    }
    const partyLength = this.politicalParties.length;
    let id = partyLength + 1;

    if (this.politicalParties.find(party => party.id === id)) {
      id = this.politicalParties[partyLength - 1].id + 1;
    }

    const newPoliticalParty = {
      id,
      name: data.name || '',
      hqAddress: data.hqAddress || '',
      logoUrl: data.logoUrl || '',
      createdDate: moment.now(),
    };
    this.politicalParties.push(newPoliticalParty);
    return {
      status: true,
      data: newPoliticalParty,
    };
  }

  getAll() {
    return this.politicalParties;
  }

  getOne(id) {
    return this.politicalParties.find(party => party.id === parseInt(id, 10));
  }

  update(id, body) {
    const party = this.getOne(id);
    const check = this.findName(body.name);
    if (check) {
      return {
        status: false,
        message: 'This name already exists',
      };
    }
    const index = this.politicalParties.indexOf(party);
    this.politicalParties[index].name = body.name || party.name;
    this.politicalParties[index].hqAddress = body.hqAddress || party.hqAddress;
    this.politicalParties[index].logoUrl = body.logoUrl || party.logoUrl;
    return {
      status: true,
      data: this.politicalParties[index],
    };
  }

  delete(id) {
    const party = this.getOne(id);
    const index = this.politicalParties.indexOf(party);
    this.politicalParties.splice(index, 1);
    return {};
  }

  findName(name) {
    return this.politicalParties.find(party => party.name === name);
  }
}


export default new PoliticalParty();

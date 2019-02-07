const moment =  require('moment');


class PoliticalOffice{



  constructor() {
    this.politicalOffices = [];
  }

  create(data) {
    let officeLength = this.politicalOffices.length;
    let id = officeLength + 1;

    if(this.politicalOffices.find(office => office.id === id)){
      id = this.politicalOffices[officeLength-1].id + 1;
    }
    
    const newPoliticalOffice = {
      id: id,
      type: data.type || '',
      name: data.name || '',
      createdDate: moment.now()
    };
    this.politicalOffices.push(newPoliticalOffice);
    return newPoliticalOffice;
    
  }

  getAll() {
    return this.politicalOffices;
  }

  getOne(id) {
    return this.politicalOffices.find(office => office.id == id);
  }

  update(id,body) {
    const office = this.getOne(id);
    const index = this.politicalOffices.indexOf(office);
    this.politicalOffices[index].type = body["type"] || office.type;
    this.politicalOffices[index].name = body["name"] || office.name;
    return this.politicalOffices[index];
  }

  delete(id) {
    const office = this.getOne(id);
    const index = this.politicalOffices.indexOf(office);
    this.politicalOffices.splice(index,1);
    return {};
  }



}


module.exports = new  PoliticalOffice();
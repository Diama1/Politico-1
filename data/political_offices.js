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



}


module.exports = new  PoliticalOffice();
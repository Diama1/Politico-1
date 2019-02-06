const moment =  require('moment');

class PoliticalParty{



  constructor() {
    this.politicalParties = [];
  }


  create(data) {
    let partyLength = this.politicalParties.length;
    let id = partyLength + 1;

    if(this.politicalParties.find(party => party.id === id)){
      id = this.politicalParties[partyLength-1].id + 1;
    }
    
    const newPoliticalParty = {
      id: id,
      name: data.name || '',
      hqAddress: data.hqAddress || '',
      logoUrl: data.logoUrl || '',
      createdDate: moment.now()
    };
    this.politicalParties.push(newPoliticalParty);
    return newPoliticalParty;
    
  }

  getAll(){
    return this.politicalParties;
  }


}


module.exports = new  PoliticalParty();
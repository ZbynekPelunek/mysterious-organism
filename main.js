// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (num, arr) => {
  return {
    _specimenNum: num,
    _dna: arr,
    get specimenNum () {
      return this._specimenNum;
    },
    get dna () {
      return this._dna;
    },
    set specimenNum (specNum){
      this._specimenNum = specNum;
    },
    set dna (d){
      this._dna = d;
    },
    mutate () {
      //change previous DNA base to a new one that is not the same as previous one
      //cant change A to A but only to T, C, G
      let newDNAbase = '';
      let previousDNAbase = '';
      do {
        const baseIndex = Math.floor(Math.random() * this.dna.length);
        previousDNAbase = this.dna[baseIndex];
        newDNAbase = returnRandBase();
        this.dna[baseIndex] = newDNAbase;
      } while (newDNAbase == previousDNAbase);
      
    },
    compareDNA (pAequor) {
      let totalCommon = 0;
      for (let i = 0; i < this.dna.length; i++){
        if(this.dna[i] == pAequor.dna[i]){
          totalCommon++;
        };
      };
      let percentCommon = totalCommon / this.dna.length * 100;
      console.log(`specimen #1 and specimen #2 have ${Math.round(percentCommon)}% DNA in common`);
    },
    willLikelySurvive () {
      //only with 60% or more of C and G bases will likely survive
      let totalCandG = 0;

      for(let i = 0; i < this.dna.length; i++){
        if(this.dna[i] == 'C' || this.dna[i] == 'G'){
          totalCandG++;
        };
      };

      let percentOfCandG = totalCandG / this.dna.length * 100;
      
      return (percentOfCandG >= 60 ? true : false);
    }
  }
}

const generateStrongPAequors = (howMany = 2) => {

  let strongPAequors = [];
  let pAequorNumber = 1;
  while(strongPAequors.length < howMany){
    const currObj = pAequorFactory(pAequorNumber, mockUpStrand());
    if(currObj.willLikelySurvive()){
      strongPAequors.push(currObj);
    }
    pAequorNumber++;
  }

  //console.log(pAequorNumber + ' ' + strongPAequors.length);
}

generateStrongPAequors(30);



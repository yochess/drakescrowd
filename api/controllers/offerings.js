const offerings = [
  {
    id: 1,
    available: true,
    name: 'Huge Apartment',
    company: 'Company ABC',
    img: 'http://www.techinsights.com/uploadedImages/Public_Website/Content_-_Primary/Teardowncom/Sample_Reports/sample-icon.png',
    type: 'property',
    min: 100000,
    hold: 3,
    target: {
      irr: 0.3,
      cash: 0.2
    },
    marketPrice: 10000000,
    details: 'Additional Details for id: 1'
  },
  {
    id: 2,
    available: true,
    name: 'Medium Apartment',
    company: 'Company ABC',
    img: 'http://www.techinsights.com/uploadedImages/Public_Website/Content_-_Primary/Teardowncom/Sample_Reports/sample-icon.png',
    type: 'property',
    min: 50000,
    hold: 3,
    target: {
      irr: 0.24,
      cash: 0.16
    },
    marketPrice: 5000000,
    details: 'Additional Details for id: 2'
  },
  {
    id: 3,
    available: true,
    name: 'Small Apartment',
    company: 'Company XYZ',
    img: 'http://www.techinsights.com/uploadedImages/Public_Website/Content_-_Primary/Teardowncom/Sample_Reports/sample-icon.png',
    type: 'property',
    min: 25000,
    hold: 3,
    target: {
      irr: 0.2,
      cash: 0.1
    },
    marketPrice: 2000000,
    details: 'Additional Details for id: 3'
  },
  {
    id: 4,
    available: false,
    name: 'Huge Home',
    company: 'Company ABC',
    img: 'http://www.techinsights.com/uploadedImages/Public_Website/Content_-_Primary/Teardowncom/Sample_Reports/sample-icon.png',
    type: 'property',
    min: 100000,
    hold: 3,
    target: {
      irr: 0.3,
      cash: 0.2
    },
    marketPrice: 6000000,
    details: 'Additional Details for id: 1'
  },
  {
    id: 5,
    available: false,
    name: 'Medium Home',
    company: 'Company ABC',
    img: 'http://www.techinsights.com/uploadedImages/Public_Website/Content_-_Primary/Teardowncom/Sample_Reports/sample-icon.png',
    type: 'property',
    min: 50000,
    hold: 3,
    target: {
      irr: 0.24,
      cash: 0.16
    },
    marketPrice: 3000000,
    details: 'Additional Details for id: 2'
  },
  {
    id: 6,
    available: false,
    name: 'Small Home',
    company: 'Company XYZ',
    img: 'http://www.techinsights.com/uploadedImages/Public_Website/Content_-_Primary/Teardowncom/Sample_Reports/sample-icon.png',
    type: 'property',
    min: 25000,
    hold: 3,
    target: {
      irr: 0.2,
      cash: 0.1
    },
    marketPrice: 1000000,
    details: 'Additional Details for id: 3'
  }
];


const fetchAllOfferings = (req, res) => {
  return res.send(offerings);
};

const fetchOffering = (req, res) => {
  const id = +req.params.id;

  return res.send(offerings[id-1]);
};


export default {
  fetchAllOfferings,
  fetchOffering
};

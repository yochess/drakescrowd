const investors = [
  {
    id: 1,
    name: 'Investor A'
  },
  {
    id: 2,
    name: 'Investor B'
  }
];

const companies = [
  {
    id: 1,
    name: 'Company ABC'
  },
  {
    id: 2,
    name: 'Company XYZ'
  }
];

const properties = [
  {
    id: 1,
    name: 'Huge Apartment',
    img: 'http://www.techinsights.com/uploadedImages/Public_Website/Content_-_Primary/Teardowncom/Sample_Reports/sample-icon.png',
    type: 'property',
    min: 100000,
    target: {
      irr: 0.3,
      cash: 0.2
    },
    marketPrice: 10000000,
    available: true,
    companyId: 1,
    additionalDetails: 'blah blah'
  },
  {
    id: 2,
    name: 'Medium Apartment',
    img: 'http://www.techinsights.com/uploadedImages/Public_Website/Content_-_Primary/Teardowncom/Sample_Reports/sample-icon.png',
    type: 'property',
    min: 50000,
    target: {
      irr: 0.24,
      cash: 0.16
    },
    marketPrice: 5000000,
    available: true,
    companyId: 1,
    additionalDetails: 'blah blah'
  },
  {
    id: 3,
    name: 'Small Apartment',
    img: 'http://www.techinsights.com/uploadedImages/Public_Website/Content_-_Primary/Teardowncom/Sample_Reports/sample-icon.png',
    type: 'property',
    min: 25000,
    target: {
      irr: 0.2,
      cash: 0.15
    },
    marketPrice: 2000000,
    available: true,
    companyId: 2,
    additionalDetails: 'blah blah'
  },
    {
    id: 4,
    name: 'Huge Home',
    img: 'http://www.techinsights.com/uploadedImages/Public_Website/Content_-_Primary/Teardowncom/Sample_Reports/sample-icon.png',
    type: 'property',
    min: 100000,
    target: {
      irr: 0.3,
      cash: 0.2
    },
    marketPrice: 10000000,
    available: false,
    companyId: 1,
    additionalDetails: 'blah blah'
  },
  {
    id: 5,
    name: 'Medium Home',
    img: 'http://www.techinsights.com/uploadedImages/Public_Website/Content_-_Primary/Teardowncom/Sample_Reports/sample-icon.png',
    type: 'property',
    min: 50000,
    target: {
      irr: 0.24,
      cash: 0.16
    },
    marketPrice: 5000000,
    available: false,
    companyId: 1,
    additionalDetails: 'blah blah'
  },
  {
    id: 6,
    name: 'Small Home',
    img: 'http://www.techinsights.com/uploadedImages/Public_Website/Content_-_Primary/Teardowncom/Sample_Reports/sample-icon.png',
    type: 'property',
    min: 25000,
    target: {
      irr: 0.2,
      cash: 0.15
    },
    marketPrice: 2000000,
    available: false,
    companyId: 2,
    additionalDetails: 'blah blah'
  }
];

const investments = [
  {
    id: 1,
    propertyId: 1,
    investorId: 1,
    amount: 5000000,
    pending: true,
    approved: false
  },
  {
    id: 2,
    propertyId: 1,
    investorId: 2,
    amount: 5000000,
    pending: true,
    approved: false
  },
  {
    id: 3,
    propertyId: 2,
    investorId: 1,
    amount: 2500000,
    pending: true,
    approved: false
  },
  {
    id: 4,
    propertyId: 2,
    investorId: 2,
    amount: 5000000,
    pending: true,
    approved: false
  },
  {
    id: 5,
    propertyId: 3,
    investorId: 1,
    amount: 1000000,
    pending: true,
    approved: false
  },
  {
    id: 6,
    propertyId: 3,
    investorId: 2,
    amount: 1000000,
    pending: true,
    approved: false
  },
{
    id: 7,
    propertyId: 4,
    investorId: 1,
    amount: 5000000,
    pending: false,
    approved: true
  },
  {
    id: 8,
    propertyId: 4,
    investorId: 2,
    amount: 5000000,
    pending: false,
    approved: true
  },
  {
    id: 9,
    propertyId: 5,
    investorId: 1,
    amount: 2500000,
    pending: false,
    approved: true
  },
  {
    id: 10,
    propertyId: 5,
    investorId: 2,
    amount: 5000000,
    pending: false,
    approved: true
  },
  {
    id: 11,
    propertyId: 6,
    investorId: 1,
    amount: 1000000,
    pending: false,
    approved: true
  },
  {
    id: 12,
    propertyId: 6,
    investorId: 2,
    amount: 1000000,
    pending: false,
    approved: true
  },
];

// const data = [
//   {
//     id: 1,
//     available: true,
//     name: 'Huge Apartment',
//     company: 'Company ABC',
//     img: 'http://www.techinsights.com/uploadedImages/Public_Website/Content_-_Primary/Teardowncom/Sample_Reports/sample-icon.png',
//     type: 'property',
//     min: 100000,
//     hold: 3,
//     target: {
//       irr: 0.3,
//       cash: 0.2
//     },
//     marketPrice: 10000000,
//     details: 'Additional Details for id: 1',
//     investors: [],
//     pending: [1,2]
//   },
//   {
//     id: 2,
//     available: true,
//     name: 'Medium Apartment',
//     company: 'Company ABC',
//     img: 'http://www.techinsights.com/uploadedImages/Public_Website/Content_-_Primary/Teardowncom/Sample_Reports/sample-icon.png',
//     type: 'property',
//     min: 50000,
//     hold: 3,
//     target: {
//       irr: 0.24,
//       cash: 0.16
//     },
//     marketPrice: 5000000,
//     details: 'Additional Details for id: 2',
//     investors: [],
//     pending: [1,2]
//   },
//   {
//     id: 3,
//     available: true,
//     name: 'Small Apartment',
//     company: 'Company XYZ',
//     img: 'http://www.techinsights.com/uploadedImages/Public_Website/Content_-_Primary/Teardowncom/Sample_Reports/sample-icon.png',
//     type: 'property',
//     min: 25000,
//     hold: 3,
//     target: {
//       irr: 0.2,
//       cash: 0.1
//     },
//     marketPrice: 2000000,
//     details: 'Additional Details for id: 3',
//     investors: [],
//     pending: [1,2]
//   },
//   {
//     id: 4,
//     available: false,
//     name: 'Huge Home',
//     company: 'Company ABC',
//     img: 'http://www.techinsights.com/uploadedImages/Public_Website/Content_-_Primary/Teardowncom/Sample_Reports/sample-icon.png',
//     type: 'property',
//     min: 100000,
//     hold: 3,
//     target: {
//       irr: 0.3,
//       cash: 0.2
//     },
//     marketPrice: 6000000,
//     details: 'Additional Details for id: 1',
//     investors: [1,2],
//     pending: []
//   },
//   {
//     id: 5,
//     available: false,
//     name: 'Medium Home',
//     company: 'Company ABC',
//     img: 'http://www.techinsights.com/uploadedImages/Public_Website/Content_-_Primary/Teardowncom/Sample_Reports/sample-icon.png',
//     type: 'property',
//     min: 50000,
//     hold: 3,
//     target: {
//       irr: 0.24,
//       cash: 0.16
//     },
//     marketPrice: 3000000,
//     details: 'Additional Details for id: 2',
//     investors: [1,2],
//     pending: []
//   },
//   {
//     id: 6,
//     available: false,
//     name: 'Small Home',
//     company: 'Company XYZ',
//     img: 'http://www.techinsights.com/uploadedImages/Public_Website/Content_-_Primary/Teardowncom/Sample_Reports/sample-icon.png',
//     type: 'property',
//     min: 25000,
//     hold: 3,
//     target: {
//       irr: 0.2,
//       cash: 0.1
//     },
//     marketPrice: 1000000,
//     details: 'Additional Details for id: 3',
//     investors: [1,2],
//     pending: []
//   }
// ];

export default {
  investors,
  companies,
  properties,
  investments
};

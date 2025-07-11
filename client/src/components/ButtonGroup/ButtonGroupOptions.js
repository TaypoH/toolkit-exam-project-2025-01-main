const options = [
  {
    value: 'minor',
    label: 'Yes',
    description: 'But minor variations are allowed',
    recommended: true,
  },
  {
    value: 'exact',
    label: 'Yes',
    description: 'The Domain should exactly match the name',
    recommended: false,
  },
  {
    value: 'no',
    label: 'No',
    description: 'I am only looking for a name, not a Domain',
    recommended: false,
  },
];

export default options; 
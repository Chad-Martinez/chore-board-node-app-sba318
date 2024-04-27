import axios, { AxiosResponse } from 'axios';

const API_ENDPOINT = 'http://localhost:3000/api';

export const validatePerson = async (personName: string): Promise<boolean> => {
  try {
    const { data }: AxiosResponse = await axios.get(
      `${API_ENDPOINT}/people/${personName}`
    );

    const { name } = data;

    if (personName === name) {
      alert('Person is already on the chore board');
      return false;
    }

    if (personName === '') {
      alert('You must enter a name');
      return false;
    }
  } catch (error) {
    console.error('Validate name error ', error);
    throw error;
  }
  return true;
};

export const validateSelections = (addChoreForm: HTMLDivElement): boolean => {
  const choreSelect = addChoreForm.querySelector(
    '#chore-select'
  ) as HTMLSelectElement;
  const personSelect = choreSelect?.nextElementSibling as HTMLSelectElement;
  const errors: Array<string> = [];
  if (choreSelect.value == 'Choose a chore')
    errors.push('You musht choose a chore');

  if (personSelect.value == 'Assign it to...')
    errors.push('You must select a person');

  if (errors.length > 0) {
    alert(
      `Please correct the following errors: \n${errors[0]}\n${
        errors[1] === undefined ? '' : errors[1]
      }`
    );
    return false;
  } else {
    return true;
  }
};

export default {
  validatePerson,
  validateSelections,
};

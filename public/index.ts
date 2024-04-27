import axios from 'axios';
import { validatePerson, validateSelections } from '../helpers/validators';

const API_ENDPOINT = 'http://localhost:3000/api';
type Chore = {
  id: string;
  name: string;
  assigned?: string;
};

type Person = {
  id: string;
  name: string;
  chores: Array<Chore>;
};

const people: Array<Person> = [];
const chores: Array<Chore> = [];

(async (): Promise<void> => {
  try {
    const { data: peopleData } = await axios.get(`${API_ENDPOINT}/people`);
    const { data: choreData } = await axios.get(`${API_ENDPOINT}/chores`);

    people.push(...peopleData);
    chores.push(...choreData);
    console.log('people ', people, 'chores ', chores);
  } catch (error) {
    console.error('Error loading initial data ', error);
  }
})();

const headerAddButton = document.querySelector(
  '.btn-container'
)! as HTMLDivElement;

const addChoreForm = document.getElementById(
  'add-chore-form'
)! as HTMLDivElement;
addChoreForm.style.left = `${window.innerWidth}px`;

const addItemDropdown = document.getElementById(
  'add-dropdown'
)! as HTMLDivElement;
addItemDropdown.style.left = `${window.innerWidth}px`;

const addPersonForm = document.getElementById(
  'add-person-form'
)! as HTMLDivElement;
addPersonForm.style.left = `${window.innerWidth}px`;

const handleToggleMenu = (): void => {
  const btnGroup = addItemDropdown.firstElementChild as HTMLDivElement;
  const choreBtn = btnGroup.lastElementChild as HTMLButtonElement;
  choreBtn.classList.remove('disabled');
  choreBtn.disabled = false;

  if (choreBtn.classList.contains('disabled') && people.length > 0) {
  }
  if (people.length <= 0 && !choreBtn.classList.contains('disabled')) {
    choreBtn.classList.add('disabled');
    choreBtn.disabled = true;
  }

  if (
    addPersonForm.style.left ==
    `${window.innerWidth - +addPersonForm.offsetWidth}px`
  ) {
    addPersonForm.style.left = `${window.innerWidth}px`;
  } else if (addItemDropdown.style.left == `${window.innerWidth}px`) {
    addItemDropdown.style.left = `${
      window.innerWidth - +addItemDropdown.offsetWidth
    }px`;
  } else {
    addItemDropdown.style.left = `${window.innerWidth}px`;
  }
};

const handleAddEvent = async (event: MouseEvent): Promise<void> => {
  try {
    const { data: peopleData } = await axios.get(`${API_ENDPOINT}/people`);
    const { data: choreData } = await axios.get(`${API_ENDPOINT}/chores`);

    people.push(...peopleData);
    chores.push(...choreData);
    console.log('people ', people, 'chores ', chores);
  } catch (error) {
    console.error('Error loading initial data ', error);
  }
  if (event.target instanceof HTMLButtonElement) {
    const button: HTMLButtonElement = event.target;
    if (button.id == 'add-person') {
      addItemDropdown.setAttribute('data-trigger', button.id);
      addItemDropdown.style.left = `${window.innerWidth}px`;
    }
    if (button.id == 'add-chore') {
      addItemDropdown.setAttribute('data-trigger', button.id);
      addItemDropdown.style.left = `${window.innerWidth}px`;
    }
  }
};

const handleMenuTransition = (event: TransitionEvent) => {
  if (event.target instanceof HTMLDivElement) {
    const { trigger } = event.target.dataset;
    if (trigger == 'add-person') {
      addPersonForm.style.left = `${
        window.innerWidth - +addPersonForm.offsetWidth
      }px`;
    }
    if (trigger == 'add-chore') {
      addChoreForm.style.left = `${
        window.innerWidth - +addChoreForm.offsetWidth
      }px`;
    }
    addItemDropdown.removeAttribute('data-trigger');
  }
};

const handleAddPersonEvent = async (event: MouseEvent): Promise<void> => {
  event.preventDefault();
  if (event.target instanceof HTMLButtonElement) {
    if (event.target.classList.contains('cancel')) {
      addPersonForm.style.left = `${window.innerWidth}px`;
    } else {
      try {
        const personInput: HTMLInputElement =
          addPersonForm.getElementsByTagName('input')[0];
        const personName: string = personInput.value.trim();
        const isValid: Promise<boolean> = validatePerson(personName);

        if (!isValid) return;

        const { data } = await axios.post(`${API_ENDPOINT}/people`, {
          name: personName,
        });
        people.push({ id: data.id, name: personName, chores: [] });
        personInput.value = '';
      } catch (error) {
        alert('Error adding person. Please try again');
        console.error('Error adding person: ', error);
      }
    }
  }
};

const handlePersonTransition = (event: TransitionEvent) => {
  if (event.target instanceof HTMLDivElement) {
    const { trigger } = event.target.dataset;
    const addChoreForm = document.getElementById(
      'add-chore-form'
    )! as HTMLDivElement;
    if (trigger == 'add-person') {
      addChoreForm.style.left = `${
        window.innerWidth - +addChoreForm.offsetWidth
      }px`;
    }
    addPersonForm.removeAttribute('data-trigger');
  }
};

const handleAssignChore = async (event: MouseEvent) => {
  event.preventDefault();
  if (event.target instanceof HTMLButtonElement) {
    const button: HTMLButtonElement = event.target;

    if (button.classList.contains('cancel')) {
      addChoreForm.style.left = `${window.innerWidth}px`;
    } else {
      const isValid: boolean = validateSelections(addChoreForm);
      if (isValid) {
        const errors: NodeListOf<HTMLDivElement> =
          addChoreForm.querySelectorAll('.error');
        errors && errors.forEach((error) => error.remove());
        const selectInputs = document.getElementsByTagName(
          'select'
        ) as HTMLCollectionOf<HTMLSelectElement>;
        const person: Person | undefined = people.find(
          (person) => person.id == selectInputs[1].selectedOptions[0].id
        );
        selectInputs[1].value = 'Assign it to...';
        const chore: Chore | undefined = chores.find(
          (chore) => chore.id == selectInputs[0].selectedOptions[0].id
        );
        if (chore) person?.chores.push(chore);
        selectInputs[0].value = 'Choose a chore';
        try {
          await axios.put(`${API_ENDPOINT}/people`, {
            person: person,
          });
        } catch (error) {
          alert(error.message);
        }
        addChoreForm.style.left = `${window.innerWidth}px`;
      }
    }
  }
};

headerAddButton.addEventListener('click', handleToggleMenu);
addItemDropdown.addEventListener('transitionend', handleMenuTransition);
addItemDropdown.addEventListener('click', handleAddEvent);
addPersonForm.addEventListener('click', handleAddPersonEvent);
addPersonForm.addEventListener('transitionend', handlePersonTransition);
addChoreForm.addEventListener('click', handleAssignChore);

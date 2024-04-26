import axios from 'axios';

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

const handleToggleMenu = async (): Promise<void> => {
  const response = await axios.get('http://localhost:3000/api/people');
  console.log('response', response);

  // const addItemDropdown = document.getElementById(
  //   'add-dropdown'
  // )! as HTMLDivElement;

  const btnGroup = addItemDropdown.firstElementChild as HTMLDivElement;
  const choreBtn = btnGroup.lastElementChild as HTMLButtonElement;
  const addPersonForm = document.getElementById(
    'add-person-form'
  )! as HTMLDivElement;
  const people: Array<Person> = [];

  if (choreBtn.classList.contains('disabled') && people.length > 0) {
    choreBtn.classList.remove('disabled');
    choreBtn.disabled = false;
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

const handleAddEvent = (event: MouseEvent): void => {
  if (event.target instanceof HTMLButtonElement) {
    const button: HTMLButtonElement = event.target;
    const addItemDropdown = document.getElementById(
      'add-dropdown'
    )! as HTMLDivElement;
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
    const addItemDropdown = document.getElementById(
      'add-dropdown'
    )! as HTMLDivElement;
    const addPersonForm = document.getElementById(
      'add-person-form'
    )! as HTMLDivElement;
    const addChoreForm = document.getElementById(
      'add-chore-form'
    )! as HTMLDivElement;
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
    const addPersonForm = document.getElementById(
      'add-person-form'
    )! as HTMLDivElement;
    if (event.target.classList.contains('cancel')) {
      addPersonForm.style.left = `${window.innerWidth}px`;
    } else {
      try {
        const personInput: HTMLInputElement =
          addPersonForm.getElementsByTagName('input')[0];
        const personName: string = personInput.value.trim();

        // Replace alert with error div
        if (!personName) return alert('Must enter a name');

        const response = await axios.post('http://localhost:3000/api/people', {
          name: personName,
        });
        console.log('response add name ', response);
        personInput.value = '';
      } catch (error) {
        alert('Error adding person. Please try again');
        console.log('try catch error ', error);
      }
    }
  }
};

const handlePersonTransition = (event: TransitionEvent) => {
  if (event.target instanceof HTMLDivElement) {
    const { trigger } = event.target.dataset;
    const addPersonForm = document.getElementById(
      'add-person-form'
    )! as HTMLDivElement;
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

const handleAddChore = (event: MouseEvent) => {
  if (event.target instanceof HTMLButtonElement) {
    const button: HTMLButtonElement = event.target;
    // const addChoreForm = document.getElementById(
    //   'add-chore-form'
    // )! as HTMLDivElement;
    if (button.classList.contains('cancel')) {
      addChoreForm.style.left = `${window.innerWidth}px`;
    } else {
      // const isValid: boolean = validateSelections(addChoreForm);
      // if (isValid) {
      //   const errors: NodeListOf<HTMLDivElement> =
      //     addChoreForm.querySelectorAll('.error');
      //   errors && errors.forEach((error) => error.remove());
      //   const selectInputs = document.getElementsByTagName(
      //     'select'
      //   ) as HTMLCollectionOf<HTMLSelectElement>;
      //   const people = App.people();
      //   const person: Person | undefined = people.find(
      //     (person) => person.id == selectInputs[1].selectedOptions[0].id
      //   );
      //   selectInputs[1].value = 'Assign it to...';
      //   const chore: Chore | undefined = CHORE_LIST.find(
      //     (chore) => chore.id == selectInputs[0].selectedOptions[0].id
      //   );
      //   selectInputs[0].value = 'Choose a chore';
      //   chore && person?.addChore(chore);
      //   App.renderChoreCards(people);
      //   addChoreForm.style.left = `${window.innerWidth}px`;
      // }
    }
  }
};

headerAddButton.addEventListener('click', handleToggleMenu);
addItemDropdown.addEventListener('transitionend', handleMenuTransition);
addItemDropdown.addEventListener('click', handleAddEvent);
addPersonForm.addEventListener('click', handleAddPersonEvent);
addPersonForm.addEventListener('transitionend', handlePersonTransition);
addChoreForm.addEventListener('click', handleAddChore);

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
  const addItemDropdown = document.getElementById(
    'add-dropdown'
  )! as HTMLDivElement;
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

const handleTransition = (event: TransitionEvent) => {
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

const handleAddPersonEvent = (event: MouseEvent): void => {
  event.preventDefault();
  if (event.target instanceof HTMLButtonElement) {
    const addPersonForm = document.getElementById(
      'add-person-form'
    )! as HTMLDivElement;
    if (event.target.classList.contains('cancel')) {
      addPersonForm.style.left = `${window.innerWidth}px`;
    } else {
      const personInput: HTMLInputElement =
        addPersonForm.getElementsByTagName('input')[0];
      const personName: string = personInput.value.trim();
      // const people = App.people();

      // const isValid: boolean = validatePerson(people, personName);
      // if (isValid) {
      //   const errors: NodeListOf<HTMLDivElement> =
      //     addPersonForm.querySelectorAll('.error');
      //   errors && errors.forEach((error) => error.remove());

      //   const person: Person = new Person(personName);
      //   const people = App.addPerson(person);
      //   const peopleSelect = App.renderSelect(people, 'person');
      //   const oldPeopleSelect = document.getElementsByName(
      //     'person-select'
      //   ) as NodeListOf<HTMLSelectElement>;
      //   oldPeopleSelect[0].replaceWith(peopleSelect);
      //   addPersonForm.setAttribute('data-trigger', 'add-person');
      //   addPersonForm.style.left = `${window.innerWidth}px`;
      // }
      personInput.value = '';
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

headerAddButton.addEventListener('click', handleToggleMenu);
addItemDropdown.addEventListener('transitionend', handleTransition);
addItemDropdown.addEventListener('click', handleAddEvent);
addPersonForm.addEventListener('click', handleAddPersonEvent);
addPersonForm.addEventListener('transitionend', handlePersonTransition);

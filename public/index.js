"use strict";
const headerAddButton = document.querySelector('.btn-container');
const addChoreForm = document.getElementById('add-chore-form');
addChoreForm.style.left = `${window.innerWidth}px`;
const addItemDropdown = document.getElementById('add-dropdown');
addItemDropdown.style.left = `${window.innerWidth}px`;
const addPersonForm = document.getElementById('add-person-form');
addPersonForm.style.left = `${window.innerWidth}px`;
const handleToggleMenu = () => {
    const addItemDropdown = document.getElementById('add-dropdown');
    const btnGroup = addItemDropdown.firstElementChild;
    const choreBtn = btnGroup.lastElementChild;
    const addPersonForm = document.getElementById('add-person-form');
    const people = [];
    if (choreBtn.classList.contains('disabled') && people.length > 0) {
        choreBtn.classList.remove('disabled');
        choreBtn.disabled = false;
    }
    if (people.length <= 0 && !choreBtn.classList.contains('disabled')) {
        choreBtn.classList.add('disabled');
        choreBtn.disabled = true;
    }
    if (addPersonForm.style.left ==
        `${window.innerWidth - +addPersonForm.offsetWidth}px`) {
        addPersonForm.style.left = `${window.innerWidth}px`;
    }
    else if (addItemDropdown.style.left == `${window.innerWidth}px`) {
        addItemDropdown.style.left = `${window.innerWidth - +addItemDropdown.offsetWidth}px`;
    }
    else {
        addItemDropdown.style.left = `${window.innerWidth}px`;
    }
};
const handleAddEvent = (event) => {
    if (event.target instanceof HTMLButtonElement) {
        const button = event.target;
        const addItemDropdown = document.getElementById('add-dropdown');
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
const handleTransition = (event) => {
    if (event.target instanceof HTMLDivElement) {
        const addItemDropdown = document.getElementById('add-dropdown');
        const addPersonForm = document.getElementById('add-person-form');
        const addChoreForm = document.getElementById('add-chore-form');
        const { trigger } = event.target.dataset;
        if (trigger == 'add-person') {
            addPersonForm.style.left = `${window.innerWidth - +addPersonForm.offsetWidth}px`;
        }
        if (trigger == 'add-chore') {
            addChoreForm.style.left = `${window.innerWidth - +addChoreForm.offsetWidth}px`;
        }
        addItemDropdown.removeAttribute('data-trigger');
    }
};
const handleAddPersonEvent = (event) => {
    event.preventDefault();
    if (event.target instanceof HTMLButtonElement) {
        const addPersonForm = document.getElementById('add-person-form');
        if (event.target.classList.contains('cancel')) {
            addPersonForm.style.left = `${window.innerWidth}px`;
        }
        else {
            const personInput = addPersonForm.getElementsByTagName('input')[0];
            const personName = personInput.value.trim();
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
const handlePersonTransition = (event) => {
    if (event.target instanceof HTMLDivElement) {
        const { trigger } = event.target.dataset;
        const addPersonForm = document.getElementById('add-person-form');
        const addChoreForm = document.getElementById('add-chore-form');
        if (trigger == 'add-person') {
            addChoreForm.style.left = `${window.innerWidth - +addChoreForm.offsetWidth}px`;
        }
        addPersonForm.removeAttribute('data-trigger');
    }
};
headerAddButton.addEventListener('click', handleToggleMenu);
addItemDropdown.addEventListener('transitionend', handleTransition);
addItemDropdown.addEventListener('click', handleAddEvent);
addPersonForm.addEventListener('click', handleAddPersonEvent);
addPersonForm.addEventListener('transitionend', handlePersonTransition);

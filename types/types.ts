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

export { Person, Chore };

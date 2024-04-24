declare type Chore = {
  id: string;
  name: string;
  assigned?: string;
};

declare type Person = {
  id: string;
  name: string;
  chores: Array<Chore>;
};

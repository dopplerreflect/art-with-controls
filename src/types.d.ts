type Control = {
  name: string;
  value: number;
  min: number;
  max: number;
};

type Controls = Control[];

type ReducerAction = {
  control: string;
  value: number;
};

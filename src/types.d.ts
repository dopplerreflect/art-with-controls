type Control = {
  name: string;
  value: number;
  min: number;
  max: number;
};

interface Array<T> {
  value(s: String): number | string | undefined;
}

type Controls = Control[];

type ReducerAction = {
  control: string;
  value: number;
};

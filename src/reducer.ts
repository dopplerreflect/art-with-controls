const reducer = (controls: Controls, action: ReducerAction) => {
  const { control, value } = action;
  const newControls: Controls = [
    ...controls.filter(c => c.name !== control),
    { ...controls.find(c => c.name === control)!, value },
  ].sort((a, b) => (a.name > b.name ? 1 : -1));
  return newControls;
};

export default reducer;
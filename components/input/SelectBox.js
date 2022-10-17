export default function Selectbox({ props, defaultValue }) {
  return (
    <select defaultValue={defaultValue === undefined ? '' : props.defaultValue}>
      {props.map((option) => (
        <option value={option.value}>{option.name}</option>
      ))}
    </select>
  );
}

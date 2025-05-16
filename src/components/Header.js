import { Button } from "./Button";

export const Header = ({ title, onAdd, showAdd }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        color={showAdd ? "red" : "green"}
        text={showAdd ? 'Sulje' : 'Lisää'}
        onClick={onAdd}
      />
    </header>
  );
}

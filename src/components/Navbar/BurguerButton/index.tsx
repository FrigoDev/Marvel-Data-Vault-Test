import "./BurguerButton.css";

interface BurguerButtonProps {
  handleClick: () => void;
  clicked: boolean;
}

const BurguerButton = ({ handleClick, clicked }: BurguerButtonProps) => {
  return (
    <>
      <div
        onClick={handleClick}
        className={`burguer-button ${clicked ? "open" : ""}`}
      >
        <span className="burguer-bar" />
        <span className="burguer-bar" />
        <span className="burguer-bar" />
      </div>
    </>
  );
};
export default BurguerButton;

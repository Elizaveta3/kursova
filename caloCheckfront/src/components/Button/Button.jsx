import './Button.css'
export default function Button({ buttonClass, children, handleClick }) {
    return <button className={buttonClass} onClick={handleClick}>{children}</button>;
}

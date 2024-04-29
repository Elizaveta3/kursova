import './Button.css'
export default function Button({ buttonClass, children }) {
    return <button className={buttonClass}>{children}</button>;
}

import { createSignal } from "solid-js";
import "./Counter.css";

export default function Counter({ children }) {
  const [count, setCount] = createSignal(0);
  const add = () => setCount(count() + 1);
  const subtract = () => setCount(count() - 1);

  return (
    <>
      <div class="counter">
        <button onClick={subtract} className="touch-manipulation">
          -
        </button>
        <pre>{count()}</pre>
        <button onClick={add} className="touch-manipulation">
          +
        </button>
      </div>
      <div class="counter-message">{children}</div>
    </>
  );
}

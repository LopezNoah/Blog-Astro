import { createSignal, JSX, mergeProps, splitProps } from "solid-js";
import "./Counter.css";
/*
export interface AnchorProps extends Omit<JSX.AnchorHTMLAttributes<HTMLAnchorElement>, "state"> {
    href: string;
    replace?: boolean;
    noScroll?: boolean;
    state?: unknown;
    inactiveClass?: string;
    activeClass?: string;
    end?: boolean;
  }

  export function A(props: AnchorProps) {
    props = mergeProps({ inactiveClass: "inactive", activeClass: "active" }, props);
    const [, rest] = splitProps(props, ["href", "state", "class", "activeClass", "inactiveClass", "end"]);


    return (
        <a href="/" />
        /*
      <a
        link
        {...rest}
        href={href() || props.href}
        state={JSON.stringify(props.state)}
        classList={{
          ...(props.class && { [props.class]: true }),
          [props.inactiveClass!]: !isActive(),
          [props.activeClass!]: isActive(),
          ...rest.classList
        }}
        aria-current={isActive() ? "page" : undefined}
      />
      
    );
  }
  */
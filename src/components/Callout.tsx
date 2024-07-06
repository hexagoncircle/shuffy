import { ReactNode } from "react";
import ShuffyFace from "@assets/callout-face.svg?react";
import "@css/callout.css";

interface CalloutProps {
  children: ReactNode;
}

export default function Callout({ children }: CalloutProps) {
  return (
    <article className="callout cluster">
      <ShuffyFace aria-hidden="true" />
      {children}
    </article>
  )
}
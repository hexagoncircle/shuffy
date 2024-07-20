/**
 * Set up Shuffy card to follow mouse movement or watch focused elements
 */
export const moveEyes = (el: SVGSVGElement | null, { x, y }: { x: number; y: number }) => {
  const eyes = el?.querySelectorAll("[data-animate=eye]");

  eyes?.forEach((eye) => {
    const eyeball = eye.querySelector("[data-animate=eyeball]");
    const pupil = eye.querySelector("[data-animate=pupil]");

    if (!eyeball || !pupil) return;

    const pCenter = {
      x: parseFloat(eyeball.getAttribute("cx") || "0"),
      y: parseFloat(eyeball.getAttribute("cy") || "0"),
    };
    const rEyeball = parseFloat(eyeball.getAttribute("r") || "0");
    const rPupil = parseFloat(pupil.getAttribute("r") || "0");

    // Translate pointer coordinates to SVG units
    let pPointer = new DOMPoint(x, y);
    pPointer = pPointer.matrixTransform(el?.getScreenCTM()?.inverse());

    // Calculate angle and distance between pointer and eyeball center
    const angle = Math.atan2(pPointer.y - pCenter.y, pPointer.x - pCenter.x);
    const distance = Math.hypot(pPointer.x - pCenter.x, pPointer.y - pCenter.y);

    // Allow pupil movement within eyeball boundaries
    const offset = Math.min(distance / rEyeball, 1);
    const radius = (rEyeball - rPupil) * offset;

    // Calculate new pupil position
    const pMovePupil = {
      x: pCenter.x + Math.cos(angle) * radius,
      y: pCenter.y + Math.sin(angle) * radius,
    };

    // Update pupil position
    pupil.setAttribute("cx", pMovePupil.x.toString());
    pupil.setAttribute("cy", pMovePupil.y.toString());
  });
};

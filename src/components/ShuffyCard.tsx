import { forwardRef, SVGProps } from 'react';

const ShuffyCard = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="ShuffyCard"
    viewBox="0 0 391.646 609.425"
    ref={ref}
    {...props}
  >
    <defs>
      <style>
        {`
          .cls-1 {
            fill: #fff;
          }
          .cls-1,
          .cls-2,
          .cls-6,
          .cls-7 {
            stroke: #231f20;
            stroke-width: 4px;
            stroke-miterlimit: 10;
          }
          .cls-2 {
            fill: none;
          }
          .cls-6 {
            stroke-linecap: round;
            fill: #e5a9ff;
          }
          .cls-7 {
            fill: #c070ff;
          }
          .cls-8 {
            fill: #231f20;
            stroke-width: 0;
          }
        `}
      </style>
    </defs>
    <g id="MainCard">
      <rect
        width="387.646"
        height="569.265"
        x="2"
        y="38.16"
        fill="#c070ff"
        stroke="#231f20"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        rx="18"
        ry="18"
      />
      <path
        fill="#e5a9ff"
        stroke="#231f20"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M63.636 64.096H30.992a4 4 0 0 0-4 4V579.89a4 4 0 0 0 4 4h329.663a4 4 0 0 0 4-4V68.096a4 4 0 0 0-4-4h-27.756"
      />
    </g>
    <g data-animate="face" id="Face">
      <path
        id="Mouth"
        fill="none"
        stroke="#231f20"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="4"
        d="M189.704 162.778s1.067 25.588 11.241 25.588 11.818-25.588 11.818-25.588"
      />
      <g data-animate="eye">
        <circle
          id="RightEye"
          data-animate="eyeball"
          cx="251.834"
          cy="64.129"
          r="62.129"
          className="cls-1"
        />
        <circle
          id="RightPupil"
          data-animate="pupil"
          cx="233.89"
          cy="57.087"
          r="27.362"
          className="cls-8"
        />
        <g id="RightEyeBlink" data-animate="eye-blink">
          <circle cx="251.834" cy="64.129" r="62.129" className="cls-7" />
          <path
            d="M213.124 65.282c3.427-4.174 18.434-18.742 50.974-17.799 33.535.972 50.182 20.917 50.182 20.917"
            className="cls-2"
          />
        </g>
      </g>
      <path
        id="RightCheek"
        data-animate="cheek"
        d="M255.716 142.29s.838-23.621 24.014-30.496c27.456-8.145 40.609 19.311 40.609 19.311"
        className="cls-6"
      />
      <path
        id="Nose"
        data-animate="nose"
        d="M196.39 106.15s36.69-29.343 50.855-6.31c16.246 26.418-41.67 37.623-41.67 37.623"
        className="cls-6"
      />
      <g data-animate="eye">
        <circle
          id="LeftEye"
          data-animate="eyeball"
          cx="150.633"
          cy="64.129"
          r="62.129"
          className="cls-1"
        />
        <circle
          id="LeftPupil"
          data-animate="pupil"
          cx="115.866"
          cy="57.087"
          r="27.362"
          className="cls-8"
        />
        <g id="LeftEyeBlink" data-animate="eye-blink">
          <circle cx="150.633" cy="64.129" r="62.129" className="cls-7" />
          <path
            d="M88.502 65.737s26.074-19.472 65.829-20.394c34.023-.789 53.572 15.545 58.088 19.653"
            className="cls-2"
          />
        </g>
      </g>
      <path
        data-animate="cheek"
        id="LeftCheek"
        d="M88.504 129.998s15.26-21.063 41.341-12.643c25.375 8.192 19.792 31.442 19.792 31.442"
        className="cls-6"
      />
    </g>
  </svg>
));

export default ShuffyCard;
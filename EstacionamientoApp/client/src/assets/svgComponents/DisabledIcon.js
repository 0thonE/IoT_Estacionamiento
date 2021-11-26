import * as React from "react";

function SvgDisabledIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18.59 28"
      width="1rem"
      height="1rem"
      {...props}
    >
      <defs>
        <style>
          {
            ".DisabledIcon_svg__cls-1{fill:none;stroke:#414042;stroke-linecap:round;stroke-linejoin:round}"
          }
        </style>
      </defs>
      <g id="DisabledIcon_svg__Capa_2" data-name="Capa 2">
        <g id="DisabledIcon_svg__Layer_1" data-name="Layer 1">
          <circle className="DisabledIcon_svg__cls-1" cx={7} cy={3} r={2.5} />
          <path
            className="DisabledIcon_svg__cls-1"
            d="M12.5 24.47A6.5 6.5 0 011 18.5M18 25.61l-1.66-6.82a3 3 0 00-2.91-2.29h-5V9.07a1.55 1.55 0 00-1.08-1.53 1.51 1.51 0 00-1.52.52A4.32 4.32 0 015 9l-2.68 1.9a2 2 0 00-.82 1.62v4a1 1 0 002 0v-4l2-1v6a2 2 0 002 2h6l1.72 6.89A1.47 1.47 0 0017 27.46a1.53 1.53 0 001-1.85z"
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgDisabledIcon;

export const EarningsGroupIcon = ({ className }: { className?: string }) => {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="none"
        viewBox="0 0 30 30"
        className={className}
      >
        <path
          stroke="#303037"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 23.836c3.255 0 5.894-1.76 5.894-3.929 0-2.17-2.639-3.928-5.893-3.928s-5.893 1.758-5.893 3.928 2.638 3.929 5.893 3.929M15.001 13.032a3.437 3.437 0 1 0 0-6.875 3.437 3.437 0 0 0 0 6.875"
        ></path>
        <circle cx="15" cy="15" r="14" stroke="#141413" strokeWidth="2"></circle>
      </svg>
      )
  }

  export const EarningsSocialIcon = ({ className }: { className?: string }) => {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="none"
        viewBox="0 0 32 32"
        className={className}
      >
        <mask
          id="mask0_1936_8450"
          width="32"
          height="32"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "alpha" }}
        >
          <path fill="#D9D9D9" d="M0 0h32v32H0z"></path>
        </mask>
        <g stroke="#000" strokeWidth="1.5" mask="url(#mask0_1936_8450)">
          <circle cx="16" cy="16" r="10.25" fill="#0DF"></circle>
          <path d="M21.389 6.799c3.712-.87 6.618-.544 7.594 1.146 1.666 2.886-2.921 8.654-10.247 12.883-7.325 4.23-14.614 5.319-16.28 2.433-1.013-1.754.285-4.572 3.103-7.462"></path>
        </g>
      </svg>
      )
  }
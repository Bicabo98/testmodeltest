export const HetuScanIcon: React.FC<React.SVGProps<SVGElement>> = ({
    className,
    // ...props
  }) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="23"
    height="23"
    fill="none"
    viewBox="0 0 23 23"
    className={className}
  >
    <mask
      id="mask0_1467_1051"
      width="23"
      height="23"
      x="0"
      y="0"
      maskUnits="userSpaceOnUse"
      style={{ maskType: "alpha" }}
    >
      <path fill="#D9D9D9" d="M0 0h23v23H0z"></path>
    </mask>
    <g
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      mask="url(#mask0_1467_1051)"
    >
      <path d="M2.216 2.355h7.415v5.438h5.438v1.483H8.148V3.838h-4.45v15.324h5.933v1.483H2.216z"></path>
      <path d="M20.999 20.646h-7.415v-5.438H8.146v-1.483h6.921v5.438h4.45V3.839h-5.933V2.356h7.415z"></path>
    </g>
  </svg>
  );
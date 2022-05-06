interface BusyIconProps {
  className?: string;
}

const BusyIcon = ({ className }: BusyIconProps) => {
  return (
    <svg
      version="1.0"
      width="114px"
      height="15px"
      viewBox="0 0 457 60"
      className={className}
      data-testid="busy-icon"
    >
      <g>
        <circle fill="#3a7bfd" cx="-31" cy="30" r="30" />
        <circle fill="#6195fd" cx="-97" cy="30" r="24" />
        <circle fill="#87affe" cx="-163" cy="30" r="19" />
        <circle fill="#d5e3ff" cx="-229.5" cy="30.5" r="13.5" />
        <circle fill="#e8efff" cx="-295" cy="31" r="11" />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="61 0;127 0;193 0;259 0;325 0;391 0;457 0;523 0;589 0;655 0;721 0;787 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;"
          calcMode="discrete"
          dur="1280ms"
          repeatCount="indefinite"
        />
      </g>
      <g>
        <circle fill="#3a7bfd" cx="488" cy="30" r="30" />
        <circle fill="#6195fd" cx="554" cy="30" r="24" />
        <circle fill="#87affe" cx="620" cy="30" r="19" />
        <circle fill="#d5e3ff" cx="686.5" cy="30.5" r="13.5" />
        <circle fill="#e8efff" cx="753" cy="31" r="11" />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;-61 0;-127 0;-193 0;-259 0;-325 0;-391 0;-457 0;-523 0;-589 0;-655 0;-721 0;-787 0;"
          calcMode="discrete"
          dur="1280ms"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
};

export default BusyIcon;

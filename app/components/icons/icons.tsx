import clsx from 'clsx';

export const HeartIcon = ({
  className,
  color = '#596780'
}: {
  className?: string;
  color?: string;
}) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.44 3.09998C14.63 3.09998 13.01 3.97998 12 5.32998C10.99 3.97998 9.37 3.09998 7.56 3.09998C4.49 3.09998 2 5.59998 2 8.68998C2 9.87998 2.19 10.98 2.52 12C4.1 17 8.97 19.99 11.38 20.81C11.72 20.93 12.28 20.93 12.62 20.81C15.03 19.99 19.9 17 21.48 12C21.81 10.98 22 9.87998 22 8.68998C22 5.59998 19.51 3.09998 16.44 3.09998Z"
        fill={color}
      />
    </svg>
  );
};

export const OutlineHeartIcon = ({
  className,
  color = '#90A3BF'
}: {
  className?: string;
  color?: string;
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.69001C2 5.60001 4.49 3.10001 7.56 3.10001C9.38 3.10001 10.99 3.98001 12 5.34001C13.01 3.98001 14.63 3.10001 16.44 3.10001C19.51 3.10001 22 5.60001 22 8.69001C22 15.69 15.52 19.82 12.62 20.81Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const BigArrowIcon = ({
  className,
  color = '#fff'
}: {
  className?: string;
  color?: string;
}) => {
  return (
    <svg
      width="75"
      height="120"
      viewBox="0 0 75 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M25 60L0 0H25H50L75 60L50 120H25H0L25 60Z"
        fill={color}
        fillOpacity="0.06"
      />
    </svg>
  );
};

export const GasIcon = ({
  className,
  color = '#90A3BF'
}: {
  className?: string;
  color?: string;
}) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.34 9.33L20.34 8.33C19.97 8.15 19.51 8.29 19.33 8.66C19.14 9.04 19.29 9.49 19.66 9.67L21.25 10.46V15.25L17.5 15.26V5C17.5 3 16.16 2 14.5 2H6.5C4.84 2 3.5 3 3.5 5V21.25H2C1.59 21.25 1.25 21.59 1.25 22C1.25 22.41 1.59 22.75 2 22.75H19C19.41 22.75 19.75 22.41 19.75 22C19.75 21.59 19.41 21.25 19 21.25H17.5V16.76L22 16.75C22.42 16.75 22.75 16.41 22.75 16V10C22.75 9.72 22.59 9.46 22.34 9.33ZM6 6.89C6 5.5 6.85 5 7.89 5H13.12C14.15 5 15 5.5 15 6.89V8.12C15 9.5 14.15 10 13.11 10H7.89C6.85 10 6 9.5 6 8.11V6.89ZM6.5 12.25H9.5C9.91 12.25 10.25 12.59 10.25 13C10.25 13.41 9.91 13.75 9.5 13.75H6.5C6.09 13.75 5.75 13.41 5.75 13C5.75 12.59 6.09 12.25 6.5 12.25Z"
        fill={color}
      />
    </svg>
  );
};

export const SteeringIcon = ({
  className,
  color = '#90A3BF'
}: {
  className?: string;
  color?: string;
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.53 2 12 2Z"
        fill={color}
      />
      <rect x="4" y="4" width="16" height="16" rx="8" fill="white" />
      <path
        d="M12 6C8.688 6 6 8.688 6 12C6 15.312 8.688 18 12 18C15.312 18 18 15.312 18 12C18 8.688 15.318 6 12 6Z"
        fill={color}
      />
      <rect x="8" y="8" width="8" height="8" rx="4" fill="white" />
      <rect x="11" y="17" width="2" height="4" fill={color} />
      <rect x="17" y="11" width="4" height="2" fill={color} />
      <rect x="3" y="11" width="4" height="2" fill={color} />
    </svg>
  );
};

export const BellIcon = ({
  className,
  color = '#596780'
}: {
  className?: string;
  color?: string;
}) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.3399 14.49L18.3399 12.83C18.1299 12.46 17.9399 11.76 17.9399 11.35V8.82C17.9399 6.47 16.5599 4.44 14.5699 3.49C14.0499 2.57 13.0899 2 11.9899 2C10.8999 2 9.91994 2.59 9.39994 3.52C7.44994 4.49 6.09994 6.5 6.09994 8.82V11.35C6.09994 11.76 5.90994 12.46 5.69994 12.82L4.68994 14.49C4.28994 15.16 4.19994 15.9 4.44994 16.58C4.68994 17.25 5.25994 17.77 5.99994 18.02C7.93994 18.68 9.97994 19 12.0199 19C14.0599 19 16.0999 18.68 18.0399 18.03C18.7399 17.8 19.2799 17.27 19.5399 16.58C19.7999 15.89 19.7299 15.13 19.3399 14.49Z"
        fill={color}
      />
      <path
        d="M14.8299 20.01C14.4099 21.17 13.2999 22 11.9999 22C11.2099 22 10.4299 21.68 9.87993 21.11C9.55993 20.81 9.31993 20.41 9.17993 20C9.30993 20.02 9.43993 20.03 9.57993 20.05C9.80993 20.08 10.0499 20.11 10.2899 20.13C10.8599 20.18 11.4399 20.21 12.0199 20.21C12.5899 20.21 13.1599 20.18 13.7199 20.13C13.9299 20.11 14.1399 20.1 14.3399 20.07C14.4999 20.05 14.6599 20.03 14.8299 20.01Z"
        fill={color}
      />
    </svg>
  );
};

export const SettingIcon = ({
  className,
  color = '#596780'
}: {
  className?: string;
  color?: string;
}) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.1 9.22006C18.29 9.22006 17.55 7.94006 18.45 6.37006C18.97 5.46006 18.66 4.30006 17.75 3.78006L16.02 2.79006C15.23 2.32006 14.21 2.60006 13.74 3.39006L13.63 3.58006C12.73 5.15006 11.25 5.15006 10.34 3.58006L10.23 3.39006C9.78 2.60006 8.76 2.32006 7.97 2.79006L6.24 3.78006C5.33 4.30006 5.02 5.47006 5.54 6.38006C6.45 7.94006 5.71 9.22006 3.9 9.22006C2.86 9.22006 2 10.0701 2 11.1201V12.8801C2 13.9201 2.85 14.7801 3.9 14.7801C5.71 14.7801 6.45 16.0601 5.54 17.6301C5.02 18.5401 5.33 19.7001 6.24 20.2201L7.97 21.2101C8.76 21.6801 9.78 21.4001 10.25 20.6101L10.36 20.4201C11.26 18.8501 12.74 18.8501 13.65 20.4201L13.76 20.6101C14.23 21.4001 15.25 21.6801 16.04 21.2101L17.77 20.2201C18.68 19.7001 18.99 18.5301 18.47 17.6301C17.56 16.0601 18.3 14.7801 20.11 14.7801C21.15 14.7801 22.01 13.9301 22.01 12.8801V11.1201C22 10.0801 21.15 9.22006 20.1 9.22006ZM12 15.2501C10.21 15.2501 8.75 13.7901 8.75 12.0001C8.75 10.2101 10.21 8.75006 12 8.75006C13.79 8.75006 15.25 10.2101 15.25 12.0001C15.25 13.7901 13.79 15.2501 12 15.2501Z"
        fill={color}
      />
    </svg>
  );
};

export const FilterIcon = ({
  className,
  color = '#596780'
}: {
  className?: string;
  color?: string;
}) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 6.5H16"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6.5H2"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 10C11.933 10 13.5 8.433 13.5 6.5C13.5 4.567 11.933 3 10 3C8.067 3 6.5 4.567 6.5 6.5C6.5 8.433 8.067 10 10 10Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 17.5H18"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 17.5H2"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 21C15.933 21 17.5 19.433 17.5 17.5C17.5 15.567 15.933 14 14 14C12.067 14 10.5 15.567 10.5 17.5C10.5 19.433 12.067 21 14 21Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const SearchIcon = ({
  className,
  color = '#596780'
}: {
  className?: string;
  color?: string;
}) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 22L20 20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const LoadingIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={clsx('animate-spin', className)}
      aria-hidden="true"
      role="status"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="#E5E7EB"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const PayPalIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="96"
      height="20"
      viewBox="0 0 96 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M35.8982 4.47266H30.5855C30.4097 4.47256 30.2395 4.52606 30.1058 4.62351C29.9721 4.72096 29.8835 4.85595 29.8561 5.00417L27.7075 16.6266C27.6976 16.6805 27.7015 16.7356 27.719 16.7881C27.7365 16.8406 27.7671 16.8893 27.8087 16.9307C27.8504 16.9722 27.9021 17.0054 27.9602 17.0282C28.0184 17.051 28.0816 17.0627 28.1456 17.0627H30.6819C30.8579 17.0627 31.0281 17.0091 31.1618 16.9115C31.2956 16.814 31.3841 16.6788 31.4113 16.5305L31.9908 13.3957C32.018 13.2475 32.1064 13.1124 32.24 13.0149C32.3736 12.9173 32.5436 12.8636 32.7194 12.8636H34.4012C37.9008 12.8636 39.9205 11.4188 40.448 8.55577C40.6857 7.3032 40.4581 6.31904 39.7706 5.62979C39.0155 4.87295 37.6763 4.47266 35.8982 4.47266ZM36.5111 8.71748C36.2205 10.3438 34.764 10.3438 33.3557 10.3438H32.554L33.1164 7.30651C33.1329 7.21765 33.186 7.13672 33.2661 7.07829C33.3463 7.01985 33.4483 6.98774 33.5537 6.98774H33.9212C34.8805 6.98774 35.7855 6.98774 36.2532 7.45431C36.532 7.73265 36.6175 8.1462 36.5111 8.71748ZM51.7785 8.66512H49.2345C49.129 8.66513 49.027 8.69723 48.9469 8.75567C48.8667 8.81411 48.8136 8.89504 48.7971 8.9839L48.6845 9.59097L48.5066 9.37094C47.9559 8.68898 46.7277 8.461 45.5019 8.461C42.6906 8.461 40.2895 10.2776 39.8218 12.8258C39.5787 14.0969 39.9244 15.3124 40.7696 16.16C41.5448 16.9394 42.6541 17.2641 43.9739 17.2641C46.2391 17.2641 47.4952 16.0215 47.4952 16.0215L47.3818 16.6246C47.3717 16.6785 47.3754 16.7337 47.3927 16.7862C47.41 16.8388 47.4404 16.8876 47.4819 16.9291C47.5234 16.9707 47.575 17.0041 47.633 17.0271C47.6911 17.05 47.7543 17.0619 47.8184 17.062H50.1099C50.2859 17.0621 50.4562 17.0085 50.5899 16.9109C50.7237 16.8133 50.8121 16.6781 50.8394 16.5298L52.2143 9.1012C52.2245 9.0474 52.2208 8.99237 52.2035 8.93991C52.1863 8.88744 52.1559 8.8388 52.1144 8.79733C52.073 8.75587 52.0215 8.72257 51.9635 8.69975C51.9055 8.67692 51.8424 8.66511 51.7785 8.66512ZM48.2324 12.8894C47.9869 14.1294 46.8334 14.9618 45.3621 14.9618C44.6233 14.9618 44.0329 14.7596 43.6539 14.3766C43.2779 13.9962 43.135 13.4547 43.2546 12.8516C43.4837 11.6223 44.6567 10.7627 46.1055 10.7627C46.8279 10.7627 47.4152 10.9675 47.802 11.3538C48.1897 11.7442 48.3435 12.289 48.2324 12.8894ZM65.3277 8.66512H62.7712C62.6506 8.66529 62.5319 8.69054 62.4254 8.7387C62.3189 8.78686 62.2277 8.85647 62.1599 8.94148L58.6339 13.3725L57.1393 9.11446C57.0934 8.98459 56.9998 8.87077 56.8722 8.78984C56.7446 8.70892 56.5899 8.66519 56.4309 8.66512H53.9187C53.8481 8.66496 53.7786 8.67918 53.7158 8.70658C53.653 8.73398 53.5988 8.77378 53.5577 8.82266C53.5166 8.87154 53.4898 8.92809 53.4795 8.98761C53.4691 9.04713 53.4756 9.10788 53.4984 9.16483L56.3143 16.215L53.667 19.4034C53.6199 19.46 53.592 19.5265 53.5863 19.5956C53.5806 19.6648 53.5973 19.7339 53.6346 19.7955C53.6719 19.8571 53.7284 19.9088 53.7978 19.9448C53.8672 19.9809 53.9469 19.9999 54.0282 19.9999H56.5816C56.7008 20 56.8183 19.9755 56.9239 19.9284C57.0296 19.8813 57.1203 19.8131 57.1883 19.7295L65.6913 9.25827C65.7373 9.20162 65.7644 9.13529 65.7694 9.06646C65.7745 8.99764 65.7573 8.92895 65.7199 8.86784C65.6824 8.80673 65.6261 8.75553 65.5569 8.7198C65.4878 8.68406 65.4085 8.66516 65.3277 8.66512Z"
        fill="#022273"
      />
      <path
        d="M73.7879 4.47332H68.4746C68.2988 4.47338 68.1289 4.52695 67.9953 4.62439C67.8617 4.72182 67.7733 4.85673 67.7459 5.00483L65.5972 16.6272C65.5872 16.6811 65.5911 16.7361 65.6084 16.7886C65.6257 16.841 65.6562 16.8897 65.6977 16.9311C65.7392 16.9726 65.7907 17.0059 65.8488 17.0287C65.9068 17.0515 65.9699 17.0633 66.0338 17.0633H68.7604C68.8834 17.0632 69.0023 17.0256 69.0957 16.9573C69.1892 16.889 69.251 16.7945 69.27 16.6909L69.8798 13.3964C69.907 13.2482 69.9954 13.1131 70.129 13.0155C70.2626 12.918 70.4326 12.8643 70.6085 12.8642H72.2895C75.7898 12.8642 77.8087 11.4195 78.337 8.55644C78.5754 7.30386 78.3463 6.3197 77.6588 5.63046C76.9045 4.87361 75.5661 4.47332 73.7879 4.47332ZM74.4009 8.71814C74.1111 10.3445 72.6546 10.3445 71.2454 10.3445H70.4446L71.0077 7.30718C71.0239 7.21831 71.0768 7.13732 71.1569 7.07885C71.2369 7.02037 71.3389 6.98829 71.4443 6.9884H71.8117C72.7703 6.9884 73.6761 6.9884 74.1437 7.45497C74.4226 7.73332 74.5073 8.14686 74.4009 8.71814ZM89.6675 8.66579H87.125C87.0196 8.66554 86.9175 8.69757 86.8374 8.75607C86.7573 8.81457 86.7045 8.89564 86.6885 8.98456L86.5758 9.59163L86.3972 9.3716C85.8464 8.68965 84.619 8.46166 83.3932 8.46166C80.582 8.46166 78.1816 10.2782 77.714 12.8264C77.4716 14.0976 77.8157 15.313 78.6609 16.1607C79.4377 16.94 80.5454 17.2648 81.8652 17.2648C84.1304 17.2648 85.3865 16.0222 85.3865 16.0222L85.2731 16.6252C85.263 16.6793 85.2667 16.7345 85.2841 16.7872C85.3015 16.8399 85.3321 16.8887 85.3737 16.9303C85.4154 16.9719 85.4672 17.0053 85.5254 17.0281C85.5837 17.051 85.6471 17.0628 85.7112 17.0627H88.0021C88.1779 17.0626 88.348 17.0089 88.4815 16.9113C88.6151 16.8138 88.7035 16.6787 88.7307 16.5305L90.1064 9.10187C90.1162 9.0479 90.1121 8.99277 90.0946 8.94026C90.077 8.88775 90.0463 8.83911 90.0046 8.79768C89.9629 8.75625 89.9112 8.72301 89.853 8.70025C89.7948 8.67748 89.7316 8.66572 89.6675 8.66579ZM86.1214 12.8901C85.8775 14.13 84.7224 14.9624 83.2511 14.9624C82.5139 14.9624 81.9219 14.7603 81.5429 14.3772C81.1669 13.9968 81.0255 13.4554 81.1436 12.8523C81.3743 11.6229 82.5457 10.7633 83.9945 10.7633C84.7169 10.7633 85.3042 10.9681 85.691 11.3545C86.0802 11.7449 86.234 12.2896 86.1214 12.8901ZM92.6668 4.79209L90.4863 16.6272C90.4763 16.6811 90.4801 16.7361 90.4975 16.7886C90.5148 16.841 90.5453 16.8897 90.5868 16.9311C90.6283 16.9726 90.6798 17.0059 90.7378 17.0287C90.7958 17.0515 90.859 17.0633 90.9229 17.0633H93.115C93.4794 17.0633 93.7885 16.838 93.8445 16.5311L95.9947 4.9094C96.0047 4.85553 96.0009 4.80045 95.9835 4.74796C95.9662 4.69546 95.9357 4.64679 95.8942 4.60529C95.8528 4.56379 95.8012 4.53045 95.7432 4.50755C95.6852 4.48466 95.622 4.47275 95.5581 4.47266H93.1034C92.998 4.47297 92.8962 4.5053 92.8162 4.56383C92.7362 4.62236 92.6832 4.70328 92.6668 4.79209Z"
        fill="#167FC4"
      />
      <path
        d="M5.64336 19.3215L6.04964 17.1199L5.14465 17.102H0.823242L3.8264 0.856327C3.83534 0.806689 3.86489 0.761445 3.90966 0.728842C3.95444 0.69624 4.01145 0.678449 4.07032 0.678714H11.3568C13.7758 0.678714 15.4452 1.10817 16.3168 1.95581C16.7254 2.35345 16.9856 2.76898 17.1114 3.22627C17.2435 3.70609 17.2458 4.27936 17.1169 4.97855L17.1076 5.02958V5.47759L17.5162 5.67508C17.8281 5.80991 18.1085 5.99229 18.3435 6.21322C18.693 6.55321 18.9191 6.98531 19.0146 7.49761C19.1133 8.02448 19.0807 8.65143 18.9191 9.36122C18.7327 10.1777 18.4312 10.8888 18.0242 11.4707C17.6651 11.992 17.1822 12.4435 16.6065 12.7962C16.0659 13.1236 15.4234 13.3721 14.6971 13.5312C13.9933 13.6876 13.1909 13.7664 12.3107 13.7664H11.7437C11.3382 13.7664 10.9443 13.891 10.6352 14.1144C10.3264 14.3401 10.1216 14.652 10.0572 14.9945L10.0145 15.1926L9.29671 19.073L9.26408 19.2154C9.25554 19.2605 9.24078 19.283 9.21903 19.2983C9.19796 19.313 9.17167 19.3212 9.14446 19.3215H5.64336Z"
        fill="#022273"
      />
      <path
        d="M17.9029 5.08179C17.8812 5.20042 17.8563 5.3217 17.8284 5.44629C16.8674 9.65533 13.58 11.1094 9.3813 11.1094H7.24351C6.73004 11.1094 6.29736 11.4275 6.21735 11.8596L5.12282 17.7818L4.81287 19.4605C4.80052 19.5271 4.80524 19.5952 4.82669 19.6601C4.84814 19.7249 4.88581 19.7851 4.93712 19.8364C4.98843 19.8876 5.05216 19.9288 5.12391 19.9571C5.19566 19.9853 5.27373 19.9999 5.35275 20H9.14437C9.59337 20 9.97479 19.7216 10.0455 19.3439L10.0828 19.1795L10.7967 15.3144L10.8425 15.1024C10.9124 14.7233 11.2946 14.4449 11.7436 14.4449H12.3107C15.9842 14.4449 18.86 13.1725 19.7005 9.49031C20.0516 7.9521 19.8698 6.66771 18.9408 5.7644C18.6463 5.48497 18.2946 5.25365 17.9029 5.08179Z"
        fill="#167FC4"
      />
      <path
        d="M16.8967 4.73907C16.5899 4.66335 16.2778 4.60425 15.9622 4.56212C15.3387 4.48037 14.7085 4.44114 14.0776 4.44482H8.36652C8.14918 4.44467 7.93894 4.51087 7.77382 4.63145C7.60869 4.75202 7.49958 4.91902 7.4662 5.10225L6.25127 11.6673L6.21631 11.8588C6.25416 11.6498 6.37843 11.4593 6.56665 11.3217C6.75487 11.1841 6.9946 11.1085 7.24248 11.1086H9.38026C13.5789 11.1086 16.8664 9.65392 17.8273 5.44555C17.8561 5.32095 17.8801 5.19967 17.9019 5.08104C17.6483 4.9676 17.3841 4.8725 17.1119 4.79673C17.0405 4.77653 16.9688 4.75731 16.8967 4.73907Z"
        fill="#022273"
      />
      <path
        d="M7.4682 5.1024C7.5013 4.91912 7.61035 4.75205 7.77556 4.63153C7.94077 4.51102 8.15116 4.44506 8.36853 4.44563H14.0796C14.7563 4.44563 15.3878 4.48341 15.9642 4.56294C16.3542 4.61524 16.7389 4.69346 17.1147 4.79688C17.3982 4.87707 17.6615 4.97185 17.9047 5.0812C18.1905 3.52576 17.9023 2.4667 16.9166 1.50772C15.8298 0.451986 13.8684 0 11.3585 0H4.07198C3.55928 0 3.12194 0.318113 3.0427 0.75088L0.00769798 17.1635C-0.00643856 17.2397 -0.00106009 17.3176 0.0234634 17.3919C0.0479869 17.4662 0.0910735 17.535 0.149759 17.5937C0.208445 17.6524 0.281337 17.6996 0.363422 17.7319C0.445506 17.7643 0.534835 17.7811 0.625264 17.7812H5.12378L6.25327 11.6675L7.4682 5.1024Z"
        fill="#022273"
      />
    </svg>
  );
};

export const SafeDataIcon = ({
  className,
  color
}: {
  className?: string;
  color?: string;
}) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M25.053 5.96007C24.1585 6.01119 23.2612 5.93941 22.3863 5.74674C21.3309 5.38534 20.3438 4.84897 19.4663 4.16007C18.7156 3.62793 18.0028 3.0443 17.333 2.41341C17.049 2.14815 16.6749 2.00061 16.2863 2.00061C15.8977 2.00061 15.5236 2.14815 15.2396 2.41341C14.5876 3.02435 13.9021 3.59857 13.1863 4.13341C12.3034 4.83136 11.3126 5.38079 10.253 5.76007C9.25634 5.98526 8.23255 6.06608 7.21295 6.00007C6.37809 5.9655 5.54574 5.88538 4.71962 5.76007C4.51775 5.73015 4.31191 5.74118 4.1144 5.79251C3.91688 5.84384 3.73172 5.93442 3.56996 6.05885C3.40821 6.18328 3.27316 6.33901 3.17288 6.51675C3.0726 6.6945 3.00914 6.89061 2.98629 7.09341C2.91962 7.73341 2.74629 9.40007 2.66629 11.2534C2.55417 13.1051 2.67061 14.9635 3.01295 16.7867C3.97834 19.8074 5.75388 22.5053 8.14629 24.5867C10.0479 26.3804 12.1098 27.9961 14.3063 29.4134C14.8949 29.8176 15.5922 30.0339 16.3063 30.0339C17.0203 30.0339 17.7176 29.8176 18.3063 29.4134C20.3863 27.9591 22.3318 26.3215 24.1196 24.5201C26.372 22.4234 28.04 19.7766 28.9596 16.8401"
        stroke="#1A202C"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6665 14.6667L18.4798 18.48C18.5036 18.5059 18.5324 18.5265 18.5645 18.5406C18.5967 18.5548 18.6314 18.5621 18.6665 18.5621C18.7016 18.5621 18.7363 18.5548 18.7685 18.5406C18.8006 18.5265 18.8294 18.5059 18.8532 18.48L29.3332 8"
        stroke="#3563E9"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

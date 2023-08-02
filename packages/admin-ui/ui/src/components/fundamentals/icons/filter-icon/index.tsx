import IconProps from "../types/icon-type"

const FilterIcon: React.FC<IconProps> = ({
  size = "24",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      width={size}
      {...attributes}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M7.22925 4.78065C7.49659 4.78065 7.76392 4.78065 8.03126 4.78065C8.66676 4.78065 9.30378 4.78065 9.93928 4.78065C10.7077 4.78065 11.4776 4.78065 12.246 4.78065C12.9151 4.78065 13.5842 4.78065 14.2533 4.78065C14.5757 4.78065 14.8995 4.78523 15.2218 4.78065C15.2264 4.78065 15.231 4.78065 15.2356 4.78065C15.4311 4.78065 15.6374 4.6951 15.7764 4.55762C15.9093 4.42471 16.0086 4.20779 15.9994 4.01683C15.9902 3.81977 15.9261 3.61506 15.7764 3.47605C15.6267 3.33856 15.4434 3.25301 15.2356 3.25301C14.9683 3.25301 14.7009 3.25301 14.4336 3.25301C13.7981 3.25301 13.1611 3.25301 12.5256 3.25301C11.7572 3.25301 10.9872 3.25301 10.2188 3.25301C9.54973 3.25301 8.88062 3.25301 8.21152 3.25301C7.88919 3.25301 7.56533 3.24843 7.243 3.25301C7.23841 3.25301 7.23383 3.25301 7.22925 3.25301C7.03371 3.25301 6.82748 3.33856 6.68847 3.47605C6.55556 3.60895 6.45626 3.82588 6.46543 4.01683C6.4746 4.2139 6.53876 4.4186 6.68847 4.55762C6.83817 4.69358 7.02302 4.78065 7.22925 4.78065Z"
        fill="#111827"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.76636 4.78057C3.31936 4.78057 3.87237 4.78057 4.42537 4.78057C4.50328 4.78057 4.58272 4.78057 4.66063 4.78057C4.85617 4.78057 5.0624 4.69502 5.20141 4.55753C5.33432 4.42463 5.43361 4.2077 5.42445 4.01675C5.41528 3.81968 5.35112 3.61498 5.20141 3.47596C5.0517 3.33848 4.86839 3.25293 4.66063 3.25293C4.10762 3.25293 3.55462 3.25293 3.00161 3.25293C2.92371 3.25293 2.84427 3.25293 2.76636 3.25293C2.57082 3.25293 2.36459 3.33848 2.22557 3.47596C2.09267 3.60887 1.99337 3.82579 2.00254 4.01675C2.01171 4.21381 2.07587 4.41852 2.22557 4.55753C2.37528 4.69349 2.56013 4.78057 2.76636 4.78057Z"
        fill="#111827"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.94562 4.53925C5.8891 4.53925 5.83258 4.53466 5.77605 4.52855C5.84327 4.53772 5.91201 4.54688 5.97923 4.55605C5.86313 4.53925 5.75161 4.50869 5.64315 4.46439C5.70425 4.49036 5.76536 4.51633 5.82494 4.54077C5.72564 4.498 5.63398 4.443 5.54844 4.37884C5.60038 4.41856 5.65079 4.45828 5.70273 4.498C5.6126 4.42773 5.53316 4.34829 5.46289 4.25816C5.50261 4.3101 5.54233 4.36051 5.58204 4.41245C5.51636 4.3269 5.46289 4.23372 5.42011 4.13595C5.44608 4.19705 5.47205 4.25816 5.4965 4.31774C5.45067 4.20928 5.42011 4.09776 5.40484 3.98166C5.414 4.04887 5.42317 4.11762 5.43234 4.18483C5.41859 4.07179 5.41859 3.95874 5.43234 3.8457C5.42317 3.91291 5.414 3.98166 5.40484 4.04887C5.42164 3.93277 5.45219 3.82126 5.4965 3.71279C5.47053 3.7739 5.44456 3.835 5.42011 3.89458C5.46289 3.79529 5.51788 3.70363 5.58204 3.61808C5.54233 3.67002 5.50261 3.72043 5.46289 3.77237C5.53316 3.68224 5.6126 3.6028 5.70273 3.53253C5.65079 3.57225 5.60038 3.61197 5.54844 3.65169C5.63398 3.586 5.72717 3.53253 5.82494 3.48976C5.76383 3.51573 5.70273 3.5417 5.64315 3.56614C5.75161 3.52031 5.86313 3.48976 5.97923 3.47448C5.91201 3.48365 5.84327 3.49281 5.77605 3.50198C5.8891 3.48823 6.00214 3.48823 6.11519 3.50198C6.04797 3.49281 5.97923 3.48365 5.91201 3.47448C6.02811 3.49129 6.13963 3.52184 6.24809 3.56614C6.18699 3.54017 6.12588 3.5142 6.0663 3.48976C6.1656 3.53253 6.25726 3.58753 6.34281 3.65169C6.29087 3.61197 6.24046 3.57225 6.18852 3.53253C6.27865 3.6028 6.35808 3.68224 6.42835 3.77237C6.38864 3.72043 6.34892 3.67002 6.3092 3.61808C6.37489 3.70363 6.42835 3.79681 6.47113 3.89458C6.44516 3.83348 6.41919 3.77237 6.39475 3.71279C6.44058 3.82126 6.47113 3.93277 6.48641 4.04887C6.47724 3.98166 6.46807 3.91291 6.45891 3.8457C6.47266 3.95874 6.47266 4.07179 6.45891 4.18483C6.46807 4.11762 6.47724 4.04887 6.48641 3.98166C6.4696 4.09776 6.43905 4.20928 6.39475 4.31774C6.42072 4.25663 6.44669 4.19553 6.47113 4.13595C6.42835 4.23525 6.37336 4.3269 6.3092 4.41245C6.34892 4.36051 6.38864 4.3101 6.42835 4.25816C6.35808 4.34829 6.27865 4.42773 6.18852 4.498C6.24046 4.45828 6.29087 4.41856 6.34281 4.37884C6.25726 4.44453 6.16407 4.498 6.0663 4.54077C6.12741 4.5148 6.18852 4.48883 6.24809 4.46439C6.13963 4.51022 6.02811 4.54077 5.91201 4.55605C5.97923 4.54688 6.04797 4.53772 6.11519 4.52855C6.05867 4.53466 6.00214 4.53925 5.94562 4.53925C5.74856 4.54077 5.54538 4.62327 5.40484 4.76228C5.27193 4.89518 5.17264 5.11211 5.1818 5.30306C5.19097 5.50013 5.25513 5.70483 5.40484 5.84385C5.55302 5.97981 5.73786 6.06994 5.94562 6.06688C6.15033 6.06535 6.36572 6.03786 6.55973 5.97217C6.73999 5.91106 6.92636 5.83315 7.08218 5.72011C7.18301 5.64831 7.28536 5.57193 7.37549 5.48638C7.4702 5.39625 7.54964 5.28779 7.62755 5.18391C7.74365 5.02656 7.82156 4.85088 7.88878 4.66757C8.02779 4.2933 8.02932 3.84264 7.92086 3.45921C7.86739 3.26825 7.7849 3.07577 7.67338 2.91078C7.5695 2.75497 7.44729 2.59762 7.30064 2.47694C7.20439 2.3975 7.1051 2.31806 6.99969 2.2539C6.88817 2.18668 6.76596 2.1378 6.64681 2.09044C6.45738 2.01406 6.25726 1.98504 6.05408 1.96823C5.65995 1.93615 5.23069 2.05072 4.89461 2.2539C4.56769 2.45249 4.27133 2.75344 4.11093 3.10479C4.05899 3.21937 4.00552 3.337 3.97191 3.45921C3.93678 3.58447 3.92303 3.71585 3.90623 3.8457C3.88178 4.05346 3.90623 4.2658 3.94747 4.4705C4.02844 4.87533 4.27286 5.29237 4.59213 5.5536C4.69296 5.63609 4.79837 5.72011 4.91141 5.78732C5.02904 5.85607 5.15889 5.90801 5.28568 5.95537C5.49344 6.0348 5.72717 6.06535 5.94715 6.06688C6.14269 6.06841 6.35045 5.97981 6.48793 5.84385C6.62084 5.71094 6.72013 5.49402 6.71097 5.30306C6.69111 4.88602 6.37336 4.5423 5.94562 4.53925Z"
        fill="#111827"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.1882 10.0052C13.7871 10.0052 14.3859 10.0052 14.9832 10.0052C15.0672 10.0052 15.1512 10.0052 15.2353 10.0052C15.4308 10.0052 15.637 9.91963 15.776 9.78214C15.909 9.64924 16.0083 9.43231 15.9991 9.24136C15.9899 9.04429 15.9258 8.83959 15.776 8.70057C15.6263 8.56309 15.443 8.47754 15.2353 8.47754C14.6364 8.47754 14.0376 8.47754 13.4403 8.47754C13.3563 8.47754 13.2723 8.47754 13.1882 8.47754C12.9927 8.47754 12.7865 8.56309 12.6474 8.70057C12.5145 8.83348 12.4152 9.0504 12.4244 9.24136C12.4336 9.43842 12.4977 9.64313 12.6474 9.78214C12.7972 9.9181 12.982 10.0052 13.1882 10.0052Z"
        fill="#111827"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.76636 10.0053C3.02758 10.0053 3.29034 10.0053 3.55156 10.0053C4.17484 10.0053 4.79812 10.0053 5.42139 10.0053C6.17757 10.0053 6.93375 10.0053 7.68993 10.0053C8.34376 10.0053 8.99759 10.0053 9.65142 10.0053C9.96917 10.0053 10.2869 10.0098 10.6047 10.0053C10.6092 10.0053 10.6138 10.0053 10.6184 10.0053C10.814 10.0053 11.0202 9.91971 11.1592 9.78222C11.2921 9.64932 11.3914 9.4324 11.3822 9.24144C11.3731 9.04438 11.3089 8.83967 11.1592 8.70066C11.0095 8.56317 10.8262 8.47762 10.6184 8.47762C10.3572 8.47762 10.0944 8.47762 9.83321 8.47762C9.20993 8.47762 8.58666 8.47762 7.96338 8.47762C7.2072 8.47762 6.45102 8.47762 5.69484 8.47762C5.04101 8.47762 4.38718 8.47762 3.73335 8.47762C3.4156 8.47762 3.09786 8.47304 2.78011 8.47762C2.77552 8.47762 2.77094 8.47762 2.76636 8.47762C2.57082 8.47762 2.36459 8.56317 2.22557 8.70066C2.09267 8.83356 1.99337 9.05049 2.00254 9.24144C2.01171 9.43851 2.07587 9.64321 2.22557 9.78222C2.37528 9.91818 2.56013 10.0053 2.76636 10.0053Z"
        fill="#111827"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.8983 9.76092C11.8418 9.76092 11.7853 9.75634 11.7288 9.75023C11.796 9.7594 11.8647 9.76856 11.9319 9.77773C11.8158 9.76093 11.7043 9.73037 11.5958 9.68607C11.657 9.71204 11.7181 9.73801 11.7776 9.76245C11.6783 9.71968 11.5867 9.66468 11.5011 9.60052C11.5531 9.64024 11.6035 9.67996 11.6554 9.71968C11.5653 9.64941 11.4859 9.56997 11.4156 9.47984C11.4553 9.53178 11.495 9.58219 11.5347 9.63413C11.4691 9.54858 11.4156 9.4554 11.3728 9.35763C11.3988 9.41873 11.4248 9.47984 11.4492 9.53942C11.4034 9.43096 11.3728 9.31944 11.3575 9.20334C11.3667 9.27055 11.3759 9.3393 11.385 9.40651C11.3713 9.29347 11.3713 9.18042 11.385 9.06738C11.3759 9.13459 11.3667 9.20334 11.3575 9.27055C11.3743 9.15445 11.4049 9.04294 11.4492 8.93447C11.4232 8.99558 11.3973 9.05668 11.3728 9.11626C11.4156 9.01697 11.4706 8.92531 11.5347 8.83976C11.495 8.8917 11.4553 8.94211 11.4156 8.99405C11.4859 8.90392 11.5653 8.82448 11.6554 8.75421C11.6035 8.79393 11.5531 8.83365 11.5011 8.87337C11.5867 8.80768 11.6799 8.75421 11.7776 8.71144C11.7165 8.73741 11.6554 8.76338 11.5958 8.78782C11.7043 8.74199 11.8158 8.71144 11.9319 8.69616C11.8647 8.70533 11.796 8.71449 11.7288 8.72366C11.8418 8.70991 11.9548 8.70991 12.0679 8.72366C12.0007 8.71449 11.9319 8.70533 11.8647 8.69616C11.9808 8.71297 12.0923 8.74352 12.2008 8.78782C12.1397 8.76185 12.0786 8.73588 12.019 8.71144C12.1183 8.75421 12.21 8.80921 12.2955 8.87337C12.2436 8.83365 12.1932 8.79393 12.1412 8.75421C12.2313 8.82448 12.3108 8.90392 12.3811 8.99405C12.3413 8.94211 12.3016 8.8917 12.2619 8.83976C12.3276 8.92531 12.3811 9.01849 12.4238 9.11626C12.3979 9.05516 12.3719 8.99405 12.3474 8.93447C12.3933 9.04294 12.4238 9.15445 12.4391 9.27055C12.4299 9.20334 12.4208 9.13459 12.4116 9.06738C12.4254 9.18042 12.4254 9.29347 12.4116 9.40651C12.4208 9.3393 12.4299 9.27055 12.4391 9.20334C12.4223 9.31944 12.3917 9.43096 12.3474 9.53942C12.3734 9.47831 12.3994 9.41721 12.4238 9.35763C12.3811 9.45693 12.3261 9.54858 12.2619 9.63413C12.3016 9.58219 12.3413 9.53178 12.3811 9.47984C12.3108 9.56997 12.2313 9.64941 12.1412 9.71968C12.1932 9.67996 12.2436 9.64024 12.2955 9.60052C12.21 9.66621 12.1168 9.71968 12.019 9.76245C12.0801 9.73648 12.1412 9.71051 12.2008 9.68607C12.0923 9.7319 11.9808 9.76245 11.8647 9.77773C11.9319 9.76856 12.0007 9.7594 12.0679 9.75023C12.0114 9.75634 11.9548 9.76092 11.8983 9.76092C11.7013 9.76245 11.4981 9.84495 11.3575 9.98396C11.2246 10.1169 11.1253 10.3338 11.1345 10.5247C11.1437 10.7218 11.2078 10.9265 11.3575 11.0655C11.5057 11.2015 11.6906 11.2916 11.8983 11.2886C12.103 11.287 12.3184 11.2595 12.5124 11.1938C12.6927 11.1327 12.8791 11.0548 13.0349 10.9418C13.1357 10.87 13.2381 10.7936 13.3282 10.7081C13.4229 10.6179 13.5023 10.5095 13.5802 10.4056C13.6963 10.2482 13.7743 10.0726 13.8415 9.88925C13.9805 9.51498 13.982 9.06432 13.8736 8.68089C13.8201 8.48993 13.7376 8.29745 13.6261 8.13246C13.5207 7.97512 13.3985 7.8193 13.2518 7.69861C13.1556 7.61918 13.0563 7.53974 12.9509 7.47558C12.8393 7.40836 12.7171 7.35948 12.598 7.31212C12.4086 7.23574 12.2084 7.20672 12.0053 7.18991C11.6111 7.15783 11.1819 7.2724 10.8458 7.47558C10.5189 7.67417 10.2225 7.97512 10.0621 8.32647C10.0102 8.44105 9.95669 8.55867 9.92309 8.68089C9.88795 8.80615 9.8742 8.93753 9.8574 9.06738C9.83296 9.27514 9.8574 9.48748 9.89864 9.69218C9.97961 10.097 10.224 10.5141 10.5433 10.7753C10.6441 10.8578 10.7495 10.9418 10.8626 11.009C10.9802 11.0777 11.1101 11.1297 11.2369 11.177C11.4446 11.2565 11.6783 11.287 11.8983 11.2886C12.0939 11.2901 12.3016 11.2015 12.4391 11.0655C12.572 10.9326 12.6713 10.7157 12.6621 10.5247C12.6438 10.1077 12.3261 9.76398 11.8983 9.76092Z"
        fill="#111827"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.67261 15.2282C9.85592 15.2282 10.0408 15.2282 10.2241 15.2282C10.6656 15.2282 11.1086 15.2282 11.5501 15.2282C12.0847 15.2282 12.6209 15.2282 13.1556 15.2282C13.6185 15.2282 14.0814 15.2282 14.5442 15.2282C14.7703 15.2282 14.9964 15.2313 15.2225 15.2282C15.2256 15.2282 15.2286 15.2282 15.2332 15.2282C15.4287 15.2282 15.635 15.1427 15.774 15.0052C15.9069 14.8723 16.0062 14.6553 15.997 14.4644C15.9879 14.2673 15.9237 14.0626 15.774 13.9236C15.6243 13.7861 15.441 13.7006 15.2332 13.7006C15.0499 13.7006 14.865 13.7006 14.6817 13.7006C14.2402 13.7006 13.7972 13.7006 13.3557 13.7006C12.8211 13.7006 12.2849 13.7006 11.7502 13.7006C11.2873 13.7006 10.8244 13.7006 10.3616 13.7006C10.1355 13.7006 9.90939 13.6975 9.6833 13.7006C9.68025 13.7006 9.67719 13.7006 9.67261 13.7006C9.47707 13.7006 9.27084 13.7861 9.13182 13.9236C8.99892 14.0565 8.89962 14.2734 8.90879 14.4644C8.91796 14.6615 8.98212 14.8662 9.13182 15.0052C9.28153 15.1411 9.46638 15.2282 9.67261 15.2282Z"
        fill="#111827"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.76636 15.2278C3.25367 15.2278 3.74099 15.2278 4.22983 15.2278C5.01046 15.2278 5.78955 15.2278 6.57018 15.2278C6.74891 15.2278 6.92764 15.2278 7.10485 15.2278C7.30039 15.2278 7.50662 15.1423 7.64563 15.0048C7.77854 14.8719 7.87783 14.655 7.86867 14.464C7.8595 14.2669 7.79534 14.0622 7.64563 13.9232C7.49592 13.7857 7.31261 13.7002 7.10485 13.7002C6.61753 13.7002 6.13022 13.7002 5.64137 13.7002C4.86075 13.7002 4.08165 13.7002 3.30103 13.7002C3.1223 13.7002 2.94356 13.7002 2.76636 13.7002C2.57082 13.7002 2.36459 13.7857 2.22557 13.9232C2.09267 14.0561 1.99337 14.2731 2.00254 14.464C2.01171 14.6611 2.07587 14.8658 2.22557 15.0048C2.37528 15.1408 2.56013 15.2278 2.76636 15.2278Z"
        fill="#111827"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.38856 14.9875C8.33203 14.9875 8.27551 14.9829 8.21899 14.9768C8.2862 14.986 8.35495 14.9951 8.42216 15.0043C8.30606 14.9875 8.19454 14.9569 8.08608 14.9126C8.14719 14.9386 8.20829 14.9646 8.26787 14.989C8.16858 14.9462 8.07692 14.8912 7.99137 14.8271C8.04331 14.8668 8.09372 14.9065 8.14566 14.9462C8.05553 14.876 7.97609 14.7965 7.90582 14.7064C7.94554 14.7583 7.98526 14.8088 8.02498 14.8607C7.95929 14.7751 7.90582 14.682 7.86305 14.5842C7.88902 14.6453 7.91499 14.7064 7.93943 14.766C7.8936 14.6575 7.86305 14.546 7.84777 14.4299C7.85694 14.4971 7.8661 14.5659 7.87527 14.6331C7.86152 14.52 7.86152 14.407 7.87527 14.2939C7.8661 14.3612 7.85694 14.4299 7.84777 14.4971C7.86458 14.381 7.89513 14.2695 7.93943 14.161C7.91346 14.2221 7.88749 14.2832 7.86305 14.3428C7.90582 14.2435 7.96082 14.1519 8.02498 14.0663C7.98526 14.1183 7.94554 14.1687 7.90582 14.2206C7.97609 14.1305 8.05553 14.051 8.14566 13.9808C8.09372 14.0205 8.04331 14.0602 7.99137 14.0999C8.07692 14.0342 8.1701 13.9808 8.26787 13.938C8.20677 13.964 8.14566 13.9899 8.08608 14.0144C8.19454 13.9686 8.30606 13.938 8.42216 13.9227C8.35495 13.9319 8.2862 13.9411 8.21899 13.9502C8.33203 13.9365 8.44508 13.9365 8.55812 13.9502C8.49091 13.9411 8.42216 13.9319 8.35495 13.9227C8.47105 13.9395 8.58256 13.9701 8.69103 14.0144C8.62992 13.9884 8.56882 13.9624 8.50924 13.938C8.60853 13.9808 8.70019 14.0358 8.78574 14.0999C8.7338 14.0602 8.68339 14.0205 8.63145 13.9808C8.72158 14.051 8.80102 14.1305 8.87129 14.2206C8.83157 14.1687 8.79185 14.1183 8.75213 14.0663C8.81782 14.1519 8.87129 14.2451 8.91406 14.3428C8.88809 14.2817 8.86212 14.2206 8.83768 14.161C8.88351 14.2695 8.91406 14.381 8.92934 14.4971C8.92017 14.4299 8.91101 14.3612 8.90184 14.2939C8.91559 14.407 8.91559 14.52 8.90184 14.6331C8.91101 14.5659 8.92017 14.4971 8.92934 14.4299C8.91253 14.546 8.88198 14.6575 8.83768 14.766C8.86365 14.7049 8.88962 14.6438 8.91406 14.5842C8.87129 14.6835 8.81629 14.7751 8.75213 14.8607C8.79185 14.8088 8.83157 14.7583 8.87129 14.7064C8.80102 14.7965 8.72158 14.876 8.63145 14.9462C8.68339 14.9065 8.7338 14.8668 8.78574 14.8271C8.70019 14.8928 8.60701 14.9462 8.50924 14.989C8.57034 14.963 8.63145 14.9371 8.69103 14.9126C8.58256 14.9585 8.47105 14.989 8.35495 15.0043C8.42216 14.9951 8.49091 14.986 8.55812 14.9768C8.5016 14.9829 8.44508 14.9875 8.38856 14.9875C8.19149 14.989 7.98831 15.0715 7.84777 15.2105C7.71487 15.3434 7.61557 15.5604 7.62474 15.7513C7.6339 15.9484 7.69806 16.1531 7.84777 16.2921C7.99595 16.428 8.1808 16.5182 8.38856 16.5151C8.59326 16.5136 8.80866 16.4861 9.00266 16.4204C9.18293 16.3593 9.3693 16.2814 9.52512 16.1684C9.62594 16.0966 9.72829 16.0202 9.81842 15.9346C9.91314 15.8445 9.99257 15.736 10.0705 15.6322C10.1866 15.4748 10.2645 15.2991 10.3317 15.1158C10.4707 14.7415 10.4723 14.2909 10.3638 13.9074C10.3103 13.7165 10.2278 13.524 10.1163 13.359C10.0109 13.2017 9.88869 13.0459 9.74204 12.9252C9.6458 12.8457 9.5465 12.7663 9.4411 12.7021C9.32958 12.6349 9.20737 12.586 9.08821 12.5387C8.89879 12.4623 8.69867 12.4333 8.49549 12.4165C8.10136 12.3844 7.67209 12.499 7.33601 12.7021C7.0091 12.9007 6.71274 13.2017 6.55234 13.553C6.5004 13.6676 6.44693 13.7852 6.41332 13.9074C6.37818 14.0327 6.36444 14.1641 6.34763 14.2939C6.32319 14.5017 6.34763 14.714 6.38888 14.9187C6.46984 15.3236 6.71426 15.7406 7.03354 16.0018C7.13436 16.0843 7.23977 16.1684 7.35282 16.2356C7.47045 16.3043 7.60029 16.3563 7.72709 16.4036C7.93485 16.483 8.16858 16.5136 8.38856 16.5151C8.58409 16.5167 8.79185 16.428 8.92934 16.2921C9.06224 16.1592 9.16154 15.9423 9.15237 15.7513C9.13404 15.3343 8.81629 14.9905 8.38856 14.9875Z"
        fill="#111827"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default FilterIcon
// stroke={color}
// strokeWidth="1.5"
// strokeLinecap="round"
// strokeLinejoin="round"

// width={size}
// height={size}
// viewBox="0 0 24 24"
// fill="none"
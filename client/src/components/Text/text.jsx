import React from "react";

const sizeClasses = {
  txtInterMedium16WhiteA700: "font-inter font-medium",
  txtInterRegular20: "font-inter font-normal",
  txtInterBold26: "font-bold font-inter italic",
  txtInterMedium24: "font-inter font-medium",
  txtPoppinsBold32: "font-bold font-poppins",
  txtInterBold22: "font-bold font-inter",
  txtInterBold45: "font-bold font-inter",
  txtPoppinsRegular16Bluegray700: "font-normal font-poppins",
  txtPoppinsRegular16WhiteA700: "font-normal font-poppins",
  txtOpenSansSemiBold16: "font-opensans font-semibold",
  txtInterBold40: "font-bold font-inter",
  txtPoppinsRegular12: "font-normal font-poppins",
  txtInterBold64: "font-bold font-inter italic",
  txtInterRegular24: "font-inter font-normal",
  txtInterMedium18: "font-inter font-medium",
  txtInterRegular16WhiteA700: "font-inter font-normal",
  txtInterBold58: "font-bold font-inter italic",
  txtInterBold36: "font-bold font-inter",
  txtPoppinsBold64: "font-bold font-poppins",
  txtOpenSansRegular16: "font-normal font-opensans",
  txtInterBold32: "font-bold font-inter",
  txtInterMedium16: "font-inter font-medium",
  txtInterSemiBold16: "font-inter font-semibold",
  txtPoppinsRegular16: "font-normal font-poppins",
  txtPoppinsRegular12Black900: "font-normal font-poppins",
  txtWorkSansRomanSemiBold24: "font-semibold font-worksans",
  txtOswaldRegular24: "font-normal font-oswald",
  txtInterBold30: "font-bold font-inter",
  txtInterRegular18Bluegray300: "font-inter font-normal",
  txtInterBold30Black900: "font-bold font-inter",
  txtInterRegular16: "font-inter font-normal",
  txtInterRegular18: "font-inter font-normal",
  txtInterRegular20Gray600: "font-inter font-normal",
};

const Text = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };

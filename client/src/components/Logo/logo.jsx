export const Logo = ({ logoIcon = "images/img_logoicon.svg" }) => {
  return (
    <div className="cursor-pointer flex items-center justify-center">
      <img alt="Logo icon" src={logoIcon} />
      <div
        style={{ fontFamily: "Inter-BoldItalic, Helvetica", fontSize: "26px" }}
        className="text-white italic font-semibold -ml-1.5"
      >
        EliteBluPrint
      </div>
    </div>
  );
};

export default Logo;

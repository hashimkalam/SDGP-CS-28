import pattern_img from "../../assets/pattern.png";

function RegisterImage({
  logInPersonImage,
  signUpPersonImage,

  loginPage,
}) {
  return (
    <div
      style={{ backgroundImage: `url(${pattern_img})` }}
      className="bg-cover hidden sm:hidden lg:flex justify-center items-center md:w-1/2"
    >
      <div className="relative md:w-[40vw] lg:w-[30vw] lg:h-[65vh] xl:h-[55vh] border border-[white] -z-1 p-5 rounded-2xl lg:text-center xl:text-left backdrop-blur-lg">
        <p className="text-white text-sm md:text-md lg:text-lg xl:text-xl font-extrabold xl:w-1/2">
          No more complex CAD operations. Describe your ideal space, and we'll
          bring it to life
        </p>

        {loginPage ? (
          <img
            src={logInPersonImage}
            className="registerImg lg:right-[-20px] xl:right-[-80px] scale-90 lg:scale-100"
            alt="Person"
          />
        ) : (
          <img
            src={signUpPersonImage}
            className="registerImg lg:right-[0px] xl:right-[-50px] scale-100"
            alt="Person"
          />
        )}
      </div>
    </div>
  );
}

export default RegisterImage;

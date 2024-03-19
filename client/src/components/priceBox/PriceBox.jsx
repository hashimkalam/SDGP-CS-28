import design from "../../../public/images/img_svg.png";

function PriceBox(prop) {
  return (
    <div className="PriceBox relative bg-[#090e34] text-center rounded-2xl mx-10 mt-5 w-fit p-5 px-7">
      <h1 className="price mt-10 font-bold text-2xl md:text-3xl lg:text-4xl">
        ${prop.price}
      </h1>
      <div className="feature flex flex-col space-y-6 h-[220px] my-10">
        <p>{prop.f1}</p>
        <p>{prop.f2}</p>
        <p>{prop.f3}</p>
      </div>
      <button className="bg-[#0b2b96] px-4 py-1.5 mb-2 font-bold rounded-md">
        Proceed
      </button>

      <img
        src={design}
        alt="design image"
        className="w-[179px] absolute right-0 bottom-0"
      />
    </div>
  );
}

export default PriceBox;

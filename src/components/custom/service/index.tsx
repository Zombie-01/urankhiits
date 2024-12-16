const CustomService = () => {
  return (
    <div
      id="ourservice"
      className="h-screen relative w-screen overflow-hidden flex justify-center items-center md:items-start py-10 sm:py-20 md:py-28 ">
      <div className="absolute z-20 md:-left-[150px]">
        {" "}
        <div className="w-full h-full max-w-[500px] md:max-w-[700px] flex items-center justify-center">
          <img
            src="/svg.png"
            alt={"svg"}
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomService;

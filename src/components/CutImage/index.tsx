import InputImage from "./InputImage";

const CutImage = () => {
  return (
    <div className="bg-gray-800 min-h-screen w-full">
      <div className="w-full py-10 text-center">
        <div className="mb-3">
          <h1 className="text-yellow-400 text-4xl md:text-6xl">
            Cut Out Mascle
          </h1>
        </div>
        <div className="px-1 border-b-2 border-yellow-400 w-fit mx-auto cursor-pointer hover:border-white">
          <span className="text-yellow-400 text-lg md:text-xl">
            see description
          </span>
        </div>
      </div>

      <InputImage />
    </div>
  );
};

export default CutImage;

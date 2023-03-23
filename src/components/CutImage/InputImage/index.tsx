/* eslint-disable jsx-a11y/alt-text */
const InputImage = () => {
  return (
    <div className="mx-auto relative w-[92vw] h-[92vw] max-h-[500px] max-w-[500px] rounded-lg border-2 border-yellow-400 bg-gray-700 flex justify-center items-center">
      <div className="h-full w-full absolute flex flex-col items-center">
        <label
          htmlFor="file-input"
          className="h-full w-full flex flex-col justify-center items-center px-10 py-10"
        >
          <img
            className="w-full h-full object-cover object-center absolute inset-0 rounded-lg"
            // src="/logo192.png"
            src={undefined}
          />
          <input
            id="file-input"
            className="hidden"
            type="file"
            accept="image/*"
            name="myImage"
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 hover:cursor-pointer rounded-lg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-xl">Click to insert image</p>
        </label>
      </div>
    </div>
  );
};

export default InputImage;

import React from "react";

function Pricefilter({ init, price, setfun }) {
  // console.log(setfun);

  return (
    <div>
      <div className="shadow-2xl p-8 rounded bg-gray-800 border-2 mt-2 border-white flex justify-center items-center gap-2">
        <p>{init.min}</p>
        <input
          type="range"
          className="w-40 h-10 text-lg border border-gray-400 rounded"
          value={init.max}
          min={price.min}
          max={price.max}
          onChange={(e) => {
            setfun({
              ...init,
              max: Number(e.target.value),
              isApplied: true,
            });
          }}
        />
        <p>{init.max}</p>
      </div>
    </div>
  );
}

export default Pricefilter;

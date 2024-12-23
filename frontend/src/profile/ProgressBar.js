import React from "react";

const ProgressBar = ({ currentValue, maxValue, minLabel, maxLabel }) => {
  // Calcula a porcentagem de progresso
  const progress = (currentValue / maxValue) * 100;

  return (
    <div className="w-full max-w-xs">
      {/* Labels */}
      <div className="flex justify-between text-sm mb-2">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>

      {/* Barra de progresso */}
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
            {`${Math.round(progress)}%`}
          </div>
        </div>
        <div className="flex mb-2">
          <div
            className="flex-grow h-2 mb-4 bg-gray-200 rounded"
            style={{ width: `${progress}%`, backgroundColor: "#4CAF50" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

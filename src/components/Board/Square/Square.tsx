import React from 'react';

interface IProps {
  letter: string;
  backgroundColor?: string;
}

function Square({ letter, backgroundColor }: IProps) {
  return (
    <div
      className="text-text w-16 h-16 max-w-[calc(20vw-0.25rem)] max-h-[calc(20vw-0.25rem)] border-2 flex justify-center items-center sm:text-3xl text-xl font-bold border-black border-solid dark:border-borderGray dark:text-light"
      style={{
        backgroundColor,
        ...(letter && { borderColor: `rgb(156 163 175)` }),
      }}
    >
      {letter}
    </div>
  );
}

export default Square;

Square.defaultProps = {
  backgroundColor: null,
};

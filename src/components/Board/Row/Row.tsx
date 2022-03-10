import React from 'react';

import Square from '@/components/Board/Square';

interface IProps {
  letters: string[];
  colors?: string;
}

function Row({ letters, colors }: IProps) {
  return (
    <div className="grid grid-cols-5 gap-x-1">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <Square
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            letter={letters[index]}
            backgroundColor={colors?.[index] || null}
          />
        ))}
    </div>
  );
}

export default Row;

Row.defaultProps = {
  colors: null,
};

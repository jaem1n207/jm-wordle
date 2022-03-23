import React from 'react';
import { FiDelete } from 'react-icons/fi';
import { GRAY, GREEN, YELLOW } from '../constants';

interface IProps {
  letters: string;
  onCharClick: (e: any, isKeyboard: boolean) => void;
  matchedLetters: string[];
  halfLetters: string[];
  failedLetters: string[];
}

function KeyBoard({
  letters,
  onCharClick,
  matchedLetters,
  halfLetters,
  failedLetters,
}: IProps) {
  return (
    <div className="flex justify-center w-full mb-1">
      {letters.split(``).map((letter) => {
        let char: string | React.ReactElement = letter;
        let id = letter;
        if (letter === `>`) {
          char = (
            <div className="pointer-events-none text-[9px] lg:text-xs">
              ENTER
            </div>
          );
          id = `Enter`;
        }
        if (letter === `<`) {
          char = <FiDelete className="text-2xl pointer-events-none" />;
          id = `Backspace`;
        }
        let backgroundColor = `rgb(129, 131, 132)`;
        if (matchedLetters.includes(letter)) {
          backgroundColor = GREEN;
        } else if (halfLetters.includes(letter)) {
          backgroundColor = YELLOW;
        } else if (failedLetters.includes(letter)) {
          backgroundColor = GRAY;
        }

        return (
          <button
            type="button"
            key={letter}
            id={id}
            className="flex items-center justify-center mr-1 h-14 max-h[calc(7vh)] rounded text-sm font-bold cursor-pointer select-none w-11 max-w-[calc(10%-4px)] max-h-[calc(7vh)]"
            style={{
              backgroundColor,
              ...([`<`, `>`].includes(letter) && { padding: `0 10px` }),
            }}
            onClick={(e) => onCharClick(e, false)}
          >
            {char}
          </button>
        );
      })}
    </div>
  );
}

export default KeyBoard;

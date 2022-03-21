/* eslint-disable no-bitwise */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import sowpodsFive from 'sowpods-five';
import { josa } from 'josa';

import { Key } from '@/types/key';
import { GlobalKeypressListener } from '@/utils/GlobalKeyPressListener';
import { GRAY, GREEN, YELLOW } from './constants';
import Row from './Row';
import { fiveLetterDictionary } from './utils/dictionary';

const createColors = (wordArr, target) => {
  const targetObj = target.split(``).reduce((a, char) => {
    const value = a;
    if (a[char]) {
      value[char] += 1;
    } else {
      value[char] = 1;
    }
    return value;
  }, {});
  const wordObj = {};
  const colors = [GRAY, GRAY, GRAY, GRAY, GRAY];

  wordArr.forEach((point, i) => {
    if (target[i] === point) {
      colors[i] = GREEN;
      matchedLetters[i] = point;
      if (wordObj[point]) {
        wordObj[point] += 1;
      } else {
        wordObj[point] = 1;
      }
    }
  });

  wordArr.forEach((point, i) => {
    if (target.includes(point) && colors[i] !== GREEN) {
      if ((wordObj[point] || 0) < targetObj[point]) {
        colors[i] = YELLOW;
        halfLetters.push(point);
      }
      if (wordObj[point]) {
        wordObj[point] += 1;
      } else {
        wordObj[point] = 1;
      }
    } else {
      failedLetters.push(point);
    }
  });

  return colors;
};

const uid = () => Math.random().toString(36).substring(2, 9);

let matchedLetters = [null, null, null, null, null];
let halfLetters = [];
let failedLetters = [];

// TODO 2차 업데이트: 사전 API 사용하여 정답 단어 뜻 파악 가능하도록 하기
function Board() {
  const [grid, setGrid] = useState([
    {
      id: uid(),
      letters: [],
      colors: null,
    },
    {
      id: uid(),
      letters: [],
      colors: null,
    },
    {
      id: uid(),
      letters: [],
      colors: null,
    },
    {
      id: uid(),
      letters: [],
      colors: null,
    },
    {
      id: uid(),
      letters: [],
      colors: null,
    },
    {
      id: uid(),
      letters: [],
      colors: null,
    },
  ]);
  const [gameIsFinished, setGameIsFinished] = useState(false);
  const [target, setTarget] = useState(
    fiveLetterDictionary[
      ~~(Math.random() * fiveLetterDictionary.length)
    ].toUpperCase(),
  );
  const [toastMessage, setToastMessage] = useState(``);
  const [modalTitle, setModalTitle] = useState(``);

  const rowRef = useRef(0);
  const squareRef = useRef(0);

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  // eslint-disable-next-line no-console
  console.log(target);

  const handleEnteredKey = useCallback(
    // eslint-disable-next-line consistent-return
    (e) => {
      const { key } = e;
      if (gameIsFinished) {
        if (key === `Enter`) {
          return handleResetGame();
        }
      }

      if (/^[a-z]{1}$/i.test(key) && squareRef.current <= 4) {
        const newGrid = [...grid];
        newGrid[rowRef.current].letters[squareRef.current] = key.toUpperCase();
        setGrid(newGrid);
        squareRef.current += 1;
      } else if (key === `Backspace` && squareRef.current > 0) {
        squareRef.current -= 1;
        const newGrid = [...grid];
        newGrid[rowRef.current].letters[squareRef.current] = ``;
        setGrid(newGrid);
      } else if (key === `Enter`) {
        if (squareRef.current === 5) {
          const word = grid[rowRef.current].letters.join(``);

          if (sowpodsFive.includes(word.toLowerCase())) {
            for (let i = 0, { length } = word; i < length; i++) {
              if (matchedLetters[i] && matchedLetters[i] !== word[i]) {
                let pos;
                switch (i) {
                  case 0:
                    pos = `첫 번째`;
                    break;
                  case 1:
                    pos = `두 번째`;
                    break;
                  case 2:
                    pos = `세 번째`;
                    break;
                  case 3:
                    pos = `네 번째`;
                    break;
                  default:
                    pos = `다섯 번째`;
                    break;
                }
                setToastMessage(
                  `${pos} 자리에는 ${target[i]}가 들어아갸합니다`,
                );
                setTimeout(() => setToastMessage(``), 1500);
                return;
              }
            }

            if (halfLetters.length) {
              for (let i = 0, { length } = halfLetters; i < length; i++) {
                if (!word.split(``).includes(halfLetters[i])) {
                  setToastMessage(
                    josa(`${halfLetters[i]}#{가} 포함되어야 합니다`),
                  );
                  setTimeout(() => setToastMessage(``), 1500);
                  return;
                }
              }
            }

            const newGrid = [...grid];
            newGrid[rowRef.current].colors = createColors(
              newGrid[rowRef.current].letters,
              target,
            );
            setGrid(newGrid);
            rowRef.current += 1;
            squareRef.current = 0;
            if (word === target) {
              let message;
              switch (rowRef.current) {
                case 1:
                  message = `로또 사러 가세요`;
                  break;
                case 2:
                  message = `천재네요`;
                  break;
                case 3:
                  message = `최석준이랑 동급이네요`;
                  break;
                case 4:
                  message = `대단해요`;
                  break;
                case 5:
                  message = `훌륭해요`;
                  break;
                default:
                  message = `잘했어요`;
                  break;
              }
              setGameIsFinished(true);
              setModalTitle(message);
              return;
            }
            if (rowRef.current === 6) {
              setGameIsFinished(true);
              setModalTitle(`다음 게임엔 행운을 빌게요`);
            }
          } else {
            setToastMessage(`존재하지 않는 단어입니다`);
            setTimeout(() => setToastMessage(``), 1500);
          }
        } else {
          setToastMessage(`5글자를 완성해주세요`);
          setTimeout(() => setToastMessage(``), 1500);
        }
      }
    },
    [grid, gameIsFinished, target],
  );

  const handleResetGame = () => {
    setGameIsFinished(false);
    setGrid([
      {
        id: uid(),
        letters: [],
        colors: null,
      },
      {
        id: uid(),
        letters: [],
        colors: null,
      },
      {
        id: uid(),
        letters: [],
        colors: null,
      },
      {
        id: uid(),
        letters: [],
        colors: null,
      },
      {
        id: uid(),
        letters: [],
        colors: null,
      },
      {
        id: uid(),
        letters: [],
        colors: null,
      },
    ]);
    setTarget(
      fiveLetterDictionary[
        ~~(Math.random() * fiveLetterDictionary.length)
      ].toUpperCase(),
    );
    setToastMessage(``);
    rowRef.current = 0;
    squareRef.current = 0;
    matchedLetters = [null, null, null, null, null];
    halfLetters = [];
    failedLetters = [];
  };

  const handleClose = () => {
    handleResetGame();
    // eslint-disable-next-line no-console
    console.log(`모달 닫힘`);
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-around w-full h-screen"
      onKeyDown={handleEnteredKey}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center flex-1">
        <div className="grid max-w-lg grid-rows-6 p-2 gap-y-1">
          {Array(6)
            .fill(0)
            .map((_, index) => {
              const { id, letters, colors } = grid[index];
              return <Row key={id} letters={letters} colors={colors} />;
            })}
        </div>
      </div>

      {/* 키보드 영역 */}
      <div className="flex flex-col items-center justify-center w-full h-48 max-w-lg bg-textMuted md:mb-14">
        키보드 자판 들어갈 곳
      </div>

      {/* Toast */}
      {toastMessage && (
        <div>
          <div>
            <div>{toastMessage}</div>
          </div>
        </div>
      )}

      {/* Modal */}
      {gameIsFinished && (
        <div id="model">
          <GlobalKeypressListener keyCode={Key.Escape} handler={handleClose} />
          {modalTitle}
          <button type="button" onClick={handleResetGame}>
            다시하시겠습니까?
          </button>
        </div>
      )}
    </div>
  );
}

export default Board;

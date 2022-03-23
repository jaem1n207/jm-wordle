/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-bitwise */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Switch from 'react-switch';
import { josa } from 'josa';
import { AiFillSound } from 'react-icons/ai';

import { uniqueId } from '@/utils/uniqueId';
import { useModalState } from '@/hooks';
import { useToggle } from '@/hooks/use-toggle';
import { GRAY, GREEN, YELLOW } from './constants';
import Row from './Row';
import KeyBoard from './Keyboard';
import { fiveLetterDictionary } from './utils/dictionary';
import { useFetchDictionary } from './hooks/use-fetch-dictionary';
import Modal from '../Modal';
import { posMessages, successMessages } from './utils/messages';

const calculateBgColors = (wordArr, target) => {
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

let matchedLetters = [null, null, null, null, null];
let halfLetters = [];
let failedLetters = [];

function Board() {
  const [grid, setGrid] = useState([
    {
      id: uniqueId(),
      letters: [],
      colors: null,
    },
    {
      id: uniqueId(),
      letters: [],
      colors: null,
    },
    {
      id: uniqueId(),
      letters: [],
      colors: null,
    },
    {
      id: uniqueId(),
      letters: [],
      colors: null,
    },
    {
      id: uniqueId(),
      letters: [],
      colors: null,
    },
    {
      id: uniqueId(),
      letters: [],
      colors: null,
    },
  ]);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [target, setTarget] = useState(
    fiveLetterDictionary[
      ~~(Math.random() * fiveLetterDictionary.length)
    ].toUpperCase(),
  );
  const [toastMessage, setToastMessage] = useState(``);
  const [modalMessage, setModalMessage] = useState(``);
  const { modal, openModal, closeModal } = useModalState();
  const { value: isStrictMode, toggle: handleChangeStrictMode } =
    useToggle(false);
  const { data: dictionaryWord, error } = useFetchDictionary({ target });
  if (error) return <div>{error}</div>;

  const rowRef = useRef(0);
  const squareRef = useRef(0);

  const containerRef = useRef(null);

  useEffect(() => {
    if (!modal.isOpen) {
      if (containerRef.current) {
        containerRef.current.focus();
      }
    }
  }, [modal.isOpen]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`%c${target}`, `color: #2b6cb0; font-size: 48px`);

    const showingModal = async () => {
      openModal({
        headerChildren: modalMessage,
        children: (
          <>
            {dictionaryWord && (
              <div className="flex items-center mb-1">
                <h1 className="text-xl font-bold">{target}</h1>
                {dictionaryWord[0].phonetic && (
                  <div className="ml-2 text-textMuted">
                    / {dictionaryWord[0].phonetic} /
                  </div>
                )}
                <AiFillSound
                  className="ml-2 cursor-pointer"
                  onClick={() => {
                    const audioData = dictionaryWord[0].phonetics
                      .map(
                        (phonetic) => phonetic.audio !== `` && phonetic.audio,
                      )
                      .filter((data) => data);
                    if (audioData.length <= 0) {
                      setToastMessage(
                        `해당 단어는 오디오가 없어 재상할 수 없어요 🥺`,
                      );
                    }
                    const audio = new Audio(audioData[0]);
                    audio.play();
                  }}
                />
              </div>
            )}

            {dictionaryWord ? (
              <article>
                {dictionaryWord[0].meanings.map(
                  ({ partOfSpeech, definitions }, index) => (
                    <div key={index}>
                      <strong>{partOfSpeech}</strong>
                      <ol className="ml-2 list-decimal list-inside">
                        {definitions.map(({ definition }, index) => (
                          <li key={index}>{definition}</li>
                        ))}
                      </ol>
                    </div>
                  ),
                )}
              </article>
            ) : (
              <div>이 단어에 대한 정의를 찾을 수 없어요 🥺</div>
            )}
          </>
        ),
        footerChildren: (
          <button
            className="w-full px-5 py-3"
            type="button"
            onClick={() => {
              closeModal();
              handleResetGame();
            }}
          >
            다시하시겠습니까?
          </button>
        ),
      });
    };

    if (target && isGameFinished) {
      showingModal();
    }
  }, [target, isGameFinished]);

  const handleEnteredKey = useCallback(
    // eslint-disable-next-line consistent-return
    (e, isKeyboard: boolean) => {
      if (isGameFinished) {
        if (e.key === `Enter` && modal.isOpen === false) {
          return handleResetGame();
        }
        return;
      }

      const key = isKeyboard ? e.key : e.target.id;

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

          if (fiveLetterDictionary.includes(word.toLowerCase())) {
            if (isStrictMode) {
              for (let i = 0, { length } = word; i < length; i++) {
                if (matchedLetters[i] && matchedLetters[i] !== word[i]) {
                  const pos = posMessages[i];
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
            }

            const newGrid = [...grid];
            newGrid[rowRef.current].colors = calculateBgColors(
              newGrid[rowRef.current].letters,
              target,
            );
            setGrid(newGrid);
            rowRef.current += 1;
            squareRef.current = 0;
            if (word === target) {
              setModalMessage(successMessages[rowRef.current - 1]);
              setIsGameFinished(true);
              return;
            }
            if (rowRef.current === 6) {
              setModalMessage(`다음 게임엔 행운을 빌게요`);
              setIsGameFinished(true);
            }
          } else {
            setToastMessage(`존재하지 않는 단어입니다`);
            setTimeout(() => setToastMessage(``), 1500);
          }
        } else {
          setToastMessage(`5글자를 완성해주세요`);
          setTimeout(() => setToastMessage(``), 1500);
        }
      } else if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(key)) {
        setToastMessage(`영문으로 입력해주세요! 🥰`);
        setTimeout(() => setToastMessage(``), 1500);
      }
    },
    [modal, grid, isGameFinished, target, isStrictMode],
  );

  const handleResetGame = () => {
    setIsGameFinished(false);
    setGrid([
      {
        id: uniqueId(),
        letters: [],
        colors: null,
      },
      {
        id: uniqueId(),
        letters: [],
        colors: null,
      },
      {
        id: uniqueId(),
        letters: [],
        colors: null,
      },
      {
        id: uniqueId(),
        letters: [],
        colors: null,
      },
      {
        id: uniqueId(),
        letters: [],
        colors: null,
      },
      {
        id: uniqueId(),
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

  const keyboardProps = useMemo(
    () => ({
      onCharClick: handleEnteredKey,
      matchedLetters,
      halfLetters,
      failedLetters,
    }),
    [handleEnteredKey],
  );

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-around w-full min-h-[calc(100vh-3rem)]"
      onKeyDown={(e) => handleEnteredKey(e, true)}
      role="button"
      tabIndex={0}
    >
      {/* Strict Mode Toggle */}
      <label className="flex items-center">
        <span className="mr-1">엄격 모드</span>
        <Switch
          onColor="#718096"
          offColor="#a0aec0"
          checked={isStrictMode}
          onChange={handleChangeStrictMode}
        />
      </label>

      {/* Grid */}
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

      {/* Keyboard */}
      <div className="flex flex-col items-center justify-center w-full mb-12 lg:max-w-lg md:mb-14">
        <KeyBoard letters="QWERTYUIOP" {...keyboardProps} />
        <KeyBoard letters="ASDFGHJKL" {...keyboardProps} />
        <KeyBoard letters=">ZXCVBNM<" {...keyboardProps} />
      </div>

      <Modal {...modal} />

      {/* Toast */}
      {toastMessage && (
        <div className="absolute top-[6%] translate-y-0 w-fit max-w-[500px] animate-pulse">
          <div className="relative p-4 m-4 font-bold border-none rounded-md bg-dark text-light dark:bg-light dark:text-dark">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}

export default Board;

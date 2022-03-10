import React, { useState } from 'react';
import Row from './Row';
// import sowpodsFive from 'sowpods-five';

const uid = () => Math.random().toString(36).substring(2, 9);

const baseGrid = [
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
];

function Board() {
  const [grid, setGrid] = useState(baseGrid);
  const [gameIsFinished, setGameIsFinished] = useState(false);

  const handleResetGame = () => {
    setGameIsFinished(false);
    setGrid(baseGrid);
  };

  return (
    <>
      <section className="flex items-center flex-1">
        <div className="grid grid-rows-6 p-2 gap-y-1">
          {Array(6)
            .fill(0)
            .map((_, index) => {
              const { id, letters, colors } = grid[index];
              return <Row key={id} letters={letters} colors={colors} />;
            })}
        </div>
        {gameIsFinished && (
          <div id="model">
            <button type="button" onClick={handleResetGame}>
              다시하시겠습니까?
            </button>
          </div>
        )}
      </section>

      {/* 키보드 영역 */}
      <section className="flex flex-col items-center justify-center w-full h-48 bg-textMuted mb-14">
        키보드 자판 들어갈 곳
      </section>
    </>
  );
}

export default Board;

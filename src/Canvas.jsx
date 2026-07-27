import React from 'react';
import { Stage, Layer, Line, Text , Image} from 'react-konva';
import { useImage } from 'react-konva-utils';

const Canvas = () => {
  const [tool, setTool] = React.useState('pen');
  const [lines, setLines] = React.useState([]);
  const [redo_lines, setRedoLines] = React.useState([]);
  const isDrawing = React.useRef(false);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setRedoLines([])
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };
  const handleUndo = (e) =>
  {
    let temp_undo_array = structuredClone(lines);
    let removed_elem = temp_undo_array.pop();
    if(removed_elem != undefined)
    {
      redo_lines.push(removed_elem);
      setLines(temp_undo_array);
    }
  };

  const handleRedo = (e) =>
  {
    let temp_array = structuredClone(lines);
    let removed_elem = redo_lines.pop();
    if(removed_elem != undefined)
    {
      temp_array.push(removed_elem)
      setLines(temp_array);
    }

  }
  const [nativeImage] = useImage('../assets/kanji/04e2d.svg');
  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };


  return (
    <div>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRedo}>Redo</button>

      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <Layer>
          <Text text="Just start drawing" x={5} y={30} />
          <Image image={nativeImage} scaleX={5} scaleY={5}/>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}

        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;

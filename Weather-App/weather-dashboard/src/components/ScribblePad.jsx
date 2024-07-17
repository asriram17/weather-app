import React, { useRef, useState, useEffect } from 'react';
// import '../styles/ScribblePad.css'

const ScribblePad = () => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [tool, setTool] = useState('draw'); // 'draw', 'erase'

  // Initialize canvas context
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.lineWidth = 5;
      setCtx(context);
    }
  };

  // Start drawing
  const startDrawing = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setDrawing(true);
  };

  // Draw while moving
  const draw = (e) => {
    if (!drawing) return;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.stroke();
  };

  // Finish drawing
  const finishDrawing = () => {
    ctx.closePath();
    setDrawing(false);
  };

  // Handle color change
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  // Clear canvas
  const clearCanvas = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  // Save canvas as image
  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'scribble.png';
      link.click();
    }
  };

  // Toggle drawing tool (draw or erase)
  const toggleTool = () => {
    const newTool = tool === 'draw' ? 'erase' : 'draw';
    setTool(newTool);
    if (newTool === 'erase') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 20; // Adjust erase size if needed
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = 20; // Reset draw size
    }
  };

  // Initialize canvas context on component mount
  useEffect(() => {
    initCanvas();
  }, []);

  return (
      <div className='scribble'>
        <div className="scribble-pad-container">
        <canvas
            ref={canvasRef}
            width={600}
            height={300}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={finishDrawing}
            onMouseOut={finishDrawing}
        />
        </div>
        <div className="scribble-pad-controls">
            <input type="color" value={color} onChange={handleColorChange} />
            <button onClick={toggleTool}>{tool === 'draw' ? 'Eraser' : 'Pen'}</button>
            <button onClick={clearCanvas}>Clear</button>
            <button onClick={saveCanvas}>Save</button>
        </div>
    </div>
  );
};

export default ScribblePad;

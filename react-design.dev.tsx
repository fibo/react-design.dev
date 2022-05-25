import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
  WheelEventHandler,
} from "react";

type Vector = {
  x: number;
  y: number;
};

const O: Vector = { x: 0, y: 0 };

export type DesignFrameProps = {
  origin: Vector;
  scale: number;
  position: Vector;
  pathname: string;
  height: number;
  width: number;
};

export type DesignCanvasProps = {
  scale?: number;
  origin?: Vector;
  frames: Omit<DesignFrameProps, "origin" | "scale">[];
};

export const DesignCanvas: React.FC<DesignCanvasProps> = ({
  origin: initialOrigin,
  scale: initialScale,
  frames,
}) => {
  const [origin, setOrigin] = useState<Vector>(initialOrigin ?? O);
  const [scale, setScale] = useState(initialScale ?? 1);
  const [pointerCoordinates, setPointerCoordinates] = useState<Vector>(O);
  const [isDragging, setIsDragging] = useState(false);

  // Disable scroll.
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const onMouseDown = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      const { clientX: x, clientY: y } = event;
      setPointerCoordinates({ x, y });
      setIsDragging(true);
    },
    []
  );

  const onMouseMove = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      if (!isDragging) return;
      const { clientX: x, clientY: y } = event;
      // 1. Translate origin.
      setOrigin({
        x: origin.x - pointerCoordinates.x + x,
        y: origin.y - pointerCoordinates.y + y,
      });
      // 2. Update pointer coordinates.
      setPointerCoordinates({ x, y });
    },
    [isDragging, origin, pointerCoordinates]
  );

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onWheel = useCallback<WheelEventHandler<HTMLDivElement>>((event) => {
    setScale((scale) => scale - event.deltaY * 0.001);
  }, []);

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onWheel={onWheel}
      style={{
        background: "#fefefe",
        position: "absolute",
        left: 0,
        top: 0,
        height: "100vh",
        width: "100vw",
        transformOrigin: `${pointerCoordinates.x} ${pointerCoordinates.y}`,
      }}
    >
      {frames.map(({ pathname, height, width, position }, i) => (
        <DesignFrame
          key={i}
          origin={origin}
          scale={scale}
          height={height}
          width={width}
          position={position}
          pathname={pathname}
        />
      ))}
    </div>
  );
};

export const DesignFrame: React.FC<DesignFrameProps> = ({
  origin,
  scale,
  height,
  width,
  pathname,
  position,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: origin.x + position.x * scale,
        top: origin.y + position.y * scale,
        height: height * scale,
        width: width * scale,
        boxShadow: "1px 1px 7px 1px rgba(0, 0, 0, 0.17)",
      }}
    >
      <iframe
        src={pathname}
        height={height * scale}
        width={width * scale}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: height,
          width: width,
          border: 0,
          transform: `scale(${scale})`,
          transformOrigin: "0 0",
        }}
      />
    </div>
  );
};

import { PanInfo } from "framer-motion";
import { createContext, useContext, useState } from "react";

interface Dragging
{
  isDragging: string
  setIsDragging: React.Dispatch<React.SetStateAction<string>>
  cells: React.RefObject<HTMLDivElement>[]
  setCells: React.Dispatch<React.SetStateAction<React.RefObject<HTMLDivElement>[]>>
  dragStart: (name: string) => void
  dragEnd: (info: PanInfo) => void
}

const DraggingContext = createContext<Dragging | null>(null)

const DraggingContextProvider: React.FC = ({ children }) =>
{
  const [isDragging, setIsDragging] = useState("")
  const [cells, setCells] = useState<React.RefObject<HTMLDivElement>[]>([])

  const getActiveCellIndex = ({ point }: PanInfo) =>
  {
    console.log(point)
    const cellIndex = cells.findIndex((cell) =>
    {
      if (!cell.current) return false
      const {
        offsetLeft,
        offsetTop,
        offsetWidth,
        offsetHeight,
        // parentElement
      } = cell.current;

      // if (!parentElement) return false

      const leftEdge = offsetLeft;
      const rightEdge = offsetLeft + offsetWidth;
      const topEdge = offsetTop;
      const bottomEdge = offsetTop + offsetHeight;

      // console.log({ offsetLeft, rightEdge: offsetLeft + offsetWidth, topEdge, bottomEdge })
      return (
        point.x >= leftEdge &&
        point.x <= rightEdge &&
        point.y >= topEdge &&
        point.y <= bottomEdge
      );
    });

    // cellIndex should be -1 if not dropped into a cell. If that's the case, just return the current activeIndex
    // if (cellIndex < 0) return -1;

    return cellIndex;
  };

  const dragStart = (name: string) =>
  {
    setIsDragging(name);
  };

  const dragEnd = (info: PanInfo) =>
  {
    setIsDragging("");
    console.log(getActiveCellIndex(info));
  };

  return <DraggingContext.Provider value={{ isDragging, setIsDragging, dragStart, dragEnd, cells, setCells }}>
    {children}
  </DraggingContext.Provider>
}

export default DraggingContextProvider

export const useDragging = () =>
{
  const context = useContext(DraggingContext)
  if (!context) throw new Error("useDragging must be used within a context provider")
  return context
}
import { useDragging } from "context/DraggingContext"
import { motion } from "framer-motion"
import Image from "next/image"

interface IProps
{
  name: string
}

const draggableVariant = {
  dragging: {
    scale: 0.75,
    z: 20,
  },
  inactive: {
    scale: 1,
    z: 0
  }
};

export default function Meeple({ name }: IProps)
{
  const { isDragging, setIsDragging, dragStart, dragEnd } = useDragging()
  return <motion.div
    className={`relative h-full ${isDragging ? "z-30" : "z-10"}`}
    drag
    dragElastic={1}
    variants={draggableVariant}
    animate={isDragging === name ? "dragging" : "inactive"}
    onDragStart={() => dragStart(name)}
    onDragEnd={(_, info) => dragEnd(info)}
    layoutId={name}
  >
    <div className="absolute inset-0 z-0">
      <Image src={`/assets/${name}.png`} alt={name} width={108} height={108} />
    </div>
    <div className="relative w-full h-full z-10" />
  </motion.div>

}
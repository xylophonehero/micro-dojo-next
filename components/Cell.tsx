import { forwardRef } from "react";
import Meeple from "@/components/Meeple"

interface Props
{
  index: number
  value: string
}

const Cell = forwardRef<HTMLDivElement, Props>(({ index, value }, ref) =>
{
  return <div
    ref={ref}
    id={`cell:${index}`}
    className="bg-yellow-200 border-2 border-white h-28 w-28 relative"
  >
    {value !== "" && <Meeple name={value} />}
  </div>
})

Cell.displayName = "Cell"

export default Cell
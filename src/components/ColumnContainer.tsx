import { useSortable } from "@dnd-kit/sortable"
import { Column, Id } from "../types"
import { CSS } from "@dnd-kit/utilities"
interface Props {
  column: Column,
  deleteColumn: (id: Id) => void
}
export default function ColumnContainer(props: Props) {
  const { column, deleteColumn } = props
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column
    }
  })
  // Custom transform
  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  // if (isDragging) {
  //   return (<div ref={setNodeRef} style={style}>Dranging time</div>)
  // }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-slate-700 p-2  "
    >
      <div {...attributes}  {...listeners} className="flex">
        <div className="font-bold m-2 cursor-pointer">{column.title}</div>
        <button onClick={() => deleteColumn(column.id)}>Delete</button>
      </div>
      <div className="h-[200px]">Colum content</div>
    </div>
  )
}

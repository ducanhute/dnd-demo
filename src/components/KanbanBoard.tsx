import { useMemo, useState } from "react"
import { Column, Id } from "../types"
import ColumnContainer from "./ColumnContainer"
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"

export default function KanbanBoard() {
  const [column, setColumn] = useState<Column[]>([])
  const columnId = useMemo(() => column.map((col) => col.id), [column])
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)

  return (
    <div className="px-40 items-center flex gap-4 min-h-screen">
      <DndContext onDragStart={ondragstart} onDragEnd={ondragend}>
        <SortableContext items={columnId}>
          {column.map((item, index) => {
            return <ColumnContainer key={item.id} column={item} deleteColumn={deleteColumn} />
          })}
          <button onClick={() => createColumn()} className="border h-[40px] w-[200px] rounded">Add column</button>
        </SortableContext>
      </DndContext>
    </div>
  )
  function generateId() {
    return Math.floor(Math.random() * 1000)
  }

  function createColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${column.length + 1}`
    }
    setColumn([...column, columnToAdd])
  }

  function deleteColumn(id: Id): void {
    const result = column.filter((item) => {
      return (item.id !== id)
    })
    setColumn(result)
  }

  function ondragstart(e: DragStartEvent) {
    console.log(e)
    if (e.active.data.current?.type === "Column") {
      setActiveColumn(e.active.data.current.column)
      return
    }
  }

  function ondragend(e: DragEndEvent) {
    const { active, over } = e
    if (!over) return

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumn((columns) => {
      //Swap active column
      const activeColumnIndex = columns.findIndex((col) => col.id = activeColumnId)
      //
      const overColumnIndex = columns.findIndex((col) => col.id = overColumnId)

      return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })

  }

}

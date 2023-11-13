import React, { useEffect } from 'react'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';

import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { SortableItem } from './SortableItem';



const SortingQustion = (props) => {


    const { data,
        form,
        number,

    } = props



    const [sortingList, setSortingList] = useState([
    ])
    
    useEffect(() => {
        form.setFieldValue(["sheetQustion", number, "Qustion", "answer"], sortingList)
    }, [sortingList])


    useEffect(() => {

        if (data && data?.length > 0) {
            let NewArray = data.sort((a, b) => a.index - b.index);
            
            let NewListData = []
            for (let index = 0; index < NewArray.length; index++) {
                const element = NewArray[index];
                let obj = { id: element?.index, text: element?.text }
                NewListData.push(obj)

            }
            setSortingList([...NewListData])
        }
    }, [data])




    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );


    function handleDragEnd(event) {
        const { active, over } = event;

        if (active?.id !== over?.id) {

            let NewArray = (items) => {
                const oldIndex = items.findIndex(e => e?.id === active?.id);
                const newIndex = items.findIndex(e => e?.id === over?.id);
                return arrayMove(items, oldIndex, newIndex);
            }
            setSortingList(NewArray(sortingList));
        }
    }

    return (
        <div className='mt-1' >
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={sortingList}
                    strategy={verticalListSortingStrategy}
                >
                    {sortingList?.map((item, index) => {
                        return <SortableItem key={item?.id} id={item?.id}
                        >
                            {item?.text}
                        </SortableItem>
                    })}
                </SortableContext>
            </DndContext>
        </div>
    )
}

export default SortingQustion
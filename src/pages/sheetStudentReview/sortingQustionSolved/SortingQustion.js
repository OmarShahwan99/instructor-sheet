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



const SortingQustion = (props) => {


    const { data,
        answer
    } = props


    

    const [sortingList, setSortingList] = useState([
        { id: 1, text: "Try to Sort me i am should be 5 " },
    ])

    useEffect(() => {

        if (data && data?.length > 0) {
            let NewListData = []
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                let obj = { id: element?.index, text: element?.text }
                NewListData.push(obj)
            }
            if (answer && answer.data) {
                for (let index = 0; index < answer.data.length; index++) {
                    const element = answer.data[index];
                    let oldIndex = NewListData.findIndex(e => e.id === element?.option_id)
                    const item = NewListData.splice(oldIndex, 1)[0];
                    NewListData.splice(element?.index, 0, item);
                }
            }

            setSortingList([...NewListData])
        }
    }, [data])



    return (
        <div className='mt-1' >
            <DndContext >
                <SortableContext
                    items={sortingList}                    
                >
                    {sortingList?.map((item, index) => {
                        return  <div className='SortibleItemSortingQ'  
                        >
                            {item?.text}
                        </div>
                    })}
                </SortableContext>
            </DndContext>
        </div>
    )
}

export default SortingQustion
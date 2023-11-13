import React, { useEffect, useState } from 'react'
import MyRow from '../../../components/myRow/MyRow'
import MyCol from '../../../components/myCol/MyCol'
import { Button } from 'reactstrap'

const SelectTrueMultiQustion = (props) => {

    const { type, data ,answer ,
         print } = props

    const [cSelected, setCSelected] = useState([])

    const [listData, setListData] = useState([])
    const onCheckboxBtnClick = (selected ,indexs) => {
    }
    useEffect(() => {
        if (data && data?.length > 0) {
            let NewArray = []
            let selected = []
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                element.is_true = answer?.data?.options?.find(e => e.option_id=== element?.id)?.is_true
                NewArray.push(element)
                if(element.is_true){
                    selected.push(element?.id)
                }
            }
            setListData([...NewArray])
            setCSelected([...selected])

        }
    }, [data,answer])

    return (
        <div className='mt-1'>
            {print ? 
            <MyRow justify={"start"}  gutter={[15, 15]}>
            {data && data?.length > 0 && data?.map((option, index) => {
                return <MyCol span={12}  key={index} >
                         <Button
                    style={{width:"100%"}}
                    onClick={() => onCheckboxBtnClick(option?.id ,index)}
                    outline
                    className={`${cSelected.includes(option?.id) ? "MCQ_SELECTED" : "secondary"} `}
                     >
                    {option?.text}

                </Button>
                </MyCol>
            })}

        </MyRow>
        
        
        :
        <MyRow justify={"start"}  gutter={[15, 15]}>
        {listData && listData?.length > 0 && listData?.map((option, index) => {
            return <MyCol span={12}  key={index} >
                <Button
                    style={{width:"100%"}}
                    onClick={() => onCheckboxBtnClick(option?.id ,index)}
                    outline
                    className={`${cSelected.includes(option?.id) ? "MCQ_SELECTED" : "secondary"} `}
                    // color={`${cSelected.includes(option?.id) ? "MCQ_SELECTED" : "secondary"} `} 
                     >
                    {option?.text}

                </Button>
            </MyCol>
        })}

    </MyRow>
        }
     
        </div>
    )
}

export default SelectTrueMultiQustion
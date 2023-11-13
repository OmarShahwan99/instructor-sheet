import React, { useEffect, useState } from 'react'
import MyRow from '../../../components/myRow/MyRow'
import MyCol from '../../../components/myCol/MyCol'
import { Button } from 'reactstrap'

const SelectTrueMultiQustion = (props) => {

    const { type, data ,form ,
        number ,print } = props

    const [cSelected, setCSelected] = useState([])

    const [listData, setListData] = useState([])

    useEffect(() => {
        form.setFieldValue(["sheetQustion", number, "Qustion", "answer"],listData)
    }, [listData])

    const onCheckboxBtnClick = (selected ,indexs) => {
        if (type === 'multi') {
            const index = cSelected.indexOf(selected)
            let NewListData = listData
            if (index < 0) {
                cSelected.push(selected)
                NewListData[indexs].is_true = true 
            } else {
                NewListData[indexs].is_true = false 
                cSelected.splice(index, 1)
            }
            setCSelected([...cSelected])
            setListData([...NewListData])
        } else {
            setCSelected([selected])

        }

    }


    useEffect(() => {
        if (data && data?.length > 0) {
            setListData(data)
        }
    }, [data])

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
                    // color={`${cSelected.includes(option?.id) ? "MCQ_SELECTED" : "secondary"} `} 
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
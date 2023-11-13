import React, { useEffect } from 'react'
import MyRow from '../../../components/myRow/MyRow'
import MyCol from '../../../components/myCol/MyCol'
import MyButtonFreeClass from '../../../components/myButtonFreeClass/MyButtonFreeClass'
import { GiCheckMark } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import { useState } from 'react'
import { Divider } from 'antd'

const CorrectionQustion = (props) => {


    const { data ,form ,number ,answer } = props

    const [correctionList, setCorrectionList] = useState([
    ])

    useEffect(() => {
        form.setFieldValue(["sheetQustion", number, "Qustion", "answer"],correctionList)
    }, [correctionList])


    useEffect(() => {
        if (data && data.length > 0) {
            let NewList = []
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                let NewEelement = {
                    id: element?.id,
                    text: element?.text,
                    is_true: answer?.data?.options?.find(e => element?.id === e.option_id)?.is_true,
                    value: (answer?.data?.options?.find(e => element?.id === e.option_id)?.is_true === true) ? 1 :(answer?.data?.options?.find(e => element?.id === e.option_id)?.is_true === false) ? 2 : null ,
                }
                NewList.push(NewEelement)
            }
            setCorrectionList([...NewList])
        }

    }, [data ,answer])

    const check = (e, index, newvalue) => {
    }



    return (
        <div className='mt-2' >
            {correctionList && correctionList?.length > 0 && correctionList.map((q, index) => {
                return <MyRow gutter={[5, 5]} className={"RowCorrection"} key={index} >
                    <MyCol className={"ps-2"} span={20}  >{q?.text}</MyCol>
                    <MyCol span={4}  >
                        <MyRow gutter={[5, 5]} justify={"center"} >
                            <MyButtonFreeClass
                                shape={"circle"}
                                color="pink"
                                style={q?.value === 1 && {
                                    backgroundColor: '#52c41a',
                                    color: "#fff"
                                }}
                                onClick={() => { check(q, index, 1) }}
                            >
                                <GiCheckMark />
                            </MyButtonFreeClass>
                            <MyButtonFreeClass
                                shape={"circle"}
                                style={q?.value === 2 && {
                                    backgroundColor: '#ea5455',
                                    color: "#fff"
                                }}
                                onClick={() => { check(q, index, 2) }}

                            >
                                <AiOutlineClose />
                            </MyButtonFreeClass>
                        </MyRow>

                    </MyCol>
                    <Divider className='m-0' />

                </MyRow>
            }
            )}
        </div>
    )
}

export default CorrectionQustion
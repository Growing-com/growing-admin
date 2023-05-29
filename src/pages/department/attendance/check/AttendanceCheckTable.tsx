import GRText from '@component/base/text/GRText'
import GRFlexView from '@component/base/view/GRFlexView'
import GRView from '@component/base/view/GRView'
import GRForm from '@component/modules/form/GRForm'
import { FC, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Color } from 'styles/colors'

const OPTION_ATTENDANCE = [
    {label: "현장", value: "100"},
    {label: "온라인", value: "200"},
    {label: "결석", value: "300"},
]

type tAttendanceCheckTable = {
    colunms:any[]
}

const AttendanceCheckTable: FC<tAttendanceCheckTable> = ({
    colunms,
}) => {
    const [headerComponents, setHeaderComponents] = useState();
    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            "leader": "우상욱",
            "name": "이종민",
            "grade": "18",
            "gender": "남",
            "attends": "100",
            "info": "오늘은 배가 아프다"
        }
    });
    
    useEffect(()=>{
        const headerCom = colunms.map((colunm) => {
            return(
                <GRFlexView key={colunm.key}>
                    <GRText>
                        {colunm.title}
                    </GRText>
                </GRFlexView>
            )
        })
    },[colunms])

    const onSubmit = useCallback(
      () => {
      },
      [],
    )

    return (
        <GRForm onSubmit={handleSubmit(onSubmit)}>
            <GRView>
                <GRFlexView 
                    flexDirection={'row'} 
                    marginBottom={1} 
                    backgroundColor={Color.green100}
                    padding={"1rem 0rem"}
                >
                    {headerComponents}
                </GRFlexView>
                <GRFlexView>
                    <GRView backgroundColor={Color.grey60} height={10}>
                        <GRFlexView flexDirection={"row"}>
                        </GRFlexView>
                    </GRView>
                </GRFlexView>
            </GRView>
        </GRForm>
    )
}

export default AttendanceCheckTable
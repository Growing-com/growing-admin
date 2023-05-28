import GRCheck from '@component/base/dataEntry/GRCheck'
import GRRadio from '@component/base/dataEntry/GRRadio'
import GRSelect from '@component/base/dataEntry/GRSelect'
import GRText from '@component/base/text/GRText'
import GRFlexView from '@component/base/view/GRFlexView'
import GRView from '@component/base/view/GRView'
import { forwardRef, useCallback } from 'react'
import { Controller, type Control, type FieldValues } from 'react-hook-form'
import GRTextInput, { tGRTextInput } from '../../base/text/GRTextInput'

type tGRFormItem = {
  control: Control<FieldValues,any>;
  /**@description FieldPath을 작성 예: user.age 해당 값을 submit에서 보내준다. */
  fieldName: string; 
  title: string;
  type?: "input" | "check" | "radio" | "select" | "custom" | "date" | "view"
} & tGRTextInput;

// eslint-disable-next-line react/display-name
const GRFormItem = forwardRef<HTMLInputElement, tGRFormItem>(
 ({ control, fieldName, title, ...props },_ref)=>{

  const onChangeTextInput = useCallback(
    (_value) => {
      console.log("_value",_value);

    },
    [],
  )

  const renderFormItems = useCallback((props) =>
    // eslint-disable-next-line react/display-name
    ({ field }) => {
        if( props.type === "input" ){
          return <GRTextInput {...props}/>
        }

        if( props.type === "radio" ){
          return <GRRadio {...props} />
        }

        if( props.type === "check" ){
          return <GRCheck {...props} />
        }

        if( props.type === "select" ){
          return <GRSelect {...props} />
        }

        if( props.type === "custom" ){
          return <div>cutom</div>
        }

        return <GRView>break</GRView>
     } 
  ,[])
  


  return (
    <GRFlexView flexDirection={"row"} alignItems={"center"}>
      <GRText marginHorizontal={1} width={4}>
        {title}
      </GRText>
      <Controller
        control={control}
        name={fieldName}
        render={renderFormItems(props)}
      />
    </GRFlexView>
  )
 }
)

export default GRFormItem;
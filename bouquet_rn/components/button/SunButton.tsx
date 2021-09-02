import React, {useState} from 'react';
import {colors} from '../../styles/colors';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';

// icons
import Icon from '../../assets/Icon';

// props & logic
import * as cal from '../../logics/non-server/Calculation';

type SunButtonProps={
  sun : number, 
  active: boolean
}
export default function SunButton({sun, active} : SunButtonProps): React.ReactElement{
  const[isActive, setIsActive]=useState(active);
  const[backgroundColor, setBackgroundColor]=useState('transparent');
  const[sunNum, setSunNum]=useState(sun);

  return(
    <button.SunButton 
      activeOpacity={1} 
      onPress={()=>setIsActive(!isActive)}
      backgroundColor={isActive ? colors.primary : backgroundColor}
      onPressIn={()=>setBackgroundColor(colors.alpha20_primary)}
      onPressOut={()=>
        [setIsActive(!isActive), 
        setBackgroundColor('transparent'), 
        isActive ? setSunNum(sunNum-1) : setSunNum(sunNum+1)]}
      >
      { isActive ? <Icon icon="sunFocus" size={20}/> : <Icon icon="sun" size={20}/> }
      <text.Body3 
      color={isActive ? colors.white : colors.primary} 
      style={{marginLeft:4}}>
        {cal.numName(sunNum)}
      </text.Body3>
    </button.SunButton>
  );
}
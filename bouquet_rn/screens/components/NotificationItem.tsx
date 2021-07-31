import React, {Component, useState} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as elses from '../../styles/styled-components/elses';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

// props & logic
import * as cal from '../logics/Calculation';

export default function NotificationItem({press, id}  :{press:number, id:number}){
    return(
      <button.NotificationButton activeOpacity={0}>
          <elses.CircleImg diameter={20} source={require('../../assets/img.jpg')}/>
          <View style={styles.contentText}>
            <area.RowArea>
              <text.Body2B color={colors.black}>현지
                <text.Body2R color={colors.black}>qmffkqfmffkwkdskskdlsjfka; jf;asjdfasjficwfmqwe</text.Body2R>
              </text.Body2B>
            </area.RowArea>
          </View>
          <View style={styles.timeText}>
              <text.Caption color={colors.gray5}>{cal.timeName(57)} 전</text.Caption>
          </View>
      </button.NotificationButton>
    );
}

const styles = StyleSheet.create({
    contentText:{
        flex:2,
        marginLeft: 10,
    },
    timeText:{
        flex:1,
        alignItems:'flex-end',
    }
})
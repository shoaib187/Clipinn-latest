import {  Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { FONT } from '../../constants/font'
import { wp } from '../../constants/responsiveSize'
import { COLORS } from '../../constants/colors'

export default function Button({title, onPress, style, textStyle}) {
  return (
    <TouchableOpacity activeOpacity={.6} style={[styles.buttonContainer, style]} onPress={onPress}>
      <Text style={[styles.title, textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer:{
    alignItems:'center',
    justifyContent:'center',
    // borderRadius:6,
    borderRadius:60,
    backgroundColor:COLORS.darkCard,
    paddingVertical:12,
    marginTop:24
  },
  title:{
    fontFamily:FONT.PoppinsMedium,
    color:'#fff',
    fontSize:wp(4.5),
    top:3,
  }
})
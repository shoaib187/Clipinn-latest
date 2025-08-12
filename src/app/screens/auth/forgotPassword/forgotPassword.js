import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import Button from '../../../../components/common/button/button'
import { FONT } from '../../../../components/constants/font'
import { wp } from '../../../../components/constants/responsiveSize'
import Header from '../../../../components/common/header/header'
import IconButton from '../../../../components/common/button/iconButton'
import { COLORS } from '../../../../components/constants/colors'

export default function ForgotPassword() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title={"MoveEase"} />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={{
          flex:1,
          justifyContent:'center',
          alignItems:'center'
        }}>
        <View style={{alignItems:'center', marginBottom:30}}>
          <IconButton name={"fingerprint"} color={COLORS.blueColor} size={30} />
        </View>
        <View style={styles.formWrapper}>
          <Text style={styles.title}>Forgot your password?</Text>
          <Text style={styles.message}>Enter your email address below and we'll send you a password reset link.</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20}/>
            <TextInput
            style={styles.input}
            placeholder='Enter your email'
          />
          </View>
          <Button title={"Submit Now"} style={styles.button}/>
        </View>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, gap:4 }}>
          <Ionicons name="arrow-back" size={20} color={COLORS.textColor} />

          <Text style={{fontFamily:FONT.PoppinsMedium}}>Back to Login</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  formWrapper:{
    alignItems:'center',
    justifyContent:'center',
    marginTop:12
  },
  title:{
    fontSize:wp(7.5),
    fontFamily:FONT.PoppinsMedium,
  },
  message:{
    fontSize:wp(4),
    opacity:.5,
    textAlign:'center',
    marginTop:12
  },
  contentContainerStyle:{
    paddingHorizontal:14,
    flexGrow:1
  },
  input:{
    flex:1,
    fontFamily:FONT.PoppinsMedium,
    textAlignVertical:'center',
    paddingTop:16
  },
  button:{
    width:wp(90),
  }
  ,
  inputWrapper:{
    width:wp(90),
    borderRadius:40,
    borderWidth:1.4,
    borderColor:"#eee",
    height:50,
    marginTop:34,
    flexDirection:'row',
    alignItems:'center',
    gap:4,paddingLeft:wp(5),
    overflow: "hidden",
    backgroundColor:COLORS.bgColor,
  }
})
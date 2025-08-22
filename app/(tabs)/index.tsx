import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '@/components/Button'
import Typo from '@/components/Typo'
import { colors } from '@/constants/theme'
import { signOut } from 'firebase/auth'
import { auth } from '@/config/firebase'

const Index = () => {
    const handleLogout =async()=>{
        await signOut(auth)
    }
  return (
    <View>
      <Text>Index</Text>
      <Button onPress={handleLogout}>
        <Typo color={colors.black}>logout</Typo>
      </Button>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({})
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native';

const Services = () => {
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'IDR',

  });
  

    const services = [
        {
          id: "0",
          image: "https://i.ibb.co/3TVCH2D/image-1.png",
          name: "Ayam Gulai",
          price: 18000
        },
        {
          id: "11",
          image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
          name: "Laundry",
          price: 18000
        },
        {
          id: "12",
          image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
          name: "Wash & Iron",
          price: 18000
        },
        {
          id: "13",
          image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
          name: "Cleaning",
          price: 18000
        },
      ];
      
  return (
    <View style={{padding:10}}>
      <Text style={{fontSize:17, fontWeight:"500", color:"#005555", fontWeight:"bold"}}>For You</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service,index) => (
          <Pressable style={{margin:10,backgroundColor:"white", borderRadius:15}} key={index}>
            <Image source={{uri:service.image}} style={{width:150,height:90,borderTopRightRadius:15,borderTopLeftRadius:15}} />
            <Text style={{marginHorizontal:10, marginTop: 15, marginBottom:5 ,fontSize:13, color:"#C4C4C4"}}>{formatter.format(service.price)}</Text>
            <Text style={{marginHorizontal:10,marginBottom:15,color:"#2D3130", fontWeight:"bold", fontSize:15}}>{service.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}

export default Services

const styles = StyleSheet.create({})
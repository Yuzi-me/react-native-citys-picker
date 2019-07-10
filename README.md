# react-native-citys-picker

[![npm](https://img.shields.io/npm/v/react-native-city-picker.svg)](https://www.npmjs.com/package/react-native-citys-picker)
[![npm](https://img.shields.io/npm/dm/react-native-city-picker.svg)](https://www.npmjs.com/package/react-native-citys-picker)
[![npm](https://img.shields.io/npm/dt/react-native-city-picker.svg)](https://www.npmjs.com/package/react-native-citys-picker)
[![npm](https://img.shields.io/npm/l/react-native-city-picker.svg)](https://github.com/Yuzi-me/react-native-citys-picker/issues)

IOS & 安卓都兼容的中国地区选择器组件。该组件中使用到了第三方react-native-modal组件，有一个问题就是当弹出modal后，点击背景层关闭时，会出现闪烁问题，这个是使用了react-native-modal组件导致，见issues [解决方法][0]

## DEMO

## 安装

```
npm install react-native-citys-picker --save
```

## 使用

```javascript
import CityPicker from 'react-native-citys-picker';

// ios用法一
<CityPicker
  onSubmit={(params) => this.setState({ region1: `${params.province},${params.city},${params.area}` })}
  onCancel={() => console.log('cancel')}
>
  <TextInput
    editable={false}
    placeholder="点击去选择地区"
    value={this.state.region1}
  />
</CityPicker>

// android用法一
<CityPicker
  onSubmit={(params) => this.setState({ region1: `${params.province},${params.city},${params.area}` })}
  onCancel={() => console.log('cancel')}
>
  <Text
    style={{ backgroundColor: '#FFF', width: 200, paddingVertical: 20, textAlign: 'center', color: 'black' }}
  >{this.state.region1 || '点击去选择地区'}</Text>
</CityPicker>

// 用法二(参考Example目录index.ios.js/android.ios.js)
<CityPicker
  isVisible={this.state.isPickerVisible}
  navBtnColor={'red'}
  selectedProvince={'广东'}
  selectedCity={'深圳'}
  selectedArea={'福田区'}
  transparent
  animationType={'down'}
  onSubmit={this._onPressSubmit.bind(this)} // 点击确认_onPressSubmit
  onCancel={this._onPressCancel.bind(this)} // 点击取消_onPressCancel
  androidPickerHeight={100}   // 安卓手机下可以设置picker区域的高度
/>

<TouchableOpacity
  onPress={this._onPress2Show.bind(this)}
>
  <Text style={{ color: 'white' }}>{this.state.region2 || '点击去选择地区' }</Text>
</TouchableOpacity>

```

## 属性设置

Prop                    | Type   | Optional | Default   | Description
----------------------- | ------ | -------- | --------- | -----------
title                   | string |          | 选择地区    | modal标题
isVisible               | bool   |          | false     | 是否显示modal
selectedProvince        | string | Yes      | 江西       | 选择省
selectedCity            | string | Yes      | 萍乡       | 选择市
selectedArea            | string | Yes      | 安源区      | 选择区
navBtnColor             | string | Yes      | #3896B2    | 按钮颜色
animationType           | string | Yes      | slide      | 弹出方向，'up', 'down', 'left, or 'right'
transparent             | bool   | Yes      | true       | 背景透明
onSubmit                | func   | Yes      |             | 确认时，将调用此函数
onCancel                | func   | Yes      |             | 取消时，将调用此函数
androidPickerHeight     | number | Yes      | 50          | 安卓手机下可以由该属性来设置picker区域的高度

[0]: https://github.com/react-native-community/react-native-modal/issues/92
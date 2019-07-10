
import React from 'react';
import {
  View,
  Text,
  Modal,
  Dimensions,
  Picker,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import BaseComponent from './BaseComponent';
import webRegionAPI from './webRegionAPI';
import Modals from "./Modal";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const isIos = Platform.OS === 'ios';

export default class CityPicker extends BaseComponent {

  constructor(props) {
    super(props);
    this._bind(
      'open',
      'close',
      '_handleProvinceChange',
      '_handleCityChange',
      '_handleAreaChange',
      '_handleSubmit',
      '_handleCancel',
    );
    this.state = {
      isVisible: this.props.isVisible,
      provinces: [],
      citys: [],
      areas: [],
      selectedProvince: this.props.selectedProvince,
      selectedCity: this.props.selectedCity,
      selectedArea: this.props.selectedArea,
      transparent: true,
    };
  }
  _filterAllProvinces() {
    return this._regionAllData.map((item) => {
      return item.name;
    });
  }
  _filterCitys(province) {
    const provinceData = this._regionAllData.find(item => item.name === province);
    return provinceData.city.map(item => item.name);
  }
  _filterAreas(province, city) {
    const provinceData = this._regionAllData.find(item => item.name === province);
    const cityData = provinceData.city.find(item => item.name === city);
    return cityData.area;
  }

  componentDidMount() {
    webRegionAPI().then((area) => {
      // console.log('area', area);
      this._regionAllData = area;

      const provinces = this._filterAllProvinces();
      // console.log('provinces', provinces);

      const citys = this._filterCitys(this.state.selectedProvince);

      const areas = this._filterAreas(this.state.selectedProvince, this.state.selectedCity);

      this.setState({
        provinces,
        citys,
        areas
      });
    });
  }
  componentWillReceiveProps(props) {
    if (props.isVisible !== this.props.isVisible) {
      if (props.isVisible) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  close() {
    this.setState({ isVisible: false });
  }
  open() {
    console.log('openopen');
    this.setState({ isVisible: true });
  }

  _handleProvinceChange(province) {
    const citys = this._filterCitys(province);
    const areas = this._filterAreas(province, citys[0]);
    this.setState({
      selectedProvince: province,
      selectedCity: citys[0],
      selectedArea: areas[0],
      citys,
      areas
    });
    
  }
  _handleCityChange(city) {
    const areas = this._filterAreas(this.state.selectedProvince, city);
    this.setState({
      selectedCity: city,
      selectedArea: areas[0],
      areas
    });
  }
  _handleAreaChange(area) {
    this.setState({
      selectedArea: area,
    });
  }

  _handleCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
    this.close();
  }
  _handleSubmit() {
    // this.props.onSubmit({
    //   province: this.state.selectedProvince,
    //   city: this.state.selectedCity,
    //   area: this.state.selectedArea
    // });
    if (this.props.onSubmit) {
      this.props.onSubmit({
        province: this.state.selectedProvince,
        city: this.state.selectedCity,
        area: this.state.selectedArea
      });
    }
    // this.close();
  }

  renderPicker() {
    const { navBtnColor } = this.props;
    return (
      <View style={styles.overlayStyle}>
        <View style={styles.pickerWrap}>

          <Picker
            style={styles.pickerItem}
            onValueChange={this._handleProvinceChange}
            selectedValue={this.state.selectedProvince}
          >
            {this.state.provinces.map((province, index) => {
              return (
                <Picker.Item value={province} label={province} key={index} />
              );
            })}
          </Picker>

          <Picker
            style={styles.pickerItem}
            onValueChange={this._handleCityChange}
            selectedValue={this.state.selectedCity}
          >
            {this.state.citys.map((city, index) => {
              return (
                <Picker.Item value={city} label={city} key={index} />
              );
            })}
          </Picker>

          <Picker
            style={styles.pickerItem}
            onValueChange={this._handleAreaChange}
            selectedValue={this.state.selectedArea}
          >
            {this.state.areas.map((area, index) => {
              return (
                <Picker.Item value={area} label={area} key={index} />
              );
            })}
          </Picker>

        </View>
        <View style={styles.btnWrap}>
          {/* <TouchableOpacity
            style={[styles.navBtn, { borderColor: navBtnColor }]}
            activeOpacity={0.85}
            onPress={this._handleCancel}
          >
            <Text style={[styles.text, { color: navBtnColor }]}>取消</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={[styles.navBtn, { backgroundColor: navBtnColor, borderColor: navBtnColor }]}
            activeOpacity={0.85}
            onPress={this._handleSubmit}
          >
            <Text style={[styles.text, { color: 'white' }]}>确认</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { title } = this.props;
    const modal = (
      // <Modal
      //   transparent={this.state.transparent}
      //   visible={this.state.isVisible}
      //   onRequestClose={this.close}
      //   animationType={this.props.animationType}
      //   presentationStyle='fullScreen'
      // >
      //   {this.renderPicker()}
      // </Modal>
      <Modals
        title = {title}
        // isClose = {true} // 显示关闭按钮
        isModalVisible = {this.state.isVisible}  // 显示modal
        CancelB = {() => this._handleCancel()}  // 下滑关闭
      >
        {this.renderPicker()}
      </Modals>
    );

    return (
      <View>
        {modal}
        <TouchableOpacity onPress={this.open}>
          {this.props.children}
        </TouchableOpacity>
      </View>
    );
  }
}
CityPicker.propTypes = {
  title: PropTypes.string,
  isVisible: PropTypes.bool,
  selectedProvince: PropTypes.string,
  selectedCity: PropTypes.string,
  selectedArea: PropTypes.string,
  navBtnColor: PropTypes.string,
  animationType: PropTypes.string,
  transparent: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  androidPickerHeight: PropTypes.number,
};

CityPicker.defaultProps = {
  title: '选择地区',
  isVisible: false,
  selectedProvince: '北京',
  selectedCity: '北京',
  selectedArea: '东城区',
  navBtnColor: '#3896B2',
  animationType: 'slide',
  transparent: true,
  onSubmit: () => {},
  onCancel: () => {},
  androidPickerHeight: 50
};

const styles = StyleSheet.create({
  overlayStyle: {
    flex: 1
  },
  btnWrap: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  navBtn: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 0,
    backgroundColor: '#3896B2',
    padding: 10,
    margin: 50,
    marginTop: 20,
    marginBottom: 6,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  pickerWrap: {
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  pickerItem: {
    flex: 1
  },
  text: {
    fontSize: 18
  }
});

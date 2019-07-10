import React, { Component } from "react";
import Modal                from "react-native-modal";
import Icon                 from "react-native-vector-icons/AntDesign";

import {
  Text,
  View,
  Platform,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  PanResponder
} from "react-native";

export default class ModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false
    };
  }

  handleOnScroll = event => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };

  handleScrollTo = p => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo(p);
    }
  };

  handleOnSwipeComplete = () => {
    this.props.CancelB(false)
  }

  render() {
    let { title, children, isModalVisible, isClose } = this.props;
    return(
      <Modal
        isVisible={isModalVisible}                      // 显示打开关闭
        // onSwipeComplete={() => this.setState({ isModalVisible: false })}
        onSwipeComplete={this.handleOnSwipeComplete}    // 手式下滑关闭
        onBackButtonPress={this.handleOnSwipeComplete}  // 安卓物理返回键关闭
        onBackdropPress={this.handleOnSwipeComplete}    // 按下背景关闭
        swipeDirection='down'                           // 从下往上弹出
        scrollTo={this.handleScrollTo}                  // 实现内容可滚动
        scrollOffset={this.state.scrollOffset}          // > 0 时禁用滑动关闭
        scrollOffsetMax={500 - 100}                     // 实现滚动感 content height - ScrollView height
        propagateSwipe                                  // 允许滑动事件传播到子组件（注意，加入这个，滚动顺畅）
        style={styles.ModalBox}
      >
        <View style={styles.ModalContent}>
          <View style={styles.Line} />
          <View style={styles.ModalHeader}>
            <Text style={styles.ModalTitle}>{title}</Text>
            {isClose ? <TouchableOpacity style={styles.Close} onPress={this.handleOnSwipeComplete}><Icon name='close' size={20} color="#999" /></TouchableOpacity> : null}
            
          </View>
          <ScrollView
            ref={ref => (this.scrollViewRef = ref)}
            onScroll={this.handleOnScroll}
            scrollEventThrottle={32}
          >
            {children}
          </ScrollView>
        </View>
      </Modal>
    )
  }
}

const isIos = Platform.OS === 'ios';
const isIphoneX = isIos && Dimensions.get('window').height === 812;

let isIphoneHeight = 0;
if (isIos && isIphoneX) {
  isIphoneHeight = 44;
} else if (isIos) {
  isIphoneHeight = 0;
}

const styles = StyleSheet.create({
  ModalBox: {
    justifyContent: 'flex-end',
    margin: 0
  },
  ModalContent: {
    maxHeight: 500,   //设置Modal内容最高度
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    position: 'relative',
    paddingBottom: isIphoneHeight
  },
  ModalHeader: {
    padding: 20,
    paddingTop: 30,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative'
  },
  ModalTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  Close: {
    padding: 10,
    position: 'absolute',
    right: 10,
    bottom: 0
  },
  Modalline: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 20,
    zIndex: 1,
    backgroundColor: '#f00'
  },
  Line: {
    marginLeft: 125,
    marginRight: 125,
    height: 4,
    borderRadius: 2,
    marginTop: 10,
    backgroundColor: 'rgba(0,0,0,.1)'
  }
});
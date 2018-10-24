import React, { Component } from 'react';
import {
    requireNativeComponent,
    View,
    NativeModules
} from 'react-native';

const QRCode = requireNativeComponent("QRCodeVM");

export default class QR extends Component {
  render() {
    return (<QRCode {...this.props} />)
  }
}


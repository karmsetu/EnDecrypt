import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';

const Spinner = (props?: ActivityIndicator) => {
    return (
        <ActivityIndicator size="large" color="#0000ff" animating {...props} />
    );
};

export default Spinner;

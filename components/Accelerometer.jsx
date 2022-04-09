import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const AccelerometerComponent = props => {
	const [subscription, setSubscription] = useState(null);

	const sensibility = 2.0;

	const _subscribe = () => {
		Accelerometer.setUpdateInterval(300);

		setSubscription(
			Accelerometer.addListener(accelerometerData => {
				const acc = accelerometerData;
				const acceleration = Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z);

				if (acceleration >= sensibility) {
					onShake(acceleration);
				}
			})
		);
	};

	const _unsubscribe = () => {
		subscription && subscription.remove();
		setSubscription(null);
	};
	

	const onShake = (acceleration) => {
		props.onValueChange(acceleration);
	}

	useEffect(() => {
		_subscribe();
		return () => _unsubscribe();
	}, []);

	return (
		<></>
	);
}


export default AccelerometerComponent;

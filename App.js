
import { StyleSheet, Text, View } from 'react-native';
import { useState } from "react";
import AccelerometerComponent from "./components/Accelerometer";

const answersList = [
	{chance: 5, message: "Klídek, klídek.. nemusíš na mě takovou silou!"},
	{chance: 5, message: "Uklidni se trošku.. jo?"},

	{chance: 4, message: "Nemůžu říct..."},
	{chance: 4, message: "Bezpochyby."},

	{chance: 3, message: "Stoprocentně!"},
	{chance: 3, message: "Určitě ne."},

	{chance: 2, message: "Nemyslím si."},
	{chance: 2, message: "Možná?"},

	{chance: 1, message: "Na to ti odpovídat nebudu.."},
	{chance: 1, message: "Zkus se zeptat znovu, a tentokrát lépe.."},
	{chance: 1, message: "Počítej s tím!"},
	{chance: 1, message: "Rovnou zapomeň.."},

	{chance: 0, message: "Samozřejmě!"},
	{chance: 0, message: "Ani náhodou!"},
	{chance: 0, message: "Ano."},
	{chance: 0, message: "Ne."},
];

export default function App() {
	const [strength, setStrength] = useState(0);
	const [shakeCount, setShakeCount] = useState(0);
	const [message, setMessage] = useState("");

	const changedHandler = changedValue => {
		setStrength(changedValue);
		setShakeCount(shakeCount => shakeCount + 1);

		const answers = answersList.filter(i => i.chance < changedValue);
		const answer = answers[Math.floor(Math.random() * answers.length)];
		setMessage(answer.message);
	};

	return (
		<View style={styles.container}>
			<AccelerometerComponent onValueChange={changedHandler}></AccelerometerComponent>

			<View style={styles.header}>
				<Text style={styles.headerText}>Ask 8ball</Text>
			</View>

			<View style={styles.circle}>
				<View style={styles.circleInner}>
					<Text style={styles.message}>{message}</Text>
				</View>
			</View>

			<View style={styles.footer}>
				<Text style={styles.footerText}>Síla posledního otřesu: {Math.floor(strength * 100) / 100}</Text>
				<Text style={styles.footerText}>Celkový počet otřesů: {shakeCount}</Text>
				<Text style={styles.footerText}>Položte otázku, následně zatřeste zařízením pro získání odpovědi.</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},

	circle: {
		width: 340,
		height: 340,
		backgroundColor: "black",
		borderRadius: "100%",
		justifyContent: "center",
		alignItems: "center",
		borderColor: "#0f0f0f",
		borderWidth: 5,
	},
	circleInner: {
		width: 250,
		height: 250,
		backgroundColor: "white",
		borderRadius: "100%",
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		borderColor: "#2b2d42",
		borderWidth: 15,
	},

	message: {
		fontSize: 20,
		textAlign: "center",
	},

	header: {
		backgroundColor: "#2b2d42",
		justifyContent: "center",
		alignItems: "center",

		position: "absolute",
		top: 0,
		width: "100%",
		height: 110,
	},
	headerText: {
		color: "white",
		fontSize: 36,
		paddingTop: 30
	},

	footer: {
		padding: 40,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		bottom: 0
	},
	footerText: {
		textAlign: "center",
		margin: 3,
	}

});

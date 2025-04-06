import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Heart, DollarSign, CreditCard, CheckCircle } from "lucide-react-native";
import BottomNav from "../component/bottomNav";

const Donation = ({ navigation }) => {
    const [amount, setAmount] = useState("");
    const [selectedTier, setSelectedTier] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const donationTiers = [
        { amount: "25", label: "Supporter", color: "#4CAF50" },
        { amount: "50", label: "Champion", color: "#2196F3" },
        { amount: "100", label: "Hero", color: "#9C27B0" },
    ];

    const handleSubmit = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Heart size={64} color="red" />
                    <Text style={styles.title}>Make a Difference Today</Text>
                    <Text style={styles.subtitle}>Your generosity can change lives. Every donation counts.</Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.tierContainer}>
                        {donationTiers.map((tier) => (
                            <TouchableOpacity
                                key={tier.amount}
                                style={[
                                    styles.tierButton,
                                    { borderColor: tier.color, backgroundColor: selectedTier === tier.amount ? tier.color : "white" },
                                ]}
                                onPress={() => {
                                    setSelectedTier(tier.amount);
                                    setAmount(tier.amount);
                                }}
                            >
                                <DollarSign size={24} color={selectedTier === tier.amount ? "white" : tier.color} />
                                <Text style={[styles.tierText, { color: selectedTier === tier.amount ? "white" : tier.color }]}>${tier.amount}</Text>
                                <Text style={[styles.tierLabel, { color: selectedTier === tier.amount ? "white" : tier.color }]}>{tier.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.label}>Custom Amount</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Enter amount"
                        value={amount}
                        onChangeText={(text) => {
                            setAmount(text);
                            setSelectedTier("");
                        }}
                    />

                    <Text style={styles.label}>Payment Details</Text>
                    <TextInput style={styles.input} placeholder="Card Number" />
                    <TextInput style={styles.input} placeholder="Name on Card" />
                    <TextInput style={styles.input} placeholder="MM/YY" />
                    <TextInput style={styles.input} placeholder="CVC" />

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitText}>Complete Donation</Text>
                    </TouchableOpacity>
                </View>

                {showSuccess && (
                    <View style={styles.successMessage}>
                        <CheckCircle size={24} color="white" />
                        <Text style={styles.successText}>Thank you for your generous donation!</Text>
                    </View>
                )}
            </ScrollView>

           
            <BottomNav navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F4F4F4FF" },
    scrollContainer: { padding: 20 },
    header: { alignItems: "center", marginBottom: 20 },
    title: { fontSize: 24, fontWeight: "bold", color: "#1a237e", textAlign: "center" },
    subtitle: { fontSize: 16, textAlign: "center", color: "black", fontWeight: "bold", marginTop: 5 },
    formContainer: { backgroundColor: "white", padding: 20, borderRadius: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10, elevation: 5, marginBottom: 70 },
    tierContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
    tierButton: { flex: 1, alignItems: "center", padding: 10, borderWidth: 2, borderRadius: 10, marginHorizontal: 5 },
    tierText: { fontSize: 18, fontWeight: "bold" },
    tierLabel: { fontSize: 14 },
    label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
    input: { borderWidth: 1, borderColor: "gray", padding: 10, borderRadius: 5, marginTop: 5 },
    submitButton: { backgroundColor: "#1a237e", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 20 },
    submitText: { color: "white", fontSize: 18, fontWeight: "bold" },
    successMessage: { flexDirection: "row", backgroundColor: "#2E7D32", padding: 10, borderRadius: 10, alignItems: "center", justifyContent: "center", marginTop: 20 },
    successText: { color: "white", marginLeft: 10, fontSize: 16, fontWeight: "bold" },
});

export default Donation;
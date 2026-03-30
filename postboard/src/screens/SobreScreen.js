import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SobreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📱 PostBoard</Text>

      <Text style={styles.texto}>Versão: 1.0.0</Text>

      <Text style={styles.texto}>
        Desenvolvido por: Lucas, Ana Clara, Luiz Otário
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#064e3b',
    marginBottom: 16,
  },
  texto: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
  },
});
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
} from 'react-native';

const destinos = [
  {
    tipo: 'praia',
    nome: 'Fernando de Noronha',
    descricao: 'Águas cristalinas e praias paradisíacas. Relaxamento e aventura.',
    atividades: ['Mergulho', 'Passeio de barco', 'Trilha na Baía do Sancho', 'Observação de golfinhos'],
    cor: '#6CCFF6', // cor do card
  },
  {
    tipo: 'montanha',
    nome: 'Serra da Mantiqueira',
    descricao: 'Ar puro, trilhas incríveis e contato total com a natureza.',
    atividades: ['Trilhas', 'Cachoeiras', 'Observação de pássaros', 'Acampamento'],
    cor: '#A0D468',
  },
  {
    tipo: 'cidade-historica',
    nome: 'Ouro Preto',
    descricao: 'Mergulhe na história do Brasil colonial com igrejas e ruas de pedra.',
    atividades: ['Igrejas barrocas', 'Passeio histórico', 'Minas de ouro', 'Culinária local'],
    cor: '#F6C85F',
  },
];

export default function App() {
  const [nomeTemp, setNomeTemp] = useState('');
  const [nome, setNome] = useState('');
  const [nomeDefinido, setNomeDefinido] = useState(false);
  const [preferencia, setPreferencia] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleSelecionarPreferencia = (tipo) => {
    setPreferencia(tipo);
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  };

  const handleReiniciar = () => {
    setNomeTemp('');
    setNome('');
    setNomeDefinido(false);
    setPreferencia(null);
    fadeAnim.setValue(0);
  };

  const destinosFiltrados = preferencia ? destinos.filter((d) => d.tipo === preferencia) : [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {!nomeDefinido ? (
          <View style={styles.section}>
            <Text style={styles.title}>Planeje sua viagem</Text>
            <Text style={styles.subtitle}>Qual seu nome?</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              placeholderTextColor="#a0aec0"
              value={nomeTemp}
              onChangeText={setNomeTemp}
            />
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                if (nomeTemp.trim() !== '') {
                  setNome(nomeTemp);
                  setNomeDefinido(true);
                }
              }}
            >
              <Text style={styles.optionText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        ) : !preferencia ? (
          <View style={styles.section}>
            <Text style={styles.title}>Olá, {nome}!</Text>
            <Text style={styles.subtitle}>Escolha seu tipo de viagem</Text>
            <View style={styles.options}>
              {['praia', 'montanha', 'cidade-historica'].map((tipo) => (
                <TouchableOpacity
                  key={tipo}
                  style={styles.optionButton}
                  onPress={() => handleSelecionarPreferencia(tipo)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.optionText}>
                    {tipo === 'praia' ? 'Praias 🏖️' : tipo === 'montanha' ? 'Montanhas ⛰️' : 'Cidades 🏰'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <Animated.View style={{ opacity: fadeAnim, width: '100%' }}>
            <Text style={styles.title}>Sua viagem dos sonhos</Text>
            <FlatList
              horizontal
              data={destinosFiltrados}
              keyExtractor={(item) => item.tipo}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatList}
              renderItem={({ item }) => (
                <View style={[styles.card, { backgroundColor: item.cor }]}>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.nome}</Text>
                    <Text style={styles.cardDescription}>{item.descricao}</Text>
                    <Text style={styles.activitiesTitle}>Atividades:</Text>
                    {item.atividades.map((act, idx) => (
                      <Text key={idx} style={styles.activityItem}>
                        • {act}
                      </Text>
                    ))}
                  </View>
                </View>
              )}
            />
            <TouchableOpacity style={styles.resetButton} onPress={handleReiniciar}>
              <Text style={styles.resetText}>Escolher outro destino</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#eef6fd' },
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  section: { width: '100%', alignItems: 'center', marginBottom: 30 },
  title: { fontSize: 30, fontWeight: '800', color: '#1a202c', marginBottom: 10 },
  subtitle: { fontSize: 18, color: '#4a5568', textAlign: 'center', marginBottom: 25 },
  input: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 20,
    height: 50,
    fontSize: 18,
    borderColor: '#cbd5e0',
    borderWidth: 1,
    color: '#1a202c',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
  },
  options: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  optionButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 15,
    backgroundColor: '#4c51bf',
    alignItems: 'center',
    shadowColor: '#4c51bf',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  optionText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  flatList: { paddingVertical: 20 },
  card: {
    width: 300,
    borderRadius: 20,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'hidden',
  },
  cardContent: { padding: 20 },
  cardTitle: { fontSize: 24, fontWeight: '800', marginBottom: 8, color: '#1a202c' },
  cardDescription: { fontSize: 16, color: '#1a202c', lineHeight: 22, marginBottom: 10 },
  activitiesTitle: { fontSize: 18, fontWeight: '700', color: '#1a202c', marginBottom: 6 },
  activityItem: { fontSize: 16, color: '#1a202c', marginBottom: 4 },
  resetButton: {
    backgroundColor: '#2b6cb0',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 15,
    marginTop: 15,
    alignItems: 'center',
    shadowColor: '#2b6cb0',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  resetText: { fontSize: 18, fontWeight: '700', color: '#fff' },
});

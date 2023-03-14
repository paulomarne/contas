import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Mytextinput from './components/Mytextinput'
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../conts/colors';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#622490',
  },
  titulo: {
    fontSize: 22,
    color: '#FFFFFFFF',
    marginStart: 22,
    marginEnd: 17,
    fontWeight: 'bold',
  },
  header: {
    marginTop: 57,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnCadastro: {
    width: '100%',
    height: 40,
    backgroundColor: '#7b42f5',
    borderRadius: 20,
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },

});


const RegistrarConta = ({ navigation }) => {
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [aceita, setAceita] = useState('');

  let registrar_conta = async () => {
    console.log('1 registrar - ', codigo, nome, tipo, aceita);

    if (!codigo) {
      alert('Por favor preencha o Código!');
      return;
    }
    if (!nome) {
      alert('Por favor preencha o Nome da Conta!');
      return;
    }
    if (!tipo) {
      alert('Por favor preencha o Tipo da Conta!');
      return;
    }
    console.log('2 registrar - ', codigo, nome, tipo, aceita);
    db.exec(
        'INSERT INTO table_plano (t_codigo, t_nome, t_tipo, t_aceita) VALUES (?,?,?,?)',
        [codigo, nome, tipo, aceita],
        fals,
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Conta Registrada com Sucesso !!!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              { cancelable: false }
            );
          } else {
            console.log(results.message);
            alert('Erro ao tentar Registrar a Conta !!!');
          } 
          console.log('4 registrar - ', codigo, nome, tipo, aceita);
        }
      );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      
      <View style={styles.container}>
        
        // tab
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}>
            <Icon
              name={'arrow-back-ios'}
              style={{ color: COLORS.white, fontSize: 22, marginRight: 10 }}
            />
          </TouchableOpacity>

          <Text style={styles.titulo}>Inserir Conta</Text>

          <TouchableOpacity
            onPress={() => registrar_conta()}>
            <Icon
              name={'check'}
              style={{ color: COLORS.white, fontSize: 22, marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Código"
                onChangeText={
                  (codigo) => setCodigo(codigo)
                }
                maxLength={11}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Nome"
                onChangeText={
                  (nome) => setNome(nome)
                }
                maxLength={200}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Tipo"
                onChangeText={
                  (tipo) => setTipo(tipo)
                }
                maxLength={1}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Aceita lançamentos"
                onChangeText={
                  (aceita) => setAceita(aceita)
                }
                maxLength={1}
                style={{ padding: 10 }}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegistrarConta;
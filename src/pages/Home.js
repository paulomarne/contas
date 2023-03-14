import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { DatabaseConnection } from '../database/database-connection';
import COLORS from '../conts/colors';
import Input from './components/Input';


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
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    margin: 8
  },
});


const Home = ({ navigation }) => {

  const [planos, setPlanos] = useState([]);

  useEffect(() => {
    // 1 passo criar a tabela
    console.log('Home - Criar a tabela');
    db.transaction(function (txn) {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS table_plano(id INTEGER PRIMARY KEY AUTOINCREMENT, t_codigo VARCHAR(11), t_nome VARCHAR(200), t_tipo VARCHAR(1), t_aceite VARCHAR(1))',
        []
      );
      console.log('Home - tabela criada');
    },
      (sqlError) => {
        console.log('Erro no create: ', sqlError)
      }
    );

          // 1 passo consultar lista de planos
          console.log('Home - Consulta');
          db.transaction(function (txn) {
            txn.executeSql(
              'SELECT * FROM table_plano', null,
              (txObj, resultSet) => setPlanos(resultSet.rows._array),
              (txObj, error) => console.log(error)
            );
          });

  }, []);

  const showPlano = () => {
    return planos.map((plano, index) => {
      return (
        <View style={styles.row}>
          <Text>{plano.codigo}</Text>
        </View>
      )
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Plano de contas</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegistrarConta')}>
            <Text style={styles.titulo}>+</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Input iconName="search" label="" />
        </View>
      </View>

      <View style={styles.container}>
        {showPlano()}
      </View>
    </SafeAreaView>
  );

};

export default Home;
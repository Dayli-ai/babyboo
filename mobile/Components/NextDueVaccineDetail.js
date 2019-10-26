import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

const NextDueVaccineDetail = props => {
  const { currentVaccine, expanded1 } = props;
  return <View
    style={{
      height: expanded1 ? null : 0,
      overflow: 'hidden',
      alignItems: 'center',
    }}>
    <Text style={{fontSize: 23, color: '#FFFFFF'}}>
      {currentVaccine.vaccine.name}
    </Text>
    <View
      style={{
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: '#FFFFFF', fontSize: 16, marginLeft: 10}}>
        Brand
      </Text>
      <TextInput
        style={[styles.input]}
        placeholder="Brand Name"
        keyboardType="default"
        value={currentVaccine.vaccine.brand}
        onChangeText={ value => props.changeField(value, 'brand', props.currentVaccine.vaccine.name)}
      />
    </View>
    <View
      style={{
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: '#FFFFFF', fontSize: 16, marginLeft: 10}}>
        Mfg Date
      </Text>
      <TextInput
        style={[styles.input]}
        placeholder="DD/MM/YYYY"
        keyboardType="default"
        value={currentVaccine.vaccine.mfgDate}
        onChangeText={ value => props.changeField(value, 'mfgDate', props.currentVaccine.vaccine.name)}
      />
    </View>
    <View
      style={{
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: '#FFFFFF', fontSize: 16, marginLeft: 10}}>
        Exp Date
      </Text>
      <TextInput
        style={[styles.input]}
        placeholder="DD/MM/YYYY"
        keyboardType="default"
        value={currentVaccine.vaccine.expDate}
        onChangeText={ value => props.changeField(value, 'expDate', props.currentVaccine.vaccine.name)}
      />
    </View>
    <View
      style={{
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: '#FFFFFF', fontSize: 16, marginLeft: 10}}>
        Batch No
      </Text>
      <TextInput
        style={[styles.input]}
        placeholder="Batch No"
        keyboardType="default"
        value={currentVaccine.vaccine.batchNumber}
        onChangeText={ value => props.changeField(value, 'batchNumber', props.currentVaccine.vaccine.name)}
      />
    </View>
    <View
      style={{
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: '#FFFFFF', fontSize: 16, marginLeft: 10}}>
        Hospital
      </Text>
      <TextInput
        style={[styles.input]}
        placeholder="Hospital"
        keyboardType="default"
        value={currentVaccine.vaccine.hospital}
        onChangeText={ value => props.changeField(value, 'hospital', props.currentVaccine.vaccine.name)}
      />
    </View>

    <View
      style={{
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          backgroundColor: 'transparent',
          alignItems: 'center',
          marginLeft: 20,
          borderRadius: 15,
          borderWidth: 1,
          borderColor: '#FFFFFF',
          width: 106,
          marginRight: 20,
          padding: 10,
          height: 50,
        }}
        activeOpacity={0.8}
        onPress={props.backHandler}>
        <Text style={{color: '#FFFFFF'}}>Back</Text>
      </TouchableOpacity>

      {!props.enableSave ? (
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            backgroundColor: '#fff',
            alignItems: 'center',
            marginLeft: 10,
            borderRadius: 15,
            width: 106,
            marginRight: 20,
            padding: 10,
            height: 50,
          }}
          activeOpacity={0.8}
          onPress={props.nextHandler}>
          <Text style={{color: '#14B8BE'}}>Next</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            backgroundColor: '#fff',
            alignItems: 'center',
            marginLeft: 10,
            borderRadius: 15,
            width: 106,
            marginRight: 20,
            padding: 10,
            height: 50,
          }}
          activeOpacity={0.8}
          onPress={() => props.onSave()}>
          <Text style={{color: '#14B8BE'}}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
}


const styles = StyleSheet.create({
  input: {
    marginLeft: 20,
    height: 40,
    width: 118,
    paddingLeft: 20,
    fontSize: 15,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
});
export default NextDueVaccineDetail;

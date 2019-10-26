import React from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from './Header';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios/index';
import url from './Config/API';

const shadowStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,

  elevation: 4,
};

class Home extends React.Component {
  static navigationOptions = {
    title: 'BabyBoo',
    headerBackground: <Header />,
    headerTitleStyle: {
      color: '#FFFFFF',
      fontSize: 20,
    },
    headerStyle: {
      backgroundColor: 'transparent',
    },
  };
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }
  async componentDidMount() {
    //http://34.207.213.121:3001/getUserInfo?stream=bb_stream&key=trinu1@gmail.com
    const login = await AsyncStorage.getItem('username');
    const token = await AsyncStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.get(
        `${url}/getUserInfo/?stream=bb_stream&key=${login}`,
      );
      console.log(response);
      const dataSource = response.data;

      //construct data object here from the response and pass to FlatList component
      let data = [];
      console.log('datasourceChildvaccines', dataSource.childVaccines);
      for (let key in dataSource.childVaccines) {
        const vaccineObject = {};
        dataSource.childVaccines[key].vaccines.forEach((vaccine, index) => {
          vaccineObject[`vaccine${index + 1}`] = vaccine.name;
        });
        vaccineObject[`color1`] = '#00afbf';
        vaccineObject[`color2`] = '#aafac3';
        vaccineObject['date'] = dataSource.childVaccines[key].dueDate;
        vaccineObject['name'] = dataSource.child.name;
        vaccineObject['duration'] = key;
        data.push(vaccineObject);
      }
      this.setState({
        isLoading: false,
        dataSource,
        data,
      });
    }catch(e) {
      this.props.navigation.navigate('Login');
    }

  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View style={{height: 20}} />
          <View
            style={[
              {
                width: 322,
                height: 200,
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
              },
              shadowStyle,
            ]}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}>
              <View style={{width: 322, height: 200, borderRadius: 10}}>
                <Image
                  style={{width: 322, height: 200, borderRadius: 10}}
                  source={require('../assets/BabyBoo_Banner_1.png')}
                  resizeMode="stretch"
                />
              </View>

              <View style={{width: 322, height: 200, borderRadius: 10}}>
                <Image
                  style={{width: 322, height: 200, borderRadius: 10}}
                  source={require('../assets/BabyBoo_Banner_2.png')}
                  resizeMode="stretch"
                />
              </View>

              <View style={{width: 322, height: 200, borderRadius: 10}}>
                <Image
                  style={{width: 322, height: 200, borderRadius: 10}}
                  source={require('../assets/BabyBoo_Banner_3.png')}
                  resizeMode="stretch"
                />
              </View>
            </ScrollView>
          </View>

          <View style={[styles.card, shadowStyle]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                marginLeft: 15,
                marginRight: 15,
              }}>
              <Text
                style={{fontSize: 18, color: '#707070', fontWeight: 'bold'}}>
                Next Due Vaccine
              </Text>
              {/* <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Nextduevaccine')
                }> */}
                <Text
                  style={{
                    fontSize: 10,
                    color: '#707070',
                    alignSelf: 'flex-end',
                  }}>
                  View All
                </Text>
              {/* </TouchableOpacity> */}
            </View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}>
              <FlatList
                data={this.state.data}
                horizontal={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      console.log('item clicked', item);
                      this.props.navigation.navigate('Nextduevaccine', item);
                    }}>
                    <View style={[styles.cardvaccine]}>
                      <LinearGradient
                        colors={[item.color1, item.color2]}
                        style={{flex: 1, borderRadius: 10}}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 7,
                            marginLeft: 7,
                          }}>
                          <View
                            style={{
                              flexDirection: 'column',
                              width: '50%',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                width: 86,
                                height: 86,
                                borderRadius: 400,
                                backgroundColor: 'white',
                              }}>
                              <Image
                                style={{
                                  width: 86,
                                  height: 86,
                                  borderRadius: 400,
                                }}
                                source={require('../assets/baby.jpg')}
                                resizeMode="cover"
                              />
                            </View>
                            <View style={{marginTop: 10}}>
                              <Text
                                style={{
                                  fontSize: 15,
                                  fontWeight: 'bold',
                                  color: '#FFFFFF',
                                }}>
                                {item.name}
                              </Text>
                            </View>
                            <View style={{marginTop: 5}}>
                              <Text style={{fontSize: 11, color: '#FFFFFF'}}>
                                {item.duration}
                              </Text>
                            </View>
                          </View>

                          <View
                            style={{
                              flexDirection: 'column',
                              width: '50%',
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: '100%',
                            }}>
                            <View>
                              <Text
                                style={{
                                  fontSize: 11,
                                  fontWeight: 'bold',
                                  color: '#FFFFFF',
                                }}>
                                {item.date}
                              </Text>
                            </View>
                            <View style={{marginTop: 20}}>
                              <Text style={{fontSize: 11, color: '#FFFFFF'}}>
                                {item.vaccine1}
                              </Text>
                            </View>
                            <View style={{marginTop: 3}}>
                              <Text style={{fontSize: 11, color: '#FFFFFF'}}>
                                {item.vaccine2}
                              </Text>
                            </View>
                            <View style={{marginTop: 3}}>
                              <Text style={{fontSize: 11, color: '#FFFFFF'}}>
                                {item.vaccine3}
                              </Text>
                            </View>
                            <View style={{marginTop: 3}}>
                              <Text style={{fontSize: 11, color: '#FFFFFF'}}>
                                {item.vaccine4}
                              </Text>
                            </View>
                            <View style={{marginTop: 3}}>
                              <Text style={{fontSize: 11, color: '#FFFFFF'}}>
                                {item.vaccine5}
                              </Text>
                            </View>
                            <View style={{marginTop: 3}}>
                              <Text style={{fontSize: 11, color: '#FFFFFF'}}>
                                {item.vaccine6}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </LinearGradient>
                    </View>
                  </TouchableOpacity>
                )}
              />
              <View style={{width: 15, backgroundColor: '#FFFFFF'}} />
            </ScrollView>
          </View>

          <ImageBackground
            style={[{width: 322, height: 199, marginTop: 20}, shadowStyle]}
            imageStyle={{borderRadius: 10}}
            source={require('../assets/rewardpoints.png')}
            resizeMode="cover">
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#707070',
                marginTop: 10,
                marginLeft: 20,
              }}>
              Earn Reward Points
            </Text>

            <Text
              style={{
                fontSize: 12,
                color: '#000',
                marginTop: 10,
                marginLeft: 20,
              }}>
              When you get your child Vaccinated
            </Text>
            <Text style={{fontSize: 12, color: '#000', marginLeft: 20}}>
              or every-time you upload your Child’s Picture
            </Text>
            <Text style={{fontSize: 12, color: '#000', marginLeft: 20}}>
              and Get Exciting products at our BabyBoo Store
            </Text>
            <Text style={{fontSize: 12, color: '#000', marginLeft: 20}}>
              Coming soon.
            </Text>
          </ImageBackground>
          <View style={{height: 20}} />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f7f9',
  },
  vaccinestext: {
    fontSize: 15,
    color: '#707070',
    marginLeft: 10,
    marginTop: 7,
  },
  card: {
    height: 234,
    width: 322,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: 15,
  },
  cardvaccine: {
    height: 151,
    width: 200,
    backgroundColor: 'transparent',
    borderRadius: 10,
    marginLeft: 15,
    marginTop: 20,
  },
  input: {
    margin: 15,
    height: 50,
    width: 300,
    padding: 5,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  digitalreport: {
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    width: 322,
    marginTop: 25,
    height: 69,
    borderRadius: 10,
  },
});

export default Home;

import React from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  Dimensions,
  StatusBar,
  LayoutAnimation,
  Platform,
  UIManager,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from './Header';
import LinearGradient from 'react-native-linear-gradient';
import {HeaderBackButton} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Modal from 'react-native-modal';
// import BCG from "../../VaccineDetails/BCG";
import BCG from '../VaccineDetails/BCG';
import OPV from '../VaccineDetails/OPV';
import HEPB from '../VaccineDetails/HEPB';
import DTwP from '../VaccineDetails/DTwP';
import IPV from '../VaccineDetails/IPV';
import Hib from '../VaccineDetails/Hib';
import RvVaccine from '../VaccineDetails/RvVaccine';
import axios from 'axios';
import url from './Config/API';
import DatePicker from 'react-native-datepicker';
import NextDueVaccineDetail from '../Components/NextDueVaccineDetail';

const saveVaccine = async data => {
  const response = await axios.post(`${url}/issueVaccine`, data);
  return response;
};

class Nextduevaccine extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerLeft: (
      <HeaderBackButton onPress={() => navigation.navigate('Home')} />
    ),
    title: 'Next Due Vaccine',
    headerBackground: <Header />,

    headerTitleStyle: {
      color: '#FFFFFF',
      fontSize: 20,
    },
    headerStyle: {
      backgroundColor: 'transparent',
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      data: null,

      date: null,
      height: '',
      weight: '',
      brand1: '',
      mfgdate1: '',
      expdate1: '',
      batch1: '',
      hospital1: '',
      brand2: '',
      mfgdate2: '',
      expdate2: '',
      batch2: '',
      hospital2: '',
      brand3: '',
      mfgdate3: '',
      expdate3: '',
      batch3: '',
      hospital3: '',

      dataSource: [],
      isLoading: true,

      expanded: false,
      status: true,
      expanded1: false,
      status1: true,
      status2: true,

      index: 0,
      routes: [
        {key: 'about', title: 'About'},
        {key: 'doses', title: 'Doses'},
        {key: 'sideeffects', title: 'Side effects'},
      ],
      enableSave: false,
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  async componentDidMount() {
    const login = await AsyncStorage.getItem('username');
    const token = await AsyncStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get(
      `${url}/getUserInfo/?stream=bb_stream&key=${login}`,
    );
    console.log(this.state.dataSource[`6Months`]);
    const {navigation} = this.props;
    const durationTime = navigation.dangerouslyGetParent().getParam('duration');
    console.log('duration', durationTime);
    const childData = response.data.childVaccines[durationTime];
    this.setState({
      isLoading: false,
      childData,
      dataSource: response.data,
      durationTime,
      currentVaccine: {vaccine: childData.vaccines[0], index: 0},
    });
  }

  HideComponent = () => {
    if (this.state.status == true) {
      this.setState({status: false});
    } else {
      this.setState({status: true});
    }
  };

  HideComponent1 = () => {
    if (this.state.status1 == true) {
      this.setState({status1: false});
    } else {
      this.setState({status1: true});
    }
  };

  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded: !this.state.expanded});
  };

  changeLayout1 = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded1: true});
  };

  detailsShow = item => {
    {
      item.name === 'BCG'
        ? this.setState({data: 1})
        : item.name === 'OPV 0'
          ? this.setState({data: 2})
          : item.name === 'HEP-B1' ? this.setState({data: 3}) : null;
    }
  };

  detailsShow2 = item => {
    {
      item.vaccine2 === 'OPV1'
        ? this.setState({data: 2})
        : item.vaccine2 === 'IPV1' ? this.setState({data: 5}) : null;
    }
  };

  detailsShow3 = item => {
    {
      item.vaccine3 === 'HEP_B1'
        ? this.setState({data: 3})
        : item.vaccine3 === 'HEP_B2' ? this.setState({data: 3}) : null;
    }
  };

  detailsShow4 = item => {
    {
      item.vaccine4 === 'Hib1' ? this.setState({data: 6}) : null;
    }
  };

  detailsShow5 = item => {
    {
      item.vaccine5 === 'RV_VACCINE1' ? this.setState({data: 7}) : null;
    }
  };

  onSave = async () => {
    const {childData, durationTime} = this.state;

    const childVaccine = {[durationTime]: childData};
    try {
      const res = await saveVaccine({childVaccine});
      console.log(res.data);
      if (res.data) {
        alert('Save successfully');
        this.props.navigation.navigate('Home');
      } else {
        this.setState({error: 'Somethig is wrong'});
      }
    }catch(e) {
      this.props.navigation.navigate('Login');
    }

  };

  changeField = (value, type, name) => {
    const {childData, currentVaccine} = this.state;
    const childDataClone = JSON.parse(JSON.stringify(childData));
    const vaccines = childDataClone.vaccines;
    const vaccine = vaccines.find(vaccine => vaccine.name === name);
    vaccine[type] = value;
    this.setState({
      childData: childDataClone,
      currentVaccine: {...currentVaccine, vaccine},
    });
  };
  backHandler = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded1: true});
    const {currentVaccine, childData} = this.state;
    if (currentVaccine.index > 0) {
      this.setState({
        currentVaccine: {
          index: currentVaccine.index - 1,
          vaccine: childData.vaccines[currentVaccine.index - 1],
        },
        enableSave: false,
      });
    }
  };
  nextHandler = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded1: true});
    const {currentVaccine, childData} = this.state;
    if (currentVaccine.index < childData.vaccines.length - 1) {
      this.setState({
        currentVaccine: {
          index: currentVaccine.index + 1,
          vaccine: childData.vaccines[currentVaccine.index + 1],
        },
      });
      if (currentVaccine.index === childData.vaccines.length - 2) {
        this.setState({enableSave: true});
      }
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator />
        </View>
      );
    }
    const {
      childData,
      durationTime,
      dataSource,
      currentVaccine,
      enableSave,
    } = this.state;
    return (
      <Animatable.View style={styles.container}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          {/* Card view Start */}

          <View style={[styles.cardvaccine]}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}>
              {/* #a076e8', color2: '#5dc4dd */}
              <LinearGradient
                colors={['#00afbf', '#aafac3']}
                style={{borderRadius: 30, alignItems: 'center'}}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <View
                  style={{flexDirection: 'row', marginTop: 15, marginLeft: 15}}>
                  <View style={{width: '40%'}}>
                    <View
                      style={{
                        width: 86,
                        height: 86,
                        borderRadius: 400,
                        backgroundColor: 'white',
                      }}>
                      <Image
                        style={{width: 86, height: 86, borderRadius: 400}}
                        source={require('../assets/baby.jpg')}
                        resizeMode="cover"
                      />
                    </View>
                  </View>

                  <View style={{flexDirection: 'column', width: '60%'}}>
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          color: '#FFFFFF',
                          alignSelf: 'flex-end',
                          marginRight: 20,
                        }}>
                        Due Date: {childData.dueDate}
                      </Text>
                    </View>
                    <View style={{marginTop: 20}}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#FFFFFF',
                          fontWeight: 'bold',
                        }}>
                        Child Name: {dataSource.child.name}
                      </Text>
                    </View>
                    <View style={{marginTop: 3}}>
                      <Text style={{fontSize: 11, color: '#FFFFFF'}}>
                        {durationTime}
                      </Text>
                    </View>
                  </View>
                </View>

                <View>
                  {dataSource.childVaccines[durationTime].vaccines.map(item => (
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginLeft: 15,
                          marginRight: 15,
                          marginTop: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View style={{width: '80%'}}>
                          <View style={{flexDirection: 'row'}}>
                            <Image
                              style={{
                                width: 17,
                                height: 17,
                                alignSelf: 'center',
                              }}
                              source={require('../assets/injectionwhite.png')}
                              resizeMode="contain"
                            />
                            <TouchableOpacity
                              onPress={this.detailsShow.bind(this, item)}>
                              <Text style={styles.vaccinestext}>
                                {item.name}
                              </Text>
                            </TouchableOpacity>
                            <Image
                              style={{
                                width: 11,
                                height: 11,
                                alignSelf: 'center',
                                marginLeft: 7,
                              }}
                              source={require('../assets/info.png')}
                              resizeMode="contain"
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            width: '20%',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              width: 14,
                              height: 14,
                              borderRadius: 400,
                              backgroundColor: '#FFFFFF',
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
                {this.state.status ? (
                  <View style={{marginTop: 130}}>
                    <TouchableOpacity
                      style={styles.btnSignin}
                      activeOpacity={0.8}
                      onPress={() => {
                        this.changeLayout();
                        this.HideComponent();
                      }}>
                      <Text>Vaccine given on</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}

                <View style={{height: 10}} />
                <View
                  style={{
                    height: this.state.expanded ? null : 0,
                    overflow: 'hidden',
                    alignItems: 'center',
                  }}>
                  <DatePicker
                    style={{
                      height: 50,
                      width: 222,
                      borderRadius: 10,
                      marginTop: 15,
                      backgroundColor: '#FFFFFF',
                    }}
                    date={childData.givenDate} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder="Given Date"
                    placeHolderTextStyle={{color: '#707070', fontSize: 15}}
                    format="DD/MM/YYYY"
                    minDate="01-01-1900"
                    maxDate="01-01-2100"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'relative',
                        alignItems: 'flex-end',
                      },
                      dateInput: {
                        borderWidth: 0,
                        fontSize: 15,
                        height: 50,
                        width: 300,
                        alignSelf: 'flex-start',
                      },
                    }}
                    onDateChange={date => {
                      this.setState({
                        childData: {...childData, givenDate: date},
                      });
                    }}
                  />
                  <View
                    style={{
                      width: 230,
                      borderColor: '#FFFFFF',
                      borderWidth: 1,
                      marginTop: 10,
                    }}
                  />
                  {this.state.status1 ? (
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 15,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#FFFFFF',
                            fontSize: 16,
                            marginLeft: 10,
                          }}>
                          Height
                        </Text>
                        <TextInput
                          style={[styles.input]}
                          placeholder="Height in cm"
                          keyboardType="phone-pad"
                          onChangeText={height =>
                            this.setState({childData: {...childData, height}})
                          }
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 15,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#FFFFFF',
                            fontSize: 16,
                            marginLeft: 10,
                          }}>
                          Weight
                        </Text>
                        <TextInput
                          style={[styles.input]}
                          placeholder="Weight in kg"
                          keyboardType="phone-pad"
                          onChangeText={weight =>
                            this.setState({childData: {...childData, weight}})
                          }
                        />
                      </View>
                      <View style={{marginTop: 15}}>
                        <TouchableOpacity
                          style={styles.btnSignin}
                          activeOpacity={0.8}
                          onPress={() => {
                            this.changeLayout1();
                            this.HideComponent1();
                          }}>
                          <Text style={{color: '#14B8BE'}}>Next</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : null}
                  {this.state.status2 ? (
                    <NextDueVaccineDetail
                      expanded1={this.state.expanded1}
                      changeField={this.changeField}
                      backHandler={this.backHandler}
                      nextHandler={this.nextHandler}
                      currentVaccine={currentVaccine}
                      enableSave={enableSave}
                      onSave={this.onSave}
                    />
                  ) : null}

                  <View style={{height: 10}} />
                </View>
              </LinearGradient>
            </ScrollView>
          </View>
          {/* Card view over */}

          <Modal
            isVisible={this.state.data === 1}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}>
            <BCG />
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderBottomEndRadius: 20,
                borderBottomStartRadius: 20,
                height: 60,
                width: 354,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 82,
                  height: 38,
                  borderRadius: 10,
                  backgroundColor: '#5dc4dd',
                  marginTop: 10,
                  marginRight: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <TouchableOpacity
                  style={{
                    width: 82,
                    height: 38,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => this.setState({data: null})}>
                  <Text style={{color: '#FFFFFF'}}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            isVisible={this.state.data === 2}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}>
            <OPV />
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderBottomEndRadius: 20,
                borderBottomStartRadius: 20,
                height: 60,
                width: 354,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 82,
                  height: 38,
                  borderRadius: 10,
                  backgroundColor: '#5dc4dd',
                  marginTop: 10,
                  marginRight: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <TouchableOpacity
                  style={{
                    width: 82,
                    height: 38,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => this.setState({data: null})}>
                  <Text style={{color: '#FFFFFF'}}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            isVisible={this.state.data === 3}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}>
            <HEPB />
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderBottomEndRadius: 20,
                borderBottomStartRadius: 20,
                height: 60,
                width: 354,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 82,
                  height: 38,
                  borderRadius: 10,
                  backgroundColor: '#5dc4dd',
                  marginTop: 10,
                  marginRight: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <TouchableOpacity
                  style={{
                    width: 82,
                    height: 38,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => this.setState({data: null})}>
                  <Text style={{color: '#FFFFFF'}}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            isVisible={this.state.data === 4}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}>
            <DTwP />
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderBottomEndRadius: 20,
                borderBottomStartRadius: 20,
                height: 60,
                width: 354,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 82,
                  height: 38,
                  borderRadius: 10,
                  backgroundColor: '#5dc4dd',
                  marginTop: 10,
                  marginRight: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <TouchableOpacity
                  style={{
                    width: 82,
                    height: 38,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => this.setState({data: null})}>
                  <Text style={{color: '#FFFFFF'}}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            isVisible={this.state.data === 5}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}>
            <IPV />
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderBottomEndRadius: 20,
                borderBottomStartRadius: 20,
                height: 60,
                width: 354,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 82,
                  height: 38,
                  borderRadius: 10,
                  backgroundColor: '#5dc4dd',
                  marginTop: 10,
                  marginRight: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <TouchableOpacity
                  style={{
                    width: 82,
                    height: 38,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => this.setState({data: null})}>
                  <Text style={{color: '#FFFFFF'}}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            isVisible={this.state.data === 6}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}>
            <Hib />
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderBottomEndRadius: 20,
                borderBottomStartRadius: 20,
                height: 60,
                width: 354,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 82,
                  height: 38,
                  borderRadius: 10,
                  backgroundColor: '#5dc4dd',
                  marginTop: 10,
                  marginRight: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <TouchableOpacity
                  style={{
                    width: 82,
                    height: 38,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => this.setState({data: null})}>
                  <Text style={{color: '#FFFFFF'}}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            isVisible={this.state.data === 7}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}>
            <RvVaccine />
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderBottomEndRadius: 20,
                borderBottomStartRadius: 20,
                height: 60,
                width: 354,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 82,
                  height: 38,
                  borderRadius: 10,
                  backgroundColor: '#5dc4dd',
                  marginTop: 10,
                  marginRight: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <TouchableOpacity
                  style={{
                    width: 82,
                    height: 38,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => this.setState({data: null})}>
                  <Text style={{color: '#FFFFFF'}}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </Animatable.View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#f4f7f9',
  },
  vaccinestext: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 10,
    marginTop: 7,
  },
  input: {
    marginLeft: 20,
    height: 40,
    width: 118,
    paddingLeft: 20,
    fontSize: 15,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  cardvaccine: {
    flex: 1,
    width: 272,
    backgroundColor: 'transparent',
    borderRadius: 30,
    marginTop: 20,
    marginLeft: 30,
  },
  btnSignin: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginLeft: 20,
    borderRadius: 15,
    width: 222,
    marginRight: 20,
    padding: 10,
    height: 50,
  },
  Alert_Main_View: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#009688',
    height: 200,
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 7,
  },

  Alert_Title: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    height: '28%',
  },

  Alert_Message: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    height: '42%',
  },

  buttonStyle: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
    marginTop: -5,
  },

  container2: {
    marginTop: StatusBar.currentHeight,
  },

  scene: {
    flex: 1,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },

  tabbar: {
    backgroundColor: 'transparent',
  },
  tab: {
    width: 120,
  },
  indicator: {
    backgroundColor: '#ffeb3b',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
});

export default Nextduevaccine;

{
  /* <View style={[styles.cardvaccine]}>
                        <LinearGradient
                            colors={['#a076e8', '#5dc4dd']}
                            style={{ flex: 1, borderRadius: 30, alignItems: 'center', }}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}>

                            <View style={{ flexDirection: "row", marginTop: 15, marginLeft: 15, }}>
                                <View style={{ width: "40%" }}>
                                    <View style={{ width: 86, height: 86, borderRadius: 400, backgroundColor: "white" }}>
                                        <Image
                                            style={{ width: 86, height: 86, borderRadius: 400 }}
                                            source={require('../assets/baby.jpg')}
                                            resizeMode='cover'
                                        />
                                    </View>
                                </View>

                                <View style={{ flexDirection: "column", width: "60%", }}>
                                    <View>
                                        <Text style={{ fontSize: 14, fontWeight: "bold", color: "#FFFFFF", }}>7 November, 2019</Text>
                                    </View>
                                    <View style={{ marginTop: 20 }}>
                                        <Text style={{ fontSize: 15, color: "#FFFFFF", fontWeight: "bold" }}>Emma</Text>
                                    </View>
                                    <View style={{ marginTop: 3 }}>
                                        <Text style={{ fontSize: 11, color: "#FFFFFF" }}>6 Weeks</Text>
                                    </View>
                                </View>

                            </View>

                            <View style={{ flexDirection: "row", marginLeft: 15, marginRight: 15, marginTop: 20, justifyContent: 'center', alignItems: 'center', }}>
                                <View style={{ width: "80%" }}>
                                    <View style={{ flexDirection: "row", }}>
                                        <Image
                                            style={{ width: 17, height: 17, alignSelf: "center" }}
                                            source={require('../assets/injectionwhite.png')}
                                            resizeMode='contain'
                                        />
                                        <Text style={styles.vaccinestext}>DTwP 1</Text>
                                        <Image
                                            style={{ width: 11, height: 11, alignSelf: "center", marginLeft: 7 }}
                                            source={require('../assets/info.png')}
                                            resizeMode='contain'
                                        />
                                    </View>
                                </View>
                                <View style={{ width: "20%", justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ width: 14, height: 14, borderRadius: 400, backgroundColor: "#FFFFFF" }} />
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", marginLeft: 15, marginRight: 15, marginTop: 10, justifyContent: 'center', alignItems: 'center', }}>
                                <View style={{ width: "80%" }}>
                                    <View style={{ flexDirection: "row", }}>
                                        <Image
                                            style={{ width: 17, height: 17, alignSelf: "center" }}
                                            source={require('../assets/injectionwhite.png')}
                                            resizeMode='contain'
                                        />
                                        <Text style={styles.vaccinestext}>IPV 1</Text>
                                        <Image
                                            style={{ width: 11, height: 11, alignSelf: "center", marginLeft: 7 }}
                                            source={require('../assets/info.png')}
                                            resizeMode='contain'
                                        />
                                    </View>
                                </View>
                                <View style={{ width: "20%", justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ width: 14, height: 14, borderRadius: 400, backgroundColor: "#FFFFFF" }} />
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", marginLeft: 15, marginRight: 15, marginTop: 10, justifyContent: 'center', alignItems: 'center', }}>
                                <View style={{ width: "80%" }}>
                                    <View style={{ flexDirection: "row", }}>
                                        <Image
                                            style={{ width: 17, height: 17, alignSelf: "center" }}
                                            source={require('../assets/injectionwhite.png')}
                                            resizeMode='contain'
                                        />
                                        <Text style={styles.vaccinestext}>HEP-B2</Text>
                                        <Image
                                            style={{ width: 11, height: 11, alignSelf: "center", marginLeft: 7 }}
                                            source={require('../assets/info.png')}
                                            resizeMode='contain'
                                        />
                                    </View>
                                </View>
                                <View style={{ width: "20%", justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ width: 14, height: 14, borderRadius: 400, backgroundColor: "#FFFFFF" }} />
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", marginLeft: 15, marginRight: 15, marginTop: 10, justifyContent: 'center', alignItems: 'center', }}>
                                <View style={{ width: "80%" }}>
                                    <View style={{ flexDirection: "row", }}>
                                        <Image
                                            style={{ width: 17, height: 17, alignSelf: "center" }}
                                            source={require('../assets/injectionwhite.png')}
                                            resizeMode='contain'
                                        />
                                        <Text style={styles.vaccinestext}>Hib 1</Text>
                                        <Image
                                            style={{ width: 11, height: 11, alignSelf: "center", marginLeft: 7 }}
                                            source={require('../assets/info.png')}
                                            resizeMode='contain'
                                        />
                                    </View>
                                </View>
                                <View style={{ width: "20%", justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ width: 14, height: 14, borderRadius: 400, backgroundColor: "#FFFFFF" }} />
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", marginLeft: 15, marginRight: 15, marginTop: 10, justifyContent: 'center', alignItems: 'center', }}>
                                <View style={{ width: "80%" }}>
                                    <View style={{ flexDirection: "row", }}>
                                        <Image
                                            style={{ width: 17, height: 17, alignSelf: "center" }}
                                            source={require('../assets/injectionwhite.png')}
                                            resizeMode='contain'
                                        />
                                        <Text style={styles.vaccinestext}>RV VACCINE 1</Text>
                                        <Image
                                            style={{ width: 11, height: 11, alignSelf: "center", marginLeft: 7 }}
                                            source={require('../assets/info.png')}
                                            resizeMode='contain'
                                        />
                                    </View>
                                </View>
                                <View style={{ width: "20%", justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ width: 14, height: 14, borderRadius: 400, backgroundColor: "#FFFFFF" }} />
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", marginLeft: 15, marginRight: 15, marginTop: 10, justifyContent: 'center', alignItems: 'center', }}>
                                <View style={{ width: "80%" }}>
                                    <View style={{ flexDirection: "row", }}>
                                        <Image
                                            style={{ width: 17, height: 17, alignSelf: "center" }}
                                            source={require('../assets/injectionwhite.png')}
                                            resizeMode='contain'
                                        />
                                        <Text style={styles.vaccinestext}>PCV 1</Text>
                                        <Image
                                            style={{ width: 11, height: 11, alignSelf: "center", marginLeft: 7 }}
                                            source={require('../assets/info.png')}
                                            resizeMode='contain'
                                        />
                                    </View>
                                </View>
                                <View style={{ width: "20%", justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ width: 14, height: 14, borderRadius: 400, backgroundColor: "#FFFFFF" }} />
                                </View>
                            </View>

                            <View style={{ marginTop: 20 }}>

                                <TouchableOpacity style={styles.btnSignin}>
                                    <Text>Vaccine given on</Text>
                                </TouchableOpacity>
                            </View>


                        </LinearGradient>
                    </View> */
}

// FLat List

{
  /* <FlatList
                        data={[{ color1: '#00afbf', color2: '#aafac3', name: 'Emma', date: '26 September, 2019', duration: 'At_Birth', vaccine1: 'BCG', vaccine2: 'OPV1', vaccine3: 'HEP_B1', vaccine4: '', vaccine5: '', vaccine6: '' },
                        { color1: '#a076e8', color2: '#5dc4dd', name: 'Emma', date: '07 November, 2019', duration: '6_Week', vaccine1: 'DTwP1', vaccine2: 'IPV1', vaccine3: 'HEP_B2', vaccine4: 'Hib1', vaccine5: 'RV_VACCINE1', vaccine6: 'PCV1' }
                        ]}
                        horizontal={true}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>

                            <View style={[styles.cardvaccine]}>
                                <LinearGradient
                                    colors={[item.color1, item.color2]}
                                    style={{ flex: 1, borderRadius: 30, alignItems: 'center', }}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 0 }}>

                                    <View style={{ flexDirection: "row", marginTop: 15, marginLeft: 15, }}>
                                        <View style={{ width: "40%" }}>
                                            <View style={{ width: 86, height: 86, borderRadius: 400, backgroundColor: "white" }}>
                                                <Image
                                                    style={{ width: 86, height: 86, borderRadius: 400 }}
                                                    source={require('../assets/baby.jpg')}
                                                    resizeMode='cover'
                                                />
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: "column", width: "60%", }}>
                                            <View>
                                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#FFFFFF", }}>{item.date}</Text>
                                            </View>
                                            <View style={{ marginTop: 20 }}>
                                                <Text style={{ fontSize: 15, color: "#FFFFFF", fontWeight: "bold" }}>{item.name}</Text>
                                            </View>
                                            <View style={{ marginTop: 3 }}>
                                                <Text style={{ fontSize: 11, color: "#FFFFFF" }}>{item.duration}</Text>
                                            </View>
                                        </View>

                                    </View>

                                    <View style={{ flexDirection: "row", marginLeft: 15, marginRight: 15, marginTop: 20, justifyContent: 'center', alignItems: 'center', }}>
                                        <View style={{ width: "80%" }}>
                                            <View style={{ flexDirection: "row", }}>
                                                <Image
                                                    style={{ width: 17, height: 17, alignSelf: "center" }}
                                                    source={require('../assets/injectionwhite.png')}
                                                    resizeMode='contain'
                                                />
                                                <TouchableOpacity onPress={this.detailsShow1.bind(this, item)}>
                                                    <Text style={styles.vaccinestext}>{item.vaccine1}</Text>
                                                </TouchableOpacity>
                                                <Image
                                                    style={{ width: 11, height: 11, alignSelf: "center", marginLeft: 7 }}
                                                    source={require('../assets/info.png')}
                                                    resizeMode='contain'
                                                />
                                            </View>
                                        </View>
                                        <View style={{ width: "20%", justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: 14, height: 14, borderRadius: 400, backgroundColor: "#FFFFFF" }} />
                                        </View>
                                    </View>


                                    <View style={{ flexDirection: "row", marginLeft: 15, marginRight: 15, marginTop: 10, justifyContent: 'center', alignItems: 'center', }}>
                                        <View style={{ width: "80%" }}>
                                            <View style={{ flexDirection: "row", }}>
                                                <Image
                                                    style={{ width: 17, height: 17, alignSelf: "center" }}
                                                    source={require('../assets/dropwhite.png')}
                                                    resizeMode='contain'
                                                />
                                                <TouchableOpacity onPress={this.detailsShow2.bind(this, item)}>
                                                    <Text style={styles.vaccinestext}>{item.vaccine2}</Text>
                                                </TouchableOpacity>
                                                <Image
                                                    style={{ width: 11, height: 11, alignSelf: "center", marginLeft: 7 }}
                                                    source={require('../assets/info.png')}
                                                    resizeMode='contain'
                                                />
                                            </View>
                                        </View>
                                        <View style={{ width: "20%", justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: 14, height: 14, borderRadius: 400, backgroundColor: "#FFFFFF" }} />
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: "row", marginLeft: 15, marginRight: 15, marginTop: 10, justifyContent: 'center', alignItems: 'center', }}>
                                        <View style={{ width: "80%" }}>
                                            <View style={{ flexDirection: "row", }}>
                                                <Image
                                                    style={{ width: 17, height: 17, alignSelf: "center" }}
                                                    source={require('../assets/injectionwhite.png')}
                                                    resizeMode='contain'
                                                />
                                                <TouchableOpacity onPress={this.detailsShow3.bind(this, item)}>
                                                    <Text style={styles.vaccinestext}>{item.vaccine3}</Text>
                                                </TouchableOpacity>
                                                <Image
                                                    style={{ width: 11, height: 11, alignSelf: "center", marginLeft: 7 }}
                                                    source={require('../assets/info.png')}
                                                    resizeMode='contain'
                                                />
                                            </View>
                                        </View>
                                        <View style={{ width: "20%", justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: 14, height: 14, borderRadius: 400, backgroundColor: "#FFFFFF" }} />
                                        </View>
                                    </View>

                                    {item.vaccine4 == '' ? null :
                                        <View style={{ flexDirection: "row", marginLeft: 15, marginRight: 15, marginTop: 10, justifyContent: 'center', alignItems: 'center', }}>
                                            <View style={{ width: "80%" }}>
                                                <View style={{ flexDirection: "row", }}>
                                                    <Image
                                                        style={{ width: 17, height: 17, alignSelf: "center" }}
                                                        source={require('../assets/injectionwhite.png')}
                                                        resizeMode='contain'
                                                    />
                                                    <TouchableOpacity onPress={this.detailsShow4.bind(this, item)}>
                                                        <Text style={styles.vaccinestext}>{item.vaccine4}</Text>
                                                    </TouchableOpacity>
                                                    <Image
                                                        style={{ width: 11, height: 11, alignSelf: "center", marginLeft: 7 }}
                                                        source={require('../assets/info.png')}
                                                        resizeMode='contain'
                                                    />
                                                </View>
                                            </View>
                                            <View style={{ width: "20%", justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={{ width: 14, height: 14, borderRadius: 400, backgroundColor: "#FFFFFF" }} />
                                            </View>
                                        </View>
                                    }

                                    {item.vaccine5 == '' ? null :
                                        <View style={{ flexDirection: "row", marginLeft: 15, marginRight: 15, marginTop: 10, justifyContent: 'center', alignItems: 'center', }}>
                                            <View style={{ width: "80%" }}>
                                                <View style={{ flexDirection: "row", }}>
                                                    <Image
                                                        style={{ width: 17, height: 17, alignSelf: "center" }}
                                                        source={require('../assets/injectionwhite.png')}
                                                        resizeMode='contain'
                                                    />
                                                    <TouchableOpacity onPress={this.detailsShow5.bind(this, item)}>
                                                        <Text style={styles.vaccinestext}>{item.vaccine5}</Text>
                                                    </TouchableOpacity>
                                                    <Image
                                                        style={{ width: 11, height: 11, alignSelf: "center", marginLeft: 7 }}
                                                        source={require('../assets/info.png')}
                                                        resizeMode='contain'
                                                    />
                                                </View>
                                            </View>
                                            <View style={{ width: "20%", justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={{ width: 14, height: 14, borderRadius: 400, backgroundColor: "#FFFFFF" }} />
                                            </View>
                                        </View>
                                    }

                                    {item.vaccine6 == '' ? null :
                                        <View style={{ flexDirection: "row", marginLeft: 15, marginRight: 15, marginTop: 10, justifyContent: 'center', alignItems: 'center', }}>
                                            <View style={{ width: "80%" }}>
                                                <View style={{ flexDirection: "row", }}>
                                                    <Image
                                                        style={{ width: 17, height: 17, alignSelf: "center" }}
                                                        source={require('../assets/injectionwhite.png')}
                                                        resizeMode='contain'
                                                    />
                                                    <Text style={styles.vaccinestext}>{item.vaccine6}</Text>
                                                    <Image
                                                        style={{ width: 11, height: 11, alignSelf: "center", marginLeft: 7 }}
                                                        source={require('../assets/info.png')}
                                                        resizeMode='contain'
                                                    />
                                                </View>
                                            </View>
                                            <View style={{ width: "20%", justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={{ width: 14, height: 14, borderRadius: 400, backgroundColor: "#FFFFFF" }} />
                                            </View>
                                        </View>
                                    }

                                    <View style={{ marginTop: 20 }}>

                                        <TouchableOpacity style={styles.btnSignin}>
                                            <Text>Vaccine given on</Text>
                                        </TouchableOpacity>
                                    </View>


                                </LinearGradient>
                            </View>
                        }>
                    </FlatList> */
}

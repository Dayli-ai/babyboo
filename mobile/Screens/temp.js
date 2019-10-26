import React from 'react';
import {
    View,
    Dimensions,
    Image,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Picker,
    Button,
    ActivityIndicator,
    TouchableWithoutFeedback,
    AsyncStorage
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Dropdown } from '../components/Dropdown';
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { baseUrl } from "../constants/constant";

import RNFetchBlob from 'rn-fetch-blob'
import { NavigationActions, StackActions } from "react-navigation";
import Spinner from "react-native-spinkit";

export const { width, height } = Dimensions.get('window');

export default class SampleInspection extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        const params = this.props.navigation.state.params;
        this.state = {
            present_sample_details: '',
            user_credentials: params.user_credentials,
            docid: params.docid,
            token: params.user_credentials.token,
            count_samples: params.count_samples,
            commodity: params.commodity,
            general_information: params.general_information,
            sample_weight: 20,
            isSampleWeightCorrect: true,
            firmness: [
                'Firm',
                'Shriveled',
                'Flabby',
            ],
            cleanness: [
                'Clean',
                'Fairly Clean',
                'Dirty',
            ],
            shape: [
                'Well Shaped',
                'Fairly Well Shaped',
                'Seriously Misshappen',
            ],
            maturity: [
                'Mature',
                'Fairly well Matured',
            ],
            skinning: [
                'Practically no Skinning',
                'Slightly Skinned',
                'Moderately Skinned',
                'Badly Skinned'
            ],
            selectedFirmness: '',
            selectedCleanness: '',
            selectedShape: '',
            selectedMaturity: '',
            selectedSkinning: '',
            pulpTemperature: '',
            range_type1: '',
            selectedRangeType1Units: 'lb',
            selectedRangeType2Units: '6 oz',
            isRangeType1Updated: false,
            isRangeType2Updated: false,
            selectedRangeType1: '',
            selectedRangeType1Object: '',
            selectedRangeType1ObjectTotal: {
                "type1Range": '',
                "minWeight": '0',
                "maxWeight": '0',
                "minUnit": 'lb',
                "overSize": 0,
                "underSize": 0
            },
            type1_percentage: {
                overSize: '0.00',
                underSize: '0.00'
            },
            selectedRangeType2: '',
            selectedRangeType2Object: '',
            selectedRangeType2ObjectTotal: [{ "key": 1, "type2Range": "", "minDia": "", "maxDia": "", "underSize": 0, "overSize": 0, "sizeA": false, "sizeAWeight": 0, "status": true }],
            countUIType2: 1,
            type2_details_undersize: [],
            type2_details_oversize: [],
            type2_sampleA_weight: [],
            type2_undersize_percentage: [],
            type2_oversize_percentage: [],
            type2_sizeAweight_percentage: [],
            size_designation: '',
            external_defects: '',
            internal_defects: '',
            other_defects: '',
            selected_external_defects: [],
            response_external_defects_api_put: '',
            external_defect_perc_calculate: [],
            external_defects_index_selected: [],
            selected_internal_defects: [],
            response_internal_defects_api_put: '',
            internal_defect_perc_calculate: [],
            internal_defects_index_selected: [],
            selected_other_defects: [],
            response_other_defects_api_put: '',
            other_defect_perc_calculate: [],
            other_defects_index_selected: [],
            searched_external_defects: '',
            searched_internal_defects: '',
            searched_other_defects: '',
            total_defects_label: [],
            selected_image_defects_label: [],
            isImageUploaded: false,
            image_objects_array: [],
            image_url: [],
            images_doc_id: {},
            isError: false,
            sample: 1,
            selected_Sample: 1,
            isOpenDropDown: false,
            isUpdate: false,
            isSelectedBasicRequirements: false,
            isSelectedSizeDesignation: false,
            isImageTagCreated: [false],
            all_samples_data: [],
            type2_update: false,
            isDetailsUpload: false,
            external_threshold: '',
            internal_threshold: '',
            other_threshold: '',
            isDataUpload: true,
            changed_data: {

            },
            // isDisplayLogout: false,
        };
        this.publish = this.publish.bind(this);
        this.sampleWeight = this.sampleWeight.bind(this);
        this.getData = this.getData.bind(this);
        this.selectedRangeType1Object = this.selectedRangeType1Object.bind(this);
        this.openAnotherType2 = this.openAnotherType2.bind(this);
        this.renderType2UI = this.renderType2UI.bind(this);
        this.opendropdown = this.opendropdown.bind(this);
        this.selectedItem = this.selectedItem.bind(this);
        this.createType2Object = this.createType2Object.bind(this);
        this.updateType2Object = this.updateType2Object.bind(this);
        this.calculatePercentage = this.calculatePercentage.bind(this);
        this.updateExternalDefects = this.updateExternalDefects.bind(this);
        this.externalDefectsPUTcall = this.externalDefectsPUTcall.bind(this);
        this.updateInternalDefects = this.updateInternalDefects.bind(this);
        this.internalDefectsPUTcall = this.internalDefectsPUTcall.bind(this);
        this.updateOtherDefects = this.updateOtherDefects.bind(this);
        this.otherDefectsPUTcall = this.otherDefectsPUTcall.bind(this);
        this.deleteExternalDefect = this.deleteExternalDefect.bind(this);
        this.deleteInternalDefect = this.deleteInternalDefect.bind(this);
        this.deleteOtherDefect = this.deleteOtherDefect.bind(this);
        this.calculateType1Percentage = this.calculateType1Percentage.bind(this);
        this.changeComponent = this.changeComponent.bind(this);
        this.takepic = this.takepic.bind(this);
        this.uploadPic = this.uploadPic.bind(this);
        this.updateSampleBasicInfo = this.updateSampleBasicInfo.bind(this);
        this.printSamples = this.printSamples.bind(this);
        this.displayInternalDefects = this.displayInternalDefects.bind(this);
        this.displayOtherDefects = this.displayOtherDefects.bind(this);
        this.updateType1Object = this.updateType1Object.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.displayTags = this.displayTags.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
        this.deleteType2Range = this.deleteType2Range.bind(this);
        this.printExternalTotal = this.printExternalTotal.bind(this);
        this.printInternalTotal = this.printInternalTotal.bind(this);
        this.printOtherTotal = this.printOtherTotal.bind(this);
    }

    componentWillMount(): void {
        fetch(baseUrl + "reports/inspection/" + this.state.docid + "/sizedesig/" + this.state.selected_Sample, {
            method: "GET",
            headers: {
                'Authorization': 'bearer ' + this.state.token,
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error !== true) {
                    this.setState({
                        size_designation: responseJson.data,
                        range_type1: responseJson.data.type1_values,
                        range_type2: responseJson.data.type2_values,
                        isRangeType1Updated: true,
                        isRangeType2Updated: true,
                    });
                    return responseJson;
                }
                else {
                    this.setState({
                        isError: true,
                    });
                    return responseJson;
                }
            })
            .catch((error) => {
                console.error(error);
            });
        fetch(baseUrl + "reports/inspection/" + this.state.docid + "/defect/external/" + this.state.selected_Sample, {
            method: "GET",
            headers: {
                'Authorization': 'bearer ' + this.state.token,
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error !== true) {
                    this.setState({
                        external_defects: responseJson.data.extDefects,
                        searched_external_defects: responseJson.data.extDefects,
                        external_threshold: responseJson.data.threshold
                    });
                    return responseJson;
                }
                else {
                    this.setState({
                        isError: true,
                    });
                    return responseJson;
                }
            })
            .catch((error) => {
                console.error(error);
            });
        fetch(baseUrl + "reports/inspection/" + this.state.docid + "/defect/internal/" + this.state.selected_Sample, {
            method: "GET",
            headers: {
                'Authorization': 'bearer ' + this.state.token,
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error !== true) {
                    this.setState({
                        internal_defects: responseJson.data.intDefects,
                        searched_internal_defects: responseJson.data.intDefects,
                        internal_threshold: responseJson.data.threshold
                    });
                    return responseJson;
                }
                else {
                    console.log("error is:", responseJson);
                    alert("Please enter all the Details Properly!");
                    this.setState({
                        isError: true,
                    });
                    return responseJson;
                }
            })
            .catch((error) => {
                console.error(error);
            });
        fetch(baseUrl + "reports/inspection/" + this.state.docid + "/defect/other/" + this.state.selected_Sample, {
            method: "GET",
            headers: {
                'Authorization': 'bearer ' + this.state.token,
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error !== true) {
                    this.setState({
                        other_defects: responseJson.data.othDefects,
                        searched_other_defects: responseJson.data.othDefects,
                        other_threshold: responseJson.data.threshold
                    });
                    return responseJson;
                }
                else {
                    console.log("error is:", responseJson);
                    alert("Please enter all the Details Properly!");
                    this.setState({
                        isError: true,
                    });
                    return responseJson;
                }
            })
            .catch((error) => {
                console.error(error);
            });
        this.updateSampleBasicInfo = this.updateSampleBasicInfo.bind(this);
        this.updateSampleBasicInfo();
    }

    componentWillUnmount(): void {

    }

    updateSampleBasicInfo(name, value) {
        if (name === 'sample_weight') {
            if (this.state.selected_Sample < this.state.sample) {
                if (this.state.all_samples_data[this.state.selected_Sample - 1].sample_weight !== value) {
                    this.state.changed_data["sample_weight"] = [this.state.all_samples_data[this.state.selected_Sample - 1].sample_weight, value];
                }
            }
            this.setState({
                sample_weight: value,
            });
        }
        else if (name === "pulp_temperature") {
            if (this.state.selected_Sample < this.state.sample) {
                if (this.state.all_samples_data[this.state.selected_Sample - 1].pulpTemperature !== value) {
                    this.state.changed_data["pulp_temperature"] = [this.state.all_samples_data[this.state.selected_Sample - 1].pulpTemperature, value];
                }
            }
            this.setState({
                pulpTemperature: value,
            });
        }
        else {
        }
    }

    componentDidMount(): void {
        this.selectedExternalDefects = this.selectedExternalDefects.bind(this);
        this.selectedInternalDefects = this.selectedInternalDefects.bind(this);
        this.selectedOtherDefects = this.selectedOtherDefects.bind(this);
    }

    sampleWeight(value) {
        if (value >= 20) {
            this.setState({
                sample_weight: value,
                isSampleWeightCorrect: true
            });
        }
        else {
            this.setState({
                isSampleWeightCorrect: false,
            })
        }
        this.updateSampleBasicInfo("sample_weight", value);
    }

    selectedExternalDefects(defect) {
        let total_defects_label = this.state.total_defects_label;
        total_defects_label.push(defect.label);
        let external_defects = this.state.selected_external_defects;
        external_defects.unshift(defect);
        let externalDefectsPercentage = { damagePerc: 0.00, seriousDamagePerc: 0.00, totPerc: 0.0, status: true };
        let extPercentage = this.state.external_defect_perc_calculate;
        let index_selected = this.state.external_defects_index_selected;
        index_selected.push(defect.key);
        extPercentage.unshift(externalDefectsPercentage);
        this.setState({
            selected_external_defects: external_defects,
            external_defect_perc_calculate: extPercentage,
            external_defects_index_selected: index_selected
        });
        if (this.state.selected_Sample < this.state.sample) {
            if (this.state.all_samples_data[this.state.selected_Sample - 1].selected_external_defects !== this.state.selected_external_defects) {
                this.state.changed_data["externalDefects"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selected_external_defects, this.state.selected_external_defects];
            }
        }
        this.externalDefectsPUTcall();
    }

    updateExternalDefects(name, value, index) {
        if (parseFloat(value) > parseFloat(this.state.sample_weight)) {
            alert(name + 'value cannot be greater than sample weight')
        }
        else {
            if (name === "damage") {
                this.state.selected_external_defects[index].damageValue = value;
                this.state.external_defect_perc_calculate[index].damagePerc = ((value / this.state.sample_weight) * 100).toFixed(2);
                this.state.selected_external_defects[index].damagePerc = ((value / this.state.sample_weight) * 100).toFixed(2);
            }
            else if (name === "seriousdamage") {
                this.state.selected_external_defects[index].seriousDamageValue = value;
                this.state.external_defect_perc_calculate[index].seriousDamagePerc = ((value / this.state.sample_weight) * 100).toFixed(2);
                this.state.selected_external_defects[index].seriousDamagePerc = ((value / this.state.sample_weight) * 100).toFixed(2);
            }
            this.state.external_defect_perc_calculate[index].totPerc = parseFloat(this.state.external_defect_perc_calculate[index].damagePerc) + parseFloat(this.state.external_defect_perc_calculate[index].seriousDamagePerc);
            if ((parseFloat(this.state.external_defect_perc_calculate[index].damagePerc) + parseFloat(this.state.external_defect_perc_calculate[index].seriousDamagePerc)) > this.state.external_threshold) {
                this.state.external_defect_perc_calculate[index].status = false;
            }
            else {
                this.state.external_defect_perc_calculate[index].status = true;
            }
            this.externalDefectsPUTcall();
            this.setState({
                isUpdate: true,
            })
            if (this.state.selected_Sample < this.state.sample) {
                if (this.state.all_samples_data[this.state.selected_Sample - 1].selected_external_defects !== this.state.selected_external_defects) {
                    this.state.changed_data["externalDefects"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selected_external_defects, this.state.selected_external_defects];
                }
            }
        }
    }

    externalDefectsPUTcall() {
    }

    selectedInternalDefects(defect) {
        let total_defects_label = this.state.total_defects_label;
        total_defects_label.push(defect.label);
        let internal_defects = this.state.selected_internal_defects;
        internal_defects.unshift(defect);
        let internalDefectsPercentage = { damagePerc: 0.00, seriousDamagePerc: 0.00, totPerc: 0.0, status: true };
        let intPercentage = this.state.internal_defect_perc_calculate;
        let index_selected = this.state.internal_defects_index_selected;
        index_selected.push(defect.key);
        intPercentage.unshift(internalDefectsPercentage);
        this.setState({
            selected_internal_defects: internal_defects,
            internal_defect_perc_calculate: intPercentage,
            internal_defects_index_selected: index_selected
        });
        if (this.state.selected_Sample < this.state.sample) {
            if (this.state.all_samples_data[this.state.selected_Sample - 1].selected_internal_defects !== this.state.selected_internal_defects) {
                this.state.changed_data["internalDefects"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selected_internal_defects, this.state.selected_internal_defects];
            }
        }
        this.internalDefectsPUTcall();
    }

    updateInternalDefects(name, value, index) {
        if (parseFloat(value) > parseFloat(this.state.sample_weight)) {
            alert(name + 'value cannot be greater than sample weight')
        }
        else {
            if (name === "damage") {
                this.state.selected_internal_defects[index].damageValue = value;
                this.state.internal_defect_perc_calculate[index].damagePerc = ((value / this.state.sample_weight) * 100).toFixed(2);
                this.state.selected_internal_defects[index].damagePerc = ((value / this.state.sample_weight) * 100).toFixed(2);
            }
            else if (name === "seriousdamage") {
                this.state.selected_internal_defects[index].seriousDamageValue = value;
                this.state.internal_defect_perc_calculate[index].seriousDamagePerc = ((value / this.state.sample_weight) * 100).toFixed(2);
                this.state.selected_internal_defects[index].seriousDamagePerc = ((value / this.state.sample_weight) * 100).toFixed(2);
            }
            this.state.internal_defect_perc_calculate[index].totPerc = parseFloat(this.state.internal_defect_perc_calculate[index].damagePerc) + parseFloat(this.state.internal_defect_perc_calculate[index].seriousDamagePerc);
            if ((parseFloat(this.state.internal_defect_perc_calculate[index].damagePerc) + parseFloat(this.state.internal_defect_perc_calculate[index].seriousDamagePerc)) > this.state.internal_threshold) {
                this.state.internal_defect_perc_calculate[index].status = false;
            }
            else {
                this.state.internal_defect_perc_calculate[index].status = true;
            }
            this.internalDefectsPUTcall();
            this.setState({
                isUpdate: true,
            })
            if (this.state.selected_Sample < this.state.sample) {
                if (this.state.all_samples_data[this.state.selected_Sample - 1].selected_internal_defects !== this.state.selected_internal_defects) {
                    this.state.changed_data["internalDefects"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selected_internal_defects, this.state.selected_internal_defects];
                }
            }
        }
    }

    internalDefectsPUTcall() {
    }

    selectedOtherDefects(defect) {
        let total_defects_label = this.state.total_defects_label;
        total_defects_label.push(defect.label);
        let other_defects = this.state.selected_other_defects;
        other_defects.unshift(defect);
        let otherDefectsPercentage = { damagePerc: 0.00, seriousDamagePerc: 0.00, totPerc: 0.0, status: true };
        let othPercentage = this.state.other_defect_perc_calculate;
        let index_selected = this.state.other_defects_index_selected;
        index_selected.push(defect.key);
        othPercentage.unshift(otherDefectsPercentage);
        this.setState({
            selected_other_defects: other_defects,
            other_defect_perc_calculate: othPercentage,
            other_defects_index_selected: index_selected
        });
        if (this.state.selected_Sample < this.state.sample) {
            if (this.state.all_samples_data[this.state.selected_Sample - 1].selected_other_defects !== this.state.selected_other_defects) {
                this.state.changed_data["otherDefects"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selected_other_defects, this.state.selected_other_defects];
            }
        }
        this.otherDefectsPUTcall();
    }

    updateOtherDefects(name, value, index) {
        if (parseFloat(value) > parseFloat(this.state.sample_weight)) {
            alert(name + 'value cannot be greater than sample weight')
        }
        else {
            if (name === "damage") {
                this.state.selected_other_defects[index].damageValue = value;
                this.state.other_defect_perc_calculate[index].damagePerc = ((value / this.state.sample_weight) * 100).toFixed(2);
                this.state.selected_other_defects[index].damagePerc = ((value / this.state.sample_weight) * 100).toFixed(2);
            }
            else if (name === "seriousdamage") {
                this.state.selected_other_defects[index].seriousDamageValue = value;
                this.state.other_defect_perc_calculate[index].seriousDamagePerc = ((value / this.state.sample_weight) * 100).toFixed(2);
                this.state.selected_other_defects[index].seriousDamagePerc = ((value / this.state.sample_weight) * 100).toFixed(2);
            }
            this.state.other_defect_perc_calculate[index].totPerc = parseFloat(this.state.other_defect_perc_calculate[index].damagePerc) + parseFloat(this.state.other_defect_perc_calculate[index].seriousDamagePerc);
            if ((parseFloat(this.state.other_defect_perc_calculate[index].damagePerc) + parseFloat(this.state.other_defect_perc_calculate[index].seriousDamagePerc)) > this.state.other_threshold) {
                this.state.other_defect_perc_calculate[index].status = false;
            }
            else {
                this.state.other_defect_perc_calculate[index].status = true;
            }
            this.otherDefectsPUTcall();
            this.setState({
                isUpdate: true,
            })
            if (this.state.selected_Sample < this.state.sample) {
                if (this.state.all_samples_data[this.state.selected_Sample - 1].selected_other_defects !== this.state.selected_other_defects) {
                    this.state.changed_data["otherDefects"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selected_other_defects, this.state.selected_other_defects];
                }
            }
        }
    }

    otherDefectsPUTcall() {
    }

    uploadPic() {
        this.setState({
            isDataUpload: false,
        });
        let imageTagCreated = this.state.isImageTagCreated;
        imageTagCreated.push(false);
        this.setState({
            ImageTagCreated: imageTagCreated
        });
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: false
        }).then(image => {
            let url = image.path;
            image.filename = this.state.sample + '.JPG';
            let image_object = this.state.image_objects_array;
            image_object.push(image);
            this.state.image_url.push(url);
            this.setState({
                image_url: this.state.image_url,
                image_objects_array: image_object,
                isImageUploaded: true,
            });
            let label = this.state.selected_image_defects_label;
            label.push([]);
            let imageTagCreated = this.state.isImageTagCreated;
            let lengthOfImagesArray = this.state.image_objects_array.length;
            imageTagCreated[lengthOfImagesArray - 1] = true;
            this.setState({
                selected_image_defects_label: label,
                isImageTagCreated: imageTagCreated,
            });
            if (this.state.selected_Sample < this.state.sample) {
                if (this.state.all_samples_data[this.state.selected_Sample - 1].selected_image_defects_label !== this.state.selected_image_defects_label) {
                    this.state.changed_data["image"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selected_image_defects_label, this.state.selected_image_defects_label];
                }
            }
            let image_info = {};
            image_info["file[" + lengthOfImagesArray + "]"] = { "filename": image.filename, "filesize": image.size };
            fetch(baseUrl + "reports/mobileimages/" + `${this.state.docid}/${this.state.commodity}/${this.state.selected_Sample}`, {
                method: "POST",
                headers: {
                    'Authorization': 'bearer ' + this.state.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(image_info),
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log("Response ", responseJson);
                    var new_doc_id = Object.keys(responseJson.urls)[0];
                    var new_url = Object.values(responseJson.urls)[0];
                    // var old_list_doc_id = this.state.images_doc_id;
                    // var length_images_doc_id = this.state.images_doc_id.length;
                    // old_list_doc_id[length_images_doc_id] = responseJson.urls;
                    // this.setState({
                    //     images_doc_id: old_list_doc_id,
                    // });
                    var new_images_object = this.state.images_doc_id;
                    new_images_object[new_doc_id] = '';
                    this.setState({
                        images_doc_id: new_images_object,
                    })
                    RNFetchBlob.fetch('PUT', new_url, {
                        'Content-Type': 'application/octet-stream',
                    }, RNFetchBlob.wrap(image.path)
                    ).then((resp) => {
                        this.setState({
                            isDataUpload: true
                        });
                    }).catch((err) => {
                        // ...
                        this.setState({
                            isDataUpload: true,
                        });
                    })
                }).catch((error) => {
                    this.setState({
                        isDataUpload: true,
                    });
                    console.error(error);
                    // console.error("error is:", error);
                });
            // this.setState({
            //     isDataUpload: true,
            // })
        });
        this.setState({
            isDataUpload: true,
        })
    }

    takepic() {
        this.setState({
            isDataUpload: false,
        });
        let imageTagCreated = this.state.isImageTagCreated;
        imageTagCreated.push(false);
        this.setState({
            ImageTagCreated: imageTagCreated
        });
        const { width, height } = Dimensions.get('window');
        ImagePicker.openCamera({
            width: width,
            height: height,
            cropping: false,
            enableRotationGesture: true
        }).then(image => {
            let url = image.path;
            image.filename = 'camera-' + this.state.sample + '.JPG';
            let image_object = this.state.image_objects_array;
            image_object.push(image);
            this.state.image_url.push(url);
            this.setState({
                image_url: this.state.image_url,
                image_objects_array: image_object,
                isImageUploaded: true,
            });
            let label = this.state.selected_image_defects_label;
            label.push([]);
            let imageTagCreated = this.state.isImageTagCreated;
            let lengthOfImagesArray = this.state.image_objects_array.length;
            imageTagCreated[lengthOfImagesArray - 1] = true;
            this.setState({
                selected_image_defects_label: label,
                isImageTagCreated: imageTagCreated,
            });
            if (this.state.selected_Sample < this.state.sample) {
                if (this.state.all_samples_data[this.state.selected_Sample - 1].selected_image_defects_label !== this.state.selected_image_defects_label) {
                    this.state.changed_data["image"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selected_image_defects_label, this.state.selected_image_defects_label];
                }
            }
            let image_info = {};
            image_info["file[" + lengthOfImagesArray + "]"] = { "filename": image.filename, "filesize": image.size };
            fetch(baseUrl + "reports/mobileimages/" + `${this.state.docid}/${this.state.commodity}/${this.state.selected_Sample}`, {
                method: "POST",
                headers: {
                    'Authorization': 'bearer ' + this.state.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(image_info),
            }).then((response) => response.json())
                .then((responseJson) => {
                    var new_doc_id = Object.keys(responseJson.urls)[0];
                    var new_url = Object.values(responseJson.urls)[0];
                    // var old_list_doc_id = this.state.images_doc_id;
                    // var length_images_doc_id = this.state.images_doc_id.length;
                    // old_list_doc_id[length_images_doc_id] = responseJson.urls;
                    // this.setState({
                    //     images_doc_id: old_list_doc_id,
                    // });
                    var new_images_object = this.state.images_doc_id;
                    new_images_object[new_doc_id] = '';
                    this.setState({
                        images_doc_id: new_images_object,
                    })
                    RNFetchBlob.fetch('PUT', new_url, {
                        'Content-Type': 'application/octet-stream',
                    }, RNFetchBlob.wrap(image.path)
                    ).then((resp) => {
                        this.setState({
                            isDataUpload: true,
                        });
                    }).catch((err) => {
                        // ...
                        this.setState({
                            isDataUpload: true,
                        });
                    })
                }).catch((error) => {
                    this.setState({
                        isDataUpload: true,
                    });
                    console.error(error);
                });
            // this.setState({
            //     isDataUpload: true,
            // })
        });
        this.setState({
            isDataUpload: true,
        })
    }

    printSamples() {
        let sample = [];
        for (let i = 1; i <= this.state.count_samples; i++) {
            if (i <= this.state.sample) {
                if (i === this.state.selected_Sample) {
                    sample.push(
                        <View style={{ marginRight: 20 }}>
                            <Text style={{
                                color: '#ffffff',
                                backgroundColor: '#24C656',
                                fontSize: 15,
                                paddingTop: 5,
                                paddingBottom: 5,
                                borderWidth: 1,
                                borderColor: '#24C656',
                                width: 80,
                                textAlign: 'center',
                                borderRadius: 3
                            }}>
                                Sample {i}
                            </Text>
                        </View>)
                }
                else {
                    let value = i;
                    sample.push(
                        <TouchableOpacity onPress={() => this.changeComponent(value)}>
                            <View style={{ marginRight: 20 }}>
                                <Text style={{
                                    color: '#24C656',
                                    fontSize: 15,
                                    paddingTop: 5,
                                    paddingBottom: 5,
                                    borderWidth: 1,
                                    borderColor: '#24C656',
                                    width: 80,
                                    textAlign: 'center',
                                    borderRadius: 3
                                }}>
                                    Sample {i}
                                </Text>
                            </View>
                        </TouchableOpacity>)
                }
            }
            else {
                sample.push(<View style={{ marginRight: 20 }}>
                    <Text style={{
                        color: '#c6c6c6',
                        fontSize: 15,
                        paddingTop: 5,
                        paddingBottom: 5,
                        borderWidth: 1,
                        borderColor: '#c6c6c6',
                        width: 80,
                        textAlign: 'center',
                        borderRadius: 3
                    }}>
                        Sample {i}
                    </Text>
                </View>)
            }
        }
        return sample;
    }

    changeComponent(sample_number) {
        if (this.state.sample === this.state.selected_Sample) {
            let present_sample_details = {
                sample_weight: this.state.sample_weight,
                isSampleWeightCorrect: this.state.isSampleWeightCorrect,
                firmness: [
                    'Firm',
                    'Shriveled',
                    'Flabby',
                ],
                cleanness: [
                    'Clean',
                    'Fairly Clean',
                    'Dirty',
                ],
                shape: [
                    'Well Shaped',
                    'Fairly Well Shaped',
                    'Seriously Misshappen',
                ],
                maturity: [
                    'Mature',
                    'Fairly well Matured',
                ],
                skinning: [
                    'Practically no Skinning',
                    'Slightly Skinned',
                    'Moderately Skinned',
                    'Badly Skinned'
                ],
                selectedFirmness: this.state.selectedFirmness,
                selectedCleanness: this.state.selectedCleanness,
                selectedShape: this.state.selectedShape,
                selectedMaturity: this.state.selectedMaturity,
                selectedSkinning: this.state.selectedSkinning,
                pulpTemperature: this.state.pulpTemperature,
                range_type1: this.state.range_type1,
                selectedRangeType1Units: this.state.selectedRangeType1Units,
                isRangeType1Updated: this.state.isRangeType1Updated,
                isRangeType2Updated: this.state.isRangeType2Updated,
                selectedRangeType1: this.state.selectedRangeType1,
                selectedRangeType1Object: this.state.selectedRangeType1Object,
                selectedRangeType1ObjectTotal: this.state.selectedRangeType1ObjectTotal,
                type1_percentage: this.state.type1_percentage,
                selectedRangeType2: this.state.selectedRangeType2,
                selectedRangeType2Object: this.state.selectedRangeType2Object,
                selectedRangeType2ObjectTotal: this.state.selectedRangeType2ObjectTotal,
                countUIType2: this.state.countUIType2,
                type2_details_undersize: this.state.type2_details_undersize,
                type2_details_oversize: this.state.type2_details_oversize,
                type2_sampleA_weight: this.state.type2_sampleA_weight,
                type2_undersize_percentage: this.state.type2_undersize_percentage,
                type2_oversize_percentage: this.state.type2_oversize_percentage,
                type2_sizeAweight_percentage: this.state.type2_sizeAweight_percentage,
                size_designation: this.state.size_designation,
                external_defects: this.state.external_defects,
                internal_defects: this.state.internal_defects,
                other_defects: this.state.other_defects,
                selected_external_defects: this.state.selected_external_defects,
                response_external_defects_api_put: this.state.response_external_defects_api_put,
                external_defect_perc_calculate: this.state.external_defect_perc_calculate,
                external_defects_index_selected: this.state.external_defects_index_selected,
                selected_internal_defects: this.state.selected_internal_defects,
                response_internal_defects_api_put: this.state.response_internal_defects_api_put,
                internal_defect_perc_calculate: this.state.internal_defect_perc_calculate,
                internal_defects_index_selected: this.state.internal_defects_index_selected,
                selected_other_defects: this.state.selected_other_defects,
                response_other_defects_api_put: this.state.response_other_defects_api_put,
                other_defect_perc_calculate: this.state.other_defect_perc_calculate,
                other_defects_index_selected: this.state.other_defects_index_selected,
                searched_external_defects: this.state.external_defects,
                searched_internal_defects: this.state.internal_defects,
                searched_other_defects: this.state.other_defects,
                total_defects_label: this.state.total_defects_label,
                selected_image_defects_label: this.state.selected_image_defects_label,
                isImageUploaded: this.state.isImageUploaded,
                image_objects_array: this.state.image_objects_array,
                image_url: this.state.image_url,
                images_doc_id: this.state.images_doc_id,
                isError: this.state.isError,
                sample: this.state.sample,
                isOpenDropDown: this.state.isOpenDropDown,
                isUpdate: this.state.isUpdate,
                isSelectedBasicRequirements: this.state.isSelectedBasicRequirements,
                isSelectedSizeDesignation: this.state.isSelectedSizeDesignation,
                isImageTagCreated: this.state.isImageTagCreated,
                isUpdatedPresentstate: true,
                external_threshold: this.state.external_threshold,
                internal_threshold: this.state.internal_threshold,
                other_threshold: this.state.other_threshold
            };
            this.setState({
                present_sample_details: present_sample_details,
            })
        }
        if (this.state.sample > sample_number) {
            this.setState({
                selected_Sample: sample_number,
                sample_weight: this.state.all_samples_data[sample_number - 1].sample_weight,
                isSampleWeightCorrect: this.state.all_samples_data[sample_number - 1].isSampleWeightCorrect,
                firmness: this.state.all_samples_data[sample_number - 1].firmness,
                cleanness: this.state.all_samples_data[sample_number - 1].cleanness,
                shape: this.state.all_samples_data[sample_number - 1].shape,
                maturity: this.state.all_samples_data[sample_number - 1].maturity,
                skinning: this.state.all_samples_data[sample_number - 1].skinning,
                selectedFirmness: this.state.all_samples_data[sample_number - 1].selectedFirmness,
                selectedCleanness: this.state.all_samples_data[sample_number - 1].selectedCleanness,
                selectedShape: this.state.all_samples_data[sample_number - 1].selectedShape,
                selectedMaturity: this.state.all_samples_data[sample_number - 1].selectedMaturity,
                selectedSkinning: this.state.all_samples_data[sample_number - 1].selectedSkinning,
                pulpTemperature: this.state.all_samples_data[sample_number - 1].pulpTemperature,
                range_type1: this.state.all_samples_data[sample_number - 1].range_type1,
                selectedRangeType1Units: this.state.all_samples_data[sample_number - 1].selectedRangeType1Units,
                isRangeType1Updated: true,
                isRangeType2Updated: true,
                selectedRangeType1: this.state.all_samples_data[sample_number - 1].selectedRangeType1,
                selectedRangeType1Object: this.state.all_samples_data[sample_number - 1].selectedRangeType1Object,
                selectedRangeType1ObjectTotal: this.state.all_samples_data[sample_number - 1].selectedRangeType1ObjectTotal,
                selectedRangeType2: this.state.all_samples_data[sample_number - 1].selectedRangeType2,
                selectedRangeType2Object: this.state.all_samples_data[sample_number - 1].selectedRangeType2Object,
                selectedRangeType2ObjectTotal: this.state.all_samples_data[sample_number - 1].selectedRangeType2ObjectTotal,
                countUIType2: this.state.all_samples_data[sample_number - 1].countUIType2,
                type2_details_undersize: this.state.all_samples_data[sample_number - 1].type2_details_undersize,
                type2_details_oversize: this.state.all_samples_data[sample_number - 1].type2_details_oversize,
                type2_sampleA_weight: this.state.all_samples_data[sample_number - 1].type2_sampleA_weight,
                type2_undersize_percentage: this.state.all_samples_data[sample_number - 1].type2_undersize_percentage,
                type2_oversize_percentage: this.state.all_samples_data[sample_number - 1].type2_oversize_percentage,
                type2_sizeAweight_percentage: this.state.all_samples_data[sample_number - 1].type2_sizeAweight_percentage,
                size_designation: this.state.all_samples_data[sample_number - 1].size_designation,
                external_defects: this.state.all_samples_data[sample_number - 1].external_defects,
                internal_defects: this.state.all_samples_data[sample_number - 1].internal_defects,
                other_defects: this.state.all_samples_data[sample_number - 1].other_defects,
                selected_external_defects: this.state.all_samples_data[sample_number - 1].selected_external_defects,
                response_external_defects_api_put: this.state.all_samples_data[sample_number - 1].response_external_defects_api_put,
                external_defect_perc_calculate: this.state.all_samples_data[sample_number - 1].external_defect_perc_calculate,
                external_defects_index_selected: this.state.all_samples_data[sample_number - 1].external_defects_index_selected,
                selected_internal_defects: this.state.all_samples_data[sample_number - 1].selected_internal_defects,
                response_internal_defects_api_put: this.state.all_samples_data[sample_number - 1].response_internal_defects_api_put,
                internal_defect_perc_calculate: this.state.all_samples_data[sample_number - 1].internal_defect_perc_calculate,
                internal_defects_index_selected: this.state.all_samples_data[sample_number - 1].internal_defects_index_selected,
                selected_other_defects: this.state.all_samples_data[sample_number - 1].selected_other_defects,
                response_other_defects_api_put: this.state.all_samples_data[sample_number - 1].response_other_defects_api_put,
                other_defect_perc_calculate: this.state.all_samples_data[sample_number - 1].other_defect_perc_calculate,
                other_defects_index_selected: this.state.all_samples_data[sample_number - 1].other_defects_index_selected,
                searched_external_defects: this.state.external_defects,
                searched_internal_defects: this.state.internal_defects,
                searched_other_defects: this.state.other_defects,
                isImageUploaded: this.state.all_samples_data[sample_number - 1].isImageUploaded,
                image_objects_array: this.state.all_samples_data[sample_number - 1].image_objects_array,
                image_url: this.state.all_samples_data[sample_number - 1].image_url,
                images_doc_id: this.state.all_samples_data[sample_number - 1].images_doc_id,
                isError: this.state.all_samples_data[sample_number - 1].isError,
                isOpenDropDown: this.state.all_samples_data[sample_number - 1].isOpenDropDown,
                isUpdate: this.state.all_samples_data[sample_number - 1].isUpdate,
                selected_image_defects_label: this.state.all_samples_data[sample_number - 1].selected_image_defects_label,
                isSelectedBasicRequirements: this.state.all_samples_data[sample_number - 1].isSelectedBasicRequirements,
                isSelectedSizeDesignation: this.state.all_samples_data[sample_number - 1].isSelectedSizeDesignation,
                isImageTagCreated: this.state.all_samples_data[sample_number - 1].isImageTagCreated,
                type1_percentage: this.state.all_samples_data[sample_number - 1].type1_percentage,
                total_defects_label: this.state.all_samples_data[sample_number - 1].total_defects_label,
                external_threshold: this.state.all_samples_data[sample_number - 1].external_threshold,
                internal_threshold: this.state.all_samples_data[sample_number - 1].internal_threshold,
                other_threshold: this.state.all_samples_data[sample_number - 1].other_threshold
            });
        }
        else {
            this.setState({
                selected_Sample: sample_number,
                sample_weight: this.state.present_sample_details.sample_weight,
                isSampleWeightCorrect: this.state.present_sample_details.isSampleWeightCorrect,
                firmness: [
                    'Firm',
                    'Shriveled',
                    'Flabby',
                ],
                cleanness: [
                    'Clean',
                    'Fairly Clean',
                    'Dirty',
                ],
                shape: [
                    'Well Shaped',
                    'Fairly Well Shaped',
                    'Seriously Misshappen',
                ],
                maturity: [
                    'Mature',
                    'Fairly well Matured',
                ],
                skinning: [
                    'Practically no Skinning',
                    'Slightly Skinned',
                    'Moderately Skinned',
                    'Badly Skinned'
                ],
                selectedFirmness: this.state.present_sample_details.selectedFirmness,
                selectedCleanness: this.state.present_sample_details.selectedCleanness,
                selectedShape: this.state.present_sample_details.selectedShape,
                selectedMaturity: this.state.present_sample_details.selectedMaturity,
                selectedSkinning: this.state.present_sample_details.selectedSkinning,
                pulpTemperature: this.state.present_sample_details.pulpTemperature,
                range_type1: this.state.present_sample_details.range_type1,
                selectedRangeType1Units: this.state.present_sample_details.selectedRangeType1Units,
                isRangeType1Updated: this.state.present_sample_details.isRangeType1Updated,
                isRangeType2Updated: this.state.present_sample_details.isRangeType2Updated,
                selectedRangeType1: this.state.present_sample_details.selectedRangeType1,
                selectedRangeType1Object: this.state.present_sample_details.selectedRangeType1Object,
                selectedRangeType1ObjectTotal: this.state.present_sample_details.selectedRangeType1ObjectTotal,
                type1_percentage: this.state.present_sample_details.type1_percentage,
                selectedRangeType2: this.state.present_sample_details.selectedRangeType2,
                selectedRangeType2Object: this.state.present_sample_details.selectedRangeType2Object,
                selectedRangeType2ObjectTotal: this.state.present_sample_details.selectedRangeType2ObjectTotal,
                countUIType2: this.state.present_sample_details.countUIType2,
                type2_details_undersize: this.state.present_sample_details.type2_details_undersize,
                type2_details_oversize: this.state.present_sample_details.type2_details_oversize,
                type2_sampleA_weight: this.state.present_sample_details.type2_sampleA_weight,
                type2_undersize_percentage: this.state.present_sample_details.type2_undersize_percentage,
                type2_oversize_percentage: this.state.present_sample_details.type2_oversize_percentage,
                type2_sizeAweight_percentage: this.state.present_sample_details.type2_sizeAweight_percentage,
                size_designation: this.state.present_sample_details.size_designation,
                external_defects: this.state.present_sample_details.external_defects,
                internal_defects: this.state.present_sample_details.internal_defects,
                other_defects: this.state.present_sample_details.other_defects,
                selected_external_defects: this.state.present_sample_details.selected_external_defects,
                response_external_defects_api_put: this.state.present_sample_details.response_external_defects_api_put,
                external_defect_perc_calculate: this.state.present_sample_details.external_defect_perc_calculate,
                external_defects_index_selected: this.state.present_sample_details.external_defects_index_selected,
                selected_internal_defects: this.state.present_sample_details.selected_internal_defects,
                response_internal_defects_api_put: this.state.present_sample_details.response_internal_defects_api_put,
                internal_defect_perc_calculate: this.state.present_sample_details.internal_defect_perc_calculate,
                internal_defects_index_selected: this.state.present_sample_details.internal_defects_index_selected,
                selected_other_defects: this.state.present_sample_details.selected_other_defects,
                response_other_defects_api_put: this.state.present_sample_details.response_other_defects_api_put,
                other_defect_perc_calculate: this.state.present_sample_details.other_defect_perc_calculate,
                other_defects_index_selected: this.state.present_sample_details.other_defects_index_selected,
                searched_external_defects: this.state.external_defects,
                searched_internal_defects: this.state.internal_defects,
                searched_other_defects: this.state.other_defects,
                total_defects_label: this.state.present_sample_details.total_defects_label,
                selected_image_defects_label: this.state.present_sample_details.selected_image_defects_label,
                isImageUploaded: this.state.present_sample_details.isImageUploaded,
                image_objects_array: this.state.present_sample_details.image_objects_array,
                image_url: this.state.present_sample_details.image_url,
                images_doc_id: this.state.present_sample_details.images_doc_id,
                isError: this.state.present_sample_details.isError,
                sample: this.state.present_sample_details.sample,
                isOpenDropDown: this.state.present_sample_details.isOpenDropDown,
                isUpdate: this.state.present_sample_details.isUpdate,
                isSelectedBasicRequirements: this.state.present_sample_details.isSelectedBasicRequirements,
                isSelectedSizeDesignation: this.state.present_sample_details.isSelectedSizeDesignation,
                isImageTagCreated: this.state.present_sample_details.isImageTagCreated,
                external_threshold: this.state.present_sample_details.external_threshold,
                internal_threshold: this.state.present_sample_details.internal_threshold,
                other_threshold: this.state.present_sample_details.other_threshold
            });
        }
    }

    publish() {
        this.setState({
            isDataUpload: false
        });
        let samples = this.state.sample;
        let present_sample_solution = this.state.selected_Sample;
        let length = this.state.image_objects_array.length - 1;
        // let image_info = {};
        // for (let i = 0; i <= length; i++) {
        //     let file = this.state.image_objects_array[i];
        //     let tags = this.state.selected_image_defects_label[i];
        //     image_info["file["+i+"]"] = {"filename": file.filename, "filesize": file.size, "tags": tags};
        //     console.log("File is:", file)
        // }
        let length_of_type2 = this.state.selectedRangeType2ObjectTotal.length;
        let i = 0;
        let data_sample_2 = this.state.selectedRangeType2ObjectTotal;
        for (i; i < length_of_type2; i++) {
            if (this.state.selectedRangeType2ObjectTotal[i].type2Range === '') {
                data_sample_2.splice(i, 1);
            } else {

            }
        }
        fetch(baseUrl + "reports/images/tags", {
            method: "PUT",
            headers: {
                'Authorization': 'bearer ' + this.state.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.images_doc_id),
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error !== true) {
                    fetch(baseUrl + "reports/inspection/" + this.state.docid + "/sample/" + present_sample_solution, {
                        method: "POST",
                        headers: {
                            'Authorization': 'bearer ' + this.state.token,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "firmness": this.state.selectedFirmness,
                            "cleanness": this.state.selectedCleanness,
                            "shape": this.state.selectedShape,
                            "maturity": this.state.selectedMaturity,
                            "skinning": this.state.selectedSkinning,
                            "pulp_temperature": this.state.pulpTemperature,
                            "sample_weight": this.state.sample_weight
                        }),
                    }).then((response) => response.json())
                        .then((responseJson) => {
                            if (responseJson.error !== true) {
                                fetch(baseUrl + "reports/inspection/" + this.state.docid + "/defect/external/" + present_sample_solution, {
                                    method: "PUT",
                                    headers: {
                                        'Authorization': 'bearer ' + this.state.token,
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(this.state.selected_external_defects),
                                }).then((response) => response.json())
                                    .then((responseJson) => {
                                        if (responseJson.error !== true) {
                                            fetch(baseUrl + "reports/inspection/" + this.state.docid + "/defect/internal/" + present_sample_solution, {
                                                method: "PUT",
                                                headers: {
                                                    'Authorization': 'bearer ' + this.state.token,
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify(this.state.selected_internal_defects),
                                            }).then((response) => response.json())
                                                .then((responseJson) => {
                                                    if (responseJson.error !== true) {
                                                        fetch(baseUrl + "reports/inspection/" + this.state.docid + "/defect/other/" + present_sample_solution, {
                                                            method: "PUT",
                                                            headers: {
                                                                'Authorization': 'bearer ' + this.state.token,
                                                                'Content-Type': 'application/json'
                                                            },
                                                            body: JSON.stringify(this.state.selected_other_defects),
                                                        }).then((response) => response.json())
                                                            .then((responseJson) => {
                                                                if (responseJson.error !== true) {
                                                                    this.setState({
                                                                        response_other_defects_api_put: responseJson,
                                                                    });



                                                                    let sampleData = '';
                                                                    if (this.state.sample + 1 > this.state.count_samples) {
                                                                        sampleData = {
                                                                            "type_1": this.state.selectedRangeType1ObjectTotal,
                                                                            "type_2": data_sample_2,
                                                                            "type2units": { "in_m": "inches", "oz_lb": "lb" },
                                                                            "report_status": false
                                                                        }
                                                                    }
                                                                    else {
                                                                        sampleData = {
                                                                            "type_1": this.state.selectedRangeType1ObjectTotal,
                                                                            "type_2": data_sample_2,
                                                                            "type2units": { "in_m": "inches", "oz_lb": "lb" },
                                                                            "report_status": false
                                                                        }
                                                                    }
                                                                    // for (let i = 0; i <= length; i++) {
                                                                    //     let image = this.state.image_objects_array[i];
                                                                    //     console.log("Image is:", responseJson.urls["file["+i+"]"], image.filename, image.mime, image);
                                                                    //     RNFetchBlob.fetch('PUT', responseJson.urls["file["+i+"]"], {
                                                                    //         'Content-Type' : 'application/octet-stream',
                                                                    //     }, RNFetchBlob.wrap(image.path)
                                                                    //     ).then((resp) => {
                                                                    //         console.log("Response when image is updated is:", image.path);
                                                                    //     }).catch((err) => {
                                                                    //         // ...
                                                                    //     })
                                                                    // }
                                                                    fetch(baseUrl + "reports/inspection/" + this.state.docid + "/sizedesig/" + present_sample_solution, {
                                                                        method: "PUT",
                                                                        headers: {
                                                                            'Authorization': 'bearer ' + this.state.token,
                                                                            'Content-Type': 'application/json'
                                                                        },
                                                                        body: JSON.stringify(sampleData)
                                                                    }).then((finalresponse) => finalresponse.json())
                                                                        .then((finalresponseJson) => {
                                                                            if (finalresponseJson.error !== true) {
                                                                                if (this.state.selected_Sample < this.state.sample) {
                                                                                    if (Object.keys(this.state.changed_data).length > 0) {
                                                                                        const values_changed_data = Object.values(this.state.changed_data);
                                                                                        const length_values_changed_data = values_changed_data.length;
                                                                                        let old_data = [];
                                                                                        let new_data = [];
                                                                                        for (let i = 0; i < length_values_changed_data; i++) {
                                                                                            old_data.push(values_changed_data[i][0]);
                                                                                            new_data.push(values_changed_data[i][1]);
                                                                                        }
                                                                                        fetch(baseUrl + "account/logs", {
                                                                                            method: "POST",
                                                                                            headers: {
                                                                                                'Authorization': 'bearer ' + this.state.token,
                                                                                                'Content-Type': 'application/json'
                                                                                            },
                                                                                            body: JSON.stringify({
                                                                                                user: this.state.user_credentials.username,
                                                                                                collection: "inspectionReport",
                                                                                                mode: "update_sample_" + present_sample_solution,
                                                                                                record: this.state.docid,
                                                                                                fields: Object.keys(this.state.changed_data),
                                                                                                newValue: new_data,
                                                                                                oldValue: old_data
                                                                                            }),
                                                                                        }).then((response) => response.json())
                                                                                            .then((responseJson) => {
                                                                                            })
                                                                                            .catch((error) => {
                                                                                                console.error(error);
                                                                                            });
                                                                                    }

                                                                                }
                                                                                else {
                                                                                    fetch(baseUrl + "account/logs", {
                                                                                        method: "POST",
                                                                                        headers: {
                                                                                            'Authorization': 'bearer ' + this.state.token,
                                                                                            'Content-Type': 'application/json'
                                                                                        },
                                                                                        body: JSON.stringify({
                                                                                            user: this.state.user_credentials.username,
                                                                                            collection: "inspectionReport",
                                                                                            mode: "save_sample_" + present_sample_solution,
                                                                                            record: this.state.docid,
                                                                                            fields: [
                                                                                                // 'sample' + this.state.selected_Sample + " firmness",
                                                                                                // 'sample' + this.state.selected_Sample + " cleanness",
                                                                                                // 'sample' + this.state.selected_Sample + " shape",
                                                                                                // 'sample' + this.state.selected_Sample + " maturity",
                                                                                                // 'sample' + this.state.selected_Sample + " skinning",
                                                                                                // 'sample' + this.state.selected_Sample + " pulp_temperature",
                                                                                                // 'sample' + this.state.selected_Sample + " sample_weight",
                                                                                                // 'sample' + this.state.selected_Sample + " externalDefects",
                                                                                                // 'sample' + this.state.selected_Sample + " internalDefects",
                                                                                                // 'sample' + this.state.selected_Sample + " otherDefects",
                                                                                                // 'sample' + this.state.selected_Sample + " type1",
                                                                                                // 'sample' + this.state.selected_Sample + " type2",
                                                                                                // 'sample' + this.state.selected_Sample + " image",
                                                                                            ],
                                                                                            newValue: [],
                                                                                            oldValue: []
                                                                                        }),
                                                                                    }).then((response) => response.json())
                                                                                        .then((responseJson) => {
                                                                                        })
                                                                                        .catch((error) => {
                                                                                            console.error(error);
                                                                                        });
                                                                                }
                                                                                if (this.state.selected_Sample + 1 <= this.state.count_samples) {
                                                                                    // this.componentWillMount();
                                                                                    if (this.state.selected_Sample + 1 < this.state.sample) {
                                                                                        this.refs.scrollView.scrollTo({ x: 0, y: 0, animated: true });
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].sample_weight = this.state.sample_weight;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].isSampleWeightCorrect = this.state.isSampleWeightCorrect;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].firmness = this.state.firmness;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].cleanness = this.state.cleanness;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].shape = this.state.shape;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].maturity = this.state.maturity;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].skinning = this.state.skinning;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selectedFirmness = this.state.selectedFirmness;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selectedCleanness = this.state.selectedCleanness;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selectedShape = this.state.selectedShape;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selectedMaturity = this.state.selectedMaturity;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selectedSkinning = this.state.selectedSkinning;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].pulpTemperature = this.state.pulpTemperature;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].range_type1 = this.state.range_type1;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType1Units = this.state.selectedRangeType1Units;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].isRangeType1Updated = true;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].isRangeType2Updated = true;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType1 = this.state.selectedRangeType1;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType1Object = this.state.selectedRangeType1Object;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType1ObjectTotal = this.state.selectedRangeType1ObjectTotal;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType2 = this.state.selectedRangeType2;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType2Object = this.state.selectedRangeType2Object;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType2ObjectTotal = this.state.selectedRangeType2ObjectTotal;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].countUIType2 = this.state.countUIType2;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].type2_details_undersize = this.state.type2_details_undersize;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].type2_details_oversize = this.state.type2_details_oversize;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].type2_sizeAweight_percentage = this.state.type2_sizeAweight_percentage;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].size_designation = this.state.size_designation;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].external_defects = this.state.external_defects;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].internal_defects = this.state.internal_defects;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].other_defects = this.state.other_defects;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selected_external_defects = this.state.selected_external_defects;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].response_external_defects_api_put = this.state.response_external_defects_api_put;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].external_defect_perc_calculate = this.state.external_defect_perc_calculate;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].external_defects_index_selected = this.state.external_defects_index_selected;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selected_internal_defects = this.state.selected_internal_defects;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].response_internal_defects_api_put = this.state.response_internal_defects_api_put;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].internal_defect_perc_calculate = this.state.internal_defect_perc_calculate;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].internal_defects_index_selected = this.state.internal_defects_index_selected;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selected_other_defects = this.state.selected_other_defects;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].response_other_defects_api_put = this.state.response_other_defects_api_put;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].other_defect_perc_calculate = this.state.other_defect_perc_calculate;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].other_defects_index_selected = this.state.other_defects_index_selected;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].searched_external_defects = this.state.external_defects;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].searched_internal_defects = this.state.internal_defects;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].searched_other_defects = this.state.other_defects;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].isImageUploaded = this.state.isImageUploaded;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].image_objects_array = this.state.image_objects_array;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].image_url = this.state.image_url;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].images_doc_id = this.state.images_doc_id;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].isError = this.state.isError;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].isOpenDropDown = this.state.isOpenDropDown;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].isUpdate = this.state.isUpdate;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selected_image_defects_label = this.state.selected_image_defects_label;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].isSelectedBasicRequirements = this.state.isSelectedBasicRequirements;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].isSelectedSizeDesignation = this.state.isSelectedSizeDesignation;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].isImageTagCreated = this.state.isImageTagCreated;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].type1_percentage = this.state.type1_percentage;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].total_defects_label = this.state.total_defects_label;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].external_threshold = this.state.external_threshold;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].internal_threshold = this.state.internal_threshold;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].other_threshold = this.state.other_threshold;
                                                                                        this.setState({
                                                                                            sample_weight: this.state.all_samples_data[this.state.selected_Sample].sample_weight,
                                                                                            isSampleWeightCorrect: this.state.all_samples_data[this.state.selected_Sample].isSampleWeightCorrect,
                                                                                            firmness: this.state.all_samples_data[this.state.selected_Sample].firmness,
                                                                                            cleanness: this.state.all_samples_data[this.state.selected_Sample].cleanness,
                                                                                            shape: this.state.all_samples_data[this.state.selected_Sample].shape,
                                                                                            maturity: this.state.all_samples_data[this.state.selected_Sample].maturity,
                                                                                            skinning: this.state.all_samples_data[this.state.selected_Sample].skinning,
                                                                                            selectedFirmness: this.state.all_samples_data[this.state.selected_Sample].selectedFirmness,
                                                                                            selectedCleanness: this.state.all_samples_data[this.state.selected_Sample].selectedCleanness,
                                                                                            selectedShape: this.state.all_samples_data[this.state.selected_Sample].selectedShape,
                                                                                            selectedMaturity: this.state.all_samples_data[this.state.selected_Sample].selectedMaturity,
                                                                                            selectedSkinning: this.state.all_samples_data[this.state.selected_Sample].selectedSkinning,
                                                                                            pulpTemperature: this.state.all_samples_data[this.state.selected_Sample].pulpTemperature,
                                                                                            range_type1: this.state.all_samples_data[this.state.selected_Sample].range_type1,
                                                                                            selectedRangeType1Units: this.state.all_samples_data[this.state.selected_Sample].selectedRangeType1Units,
                                                                                            selectedRangeType2Units: this.state.all_samples_data[this.state.selected_Sample].selectedRangeType2Units,
                                                                                            isRangeType1Updated: true,
                                                                                            isRangeType2Updated: true,
                                                                                            selectedRangeType1: this.state.all_samples_data[this.state.selected_Sample].selectedRangeType1,
                                                                                            selectedRangeType1Object: this.state.all_samples_data[this.state.selected_Sample].selectedRangeType1Object,
                                                                                            selectedRangeType1ObjectTotal: this.state.all_samples_data[this.state.selected_Sample].selectedRangeType1ObjectTotal,
                                                                                            selectedRangeType2: this.state.all_samples_data[this.state.selected_Sample].selectedRangeType2,
                                                                                            selectedRangeType2Object: this.state.all_samples_data[this.state.selected_Sample].selectedRangeType2Object,
                                                                                            selectedRangeType2ObjectTotal: this.state.all_samples_data[this.state.selected_Sample].selectedRangeType2ObjectTotal,
                                                                                            countUIType2: this.state.all_samples_data[this.state.selected_Sample].countUIType2,
                                                                                            type2_details_undersize: this.state.all_samples_data[this.state.selected_Sample].type2_details_undersize,
                                                                                            type2_details_oversize: this.state.all_samples_data[this.state.selected_Sample].type2_details_oversize,
                                                                                            type2_sampleA_weight: this.state.all_samples_data[this.state.selected_Sample].type2_sampleA_weight,
                                                                                            type2_undersize_percentage: this.state.all_samples_data[this.state.selected_Sample].type2_undersize_percentage,
                                                                                            type2_oversize_percentage: this.state.all_samples_data[this.state.selected_Sample].type2_oversize_percentage,
                                                                                            type2_sizeAweight_percentage: this.state.all_samples_data[this.state.selected_Sample].type2_sizeAweight_percentage,
                                                                                            size_designation: this.state.all_samples_data[this.state.selected_Sample].size_designation,
                                                                                            external_defects: this.state.all_samples_data[this.state.selected_Sample].external_defects,
                                                                                            internal_defects: this.state.all_samples_data[this.state.selected_Sample].internal_defects,
                                                                                            other_defects: this.state.all_samples_data[this.state.selected_Sample].other_defects,
                                                                                            selected_external_defects: this.state.all_samples_data[this.state.selected_Sample].selected_external_defects,
                                                                                            response_external_defects_api_put: this.state.all_samples_data[this.state.selected_Sample].response_external_defects_api_put,
                                                                                            external_defect_perc_calculate: this.state.all_samples_data[this.state.selected_Sample].external_defect_perc_calculate,
                                                                                            external_defects_index_selected: this.state.all_samples_data[this.state.selected_Sample].external_defects_index_selected,
                                                                                            selected_internal_defects: this.state.all_samples_data[this.state.selected_Sample].selected_internal_defects,
                                                                                            response_internal_defects_api_put: this.state.all_samples_data[this.state.selected_Sample].response_internal_defects_api_put,
                                                                                            internal_defect_perc_calculate: this.state.all_samples_data[this.state.selected_Sample].internal_defect_perc_calculate,
                                                                                            internal_defects_index_selected: this.state.all_samples_data[this.state.selected_Sample].internal_defects_index_selected,
                                                                                            selected_other_defects: this.state.all_samples_data[this.state.selected_Sample].selected_other_defects,
                                                                                            response_other_defects_api_put: this.state.all_samples_data[this.state.selected_Sample].response_other_defects_api_put,
                                                                                            other_defect_perc_calculate: this.state.all_samples_data[this.state.selected_Sample].other_defect_perc_calculate,
                                                                                            other_defects_index_selected: this.state.all_samples_data[this.state.selected_Sample].other_defects_index_selected,
                                                                                            searched_external_defects: this.state.external_defects,
                                                                                            searched_internal_defects: this.state.internal_defects,
                                                                                            searched_other_defects: this.state.other_defects,
                                                                                            isImageUploaded: this.state.all_samples_data[this.state.selected_Sample].isImageUploaded,
                                                                                            image_objects_array: this.state.all_samples_data[this.state.selected_Sample].image_objects_array,
                                                                                            image_url: this.state.all_samples_data[this.state.selected_Sample].image_url,
                                                                                            images_doc_id: this.state.all_samples_data[this.state.selected_Sample].images_doc_id,
                                                                                            isError: this.state.all_samples_data[this.state.selected_Sample].isError,
                                                                                            isOpenDropDown: this.state.all_samples_data[this.state.selected_Sample].isOpenDropDown,
                                                                                            isUpdate: this.state.all_samples_data[this.state.selected_Sample].isUpdate,
                                                                                            selected_image_defects_label: this.state.all_samples_data[this.state.selected_Sample].selected_image_defects_label,
                                                                                            isSelectedBasicRequirements: this.state.all_samples_data[this.state.selected_Sample].isSelectedBasicRequirements,
                                                                                            isSelectedSizeDesignation: this.state.all_samples_data[this.state.selected_Sample].isSelectedSizeDesignation,
                                                                                            isImageTagCreated: this.state.all_samples_data[this.state.selected_Sample].isImageTagCreated,
                                                                                            type1_percentage: this.state.all_samples_data[this.state.selected_Sample].type1_percentage,
                                                                                            total_defects_label: this.state.all_samples_data[this.state.selected_Sample].total_defects_label,
                                                                                            external_threshold: this.state.all_samples_data[this.state.selected_Sample].external_threshold,
                                                                                            internal_threshold: this.state.all_samples_data[this.state.selected_Sample].internal_threshold,
                                                                                            other_threshold: this.state.all_samples_data[this.state.selected_Sample].other_threshold
                                                                                        });
                                                                                        this.setState({
                                                                                            selected_Sample: this.state.selected_Sample + 1,
                                                                                            isDataUpload: true
                                                                                        });
                                                                                    }
                                                                                    else if (this.state.selected_Sample + 1 === this.state.sample) {
                                                                                        this.refs.scrollView.scrollTo({ x: 0, y: 0, animated: true });
                                                                                        this.refs.scrollView.scrollTo({ x: 0, y: 0, animated: true });
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].sample_weight = this.state.sample_weight;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].isSampleWeightCorrect = this.state.isSampleWeightCorrect;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].firmness = this.state.firmness;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].cleanness = this.state.cleanness;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].shape = this.state.shape;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].maturity = this.state.maturity;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].skinning = this.state.skinning;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selectedFirmness = this.state.selectedFirmness;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selectedCleanness = this.state.selectedCleanness;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selectedShape = this.state.selectedShape;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selectedMaturity = this.state.selectedMaturity;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selectedSkinning = this.state.selectedSkinning;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].pulpTemperature = this.state.pulpTemperature;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].range_type1 = this.state.range_type1;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType1Units = this.state.selectedRangeType1Units;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].isRangeType1Updated = true;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].isRangeType2Updated = true;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType1 = this.state.selectedRangeType1;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType1Object = this.state.selectedRangeType1Object;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType1ObjectTotal = this.state.selectedRangeType1ObjectTotal;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType2 = this.state.selectedRangeType2;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType2Object = this.state.selectedRangeType2Object;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType2ObjectTotal = this.state.selectedRangeType2ObjectTotal;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].countUIType2 = this.state.countUIType2;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].type2_details_undersize = this.state.type2_details_undersize;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].type2_details_oversize = this.state.type2_details_oversize;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].type2_sizeAweight_percentage = this.state.type2_sizeAweight_percentage;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].size_designation = this.state.size_designation;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].external_defects = this.state.external_defects;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].internal_defects = this.state.internal_defects;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].other_defects = this.state.other_defects;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selected_external_defects = this.state.selected_external_defects;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].response_external_defects_api_put = this.state.response_external_defects_api_put;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].external_defect_perc_calculate = this.state.external_defect_perc_calculate;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].external_defects_index_selected = this.state.external_defects_index_selected;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selected_internal_defects = this.state.selected_internal_defects;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].response_internal_defects_api_put = this.state.response_internal_defects_api_put;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].internal_defect_perc_calculate = this.state.internal_defect_perc_calculate;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].internal_defects_index_selected = this.state.internal_defects_index_selected;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selected_other_defects = this.state.selected_other_defects;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].response_other_defects_api_put = this.state.response_other_defects_api_put;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].other_defect_perc_calculate = this.state.other_defect_perc_calculate;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].other_defects_index_selected = this.state.other_defects_index_selected;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].searched_external_defects = this.state.external_defects;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].searched_internal_defects = this.state.internal_defects;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].searched_other_defects = this.state.other_defects;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].isImageUploaded = this.state.isImageUploaded;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].image_objects_array = this.state.image_objects_array;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].image_url = this.state.image_url;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].images_doc_id = this.state.images_doc_id;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].isError = this.state.isError;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].isOpenDropDown = this.state.isOpenDropDown;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].isUpdate = this.state.isUpdate;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].selected_image_defects_label = this.state.selected_image_defects_label;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].isSelectedBasicRequirements = this.state.isSelectedBasicRequirements;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].isSelectedSizeDesignation = this.state.isSelectedSizeDesignation;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].isImageTagCreated = this.state.isImageTagCreated;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].type1_percentage = this.state.type1_percentage;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].total_defects_label = this.state.total_defects_label;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].external_threshold = this.state.external_threshold;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].internal_threshold = this.state.internal_threshold;
                                                                                        this.state.all_samples_data[this.state.selected_Sample - 1].other_threshold = this.state.other_threshold;
                                                                                        this.setState({
                                                                                            selected_Sample: this.state.selected_Sample + 1,
                                                                                            sample_weight: this.state.present_sample_details.sample_weight,
                                                                                            isSampleWeightCorrect: this.state.present_sample_details.isSampleWeightCorrect,
                                                                                            firmness: [
                                                                                                'Firm',
                                                                                                'Shriveled',
                                                                                                'Flabby',
                                                                                            ],
                                                                                            cleanness: [
                                                                                                'Clean',
                                                                                                'Fairly Clean',
                                                                                                'Dirty',
                                                                                            ],
                                                                                            shape: [
                                                                                                'Well Shaped',
                                                                                                'Fairly Well Shaped',
                                                                                                'Seriously Misshappen',
                                                                                            ],
                                                                                            maturity: [
                                                                                                'Mature',
                                                                                                'Fairly well Matured',
                                                                                            ],
                                                                                            skinning: [
                                                                                                'Practically no Skinning',
                                                                                                'Slightly Skinned',
                                                                                                'Moderately Skinned',
                                                                                                'Badly Skinned'
                                                                                            ],
                                                                                            selectedFirmness: this.state.present_sample_details.selectedFirmness,
                                                                                            selectedCleanness: this.state.present_sample_details.selectedCleanness,
                                                                                            selectedShape: this.state.present_sample_details.selectedShape,
                                                                                            selectedMaturity: this.state.present_sample_details.selectedMaturity,
                                                                                            selectedSkinning: this.state.present_sample_details.selectedSkinning,
                                                                                            pulpTemperature: this.state.present_sample_details.pulpTemperature,
                                                                                            range_type1: this.state.present_sample_details.range_type1,
                                                                                            selectedRangeType1Units: this.state.present_sample_details.selectedRangeType1Units,
                                                                                            selectedRangeType2Units: this.state.present_sample_details.selectedRangeType2Units,
                                                                                            isRangeType1Updated: this.state.present_sample_details.isRangeType1Updated,
                                                                                            isRangeType2Updated: this.state.present_sample_details.isRangeType2Updated,
                                                                                            selectedRangeType1: this.state.present_sample_details.selectedRangeType1,
                                                                                            selectedRangeType1Object: this.state.present_sample_details.selectedRangeType1Object,
                                                                                            selectedRangeType1ObjectTotal: this.state.present_sample_details.selectedRangeType1ObjectTotal,
                                                                                            type1_percentage: this.state.present_sample_details.type1_percentage,
                                                                                            selectedRangeType2: this.state.present_sample_details.selectedRangeType2,
                                                                                            selectedRangeType2Object: this.state.present_sample_details.selectedRangeType2Object,
                                                                                            selectedRangeType2ObjectTotal: this.state.present_sample_details.selectedRangeType2ObjectTotal,
                                                                                            countUIType2: this.state.present_sample_details.countUIType2,
                                                                                            type2_details_undersize: this.state.present_sample_details.type2_details_undersize,
                                                                                            type2_details_oversize: this.state.present_sample_details.type2_details_oversize,
                                                                                            type2_sampleA_weight: this.state.present_sample_details.type2_sampleA_weight,
                                                                                            type2_undersize_percentage: this.state.present_sample_details.type2_undersize_percentage,
                                                                                            type2_oversize_percentage: this.state.present_sample_details.type2_oversize_percentage,
                                                                                            type2_sizeAweight_percentage: this.state.present_sample_details.type2_sizeAweight_percentage,
                                                                                            size_designation: this.state.present_sample_details.size_designation,
                                                                                            external_defects: this.state.present_sample_details.external_defects,
                                                                                            internal_defects: this.state.present_sample_details.internal_defects,
                                                                                            other_defects: this.state.present_sample_details.other_defects,
                                                                                            selected_external_defects: this.state.present_sample_details.selected_external_defects,
                                                                                            response_external_defects_api_put: this.state.present_sample_details.response_external_defects_api_put,
                                                                                            external_defect_perc_calculate: this.state.present_sample_details.external_defect_perc_calculate,
                                                                                            external_defects_index_selected: this.state.present_sample_details.external_defects_index_selected,
                                                                                            selected_internal_defects: this.state.present_sample_details.selected_internal_defects,
                                                                                            response_internal_defects_api_put: this.state.present_sample_details.response_internal_defects_api_put,
                                                                                            internal_defect_perc_calculate: this.state.present_sample_details.internal_defect_perc_calculate,
                                                                                            internal_defects_index_selected: this.state.present_sample_details.internal_defects_index_selected,
                                                                                            selected_other_defects: this.state.present_sample_details.selected_other_defects,
                                                                                            response_other_defects_api_put: this.state.present_sample_details.response_other_defects_api_put,
                                                                                            other_defect_perc_calculate: this.state.present_sample_details.other_defect_perc_calculate,
                                                                                            other_defects_index_selected: this.state.present_sample_details.other_defects_index_selected,
                                                                                            searched_external_defects: this.state.external_defects,
                                                                                            searched_internal_defects: this.state.internal_defects,
                                                                                            searched_other_defects: this.state.other_defects,
                                                                                            total_defects_label: this.state.present_sample_details.total_defects_label,
                                                                                            selected_image_defects_label: this.state.present_sample_details.selected_image_defects_label,
                                                                                            isImageUploaded: this.state.present_sample_details.isImageUploaded,
                                                                                            image_objects_array: this.state.present_sample_details.image_objects_array,
                                                                                            image_url: this.state.present_sample_details.image_url,
                                                                                            images_doc_id: this.state.present_sample_details.images_doc_id,
                                                                                            isError: this.state.present_sample_details.isError,
                                                                                            sample: this.state.present_sample_details.sample,
                                                                                            isOpenDropDown: this.state.present_sample_details.isOpenDropDown,
                                                                                            isUpdate: this.state.present_sample_details.isUpdate,
                                                                                            isSelectedBasicRequirements: this.state.present_sample_details.isSelectedBasicRequirements,
                                                                                            isSelectedSizeDesignation: this.state.present_sample_details.isSelectedSizeDesignation,
                                                                                            isImageTagCreated: this.state.present_sample_details.isImageTagCreated,
                                                                                            external_threshold: this.state.present_sample_details.external_threshold,
                                                                                            internal_threshold: this.state.present_sample_details.internal_threshold,
                                                                                            other_threshold: this.state.present_sample_details.other_threshold,
                                                                                            isDataUpload: true
                                                                                        });
                                                                                    }
                                                                                    else {
                                                                                        let old_data = this.state.all_samples_data;
                                                                                        let data = {
                                                                                            sample_weight: this.state.sample_weight,
                                                                                            isSampleWeightCorrect: this.state.isSampleWeightCorrect,
                                                                                            firmness: [
                                                                                                'Firm',
                                                                                                'Shriveled',
                                                                                                'Flabby',
                                                                                            ],
                                                                                            cleanness: [
                                                                                                'Clean',
                                                                                                'Fairly Clean',
                                                                                                'Dirty',
                                                                                            ],
                                                                                            shape: [
                                                                                                'Well Shaped',
                                                                                                'Fairly Well Shaped',
                                                                                                'Seriously Misshappen',
                                                                                            ],
                                                                                            maturity: [
                                                                                                'Mature',
                                                                                                'Fairly well Matured',
                                                                                            ],
                                                                                            skinning: [
                                                                                                'Practically no Skinning',
                                                                                                'Slightly Skinned',
                                                                                                'Moderately Skinned',
                                                                                                'Badly Skinned'
                                                                                            ],
                                                                                            selectedFirmness: this.state.selectedFirmness,
                                                                                            selectedCleanness: this.state.selectedCleanness,
                                                                                            selectedShape: this.state.selectedShape,
                                                                                            selectedMaturity: this.state.selectedMaturity,
                                                                                            selectedSkinning: this.state.selectedSkinning,
                                                                                            pulpTemperature: this.state.pulpTemperature,
                                                                                            range_type1: this.state.range_type1,
                                                                                            selectedRangeType1Units: this.state.selectedRangeType1Units,
                                                                                            selectedRangeType2Units: this.state.selectedRangeType2Units,
                                                                                            isRangeType1Updated: this.state.isRangeType1Updated,
                                                                                            isRangeType2Updated: this.state.isRangeType2Updated,
                                                                                            selectedRangeType1: this.state.selectedRangeType1,
                                                                                            selectedRangeType1Object: this.state.selectedRangeType2Object,
                                                                                            selectedRangeType1ObjectTotal: this.state.selectedRangeType1ObjectTotal,
                                                                                            type1_percentage: this.state.type1_percentage,
                                                                                            selectedRangeType2: this.state.selectedRangeType2,
                                                                                            selectedRangeType2Object: this.state.selectedRangeType2Object,
                                                                                            selectedRangeType2ObjectTotal: this.state.selectedRangeType2ObjectTotal,
                                                                                            countUIType2: this.state.countUIType2,
                                                                                            type2_details_undersize: this.state.type2_details_undersize,
                                                                                            type2_details_oversize: this.state.type2_details_oversize,
                                                                                            type2_sampleA_weight: this.state.type2_sampleA_weight,
                                                                                            type2_undersize_percentage: this.state.type2_undersize_percentage,
                                                                                            type2_oversize_percentage: this.state.type2_oversize_percentage,
                                                                                            type2_sizeAweight_percentage: this.state.type2_sizeAweight_percentage,
                                                                                            size_designation: this.state.size_designation,
                                                                                            external_defects: this.state.external_defects,
                                                                                            internal_defects: this.state.internal_defects,
                                                                                            other_defects: this.state.other_defects,
                                                                                            selected_external_defects: this.state.selected_external_defects,
                                                                                            response_external_defects_api_put: this.state.response_external_defects_api_put,
                                                                                            external_defect_perc_calculate: this.state.external_defect_perc_calculate,
                                                                                            external_defects_index_selected: this.state.external_defects_index_selected,
                                                                                            selected_internal_defects: this.state.selected_internal_defects,
                                                                                            response_internal_defects_api_put: this.state.response_internal_defects_api_put,
                                                                                            internal_defect_perc_calculate: this.state.internal_defect_perc_calculate,
                                                                                            internal_defects_index_selected: this.state.internal_defects_index_selected,
                                                                                            selected_other_defects: this.state.selected_other_defects,
                                                                                            response_other_defects_api_put: this.state.response_other_defects_api_put,
                                                                                            other_defect_perc_calculate: this.state.other_defect_perc_calculate,
                                                                                            other_defects_index_selected: this.state.other_defects_index_selected,
                                                                                            searched_external_defects: this.state.external_defects,
                                                                                            searched_internal_defects: this.state.internal_defects,
                                                                                            searched_other_defects: this.state.other_defects,
                                                                                            total_defects_label: this.state.total_defects_label,
                                                                                            selected_image_defects_label: this.state.selected_image_defects_label,
                                                                                            isImageUploaded: this.state.isImageUploaded,
                                                                                            image_objects_array: this.state.image_objects_array,
                                                                                            image_url: this.state.image_url,
                                                                                            images_doc_id: this.state.images_doc_id,
                                                                                            isError: this.state.isError,
                                                                                            isOpenDropDown: this.state.isOpenDropDown,
                                                                                            isUpdate: this.state.isUpdate,
                                                                                            isSelectedBasicRequirements: this.state.isSelectedBasicRequirements,
                                                                                            isSelectedSizeDesignation: this.state.isSelectedSizeDesignation,
                                                                                            isImageTagCreated: this.state.isImageTagCreated,
                                                                                            external_threshold: this.state.external_threshold,
                                                                                            internal_threshold: this.state.internal_threshold,
                                                                                            other_threshold: this.state.other_threshold
                                                                                        };
                                                                                        old_data.push(data);
                                                                                        this.setState({
                                                                                            sample: samples + 1,
                                                                                            selected_Sample: this.state.selected_Sample + 1,
                                                                                            sample_weight: 20,
                                                                                            isSampleWeightCorrect: true,
                                                                                            firmness: [
                                                                                                'Firm',
                                                                                                'Shriveled',
                                                                                                'Flabby',
                                                                                            ],
                                                                                            cleanness: [
                                                                                                'Clean',
                                                                                                'Fairly Clean',
                                                                                                'Dirty',
                                                                                            ],
                                                                                            shape: [
                                                                                                'Well Shaped',
                                                                                                'Fairly Well Shaped',
                                                                                                'Seriously Misshappen',
                                                                                            ],
                                                                                            maturity: [
                                                                                                'Mature',
                                                                                                'Fairly well Matured',
                                                                                            ],
                                                                                            skinning: [
                                                                                                'Practically no Skinning',
                                                                                                'Slightly Skinned',
                                                                                                'Moderately Skinned',
                                                                                                'Badly Skinned'
                                                                                            ],
                                                                                            selectedFirmness: '',
                                                                                            selectedCleanness: '',
                                                                                            selectedShape: '',
                                                                                            selectedMaturity: '',
                                                                                            selectedSkinning: '',
                                                                                            pulpTemperature: '',
                                                                                            range_type1: '',
                                                                                            selectedRangeType1Units: 'lb',
                                                                                            selectedRangeType2Units: '6 oz',
                                                                                            isRangeType1Updated: false,
                                                                                            isRangeType2Updated: false,
                                                                                            selectedRangeType1: '',
                                                                                            selectedRangeType1Object: '',
                                                                                            selectedRangeType1ObjectTotal: {
                                                                                                "type1Range": '',
                                                                                                "minWeight": '0',
                                                                                                "maxWeight": '0',
                                                                                                "minUnit": 'lb',
                                                                                                "overSize": 0,
                                                                                                "underSize": 0
                                                                                            },
                                                                                            selectedRangeType2: '',
                                                                                            selectedRangeType2Object: '',
                                                                                            selectedRangeType2ObjectTotal: [{
                                                                                                "key": 1,
                                                                                                "type2Range": "",
                                                                                                "minDia": "",
                                                                                                "maxDia": "",
                                                                                                "underSize": 0,
                                                                                                "overSize": 0,
                                                                                                "sizeA": false,
                                                                                                "sizeAWeight": 0,
                                                                                                "status": true
                                                                                            }],
                                                                                            countUIType2: 1,
                                                                                            type2_details_undersize: [],
                                                                                            type2_details_oversize: [],
                                                                                            type2_sampleA_weight: [],
                                                                                            type2_undersize_percentage: [],
                                                                                            type2_oversize_percentage: [],
                                                                                            type2_sizeAweight_percentage: [],
                                                                                            size_designation: '',
                                                                                            external_defects: this.state.external_defects,
                                                                                            internal_defects: this.state.internal_defects,
                                                                                            other_defects: this.state.other_defects,
                                                                                            selected_external_defects: [],
                                                                                            response_external_defects_api_put: '',
                                                                                            external_defect_perc_calculate: [],
                                                                                            external_defects_index_selected: [],
                                                                                            selected_internal_defects: [],
                                                                                            response_internal_defects_api_put: '',
                                                                                            internal_defect_perc_calculate: [],
                                                                                            internal_defects_index_selected: [],
                                                                                            selected_other_defects: [],
                                                                                            response_other_defects_api_put: '',
                                                                                            other_defect_perc_calculate: [],
                                                                                            other_defects_index_selected: [],
                                                                                            searched_external_defects: '',
                                                                                            searched_internal_defects: '',
                                                                                            searched_other_defects: '',
                                                                                            isImageUploaded: false,
                                                                                            image_objects_array: [],
                                                                                            image_url: [],
                                                                                            images_doc_id: {},
                                                                                            isError: false,
                                                                                            isOpenDropDown: false,
                                                                                            isUpdate: false,
                                                                                            selected_image_defects_label: [],
                                                                                            isSelectedBasicRequirements: false,
                                                                                            isSelectedSizeDesignation: false,
                                                                                            isImageTagCreated: [false],
                                                                                            type1_percentage: {
                                                                                                overSize: '0.00',
                                                                                                underSize: '0.00'
                                                                                            },
                                                                                            total_defects_label: [],
                                                                                            all_samples_data: old_data,
                                                                                            external_threshold: '',
                                                                                            internal_threshold: '',
                                                                                            other_threshold: '',
                                                                                            isDataUpload: true,
                                                                                            changed_data: {

                                                                                            }
                                                                                        });
                                                                                    }
                                                                                    fetch(baseUrl + "reports/inspection/" + this.state.docid + "/sizedesig/" + this.state.selected_Sample, {
                                                                                        method: "GET",
                                                                                        headers: {
                                                                                            'Authorization': 'bearer ' + this.state.token,
                                                                                            'Content-Type': 'application/json'
                                                                                        },
                                                                                    }).then((response) => response.json())
                                                                                        .then((responseJson) => {
                                                                                            if (responseJson.error !== true) {
                                                                                                this.setState({
                                                                                                    size_designation: responseJson.data,
                                                                                                    range_type1: responseJson.data.type1_values,
                                                                                                    range_type2: responseJson.data.type2_values,
                                                                                                    isRangeType1Updated: true,
                                                                                                    isRangeType2Updated: true,
                                                                                                });
                                                                                                return responseJson;
                                                                                            } else {
                                                                                                this.setState({
                                                                                                    isError: true,
                                                                                                });
                                                                                                return responseJson;
                                                                                            }
                                                                                        })
                                                                                        .catch((error) => {
                                                                                            console.error(error);
                                                                                        });
                                                                                    fetch(baseUrl + "reports/inspection/" + this.state.docid + "/defect/external/" + this.state.selected_Sample, {
                                                                                        method: "GET",
                                                                                        headers: {
                                                                                            'Authorization': 'bearer ' + this.state.token,
                                                                                            'Content-Type': 'application/json'
                                                                                        },
                                                                                    }).then((response) => response.json())
                                                                                        .then((responseJson) => {
                                                                                            if (responseJson.error !== true) {
                                                                                                this.setState({
                                                                                                    external_defects: responseJson.data.extDefects,
                                                                                                    searched_external_defects: responseJson.data.extDefects,
                                                                                                    external_threshold: responseJson.data.threshold
                                                                                                });
                                                                                                return responseJson;
                                                                                            } else {
                                                                                                this.setState({
                                                                                                    isError: true,
                                                                                                });
                                                                                                return responseJson;
                                                                                            }
                                                                                        })
                                                                                        .catch((error) => {
                                                                                            console.error(error);
                                                                                        });
                                                                                    fetch(baseUrl + "reports/inspection/" + this.state.docid + "/defect/internal/" + this.state.selected_Sample, {
                                                                                        method: "GET",
                                                                                        headers: {
                                                                                            'Authorization': 'bearer ' + this.state.token,
                                                                                            'Content-Type': 'application/json'
                                                                                        },
                                                                                    }).then((response) => response.json())
                                                                                        .then((responseJson) => {
                                                                                            if (responseJson.error !== true) {
                                                                                                this.setState({
                                                                                                    internal_defects: responseJson.data.intDefects,
                                                                                                    searched_internal_defects: responseJson.data.intDefects,
                                                                                                    internal_threshold: responseJson.data.threshold
                                                                                                });
                                                                                                return responseJson;
                                                                                            } else {
                                                                                                console.log("error is:", responseJson);
                                                                                                alert("Please enter all the Details Properly!");
                                                                                                this.setState({
                                                                                                    isError: true,
                                                                                                });
                                                                                                return responseJson;
                                                                                            }
                                                                                        })
                                                                                        .catch((error) => {
                                                                                            console.error(error);
                                                                                        });
                                                                                    fetch(baseUrl + "reports/inspection/" + this.state.docid + "/defect/other/" + this.state.selected_Sample, {
                                                                                        method: "GET",
                                                                                        headers: {
                                                                                            'Authorization': 'bearer ' + this.state.token,
                                                                                            'Content-Type': 'application/json'
                                                                                        },
                                                                                    }).then((response) => response.json())
                                                                                        .then((responseJson) => {
                                                                                            if (responseJson.error !== true) {
                                                                                                this.setState({
                                                                                                    other_defects: responseJson.data.othDefects,
                                                                                                    searched_other_defects: responseJson.data.othDefects,
                                                                                                    other_threshold: responseJson.data.threshold
                                                                                                });
                                                                                                return responseJson;
                                                                                            } else {
                                                                                                console.log("error is:", responseJson);
                                                                                                alert("Please enter all the Details Properly!");
                                                                                                this.setState({
                                                                                                    isError: true,
                                                                                                });
                                                                                                return responseJson;
                                                                                            }
                                                                                        })
                                                                                        .catch((error) => {
                                                                                            console.error(error);
                                                                                        });
                                                                                    // fetch(baseUrl+"reports/inspection/"+ this.state.docid +"/sample/"+this.state.selected_Sample, {
                                                                                    //     method: "POST",
                                                                                    //     headers: {
                                                                                    //         'Authorization': 'bearer '+  this.state.token,
                                                                                    //         'Content-Type': 'application/json'
                                                                                    //     },
                                                                                    //     body: JSON.stringify({
                                                                                    //         "firmness": this.state.selectedFirmness,
                                                                                    //         "cleanness": this.state.selectedCleanness,
                                                                                    //         "shape": this.state.selectedShape,
                                                                                    //         "maturity": this.state.selectedMaturity,
                                                                                    //         "skinning": this.state.selectedSkinning,
                                                                                    //         "pulp_temperature": this.state.pulpTemperature,
                                                                                    //         "sample_weight": this.state.sample_weight
                                                                                    //     }),
                                                                                    // }).then((response) => response.json())
                                                                                    //     .then((responseJson) => {
                                                                                    //         if(responseJson.error !== true) {
                                                                                    //             console.log("The value of Sample Basic Info is updated:", responseJson);
                                                                                    //             return responseJson;
                                                                                    //         }
                                                                                    //         else {
                                                                                    //             console.log("error is:", responseJson);
                                                                                    //             alert("Please enter all the Details Properly!");
                                                                                    //             this.setState({
                                                                                    //                 isError: true,
                                                                                    //             });
                                                                                    //             return responseJson;
                                                                                    //         }
                                                                                    //     })
                                                                                    //     .catch((error) => {
                                                                                    //         console.error(error);
                                                                                    //     });
                                                                                    // this.scroll.scrollTo({x: 0, y: 0, animated: true});
                                                                                } else {
                                                                                    let old_data = this.state.all_samples_data;
                                                                                    let data_last = {
                                                                                        sample_weight: this.state.sample_weight,
                                                                                        isSampleWeightCorrect: this.state.isSampleWeightCorrect,
                                                                                        firmness: [
                                                                                            'Firm',
                                                                                            'Shriveled',
                                                                                            'Flabby',
                                                                                        ],
                                                                                        cleanness: [
                                                                                            'Clean',
                                                                                            'Fairly Clean',
                                                                                            'Dirty',
                                                                                        ],
                                                                                        shape: [
                                                                                            'Well Shaped',
                                                                                            'Fairly Well Shaped',
                                                                                            'Seriously Misshappen',
                                                                                        ],
                                                                                        maturity: [
                                                                                            'Mature',
                                                                                            'Fairly well Matured',
                                                                                        ],
                                                                                        skinning: [
                                                                                            'Practically no Skinning',
                                                                                            'Slightly Skinned',
                                                                                            'Moderately Skinned',
                                                                                            'Badly Skinned'
                                                                                        ],
                                                                                        selectedFirmness: this.state.selectedFirmness,
                                                                                        selectedCleanness: this.state.selectedCleanness,
                                                                                        selectedShape: this.state.selectedShape,
                                                                                        selectedMaturity: this.state.selectedMaturity,
                                                                                        selectedSkinning: this.state.selectedSkinning,
                                                                                        pulpTemperature: this.state.pulpTemperature,
                                                                                        range_type1: this.state.range_type1,
                                                                                        selectedRangeType1Units: this.state.selectedRangeType1Units,
                                                                                        selectedRangeType2Units: this.state.selectedRangeType2Units,
                                                                                        isRangeType1Updated: this.state.isRangeType1Updated,
                                                                                        isRangeType2Updated: this.state.isRangeType2Updated,
                                                                                        selectedRangeType1: this.state.selectedRangeType1,
                                                                                        selectedRangeType1Object: this.state.selectedRangeType2Object,
                                                                                        selectedRangeType1ObjectTotal: this.state.selectedRangeType1ObjectTotal,
                                                                                        type1_percentage: this.state.type1_percentage,
                                                                                        selectedRangeType2: this.state.selectedRangeType2,
                                                                                        selectedRangeType2Object: this.state.selectedRangeType2Object,
                                                                                        selectedRangeType2ObjectTotal: this.state.selectedRangeType2ObjectTotal,
                                                                                        countUIType2: this.state.countUIType2,
                                                                                        type2_details_undersize: this.state.type2_details_undersize,
                                                                                        type2_details_oversize: this.state.type2_details_oversize,
                                                                                        type2_sampleA_weight: this.state.type2_sampleA_weight,
                                                                                        type2_undersize_percentage: this.state.type2_undersize_percentage,
                                                                                        type2_oversize_percentage: this.state.type2_oversize_percentage,
                                                                                        type2_sizeAweight_percentage: this.state.type2_sizeAweight_percentage,
                                                                                        size_designation: this.state.size_designation,
                                                                                        external_defects: this.state.external_defects,
                                                                                        internal_defects: this.state.internal_defects,
                                                                                        other_defects: this.state.other_defects,
                                                                                        selected_external_defects: this.state.selected_external_defects,
                                                                                        response_external_defects_api_put: this.state.response_external_defects_api_put,
                                                                                        external_defect_perc_calculate: this.state.external_defect_perc_calculate,
                                                                                        external_defects_index_selected: this.state.external_defects_index_selected,
                                                                                        selected_internal_defects: this.state.selected_internal_defects,
                                                                                        response_internal_defects_api_put: this.state.response_internal_defects_api_put,
                                                                                        internal_defect_perc_calculate: this.state.internal_defect_perc_calculate,
                                                                                        internal_defects_index_selected: this.state.internal_defects_index_selected,
                                                                                        selected_other_defects: this.state.selected_other_defects,
                                                                                        response_other_defects_api_put: this.state.response_other_defects_api_put,
                                                                                        other_defect_perc_calculate: this.state.other_defect_perc_calculate,
                                                                                        other_defects_index_selected: this.state.other_defects_index_selected,
                                                                                        searched_external_defects: this.state.external_defects,
                                                                                        searched_internal_defects: this.state.internal_defects,
                                                                                        searched_other_defects: this.state.other_defects,
                                                                                        total_defects_label: this.state.total_defects_label,
                                                                                        selected_image_defects_label: this.state.selected_image_defects_label,
                                                                                        isImageUploaded: this.state.isImageUploaded,
                                                                                        image_objects_array: this.state.image_objects_array,
                                                                                        image_url: this.state.image_url,
                                                                                        images_doc_id: this.state.images_doc_id,
                                                                                        isError: this.state.isError,
                                                                                        isOpenDropDown: this.state.isOpenDropDown,
                                                                                        isUpdate: this.state.isUpdate,
                                                                                        isSelectedBasicRequirements: this.state.isSelectedBasicRequirements,
                                                                                        isSelectedSizeDesignation: this.state.isSelectedSizeDesignation,
                                                                                        isImageTagCreated: this.state.isImageTagCreated,
                                                                                        external_threshold: this.state.external_threshold,
                                                                                        internal_threshold: this.state.internal_threshold,
                                                                                        other_threshold: this.state.other_threshold
                                                                                    };
                                                                                    old_data.push(data_last);
                                                                                    if (this.state.user_credentials.role === "supervisor") {
                                                                                        fetch(baseUrl + "reports/inspection/" + this.state.docid, {
                                                                                            method: "PUT",
                                                                                            headers: {
                                                                                                'Authorization': 'bearer ' + this.state.token,
                                                                                                'Content-Type': 'application/json'
                                                                                            },
                                                                                            body: JSON.stringify({
                                                                                                "approveStatus": true,
                                                                                                "approveManager": this.state.user_credentials.username
                                                                                            }),
                                                                                        }).then((response) => response.json())
                                                                                            .then((responseJson) => {
                                                                                                this.props.navigation.push('ReviewReport', { token: this.state.token, count_samples: this.state.count_samples, docid: this.state.docid, user_credentials: this.state.user_credentials });
                                                                                                this.refs.scrollView.scrollTo({ x: 0, y: 0, animated: true });
                                                                                            })
                                                                                            .catch((error) => {
                                                                                                console.error(error);
                                                                                            });
                                                                                        this.setState({
                                                                                            isDataUpload: true,
                                                                                        })
                                                                                    }
                                                                                    else {
                                                                                        fetch(baseUrl + "reports/inspection/" + this.state.docid, {
                                                                                            method: "PUT",
                                                                                            headers: {
                                                                                                'Authorization': 'bearer ' + this.state.token,
                                                                                                'Content-Type': 'application/json'
                                                                                            },
                                                                                            body: JSON.stringify({
                                                                                                "approveStatus": true,
                                                                                                "approveManager": this.state.user_credentials.username
                                                                                            }),
                                                                                        }).then((response) => response.json())
                                                                                            .then((responseJson) => {
                                                                                                this.props.navigation.push('ReviewReport', { token: this.state.token, count_samples: this.state.count_samples, docid: this.state.docid, user_credentials: this.state.user_credentials });
                                                                                                this.refs.scrollView.scrollTo({ x: 0, y: 0, animated: true });
                                                                                            })
                                                                                            .catch((error) => {
                                                                                                console.error(error);
                                                                                            });
                                                                                        this.setState({
                                                                                            isDataUpload: true,
                                                                                        })
                                                                                        // console.log("I am not a supervisor:");
                                                                                        // this.props.navigation.push('Report', {token: this.state.token, count_samples: this.state.count_samples, docid: this.state.docid, user_credentials: this.state.user_credentials});
                                                                                    }
                                                                                }
                                                                                return finalresponseJson;
                                                                            } else {
                                                                                this.setState({
                                                                                    isError: true,
                                                                                });
                                                                                return finalresponseJson;
                                                                            }
                                                                        })
                                                                        .catch((error) => {
                                                                            console.error(error);
                                                                        });

                                                                    return responseJson;
                                                                }
                                                                else {
                                                                    console.log("error is:", responseJson);
                                                                    alert("Please enter all the Details Properly!");
                                                                    this.setState({
                                                                        isError: true,
                                                                    });
                                                                    return responseJson;
                                                                }
                                                            })
                                                            .catch((error) => {
                                                                console.error(error);
                                                            });

                                                        this.setState({
                                                            response_internal_defects_api_put: responseJson,
                                                        });
                                                        return responseJson;
                                                    }
                                                    else {
                                                        console.log("error is:", responseJson);
                                                        alert("Please enter all the Details Properly!");
                                                        this.setState({
                                                            isError: true,
                                                        });
                                                        return responseJson;
                                                    }
                                                })
                                                .catch((error) => {
                                                    console.error(error);
                                                });
                                            this.setState({
                                                response_external_defects_api_put: responseJson,
                                            });
                                            return responseJson;
                                        }
                                        else {
                                            console.log("error is:", responseJson);
                                            alert("Please enter all the Details Properly!");
                                            this.setState({
                                                isError: true,
                                            });
                                            return responseJson;
                                        }
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    });
                                return responseJson;
                            } else {
                                console.log("error is:", responseJson);
                                alert("Please enter all the Details Properly!");
                                this.setState({
                                    isError: true,
                                });
                                return responseJson;
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });



                }
                else {
                    this.setState({
                        isError: true,
                    });
                    return responseJson;
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getData(value, name, index) {
        if (name === 'Firmness') {
            if (this.state.selected_Sample < this.state.sample) {
                if (this.state.all_samples_data[this.state.selected_Sample - 1].selectedFirmness !== value) {
                    this.state.changed_data["firmness"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selectedFirmness, value];
                }
            }
            this.setState({
                selectedFirmness: value
            });
            this.updateSampleBasicInfo();
        }
        else if (name === "Cleanness") {
            if (this.state.selected_Sample < this.state.sample) {
                if (this.state.all_samples_data[this.state.selected_Sample - 1].selectedCleanness !== value) {
                    this.state.changed_data["cleanness"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selectedCleanness, value];
                }
            }
            this.setState({
                selectedCleanness: value
            });
            this.updateSampleBasicInfo();
        }
        else if (name === "Shape") {
            if (this.state.selected_Sample < this.state.sample) {
                if (this.state.all_samples_data[this.state.selected_Sample - 1].selectedShape !== value) {
                    this.state.changed_data["shape"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selectedShape, value];
                }
            }
            this.setState({
                selectedShape: value
            });
            this.updateSampleBasicInfo();
        }
        else if (name === "Maturity") {
            if (this.state.selected_Sample < this.state.sample) {
                if (this.state.all_samples_data[this.state.selected_Sample - 1].selectedMaturity !== value) {
                    this.state.changed_data["maturity"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selectedMaturity, value];
                }
            }
            this.setState({
                selectedMaturity: value
            });
            this.updateSampleBasicInfo();
        }
        else if (name === "Skinning") {
            if (this.state.selected_Sample < this.state.sample) {
                if (this.state.all_samples_data[this.state.selected_Sample - 1].selectedSkinning !== value) {
                    this.state.changed_data["skinning"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selectedSkinning, value];
                }
            }
            this.setState({
                selectedSkinning: value
            });
            this.updateSampleBasicInfo();
        }
        else if (name === 'Range_type1') {
            this.setState({
                selectedRangeType1: value
            });
            this.selectedRangeType1Object(value);
        }
        else if (name === "Range_type1_units") {
            this.setState({
                selectedRangeType1Units: value
            })
        }
        else if (name === "Range_type2_slider") {
            this.setState({
                selectedRangeType2Units: value
            })
        }
        else if (name === "Image_tags") {
            let position = index;
            let defects_label = this.state.selected_image_defects_label;
            let defects_image_id = this.state.images_doc_id;
            let defects_images_id_keys = Object.keys(defects_image_id)[index];
            if (defects_image_id[defects_images_id_keys] === '') {
                defects_image_id[defects_images_id_keys] = [value]
            }
            else {
                defects_image_id[defects_images_id_keys].push(value);
            }
            this.setState({
                images_doc_id: defects_image_id,
            });
            // let image_length_tags = Object.values(defects_image_id[position])[0];
            // let present_tag_image_change = defects_image_id[position];
            // if(typeof image_length_tags === "object") {
            //     present_tag_image_change[Object.keys(defects_image_id[position])[0]].push(value)
            // }
            // else {
            //     present_tag_image_change[Object.keys(defects_image_id[position])[0]] = [value];
            // }
            // this.setState({
            //     images_doc_id: defects_image_id
            // });
            defects_label[position].push(value);
            this.setState({
                selected_image_defects_label: defects_label,
            });
            if (this.state.selected_Sample < this.state.sample) {
                if (this.state.all_samples_data[this.state.selected_Sample - 1].selected_image_defects_label !== this.state.selected_image_defects_label) {
                    this.state.changed_data["image"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selected_image_defects_label, defects_label];
                }
            }
        }
    }

    selectedRangeType1Object(value) {
        let type1_values = this.state.range_type1;
        let selectedType1Value = value;
        let selectedType1Object = type1_values[selectedType1Value];
        let selected_type1_object = {
            "type1Range": value,
            "minWeight": selectedType1Object.minWeight,
            "maxWeight": selectedType1Object.maxWeight,
            "minUnit": this.state.selectedRangeType1Units
        };
        this.state.selectedRangeType1ObjectTotal.type1Range = value;
        this.state.selectedRangeType1ObjectTotal.minWeight = selectedType1Object.minWeight;
        this.state.selectedRangeType1ObjectTotal.maxWeight = selectedType1Object.maxWeight;
        this.state.selectedRangeType1ObjectTotal.minUnit = this.state.selectedRangeType1Units;
        this.setState({
            selectedRangeType1Object: selectedType1Object,
        });
        if (this.state.selected_Sample < this.state.sample) {
            if (this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType1Object.type1Range !== value) {
                this.state.changed_data["type1"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType1Object, this.state.selectedRangeType1Object];
            }
        }
    }

    openAnotherType2() {
        let value = this.state.countUIType2 + 1;
        this.setState({
            countUIType2: value,
            type2_update: true,
        })
    }

    opendropdown() {
        this.setState({
            isOpenDropDown: true,
        })
    }

    selectedItem(value, index) {
        this.setState({
            selectedRangeType2: value,
            isOpenDropDown: false,
        });
        let type2_values = this.state.range_type2;
        let selectedType2Value = value;
        let selectedType2Object = type2_values[selectedType2Value];
        this.setState({
            selectedRangeType2Object: selectedType2Object,
        });
        this.createType2Object(index, value, selectedType2Object);
    }

    createType2Object(index, value, object) {
        var Type2Object = {};
        if (this.state.selectedRangeType2ObjectTotal[index - 1] !== undefined) {
            if (value === "Size A Alsum") {
                this.state.selectedRangeType2ObjectTotal[index - 1].type2Range = value;
                this.state.selectedRangeType2ObjectTotal[index - 1].minDia = object.minDia_wt;
                this.state.selectedRangeType2ObjectTotal[index - 1].maxDia = object.maxDia_wt;
                this.state.selectedRangeType2ObjectTotal[index - 1].underSize = 0;
                this.state.selectedRangeType2ObjectTotal[index - 1].sizeAWeight = 0;
                this.state.selectedRangeType2ObjectTotal[index - 1].sizeA = "true";
                this.state.selectedRangeType2ObjectTotal[index - 1].status = "false";
            }
            else if (value === "Size A USDA") {
                this.state.selectedRangeType2ObjectTotal[index - 1].type2Range = value;
                this.state.selectedRangeType2ObjectTotal[index - 1].minDia = object.minDia_wt;
                this.state.selectedRangeType2ObjectTotal[index - 1].maxDia = object.maxDia_wt;
                this.state.selectedRangeType2ObjectTotal[index - 1].underSize = 0;
                this.state.selectedRangeType2ObjectTotal[index - 1].sizeAWeight = 0;
                this.state.selectedRangeType2ObjectTotal[index - 1].sizeA = "true";
                this.state.selectedRangeType2ObjectTotal[index - 1].status = "false";
            }
            else {
                this.state.selectedRangeType2ObjectTotal[index - 1].type2Range = value;
                this.state.selectedRangeType2ObjectTotal[index - 1].minDia = object.minDia_wt;
                this.state.selectedRangeType2ObjectTotal[index - 1].maxDia = object.maxDia_wt;
                this.state.selectedRangeType2ObjectTotal[index - 1].underSize = 0;
                this.state.selectedRangeType2ObjectTotal[index - 1].overSize = 0;
                this.state.selectedRangeType2ObjectTotal[index - 1].sizeA = false;
                this.state.selectedRangeType2ObjectTotal[index - 1].status = "true";
            }
        }
        else if (this.state.selectedRangeType2ObjectTotal[index - 1] === undefined) {
            let type2_undersize = this.state.type2_details_undersize;
            type2_undersize.push(0);
            let type2_undersize_percentage = this.state.type2_undersize_percentage;
            type2_undersize_percentage.push(0.00);
            this.setState({
                type2_details_undersize: type2_undersize,
                type2_undersize_percentage: type2_undersize_percentage,
            });
            if (value === 'Size A Alsum' || value === 'Size A USDA') {
                let type2_sizeAweight = this.state.type2_sampleA_weight;
                type2_sizeAweight.push(0);
                let type2_sizeAweight_percentage = this.state.type2_sizeAweight_percentage;
                type2_sizeAweight_percentage.push(0.00);
                this.setState({
                    type2_sampleA_weight: type2_sizeAweight,
                    type2_sizeAweight_percentage: type2_sizeAweight_percentage,
                })
            }
            else {
                let type2_oversize = this.state.type2_details_oversize;
                type2_oversize.push(0);
                let type2_oversize_percentage = this.state.type2_oversize_percentage;
                type2_oversize_percentage.push(0.00);
                this.setState({
                    type2_details_oversize: type2_oversize,
                    type2_oversize_percentage: type2_oversize_percentage,
                })
            }
            if (value === "Size A Alsum") {
                Type2Object = {
                    "key": index,
                    "type2Range": value,
                    "minDia": object.minDia_wt,
                    "maxDia": object.maxDia_wt,
                    "underSize": 0,
                    "sizeA": "true",
                    "sizeAWeight": this.state.type2_sampleA_weight[index - 1],
                    "status": "false",
                    "helpText": "Weight must be minimum of 40% of sample weight"
                }
            }
            else if (value === 'Size A USDA') {
                Type2Object = {
                    "key": index,
                    "type2Range": value,
                    "minDia": object.minDia_wt,
                    "maxDia": object.maxDia_wt,
                    "underSize": 0,
                    "sizeA": "true",
                    "sizeAWeight": this.state.type2_sampleA_weight[index - 1],
                    "status": "false",
                    "helpText": "Weight must be minimum of 40% of sample weight"
                }

            } else {
                Type2Object = {
                    "key": index,
                    "type2Range": value,
                    "minDia": object.minDia_wt,
                    "maxDia": object.maxDia_wt,
                    "underSize": 0,
                    "overSize": 0,
                    "sizeA": "false",
                    "sizeAWeight": 0,
                    "status": "true",
                    "helpText": "Undersize percentage has to be less than 3% and Oversize percentage less than 10% of the sample weight"
                }
            }
            let type2Object = this.state.selectedRangeType2ObjectTotal;
            type2Object.push(Type2Object);
            this.setState({
                selectedRangeType2ObjectTotal: type2Object,
            });
        }
        else {
            if (value === "Size A Alsum") {
                this.state.selectedRangeType2ObjectTotal[index - 1].type2Range = value;
                this.state.selectedRangeType2ObjectTotal[index - 1].minDia = object.minDia_wt;
                this.state.selectedRangeType2ObjectTotal[index - 1].maxDia = object.maxDia_wt;
                this.state.selectedRangeType2ObjectTotal[index - 1].underSize = 0;
                this.state.selectedRangeType2ObjectTotal[index - 1].sizeAWeight = 0;
                this.state.selectedRangeType2ObjectTotal[index - 1].sizeA = "true";
                this.state.selectedRangeType2ObjectTotal[index - 1].status = "false";
            }
            else if (value === 'Size A USDA') {
                this.state.selectedRangeType2ObjectTotal[index - 1].type2Range = value;
                this.state.selectedRangeType2ObjectTotal[index - 1].minDia = object.minDia_wt;
                this.state.selectedRangeType2ObjectTotal[index - 1].maxDia = object.maxDia_wt;
                this.state.selectedRangeType2ObjectTotal[index - 1].underSize = 0;
                this.state.selectedRangeType2ObjectTotal[index - 1].sizeAWeight = 0;
                this.state.selectedRangeType2ObjectTotal[index - 1].sizeA = "true";
                this.state.selectedRangeType2ObjectTotal[index - 1].status = "false";
            }
            else {
                this.state.selectedRangeType2ObjectTotal[index - 1].type2Range = value;
                this.state.selectedRangeType2ObjectTotal[index - 1].minDia = object.minDia_wt;
                this.state.selectedRangeType2ObjectTotal[index - 1].maxDia = object.maxDia_wt;
                this.state.selectedRangeType2ObjectTotal[index - 1].underSize = 0;
                this.state.selectedRangeType2ObjectTotal[index - 1].overSize = 0;
                this.state.selectedRangeType2ObjectTotal[index - 1].sizeA = "false";
                this.state.selectedRangeType2ObjectTotal[index - 1].status = "true";
            }
        }
        if (this.state.selected_Sample < this.state.sample) {
            if (this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType2ObjectTotal !== this.state.selectedRangeType2ObjectTotal) {
                this.state.changed_data["type2"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType2ObjectTotal, this.state.selectedRangeType2ObjectTotal];
            }
        }
    };

    updateType2Object(index, name, value) {
        if (name === "sizeAweight") {
            this.state.selectedRangeType2ObjectTotal[index - 1].sizeAWeight = value;
        }
        else if (name === "undersize") {
            this.state.selectedRangeType2ObjectTotal[index - 1].underSize = value;
        }
        else if (name === "oversize") {
            this.state.selectedRangeType2ObjectTotal[index - 1].overSize = value;
        }
        this.calculatePercentage(index, name);
        if (this.state.selected_Sample < this.state.sample) {
            if (this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType2ObjectTotal !== this.state.selectedRangeType2ObjectTotal) {
                this.state.changed_data["type2"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType2ObjectTotal, this.state.selectedRangeType2ObjectTotal];
            }
        }
    }

    calculatePercentage(index, name) {
        if (name === "oversize") {
            this.state.type2_oversize_percentage[index - 1] = ((this.state.selectedRangeType2ObjectTotal[index - 1].overSize / this.state.sample_weight) * 100).toFixed(2);
        }
        if (name === "undersize") {
            this.state.type2_undersize_percentage[index - 1] = ((this.state.selectedRangeType2ObjectTotal[index - 1].underSize / this.state.sample_weight) * 100).toFixed(2);
        }
        if (name === "sizeAweight") {
            this.state.type2_sizeAweight_percentage[0] = ((this.state.selectedRangeType2ObjectTotal[index - 1].sizeAWeight / this.state.sample_weight) * 100).toFixed(2);
        }
        if (this.state.selectedRangeType2ObjectTotal[index - 1].type2Range === "Size A Alsum" || this.state.selectedRangeType2ObjectTotal[index - 1].type2Range === "Size A USDA") {
            if (this.state.type2_sizeAweight_percentage[0] < 40 || this.state.type2_undersize_percentage[index - 1] > 3) {
                this.state.selectedRangeType2ObjectTotal[index - 1].status = 'false';
            }
            else {
                this.state.selectedRangeType2ObjectTotal[index - 1].status = 'true';
            }
        }
        else {
            if (this.state.type2_oversize_percentage[index - 1] > 10 || this.state.type2_undersize_percentage[index - 1] > 3) {
                this.state.selectedRangeType2ObjectTotal[index - 1].status = 'false';
            }
            else {
                this.state.selectedRangeType2ObjectTotal[index - 1].status = 'true';
            }
        }
        this.setState({
            isUpdate: true,
        })
    }

    deleteType2Range(index) {
        let type2_object = this.state.selectedRangeType2ObjectTotal;
        type2_object.splice(index - 1, 1);
        this.setState({
            selectedRangeType2ObjectTotal: type2_object,
            countUIType2: this.state.countUIType2 - 1,
        })
        if (this.state.selected_Sample < this.state.sample) {
            if (this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType2ObjectTotal !== this.state.selectedRangeType2ObjectTotal) {
                this.state.changed_data["type2"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType2ObjectTotal, this.state.selectedRangeType2ObjectTotal];
            }
        }
    }

    renderType2UI() {
        let Type2UI = [];
        for (let i = 1; i <= this.state.countUIType2; i++) {
            let value = i;
            Type2UI.push(
                <View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'space-around', width: 0.86 * width }}>
                        <View style={{ width: 0.2 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingLeft: 10, paddingTop: 25, paddingBottom: 10 }}>
                            {/*<Dropdown name={"Range_type2"} data={Object.keys(this.state.range_type2)} defaultItem={''} sendData={this.getData}/>*/}
                            <TouchableWithoutFeedback onPress={() => this.opendropdown()}>
                                <View style={{ width: 0.18 * width, height: 40, borderWidth: 1, borderColor: '#CED4DA', borderRadius: 3, marginTop: 5, color: 'black' }}>
                                    {this.state.selectedRangeType2ObjectTotal[i - 1] !== undefined ?
                                        <Text style={{ paddingLeft: 3, color: 'black', fontSize: 13, paddingTop: 10 }}>
                                            {this.state.selectedRangeType2ObjectTotal[i - 1].type2Range}
                                        </Text> :
                                        <Text style={{ paddingLeft: 3, color: 'black', fontSize: 13, paddingTop: 15 }}>

                                        </Text>
                                    }
                                </View>
                            </TouchableWithoutFeedback>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginLeft: 0.5 * width }}>
                                <Modal isVisible={this.state.isOpenDropDown} onBackdropPress={() => this.setState({ isOpenDropDown: false })} style={{ marginTop: height / 3.5, marginBottom: height / 3.5, marginLeft: width / 2 - 160, backgroundColor: 'white', height: 0, borderWidth: 1, borderColor: 'black', width: 300 }}>
                                    <View style={{ position: 'relative', borderBottomWidth: 1, borderBottomColor: '#C6C6C6' }}>
                                        <Text style={{ textAlign: 'center', fontSize: 25, color: 'black', paddingTop: 15, paddingBottom: 10 }}>
                                            Select an Item
                                        </Text>
                                    </View>
                                    <ScrollView style={{ flexGrow: 1, flex: 1 }}>
                                        {Object.keys(this.state.range_type2).map((text) =>
                                            <TouchableWithoutFeedback onPress={() => this.selectedItem(text, value)}>
                                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#f2f2f2' }}>
                                                    <Text style={{ fontSize: 20, color: 'black', paddingTop: 10, paddingBottom: 10, paddingLeft: 15 }}>
                                                        {text}
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )}
                                    </ScrollView>
                                </Modal>
                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: '#c6c6c6',
                            paddingTop: 19,
                            paddingBottom: 10,
                            paddingLeft: 5,
                            paddingRight: 5,
                            width: 0.02 * width
                        }}>
                            <Text style={{ textAlign: 'center', color: '#000000', fontSize: 10 }}>
                                Minimum Diameter
                            </Text>
                            <View style={{
                                backgroundColor: '#f2f2f2',
                                borderWidth: 1,
                                borderColor: '#c6c6c6',
                                padding: 10,
                                paddingTop: 5,
                                paddingBottom: 10,
                                height: 40
                            }}>
                                {this.state.selectedRangeType2ObjectTotal[i - 1] !== undefined ?
                                    <Text style={{ fontSize: 15, color: 'black', textAlign: "center" }}>
                                        {this.state.selectedRangeType2ObjectTotal[i - 1].minDia} inches
                                    </Text> :
                                    <View />
                                }
                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: '#c6c6c6',
                            paddingTop: 19,
                            paddingBottom: 10,
                            paddingLeft: 5,
                            paddingRight: 5,
                            width: 0.02 * width
                        }}>
                            <Text style={{ textAlign: 'center', color: '#000000', fontSize: 10 }}>
                                Maximum Diameter
                            </Text>
                            <View style={{
                                backgroundColor: '#f2f2f2',
                                borderWidth: 1,
                                borderColor: '#c6c6c6',
                                padding: 10,
                                paddingTop: 5,
                                paddingBottom: 10,
                                height: 40,
                            }}>
                                {this.state.selectedRangeType2ObjectTotal[i - 1] !== undefined ?
                                    <Text
                                        style={{ fontSize: 15, color: 'black', textAlign: "center" }}>
                                        {this.state.selectedRangeType2ObjectTotal[i - 1].maxDia} inches
                                    </Text> :
                                    <View />
                                }
                            </View>
                        </View>
                        {this.state.selectedRangeType2ObjectTotal[i - 1] !== undefined && (this.state.selectedRangeType2ObjectTotal[i - 1].type2Range === "Size A Alsum" || this.state.selectedRangeType2ObjectTotal[i - 1].type2Range === "Size A USDA") ?
                            <View style={{
                                flex: 1,
                                borderWidth: 1,
                                borderColor: '#c6c6c6',
                                paddingTop: 25,
                                paddingBottom: 10,
                                paddingLeft: 20,
                                paddingRight: 5,
                            }}>
                                <Dropdown name={"Range_type2_slider"} data={["6 oz", "2-1/2"]} defaultItem={this.state.selectedRangeType2Units} sendData={this.getData} />
                            </View> :
                            <View />
                        }
                        {this.state.selectedRangeType2ObjectTotal[i - 1] !== undefined && (this.state.selectedRangeType2ObjectTotal[i - 1].type2Range === "Size A Alsum" || this.state.selectedRangeType2ObjectTotal[i - 1].type2Range === "Size A USDA") ?
                            <View style={{
                                flex: 1,
                                borderWidth: 1,
                                borderColor: '#c6c6c6',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingTop: 19,
                                paddingBottom: 10,
                                paddingLeft: 5,
                                paddingRight: 5,
                            }}>
                                <Text style={{ textAlign: 'center', color: '#000000', fontSize: 10 }}>
                                    Weight (lb) of {this.state.selectedRangeType2Units}
                                </Text>
                                {this.state.selectedRangeType2ObjectTotal[i - 1].sizeAWeight !== undefined ?
                                    <TextInput
                                        placeholder={this.state.selectedRangeType2ObjectTotal[i - 1].sizeAWeight}
                                        onEndEditing={(event) => (this.state.type2_sampleA_weight.push(event.nativeEvent.text), this.updateType2Object(i, "sizeAweight", event.nativeEvent.text))}
                                        editable={true}
                                        keyboardType={'numeric'}
                                        maxLength={20}
                                        style={{
                                            width: 0.07 * width,
                                            textAlign: 'center',
                                            color: '#000000',
                                            fontSize: 13,
                                            borderWidth: 1,
                                            borderColor: '#c6c6c6',
                                            paddingTop: 10,
                                            paddingBottom: 10,
                                            maxHeight: 40,
                                            padding: 15
                                        }} /> :
                                    <TextInput
                                        placeholder={'0'}
                                        onEndEditing={(event) => (this.state.type2_sampleA_weight.push(event.nativeEvent.text), this.updateType2Object(i, "sizeAweight", event.nativeEvent.text))}
                                        editable={true}
                                        maxLength={20}
                                        keyboardType={'numeric'}
                                        style={{
                                            width: 0.07 * width,
                                            textAlign: 'center',
                                            color: '#000000',
                                            fontSize: 13,
                                            borderWidth: 1,
                                            borderColor: '#c6c6c6',
                                            paddingTop: 10,
                                            paddingBottom: 10,
                                            maxHeight: 40,
                                            padding: 15
                                        }} />
                                }
                                <Text style={{ fontSize: 13, color: 'black' }}>
                                    {this.state.type2_sizeAweight_percentage[0]}%
                                </Text>
                                {this.state.selectedRangeType2ObjectTotal[i - 1] !== undefined && (this.state.selectedRangeType2ObjectTotal[i - 1].type2Range === "Size A Alsum" || this.state.selectedRangeType2ObjectTotal[i - 1].type2Range === "Size A USDA") ?
                                    <View>
                                        {this.state.type2_sizeAweight_percentage[0] > 40 ?
                                            <Text style={{ fontSize: 12, color: 'black' }}>
                                                *Min value 40%
                                            </Text> :
                                            <Text style={{ fontSize: 12, color: 'red' }}>
                                                *Min value 40%
                                            </Text>
                                        }
                                    </View> :
                                    <View />
                                }
                            </View> :
                            <View />
                        }
                        <View style={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: '#c6c6c6',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingLeft: 5,
                            paddingRight: 5,
                        }}>
                            <Text style={{ textAlign: 'center', color: '#000000', fontSize: 10 }}>
                                Undersize (lb)
                            </Text>
                            {this.state.selectedRangeType2ObjectTotal[i - 1] !== undefined ?
                                <TextInput
                                    placeholder={this.state.selectedRangeType2ObjectTotal[i - 1].underSize}
                                    onEndEditing={(event) => (this.state.type2_details_undersize.push(event.nativeEvent.text), this.updateType2Object(i, "undersize", event.nativeEvent.text))}
                                    editable={true}
                                    maxLength={20}
                                    keyboardType={'numeric'}
                                    style={{
                                        width: 0.07 * width,
                                        textAlign: 'center',
                                        color: '#000000',
                                        fontSize: 13,
                                        borderWidth: 1,
                                        borderColor: '#c6c6c6',
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                        maxHeight: 40,
                                        padding: 15
                                    }} /> :
                                <TextInput
                                    placeholder={'0'}
                                    onEndEditing={(event) => (this.state.type2_details_undersize.push(event.nativeEvent.text), this.updateType2Object(i, "undersize", event.nativeEvent.text))}
                                    editable={true}
                                    maxLength={20}
                                    keyboardType={'numeric'}
                                    style={{
                                        width: 0.07 * width,
                                        textAlign: 'center',
                                        color: '#000000',
                                        fontSize: 13,
                                        borderWidth: 1,
                                        borderColor: '#c6c6c6',
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                        maxHeight: 40,
                                        padding: 15
                                    }} />
                            }
                            <Text style={{ fontSize: 13, color: 'black', }}>
                                {this.state.type2_undersize_percentage[i - 1]}%
                            </Text>
                            {this.state.selectedRangeType2ObjectTotal[i - 1] !== undefined && (this.state.selectedRangeType2ObjectTotal[i - 1].type2Range === "Size A Alsum" || this.state.selectedRangeType2ObjectTotal[i - 1].type2Range === "Size A USDA") ?
                                <View /> :
                                <View>
                                    {this.state.type2_undersize_percentage[i - 1] > 3 ?
                                        <Text style={{ fontSize: 12, color: 'red' }}>
                                            *Min value 3%
                                        </Text> :
                                        <Text style={{ fontSize: 12, color: 'black' }}>
                                            *Min value 3%
                                        </Text>
                                    }
                                </View>
                            }
                        </View>
                        {this.state.selectedRangeType2ObjectTotal[i - 1] !== undefined && (this.state.selectedRangeType2ObjectTotal[i - 1].type2Range === "Size A Alsum" || this.state.selectedRangeType2ObjectTotal[i - 1].type2Range === "Size A USDA") ?
                            <View /> :
                            <View style={{
                                flex: 1,
                                borderWidth: 1,
                                borderColor: '#c6c6c6',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingTop: 12,
                                paddingBottom: 10,
                                paddingLeft: 5,
                                paddingRight: 5,
                            }}>
                                <Text style={{ textAlign: 'center', color: '#000000', fontSize: 10 }}>
                                    Oversize (lb)
                                </Text>
                                {this.state.selectedRangeType2ObjectTotal[i - 1] !== undefined ?
                                    <TextInput
                                        placeholder={this.state.selectedRangeType2ObjectTotal[i - 1].overSize}
                                        onEndEditing={(event) => (this.state.type2_details_oversize.push(event.nativeEvent.text), this.updateType2Object(i, "oversize", event.nativeEvent.text))}
                                        editable={true}
                                        maxLength={20}
                                        keyboardType={'numeric'}
                                        style={{
                                            width: 0.07 * width,
                                            textAlign: 'center',
                                            color: '#000000',
                                            fontSize: 13,
                                            borderWidth: 1,
                                            borderColor: '#c6c6c6',
                                            paddingTop: 10,
                                            paddingBottom: 10,
                                            maxHeight: 40,
                                            padding: 15
                                        }}
                                    /> :
                                    <TextInput
                                        placeholder={'0'}
                                        onEndEditing={(event) => (this.state.type2_details_oversize.push(event.nativeEvent.text), this.updateType2Object(i, "oversize", event.nativeEvent.text))}
                                        editable={true}
                                        keyboardType={'numeric'}
                                        maxLength={20}
                                        style={{
                                            width: 0.07 * width,
                                            textAlign: 'center',
                                            color: '#000000',
                                            fontSize: 13,
                                            borderWidth: 1,
                                            borderColor: '#c6c6c6',
                                            paddingTop: 10,
                                            paddingBottom: 10,
                                            maxHeight: 40,
                                            padding: 15
                                        }}
                                    />
                                }
                                <Text style={{ fontSize: 13, color: 'black', }}>
                                    {this.state.type2_oversize_percentage[i - 1]}%
                                </Text>
                                {this.state.selectedRangeType2ObjectTotal[i - 1] !== undefined && (this.state.selectedRangeType2ObjectTotal[i - 1].type2Range === "Size A Alsum" || this.state.selectedRangeType2ObjectTotal[i - 1].type2Range === "Size A USDA") ?
                                    <View /> :
                                    <View>
                                        {this.state.type2_oversize_percentage[i - 1] > 10 ?
                                            <Text style={{ fontSize: 12, color: 'red' }}>
                                                *Min value 10%
                                            </Text> :
                                            <Text style={{ fontSize: 12, color: 'black' }}>
                                                *Min value 10%
                                            </Text>
                                        }
                                    </View>
                                }
                            </View>
                        }
                        <View style={{
                            width: 0.04 * width,
                            borderWidth: 1,
                            borderColor: '#c6c6c6',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <TouchableOpacity onPress={() => this.deleteType2Range(i)}>
                                <Image source={require('../assets/sample_inspection/Delete.png')} style={{ width: 40, height: 40 }} />
                            </TouchableOpacity>
                            {this.state.selectedRangeType2ObjectTotal[i - 1] === undefined ?
                                <View /> :
                                <View>
                                    {this.state.selectedRangeType2ObjectTotal[i - 1].status === "true" ?
                                        <Image source={require('../assets/sample_inspection/Tick.png')}
                                            style={{ width: 30, height: 30, marginTop: 10 }} /> :
                                        <Image source={require('../assets/sample_inspection/Cross.png')}
                                            style={{ width: 30, height: 30, marginTop: 10 }} />
                                    }
                                </View>
                            }
                        </View>
                    </View>
                </View>
            )
        }
        return Type2UI;
    }

    displayExternalDefects(item) {
        let y = this.state.external_defects_index_selected.includes(item.key);
        if (this.state.external_defects_index_selected[0] === undefined) {
            return (
                <View>
                    <TouchableOpacity onPress={() => this.selectedExternalDefects(item)}
                        style={{
                            borderColor: '#343434',
                            borderWidth: 1,
                            width: 0.13 * width,
                            borderRadius: 12.499987602233888, margin: 5
                        }}>
                        <Text style={{
                            color: '#343434',
                            textAlign: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 15,
                            padding: 5
                        }}>{item.label}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else {
            if (!y) {
                return (
                    <View>
                        <TouchableOpacity onPress={() => this.selectedExternalDefects(item)}
                            style={{
                                borderColor: '#343434',
                                borderWidth: 1,
                                width: 0.13 * width,
                                borderRadius: 12.499987602233888, margin: 5
                            }}>
                            <Text style={{
                                color: '#343434',
                                textAlign: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 15,
                                padding: 5
                            }}>{item.label}</Text>
                        </TouchableOpacity>
                    </View>
                )
            } else {
                return (
                    <View style={{
                        width: 0.13 * width,
                        borderRadius: 12.499987602233888, margin: 5, backgroundColor: '#343434'
                    }}>
                        <Text style={{
                            color: 'white',
                            textAlign: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 15,
                            padding: 5
                        }}>
                            {item.label}
                        </Text>
                    </View>
                )
            }
        }
    }

    deleteExternalDefect(name) {
        let total_defects_label = this.state.total_defects_label;
        let index_of_deleted_label = total_defects_label.findIndex((e) => e.label === name.label);
        total_defects_label.splice(index_of_deleted_label, 1);
        let external_defects = this.state.selected_external_defects;
        let index_of_deleted_external_defect = external_defects.findIndex((e) => e.label === name.label);
        external_defects.splice(index_of_deleted_external_defect, 1);
        let external_defects_selected_key = this.state.external_defects_index_selected;
        let key_array_index = external_defects_selected_key.indexOf(name.key);
        external_defects_selected_key.splice(key_array_index, 1);
        this.setState({
            selected_external_defects: external_defects,
            external_defects: this.state.external_defects,
            external_defects_index_selected: external_defects_selected_key,
        });
        if (this.state.selected_Sample < this.state.sample) {
            if (this.state.all_samples_data[this.state.selected_Sample - 1].selected_external_defects !== this.state.selected_external_defects) {
                this.state.changed_data["externalDefects"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selected_external_defects, this.state.selected_external_defects];
            }
        }
        // this.externalDefectsPUTcall();
    }


    displayInternalDefects(item) {
        let y = this.state.internal_defects_index_selected.includes(item.key);
        if (this.state.internal_defects_index_selected[0] === undefined) {
            return (
                <View>
                    <TouchableOpacity onPress={() => this.selectedInternalDefects(item)}
                        style={{
                            borderColor: '#343434',
                            borderWidth: 1,
                            width: 0.13 * width,
                            borderRadius: 12.499987602233888, margin: 5
                        }}>
                        <Text style={{
                            color: '#343434',
                            textAlign: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 15,
                            padding: 5
                        }}>{item.label}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else {
            if (!y) {
                return (
                    <View>
                        <TouchableOpacity onPress={() => this.selectedInternalDefects(item)}
                            style={{
                                borderColor: '#343434',
                                borderWidth: 1,
                                width: 0.13 * width,
                                borderRadius: 12.499987602233888, margin: 5
                            }}>
                            <Text style={{
                                color: '#343434',
                                textAlign: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 15,
                                padding: 5
                            }}>{item.label}</Text>
                        </TouchableOpacity>
                    </View>
                )
            } else {
                return (
                    <View style={{
                        width: 0.13 * width,
                        borderRadius: 12.499987602233888, margin: 5, backgroundColor: '#343434'
                    }}>
                        <Text style={{
                            color: 'white',
                            textAlign: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 15,
                            padding: 5
                        }}>
                            {item.label}
                        </Text>
                    </View>
                )
            }
        }
    }

    deleteInternalDefect(name) {
        let total_defects_label = this.state.total_defects_label;
        let index_of_deleted_label = total_defects_label.findIndex((e) => e.label === name.label);
        total_defects_label.splice(index_of_deleted_label, 1);
        let internal_defects = this.state.selected_internal_defects;
        let index_of_deleted_internal_defect = internal_defects.findIndex((e) => e.label === name.label);
        internal_defects.splice(index_of_deleted_internal_defect, 1);
        let internal_defects_selected_key = this.state.internal_defects_index_selected;
        let key_array_index = internal_defects_selected_key.indexOf(name.key);
        internal_defects_selected_key.splice(key_array_index, 1);
        this.setState({
            selected_internal_defects: internal_defects,
            internal_defects: this.state.internal_defects,
            internal_defects_index_selected: internal_defects_selected_key,
        });
        if (this.state.selected_Sample < this.state.sample) {
            if (this.state.all_samples_data[this.state.selected_Sample - 1].selected_internal_defects !== this.state.selected_internal_defects) {
                this.state.changed_data["internalDefects"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selected_internal_defects, this.state.selected_internal_defects];
            }
        }
        this.internalDefectsPUTcall();
    }

    displayOtherDefects(item) {
        let y = this.state.other_defects_index_selected.includes(item.key);
        if (this.state.other_defects_index_selected[0] === undefined) {
            return (
                <View>
                    <TouchableOpacity onPress={() => this.selectedOtherDefects(item)}
                        style={{
                            borderColor: '#343434',
                            borderWidth: 1,
                            width: 0.13 * width,
                            borderRadius: 12.499987602233888, margin: 5
                        }}>
                        <Text style={{
                            color: '#343434',
                            textAlign: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 15,
                            padding: 5
                        }}>{item.label}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else {
            if (!y) {
                return (
                    <View>
                        <TouchableOpacity onPress={() => this.selectedOtherDefects(item)}
                            style={{
                                borderColor: '#343434',
                                borderWidth: 1,
                                width: 0.13 * width,
                                borderRadius: 12.499987602233888, margin: 5
                            }}>
                            <Text style={{
                                color: '#343434',
                                textAlign: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 15,
                                padding: 5
                            }}>{item.label}</Text>
                        </TouchableOpacity>
                    </View>
                )
            } else {
                return (
                    <View style={{
                        width: 0.13 * width,
                        borderRadius: 12.499987602233888, margin: 5, backgroundColor: '#343434'
                    }}>
                        <Text style={{
                            color: 'white',
                            textAlign: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 15,
                            padding: 5
                        }}>
                            {item.label}
                        </Text>
                    </View>
                )
            }
        }
    }

    deleteOtherDefect(name) {
        let total_defects_label = this.state.total_defects_label;
        let index_of_deleted_label = total_defects_label.findIndex((e) => e.label === name.label);
        total_defects_label.splice(index_of_deleted_label, 1);
        let other_defects = this.state.selected_other_defects;
        let index_of_deleted_other_defect = other_defects.findIndex((e) => e.label === name.label);
        other_defects.splice(index_of_deleted_other_defect, 1);
        let other_defects_selected_key = this.state.other_defects_index_selected;
        let key_array_index = other_defects_selected_key.indexOf(name.key);
        other_defects_selected_key.splice(key_array_index, 1);
        this.setState({
            selected_other_defects: other_defects,
            other_defects: this.state.other_defects,
            other_defects_index_selected: other_defects_selected_key
        });
        this.otherDefectsPUTcall();
        if (this.state.selected_Sample < this.state.sample) {
            if (this.state.all_samples_data[this.state.selected_Sample - 1].selected_other_defects !== this.state.selected_other_defects) {
                this.state.changed_data["otherDefects"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selected_other_defects, this.state.selected_other_defects];
            }
        }
    }

    updateType1Object(name, value) {
        let type1 = this.state.selectedRangeType1ObjectTotal;
        if (name === "overSize") {
            type1.overSize = value;
            this.setState({
                selectedRangeType1ObjectTotal: type1,
            });
            if (this.state.selected_Sample < this.state.sample) {
                if (this.state.all_samples_data[this.state.selected_Sample - 1].type1 !== undefined) {
                    if (this.state.all_samples_data[this.state.selected_Sample - 1].type1.overSize !== value) {
                        this.state.changed_data["type1"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType1ObjectTotal, type1];
                    }
                }
                else {
                    if (this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType1ObjectTotal !== undefined) {
                        this.state.changed_data["type1"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType1ObjectTotal, type1];
                    }
                    else {
                        this.state.changed_data["type1"] = ['', type1];
                    }
                }
            }
        }
        else if (name === "underSize") {
            type1.underSize = value;
            this.setState({
                selectedRangeType1ObjectTotal: type1,
            })
            if (this.state.selected_Sample < this.state.sample) {
                if (this.state.all_samples_data[this.state.selected_Sample - 1].type1 !== undefined) {
                    if (this.state.all_samples_data[this.state.selected_Sample - 1].type1.underSize !== value) {
                        this.state.changed_data["type1"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType1ObjectTotal, type1];
                    }
                }
            }
            else {
                if (this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType1ObjectTotal !== undefined) {
                    this.state.changed_data["type1"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selectedRangeType1ObjectTotal, type1];
                }
                else {
                    this.state.changed_data["type1"] = ['', type1];
                }
            }

        }
        this.calculateType1Percentage();
    }

    calculateType1Percentage() {
        let percentage = this.state.type1_percentage;
        let type1 = this.state.selectedRangeType1ObjectTotal;
        let underSize_percentage = (type1.underSize / this.state.sample_weight) * 100;
        let overSize_percentage = (type1.overSize / this.state.sample_weight) * 100;
        percentage.overSize = overSize_percentage.toFixed(2);
        percentage.underSize = underSize_percentage.toFixed(2);
        this.setState({
            type1_percentage: percentage,
        })
    }

    deleteImage(index) {
        this.setState({
            isDataUpload: false,
        });
        let urls = this.state.image_url;
        let images = this.state.image_objects_array;
        let tags = this.state.selected_image_defects_label;
        tags.splice(index, 1);
        urls.splice(index, 1);
        images.splice(index, 1);
        this.setState({
            selected_image_defects_label: tags,
            image_url: urls,
            image_objects_array: images
        });
        if (this.state.selected_Sample < this.state.sample) {
            if (this.state.all_samples_data[this.state.selected_Sample - 1].selected_image_defects_label !== this.state.selected_image_defects_label) {
                this.state.changed_data["image"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selected_image_defects_label, this.state.selected_image_defects_label];
            }
        }
        let docid_image = (Object.keys(this.state.images_doc_id))[index];
        fetch(baseUrl + "reports/images/" + docid_image, {
            method: "DELETE",
            headers: {
                'Authorization': 'bearer ' + this.state.token,
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error !== true) {
                    this.setState({
                        isDataUpload: true,
                    });
                    let images_id = this.state.images_doc_id;
                    let new_image_id = delete this.state.images_doc_id[Object.keys(images_id)[index]];
                    return responseJson;
                }
                else {
                    this.setState({
                        isDataUpload: true,
                    });
                    this.setState({
                        isError: true,
                    });
                    return responseJson;
                }
            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    isDataUpload: true,
                });
            });
    }

    displayTags(index) {
        let i;
        let displayTag = [];
        if (this.state.selected_image_defects_label[index] !== undefined) {
            let length = this.state.selected_image_defects_label[index].length;
            for (i = 0; i < length; i++) {
                let present_tag = i;
                displayTag.push(
                    <View style={{
                        marginTop: 5,
                        flex: 1,
                        flexDirection: 'row',
                        maxWidth: 0.18 * width
                    }}>
                        <View style={{
                            borderWidth: 1,
                            borderColor: '#343434',
                            borderRadius: 4,
                            width: 0.18 * width
                        }}>
                            <Text style={{
                                fontSize: 15,
                                padding: 10,
                                color: '#343434'
                            }}>{this.state.selected_image_defects_label[index][i]}</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.deleteTag(present_tag, index)}>
                            <Image
                                source={require('../assets/sample_inspection/Vector.png')}
                                style={{
                                    opacity: 0.6,
                                    width: 15,
                                    height: 15,
                                    margin: 10,
                                    resizeMode: 'contain'
                                }} />
                        </TouchableOpacity>
                    </View>
                )
            }
            return displayTag;
        }
        else {
            return null;
        }
    }

    deleteTag(value, index) {
        let image_data = this.state.images_doc_id;
        let tags_present_image = image_data[Object.keys(image_data)[index]];
        tags_present_image.splice(value, 1);
        image_data[Object.keys(image_data)[index]] = tags_present_image;
        this.setState({
            images_doc_id: image_data,
        });
        let tags = this.state.selected_image_defects_label;
        tags[index].splice(value, 1);
        this.setState({
            selected_image_defects_label: tags,
        })
        if (this.state.selected_Sample < this.state.sample) {
            if (this.state.all_samples_data[this.state.selected_Sample - 1].selected_image_defects_label !== this.state.selected_image_defects_label) {
                this.state.changed_data["image"] = [this.state.all_samples_data[this.state.selected_Sample - 1].selected_image_defects_label, this.state.selected_image_defects_label];
            }
        }
    }

    // displayLogout() {
    //     if (this.state.isDisplayLogout) {
    //         this.setState({
    //             isDisplayLogout: false,
    //         })
    //     }
    //     else {
    //         this.setState({
    //             isDisplayLogout: true,
    //         })
    //     }
    // }
    //
    //
    // logout() {
    //     console.log("I am logging out");
    //     AsyncStorage.removeItem('myKey').then((value) => {
    //             const resetAction = StackActions.reset({
    //                 index: 0,
    //                 actions: [NavigationActions.navigate({routeName: 'Login'})],
    //             });
    //             this.props.navigation.dispatch(resetAction);
    //         }
    //     );
    // }
    //
    // profile() {
    //     this.props.navigation.navigate('Profile', {user_credentials: this.state.user_Credentials, commodity: "POTATO"});
    // }
    //
    // about() {
    //     this.props.navigation.navigate('About', {user_credentials: this.state.user_Credentials, commodity: "POTATO"});
    // }

    printExternalTotal() {
        let length = this.state.external_defect_perc_calculate.length;
        let i = 0;
        let tot_Perc = 0;
        for (i; i < length; i++) {
            tot_Perc = tot_Perc + (this.state.external_defect_perc_calculate[i].totPerc);
        }
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 0.14 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 120 }}>
                    <View>
                        <Text style={{ fontSize: 20, color: 'black', fontWeight: '700' }}>
                            {tot_Perc}
                        </Text>
                    </View>
                </View>
                <View style={{ width: 0.06 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 120 }}>
                    <View>
                        {(tot_Perc) <= this.state.external_threshold ?
                            <Image
                                source={require('../assets/sample_inspection/Tick.png')}
                                style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', textAlign: 'center', marginTop: 10 }} /> :
                            <Image
                                source={require('../assets/sample_inspection/Cross.png')}
                                style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', textAlign: 'center', marginTop: 10 }} />
                        }
                    </View>
                </View>
            </View>
        )
    }

    printInternalTotal() {
        let length = this.state.internal_defect_perc_calculate.length;
        let i = 0;
        let tot_Perc = 0;
        for (i; i < length; i++) {
            tot_Perc = tot_Perc + (this.state.internal_defect_perc_calculate[i].totPerc);
        }
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 0.14 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 120 }}>
                    <View>
                        <Text style={{ fontSize: 20, color: 'black', fontWeight: '700' }}>
                            {tot_Perc}
                        </Text>
                    </View>
                </View>
                <View style={{ width: 0.06 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 120 }}>
                    <View>
                        {(tot_Perc) <= this.state.internal_threshold ?
                            <Image
                                source={require('../assets/sample_inspection/Tick.png')}
                                style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', textAlign: 'center', marginTop: 10 }} /> :
                            <Image
                                source={require('../assets/sample_inspection/Cross.png')}
                                style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', textAlign: 'center', marginTop: 10 }} />
                        }
                    </View>
                </View>
            </View>
        )
    }

    printOtherTotal() {
        let length = this.state.other_defect_perc_calculate.length;
        let i = 0;
        let tot_Perc = 0;
        for (i; i < length; i++) {
            tot_Perc = tot_Perc + (this.state.other_defect_perc_calculate[i].totPerc);
        }
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 0.14 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 120 }}>
                    <View>
                        <Text style={{ fontSize: 20, color: 'black', fontWeight: '700' }}>
                            {tot_Perc}
                        </Text>
                    </View>
                </View>
                <View style={{ width: 0.06 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 120 }}>
                    <View>
                        {(tot_Perc) <= this.state.other_threshold ?
                            <Image
                                source={require('../assets/sample_inspection/Tick.png')}
                                style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', textAlign: 'center', marginTop: 10 }} /> :
                            <Image
                                source={require('../assets/sample_inspection/Cross.png')}
                                style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', textAlign: 'center', marginTop: 10 }} />
                        }
                    </View>
                </View>
            </View>
        )
    }

    printImage() {
        return (
            <View style={{ marginTop: 7, flexDirection: 'row' }} >
                {/*{this.state.user_Credentials.first_name !== '' ?
                    <Text style={{fontWeight: 700, color: 'white'}}>
                        {(this.state.user_Credentials.first_name).slice(0, 1).toUpperCase()}{(this.state.user_Credentials.last_name).slice(0, 1).toUpperCase()}
                    </Text> :
                    <Text style={{fontWeight: 700, color: 'white'}}>
                        {(this.state.user_Credentials.username).slice(0, 1).toUpperCase()}
                    </Text>
                }*/}
                <Image source={require('../assets/UserBG.png')} style={{ width: 50, height: 50 }} />
                <Image source={require('../assets/User.png')} style={{ width: 40, height: 40, right: 45 }} />
            </View>
        )
    }

    quickSearch(name, text) {
        var external_defects = [];
        var internal_defects = [];
        var other_defects = [];
        var external_value = this.state.external_defects;
        var internal_value = this.state.internal_defects;
        var other_value = this.state.other_defects;
        var external_length = external_value.length;
        var internal_length = internal_value.length;
        var other_length = other_value.length;
        if (name === 'external Defects') {
            for (let i = 0; i < external_length; i++) {
                if (external_value[i].label.includes(text)) {
                    external_defects.push(external_value[i])
                }
            }
            this.setState({
                isUpdate: !this.state.isUpdate,
                searched_external_defects: external_defects
            });
        }
        else if (name === 'internal Defects') {
            for (let i = 0; i < internal_length; i++) {
                if (internal_value[i].label.includes(text)) {
                    internal_defects.push(internal_value[i])
                }
            }
            this.setState({
                isUpdate: !this.state.isUpdate,
                searched_internal_defects: internal_defects
            })
        }
        else {
            for (let i = 0; i < other_length; i++) {
                if (other_value[i].label.includes(text)) {
                    other_defects.push(other_value[i])
                }
            }
            this.setState({
                isUpdate: !this.state.isUpdate,
                selected_other_defects: other_defects
            })
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <View style={{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-between', height: 70 }}>
                    <View>
                        <Image source={require('../assets/inspection_page/Agsift_Color_Logo.png')} style={{ height: 40, width: 120, marginTop: 5 }} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: '#24C656', fontSize: 30, fontWeight: '700', textAlign: 'center', left: 43 }}>
                            Inspection
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {/*<TouchableOpacity>*/}
                        {/*    <Image source={require('../assets/inspection_page/Alsum_Logo.png')} style={{height: 40, width: 110, marginRight: 70, marginTop: 5}}/>*/}
                        {/*</TouchableOpacity>*/}
                        {this.state.user_credentials !== '' ?
                            <View>
                                {this.printImage()}
                            </View> :
                            <View />
                        }
                        <Text style={{ color: '#333333', fontSize: 18, lineHeight: 15, right: 30, textAlign: 'center', paddingTop: 30 }}>
                            {this.state.user_credentials.first_name} {this.state.user_credentials.last_name}
                        </Text>
                    </View>
                </View>
                <ScrollView ref='scrollView' style={{ zIndex: -1, flex: 1, flexGrow: 1, borderWidth: 1, borderRadius: 10, borderColor: '#c6c6c6', marginLeft: 20, marginRight: 20, marginBottom: 20, paddingBottom: 50 }}>
                    {(this.state.isRangeType1Updated && this.state.isRangeType2Updated) && this.state.isDataUpload ?
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                                <View style={{ borderWidth: 1, borderColor: '#c6c6c6', backgroundColor: '#ffffff', paddingTop: 5, paddingBottom: 5, padding: 40, borderRadius: 50, width: 0.29 * width }}>
                                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#c6c6c6' }}>
                                        General Information
                            </Text>
                                </View>
                                <View style={{ backgroundColor: '#ffffff', paddingTop: 5, paddingBottom: 5, padding: 40, borderColor: '#24C656', borderWidth: 1, borderRadius: 50, width: 0.29 * width }}>
                                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#24C656', fontWeight: '700' }}>
                                        Sample Inspection
                            </Text>
                                </View>
                                <View style={{ backgroundColor: '#ffffff', paddingTop: 5, paddingBottom: 5, padding: 40, borderColor: '#c6c6c6', borderWidth: 1, borderRadius: 50, width: 0.29 * width }}>
                                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#c6c6c6' }}>
                                        Report
                            </Text>
                                </View>
                            </View>
                            <KeyboardAwareScrollView>
                                <View style={{ marginTop: 25, marginLeft: 10 }}>
                                    <View style={{ flexDirection: 'row', flex: 1, marginRight: 20 }}>
                                        <ScrollView horizontal>
                                            {this.printSamples()}
                                        </ScrollView>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                        <View>
                                            <Text style={{ fontSize: 13, color: 'black', textAlign: 'left' }}>
                                                Sample Weight [lb]
                                    </Text>
                                            {this.state.isSampleWeightCorrect ?
                                                <View style={{ width: 0.18 * width, }}>
                                                    <TextInput
                                                        placeholder={'20'}
                                                        value={this.state.sample_weight}
                                                        placeholderTextColor="black"
                                                        onChangeText={(text) => (this.updateSampleBasicInfo("sample_weight", text))}
                                                        editable={true}
                                                        keyboardType='numeric'
                                                        maxLength={1000000000000000}
                                                        minLength={2}
                                                        style={{
                                                            width: 0.13 * width,
                                                            height: 40,
                                                            borderWidth: 1,
                                                            borderColor: '#c6c6c6',
                                                            borderRadius: 3,
                                                            marginTop: 5,
                                                            color: 'black',
                                                            fontSize: 13,
                                                            paddingLeft: 10
                                                        }}
                                                    />
                                                    <Text style={{ color: '#c6c6c6', fontSize: 10, }}>
                                                        *Min value is 20 lb
                                            </Text>
                                                </View> :
                                                <View style={{ width: 0.18 * width, }}>
                                                    <TextInput
                                                        placeholder={'20'}
                                                        value={this.state.sample_weight}
                                                        placeholderTextColor="black"
                                                        onChangeText={(text) => (this.updateSampleBasicInfo("sample_weight", text))}
                                                        editable={true}
                                                        keyboardType='numeric'
                                                        maxLength={1000000000000000}
                                                        minLength={2}
                                                        style={{
                                                            width: 0.13 * width,
                                                            height: 40,
                                                            borderWidth: 1,
                                                            borderColor: 'red',
                                                            borderRadius: 3,
                                                            marginTop: 5,
                                                            color: 'black',
                                                            fontSize: 13,
                                                            paddingLeft: 10
                                                        }}
                                                    />
                                                    <Text style={{ color: 'red', fontSize: 10, }}>
                                                        *Min value is 20 lb
                                            </Text>
                                                </View>
                                            }
                                        </View>
                                        <View style={{ width: 0.2 * width, marginLeft: 30 }}>
                                            <Text style={{ fontSize: 13, color: 'black', textAlign: 'left' }}>
                                                Pulp Temperature(&#176;F)
                                    </Text>
                                            <TextInput
                                                onChangeText={(text) => (this.setState({ pulpTemperature: text }), this.updateSampleBasicInfo("pulp_temperature", text))}
                                                value={this.state.pulpTemperature}
                                                editable={true}
                                                keyboardType={'numeric'}
                                                maxLength={20}
                                                style={{
                                                    width: 0.13 * width,
                                                    textAlign: 'left',
                                                    color: '#000000',
                                                    fontSize: 13,
                                                    borderWidth: 1,
                                                    borderColor: '#c6c6c6',
                                                    paddingLeft: 10,
                                                    marginTop: 5,
                                                    height: 40,
                                                    borderRadius: 3
                                                }}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 30 }}>
                                        <TouchableOpacity onPress={() => this.setState({ isSelectedBasicRequirements: !this.state.isSelectedBasicRequirements })}>
                                            {this.state.isSelectedBasicRequirements ?
                                                <View style={{
                                                    backgroundColor: 'white', maxWidth: 180, paddingTop: 15, paddingBottom: 15, padding: 10, borderRadius: 3, borderColor: '#24C656', borderWidth: 1,
                                                    shadowColor: '#000',
                                                    shadowOffset: { width: 2, height: 2 },
                                                    shadowOpacity: 0.4,
                                                    shadowRadius: 2
                                                }}>
                                                    <Text style={{ color: '#24C656', fontSize: 13, fontWeight: '700', textAlign: 'center' }}>- Basic Requirements</Text>
                                                </View> :
                                                <View style={{ backgroundColor: '#24C656', maxWidth: 180, paddingTop: 15, paddingBottom: 15, padding: 10, borderRadius: 3 }}>
                                                    <Text style={{ color: '#ffffff', fontSize: 13, fontWeight: '700' }}>+ Basic Requirements</Text>
                                                </View>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    {this.state.isSelectedBasicRequirements ?
                                        <View>
                                            <View style={{
                                                marginTop: 15,
                                                flex: 1,
                                                flexDirection: 'row',
                                                flexGrow: 1,
                                                justifyContent: 'space-between',
                                                marginRight: 25
                                            }}>
                                                <View style={{ width: 0.2 * width }}>
                                                    <Text style={{ fontSize: 13, color: 'black', textAlign: 'left' }}>
                                                        Firmness
                                            </Text>
                                                    <Dropdown name={"Firmness"} data={this.state.firmness}
                                                        defaultItem={this.state.selectedFirmness} sendData={this.getData} />
                                                </View>
                                                <View style={{ width: 0.2 * width }}>
                                                    <Text style={{ fontSize: 13, color: 'black', textAlign: 'left' }}>
                                                        Cleanness
                                            </Text>
                                                    <Dropdown name={"Cleanness"} data={this.state.cleanness}
                                                        defaultItem={this.state.selectedCleanness} sendData={this.getData} />
                                                </View>
                                                <View style={{ width: 0.2 * width }}>
                                                    <Text style={{ fontSize: 13, color: 'black', textAlign: 'left' }}>
                                                        Shape
                                            </Text>
                                                    <Dropdown name={"Shape"} data={this.state.shape} defaultItem={this.state.selectedShape}
                                                        sendData={this.getData} />
                                                </View>
                                                <View style={{ width: 0.2 * width }}>
                                                    <Text style={{ fontSize: 13, color: 'black', textAlign: 'left' }}>
                                                        Maturity
                                            </Text>
                                                    <Dropdown name={"Maturity"} data={this.state.maturity}
                                                        defaultItem={this.state.selectedMaturity} sendData={this.getData} />
                                                </View>
                                            </View>
                                            <View style={{
                                                marginTop: 10,
                                                flex: 1,
                                                flexDirection: 'row',
                                                flexGrow: 1,
                                                justifyContent: 'space-between',
                                                marginRight: 25
                                            }}>
                                                <View style={{ width: 0.2 * width }}>
                                                    <Text style={{ fontSize: 13, color: 'black', textAlign: 'left' }}>
                                                        Skinning
                                            </Text>
                                                    <Dropdown name={"Skinning"} data={this.state.skinning}
                                                        defaultItem={this.state.selectedSkinning} sendData={this.getData} />
                                                </View>
                                            </View>
                                        </View> :
                                        <View />
                                    }
                                    <View style={{ marginTop: 30 }}>
                                        <TouchableOpacity onPress={() => this.setState({ isSelectedSizeDesignation: !this.state.isSelectedSizeDesignation })}>
                                            {this.state.isSelectedSizeDesignation ?
                                                <View style={{
                                                    backgroundColor: 'white', maxWidth: 180, paddingTop: 15, paddingBottom: 15, padding: 10, borderRadius: 3, borderWidth: 1, borderColor: '#24C656',
                                                    shadowColor: '#000',
                                                    shadowOffset: { width: 2, height: 2 },
                                                    shadowOpacity: 0.4,
                                                    shadowRadius: 2
                                                }}>
                                                    <Text style={{ color: '#24C656', fontSize: 13, fontWeight: '700', textAlign: 'center' }}>- Size Designation</Text>
                                                </View> :
                                                <View style={{ backgroundColor: '#24C656', maxWidth: 180, paddingTop: 15, paddingBottom: 15, padding: 10, borderRadius: 3 }}>
                                                    <Text style={{ color: '#ffffff', fontSize: 13, fontWeight: '700' }}>+ Size Designation</Text>
                                                </View>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    {this.state.isSelectedSizeDesignation ?
                                        <View>
                                            <View style={{ marginTop: 5, flex: 1 }}>
                                                <View style={{
                                                    backgroundColor: '#24C656',
                                                    borderTopLeftRadius: 80,
                                                    borderTopRightRadius: 80,
                                                    marginLeft: 0.41 * width,
                                                    width: 75
                                                }}>
                                                    <Text style={{
                                                        color: '#ffffff',
                                                        fontWeight: '700',
                                                        fontSize: 10,
                                                        padding: 5,
                                                        textAlign: 'center',
                                                        paddingLeft: 20,
                                                        paddingRight: 20,
                                                        paddingBottom: 20
                                                    }}>
                                                        Type 1
                                            </Text>
                                                </View>
                                                <View style={{ border: 0, borderColor: '#000000', marginRight: 0.046 * width }}>
                                                    <View style={{ flexDirection: 'row', alignSelf: 'space-around' }}>
                                                        <Text style={{
                                                            width: 0.22 * width,
                                                            textAlign: 'center',
                                                            color: '#343434',
                                                            fontSize: 13,
                                                            borderWidth: 1,
                                                            borderColor: '#c6c6c6',
                                                            paddingTop: 10,
                                                            paddingBottom: 10,
                                                            padding: 15
                                                        }}>
                                                            Range
                                                </Text>
                                                        <Text style={{
                                                            width: 0.08 * width,
                                                            textAlign: 'center',
                                                            color: '#343434',
                                                            fontSize: 13,
                                                            borderWidth: 1,
                                                            borderColor: '#c6c6c6',
                                                            paddingTop: 10,
                                                            paddingBottom: 10,
                                                            padding: 15
                                                        }}>
                                                            Units
                                                </Text>
                                                        <Text style={{
                                                            width: 0.13 * width,
                                                            textAlign: 'center',
                                                            color: '#343434',
                                                            fontSize: 13,
                                                            borderWidth: 1,
                                                            borderColor: '#c6c6c6',
                                                            paddingTop: 10,
                                                            paddingBottom: 10,
                                                            padding: 15
                                                        }}>
                                                            Min Weight(oz/lb)
                                                </Text>
                                                        <Text style={{
                                                            width: 0.13 * width,
                                                            textAlign: 'center',
                                                            color: '#343434',
                                                            fontSize: 13,
                                                            borderWidth: 1,
                                                            borderColor: '#c6c6c6',
                                                            paddingTop: 10,
                                                            paddingBottom: 10,
                                                            padding: 15
                                                        }}>
                                                            Max Weight(oz/lb)
                                                </Text>
                                                        <Text style={{
                                                            width: 0.12 * width,
                                                            textAlign: 'center',
                                                            color: '#343434',
                                                            fontSize: 13,
                                                            borderWidth: 1,
                                                            borderColor: '#c6c6c6',
                                                            paddingTop: 10,
                                                            paddingBottom: 10,
                                                            padding: 15
                                                        }}>
                                                            Undersize(lb)
                                                </Text>
                                                        <Text style={{
                                                            width: 0.12 * width,
                                                            textAlign: 'center',
                                                            color: '#343434',
                                                            fontSize: 13,
                                                            borderWidth: 1,
                                                            borderColor: '#c6c6c6',
                                                            paddingTop: 10,
                                                            paddingBottom: 10,
                                                            padding: 15
                                                        }}>
                                                            Oversize(lb)
                                                </Text>
                                                        <Text style={{
                                                            width: 0.06 * width,
                                                            textAlign: 'center',
                                                            color: '#343434',
                                                            fontSize: 13,
                                                            borderWidth: 1,
                                                            borderColor: '#c6c6c6',
                                                            paddingTop: 10,
                                                            paddingBottom: 10,
                                                            padding: 15
                                                        }}>
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={{ flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'space-around' }}>
                                                        <View style={{
                                                            width: 0.22 * width,
                                                            borderWidth: 1,
                                                            borderColor: '#c6c6c6',
                                                            paddingLeft: 20,
                                                            paddingTop: 10,
                                                            paddingBottom: 10
                                                        }}>
                                                            <Dropdown name={"Range_type1"}
                                                                data={Object.keys(this.state.range_type1)} defaultItem={this.state.selectedRangeType1}
                                                                sendData={this.getData} />
                                                        </View>
                                                        <View style={{
                                                            width: 0.08 * width,
                                                            borderWidth: 1,
                                                            borderColor: '#c6c6c6',
                                                            paddingLeft: 15,
                                                            paddingTop: 10,
                                                            paddingBottom: 10
                                                        }}>
                                                            <Dropdown name={"Range_type1_units"} data={['lb', 'oz']}
                                                                defaultItem={'lb'} sendData={this.getData} />
                                                        </View>
                                                        <View style={{
                                                            width: 0.13 * width,
                                                            borderWidth: 1,
                                                            borderColor: '#c6c6c6',
                                                            paddingTop: 15,
                                                            paddingBottom: 10,
                                                            padding: 15
                                                        }}>
                                                            {this.state.selectedRangeType1Object && this.state.selectedRangeType1Object.minWeight !== ' ' ?
                                                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                    <View style={{
                                                                        width: 0.08 * width,
                                                                        textAlign: 'left',
                                                                        backgroundColor: '#c6c6c6',
                                                                        color: 'black',
                                                                        fontSize: 13,
                                                                        borderBottomWidth: 1,
                                                                        borderBottomColor: '#c6c6c6',
                                                                        paddingTop: 10,
                                                                        paddingBottom: 10,
                                                                        height: 40,
                                                                        padding: 15
                                                                    }}>
                                                                        <Text style={{ textAlign: 'center' }}>
                                                                            {this.state.selectedRangeType1Object.minWeight}
                                                                        </Text>
                                                                    </View>
                                                                    <Text style={{ marginTop: 10, marginLeft: 3 }}>{this.state.selectedRangeType1Units}</Text>
                                                                </View> :
                                                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                    <TextInput
                                                                        value={''}
                                                                        editable={false}
                                                                        maxLength={20}
                                                                        style={{
                                                                            width: 0.08 * width,
                                                                            textAlign: 'left',
                                                                            backgroundColor: '#c6c6c6',
                                                                            color: 'black',
                                                                            fontSize: 13,
                                                                            borderBottomWidth: 1,
                                                                            borderBottomColor: '#c6c6c6',
                                                                            paddingTop: 10,
                                                                            paddingBottom: 10,
                                                                            height: 40,
                                                                            padding: 15
                                                                        }}
                                                                    />
                                                                </View>
                                                            }
                                                        </View>
                                                        <View style={{
                                                            width: 0.13 * width,
                                                            borderWidth: 1,
                                                            borderColor: '#c6c6c6',
                                                            paddingTop: 15,
                                                            paddingBottom: 10,
                                                            padding: 15
                                                        }}>
                                                            {this.state.selectedRangeType1Object && this.state.selectedRangeType1Object.maxWeight !== ' ' ?
                                                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                        <View style={{
                                                                            width: 0.08 * width,
                                                                            textAlign: 'left',
                                                                            backgroundColor: '#c6c6c6',
                                                                            color: 'black',
                                                                            fontSize: 13,
                                                                            borderBottomWidth: 1,
                                                                            borderBottomColor: '#c6c6c6',
                                                                            paddingTop: 10,
                                                                            paddingBottom: 10,
                                                                            height: 40,
                                                                            padding: 15
                                                                        }}>
                                                                            <Text style={{ textAlign: 'center' }}>
                                                                                {this.state.selectedRangeType1Object.maxWeight}
                                                                            </Text>
                                                                        </View>
                                                                        <Text
                                                                            style={{ marginTop: 10, marginLeft: 3 }}>{this.state.selectedRangeType1Units}</Text>
                                                                    </View>
                                                                </View> :
                                                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                    <TextInput
                                                                        value={''}
                                                                        editable={false}
                                                                        maxLength={20}
                                                                        style={{
                                                                            width: 0.08 * width,
                                                                            textAlign: 'left',
                                                                            backgroundColor: '#c6c6c6',
                                                                            color: 'black',
                                                                            fontSize: 13,
                                                                            borderBottomWidth: 1,
                                                                            borderBottomColor: '#c6c6c6',
                                                                            paddingTop: 10,
                                                                            paddingBottom: 10,
                                                                            height: 40,
                                                                            padding: 15
                                                                        }}
                                                                    />
                                                                </View>
                                                            }
                                                        </View>
                                                        <View style={{
                                                            width: 0.12 * width,
                                                            borderWidth: 1,
                                                            borderColor: '#c6c6c6',
                                                            paddingTop: 15,
                                                            paddingBottom: 10,
                                                            padding: 15
                                                        }}>
                                                            <TextInput
                                                                onEndEditing={(event) => (this.updateType1Object("underSize", event.nativeEvent.text))}
                                                                placeholder={this.state.selectedRangeType1ObjectTotal.underSize}
                                                                editable={true}
                                                                maxLength={20}
                                                                keyboardType={'numeric'}
                                                                style={{
                                                                    width: 0.08 * width,
                                                                    textAlign: 'center',
                                                                    color: 'black',
                                                                    fontSize: 13,
                                                                    borderWidth: 1,
                                                                    borderColor: '#c6c6c6',
                                                                    paddingTop: 10,
                                                                    paddingBottom: 10,
                                                                    height: 40,
                                                                    padding: 15
                                                                }}
                                                            />
                                                            <Text style={{ textAlign: 'center' }}>
                                                                <Text style={{ fontSize: 12, color: 'black' }}>{this.state.type1_percentage.underSize}</Text>
                                                                <Text style={{ fontSize: 12, color: 'black' }}>%</Text>
                                                            </Text>
                                                        </View>
                                                        <View style={{
                                                            width: 0.12 * width,
                                                            borderWidth: 1,
                                                            borderColor: '#c6c6c6',
                                                            paddingTop: 15,
                                                            paddingBottom: 10,
                                                            padding: 15
                                                        }}>
                                                            <TextInput
                                                                onEndEditing={(event) => (this.updateType1Object("overSize", event.nativeEvent.text))}
                                                                placeholder={this.state.selectedRangeType1ObjectTotal.overSize}
                                                                editable={true}
                                                                maxLength={20}
                                                                keyboardType={'numeric'}
                                                                style={{
                                                                    width: 0.08 * width,
                                                                    textAlign: 'center',
                                                                    color: 'black',
                                                                    fontSize: 13,
                                                                    borderWidth: 1,
                                                                    borderColor: '#c6c6c6',
                                                                    paddingTop: 10,
                                                                    paddingBottom: 10,
                                                                    height: 40,
                                                                    padding: 15
                                                                }}
                                                            />
                                                            <Text style={{ textAlign: 'center' }}>
                                                                <Text style={{ fontSize: 12, color: 'black', maxWidth: 10 }}>{this.state.type1_percentage.overSize}</Text>
                                                                <Text style={{ fontSize: 12, color: 'black' }}>%</Text>
                                                            </Text>
                                                        </View>
                                                        <View style={{
                                                            width: 0.06 * width,
                                                            borderWidth: 1,
                                                            borderColor: '#c6c6c6',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}>
                                                            <View>
                                                                {this.state.type1_percentage.underSize <= 3 && this.state.type1_percentage.overSize <= 10 ?
                                                                    <Image source={require('../assets/sample_inspection/Tick.png')}
                                                                        style={{ width: 30, height: 30, marginTop: 5 }} /> :
                                                                    <Image source={require('../assets/sample_inspection/Cross.png')}
                                                                        style={{ width: 30, height: 30, marginTop: 5 }} />
                                                                }
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ marginTop: 15, flex: 1, marginRight: 0.04 * width }}>
                                                <View
                                                    style={{ flex: 1, flexDirection: 'row', flexGrow: 1, marginLeft: 0.41 * width }}>
                                                    <View style={{
                                                        backgroundColor: '#24C656',
                                                        borderTopLeftRadius: 80,
                                                        borderTopRightRadius: 80
                                                    }}>
                                                        <Text style={{
                                                            color: '#ffffff',
                                                            paddingRight: 20,
                                                            paddingLeft: 20,
                                                            paddingBottom: 20,
                                                            fontWeight: '700',
                                                            fontSize: 10,
                                                            padding: 5,
                                                            textAlign: 'center'
                                                        }}>
                                                            Type 2
                                                </Text>
                                                    </View>
                                                    <View style={{
                                                        flex: 1,
                                                        flexDirection: 'row',
                                                        justifyContent: 'flex-end',
                                                        marginLeft: 0.2 * width
                                                    }}>
                                                        {/*<Text style={{fontSize: 13, textAlign: 'center', alignItems: "center", justifyContent: 'center', marginLeft: 5}}>
                                                Select Inches / mm
                                            </Text>
                                            <Dropdown name={"Range_type2_Main_Units"} data={["inches", "mm"]} defaultItem={'inches'} sendData={this.getData}/>*/}
                                                        <TouchableOpacity onPress={this.openAnotherType2}>
                                                            <Text
                                                                style={{ paddingLeft: 10, paddingRight: 10, padding: 5, color: '#24C656', backgroundColor: 'white', fontSize: 15, borderRadius: 5, borderWidth: 1, borderColor: '#24C656' }}>
                                                                Add Range
                                                    </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <View style={{ border: 0, borderColor: '#000000', marginLeft: 10, marginRight: 10 }}>
                                                    <View
                                                        style={{ flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'space-around' }}>
                                                        <Text style={{
                                                            width: 0.2 * width,
                                                            textAlign: 'center',
                                                            color: '#343434',
                                                            fontSize: 13,
                                                            borderWidth: 1,
                                                            borderColor: '#c6c6c6',
                                                            paddingTop: 10,
                                                            paddingBottom: 10,
                                                            padding: 15
                                                        }}>
                                                            Range
                                                </Text>
                                                        <Text style={{
                                                            width: 0.66 * width,
                                                            textAlign: 'center',
                                                            color: '#343434',
                                                            fontSize: 13,
                                                            borderWidth: 1,
                                                            borderColor: '#c6c6c6',
                                                            paddingTop: 10,
                                                            paddingBottom: 10,
                                                            padding: 15
                                                        }}>
                                                            Details
                                                </Text>
                                                    </View>
                                                    <View>
                                                        {this.renderType2UI()}
                                                    </View>
                                                </View>
                                            </View>
                                        </View> :
                                        <View />
                                    }
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
                                        <View style={{ borderColor: '#24C656', flex: 0.2, borderRadius: 50, textAlign: 'center', borderWidth: 1, backgroundColor: '#ffffff' }}>
                                            <Text style={{ color: '#24C656', fontSize: 13, paddingTop: 5, paddingBottom: 5, padding: 3, textAlign: 'center', fontWeight: '500' }}>
                                                External Defects
                                    </Text>
                                        </View>
                                        <View style={{ borderWidth: 0.5, borderColor: '#24C656', flex: 1, height: 0, marginLeft: 5, marginRight: 5, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }} />
                                    </View>
                                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-start', marginTop: 10 }}>
                                        <View style={{}}>
                                            <TextInput
                                                placeholder={'Quick Search'}
                                                // onEndEditing={(value)=>this.quickSearch('external Defects', value.nativeEvent.text)}
                                                onChangeText={(value) => this.quickSearch('external Defects', value)}
                                                editable={true}
                                                maxLength={20}
                                                style={{ width: 0.40 * width, textAlign: 'left', color: 'black', fontSize: 13, borderBottomWidth: 1, borderBottomColor: '#c6c6c6', paddingTop: 10, paddingBottom: 10, padding: 15 }}
                                            />
                                            <View style={{ flex: 1, marginTop: 10, width: 0.43 * width }}>
                                                {this.state.isUpdate ?
                                                    <FlatList
                                                        key={this.state.searched_external_defects.length}
                                                        data={this.state.searched_external_defects}
                                                        numColumns={3}
                                                        extraData={this.state}
                                                        renderItem={({ item }) => this.displayExternalDefects(item)}
                                                        keyExtractor={(index) => index.toString()}
                                                    /> :
                                                    <FlatList
                                                        key={this.state.searched_external_defects.length}
                                                        data={this.state.searched_external_defects}

                                                        numColumns={3}
                                                        extraData={this.state}
                                                        renderItem={({ item }) => this.displayExternalDefects(item)}
                                                        keyExtractor={(index) => index.toString()}
                                                    />
                                                }
                                            </View>
                                        </View>
                                        <View style={{ width: 0.50 * width, flex: 1 }}>
                                            <ScrollView style={{ flexGrow: 1 }}>
                                                {this.state.selected_external_defects[0] === undefined ?
                                                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                                        <Image source={require('../assets/sample_inspection/empty_defects.png')}
                                                            style={{ width: 0.2 * width, height: 300 }} />
                                                    </View> :
                                                    <View style={{ flex: 1, marginLeft: 10 }}>
                                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                                            <View style={{ width: 0.15 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 60 }}>
                                                                <Text style={{ fontSize: 13, color: '#24C656', textAlign: 'center' }}>
                                                                    Defect
                                                        </Text>
                                                            </View>
                                                            <View style={{ width: 0.14 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 60 }}>
                                                                <Text style={{ fontSize: 13, color: '#24C656', textAlign: 'center' }}>
                                                                    DAMAGE (lb)
                                                        </Text>
                                                            </View>
                                                            <View style={{ width: 0.14 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 60 }}>
                                                                <Text style={{ fontSize: 13, color: '#24C656', textAlign: 'center' }}>
                                                                    SERIOUS DAMAGE (lb)
                                                        </Text>
                                                            </View>
                                                            <View style={{ width: 0.06 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 60 }}>
                                                                <Text style={{ fontSize: 13, color: '#24C656', textAlign: 'center' }}>

                                                                </Text>
                                                            </View>
                                                        </View>
                                                        <FlatList
                                                            data={this.state.selected_external_defects}
                                                            extraData={this.state}
                                                            renderItem={({ item, index }) =>
                                                                (<View style={{ flex: 1, flexDirection: 'row' }}>
                                                                    <View style={{ width: 0.15 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 125 }}>
                                                                        <Text style={{ fontSize: 15, color: '#24C656', textAlign: 'center' }}>
                                                                            {item.label}
                                                                        </Text>
                                                                    </View>
                                                                    <View style={{ width: 0.14 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 125 }}>
                                                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                            <TextInput
                                                                                value={item.damageValue}
                                                                                onChangeText={(damageValue) => this.updateExternalDefects("damage", damageValue, index)}
                                                                                editable={true}
                                                                                keyboardType={'numeric'}
                                                                                maxLength={20}
                                                                                style={{ width: 0.07 * width, textAlign: 'left', color: 'black', fontSize: 13, borderWidth: 1, borderColor: '#343434', paddingLeft: 10, height: 40 }}
                                                                            />
                                                                            <Text style={{ marginTop: 10, color: 'black', fontSize: 13, marginLeft: 3 }}>
                                                                                lb
                                                                    </Text>
                                                                            <Text style={{
                                                                                marginTop: 10,
                                                                                marginLeft: 5,
                                                                                color: 'black',
                                                                                fontSize: 13
                                                                            }}>
                                                                                {this.state.external_defect_perc_calculate[index].damagePerc}%
                                                                    </Text>
                                                                        </View>
                                                                        <Text style={{ fontSize: 13, color: 'black' }}>
                                                                            {item.damageHint}
                                                                        </Text>
                                                                    </View>
                                                                    <View style={{ width: 0.14 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 125 }}>
                                                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                            <TextInput
                                                                                value={item.seriousDamageValue}
                                                                                keyboardType={'numeric'}
                                                                                onChangeText={(seriousDamageValue) => this.updateExternalDefects("seriousdamage", seriousDamageValue, index)}
                                                                                editable={true}
                                                                                maxLength={20}
                                                                                style={{ width: 0.07 * width, textAlign: 'left', color: 'black', fontSize: 13, borderWidth: 1, borderColor: '#343434', paddingLeft: 10, height: 40 }}
                                                                            />
                                                                            <Text style={{ marginTop: 10, color: 'black', fontSize: 13, marginLeft: 3 }}>
                                                                                lb
                                                                    </Text>
                                                                            <Text style={{
                                                                                marginTop: 10,
                                                                                marginLeft: 5,
                                                                                color: 'black',
                                                                                fontSize: 13
                                                                            }}>
                                                                                {this.state.external_defect_perc_calculate[index].seriousDamagePerc}%
                                                                    </Text>
                                                                        </View>
                                                                        <Text style={{ fontSize: 13, color: 'black' }}>
                                                                            {item.seriousDamageHint}
                                                                        </Text>
                                                                    </View>
                                                                    <View style={{ width: 0.06 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 125 }}>
                                                                        <View>
                                                                            <TouchableOpacity onPress={() => this.deleteExternalDefect(item)} style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                                                                <Image source={require('../assets/sample_inspection/Delete.png')} style={{ width: 30, height: 30 }} />
                                                                            </TouchableOpacity>
                                                                            {this.state.external_defect_perc_calculate[index].status ?
                                                                                <Image
                                                                                    source={require('../assets/sample_inspection/Tick.png')}
                                                                                    style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', textAlign: 'center', marginTop: 10 }} /> :
                                                                                <Image
                                                                                    source={require('../assets/sample_inspection/Cross.png')}
                                                                                    style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center', textAlign: 'center', alignSelf: 'center', marginTop: 10 }} />
                                                                            }
                                                                        </View>
                                                                    </View>
                                                                </View>)
                                                            }
                                                            keyExtractor={(key) => key.toString()}
                                                        />
                                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                                            <View style={{ width: 0.29 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 120, justifyContent: 'center', alignItems: 'center' }}>
                                                                <Text style={{ fontSize: 15, color: '#24C656', textAlign: 'center', fontWeight: 'bold' }}>
                                                                    Total :
                                                        </Text>
                                                            </View>
                                                            <View>
                                                                {this.printExternalTotal()}
                                                            </View>
                                                        </View>
                                                    </View>
                                                }
                                            </ScrollView>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                                        <View style={{ borderWidth: 1, borderColor: '#24C656', flex: 0.2, borderRadius: 50, textAlign: 'center' }}>
                                            <Text style={{ color: '#24C656', fontSize: 13, paddingTop: 5, paddingBottom: 5, padding: 3, textAlign: 'center', fontWeight: '500' }}>
                                                Internal Defects
                                    </Text>
                                        </View>
                                        <View style={{ borderWidth: 0.5, borderColor: '#24C656', flex: 1, height: 0, marginLeft: 5, marginRight: 5, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }} />
                                    </View>
                                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-start', marginTop: 10 }}>
                                        <View style={{}}>
                                            <View style={{}}>
                                                <TextInput
                                                    placeholder={'Quick Search'}
                                                    onChangeText={(value) => this.quickSearch('internal Defects', value)}
                                                    editable={true}
                                                    maxLength={20}
                                                    style={{ width: 0.40 * width, textAlign: 'left', color: 'black', fontSize: 13, borderBottomWidth: 1, borderBottomColor: '#c6c6c6', paddingTop: 10, paddingBottom: 10, padding: 15 }}
                                                />
                                                <View style={{ flex: 1, marginTop: 10, width: 0.43 * width }}>
                                                    {this.state.isUpdate ?
                                                        <FlatList
                                                            key={this.state.searched_internal_defects.length}
                                                            data={this.state.searched_internal_defects}
                                                            numColumns={3}
                                                            extraData={this.state}
                                                            renderItem={({ item }) => this.displayInternalDefects(item)}
                                                            keyExtractor={(index) => index.toString()}
                                                        /> :
                                                        <FlatList
                                                            key={this.state.searched_internal_defects.length}
                                                            data={this.state.searched_internal_defects}
                                                            numColumns={3}
                                                            extraData={this.state}
                                                            renderItem={({ item }) => this.displayInternalDefects(item)}
                                                            keyExtractor={(index) => index.toString()}
                                                        />
                                                    }
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ width: 0.50 * width, flex: 1 }}>
                                            <ScrollView style={{ flexGrow: 1 }}>
                                                {this.state.selected_internal_defects[0] === undefined ?
                                                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                                        <Image source={require('../assets/sample_inspection/empty_defects.png')}
                                                            style={{ width: 0.2 * width, height: 300 }} />
                                                    </View> :
                                                    <View style={{ flex: 1, marginLeft: 10 }}>
                                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                                            <View style={{ width: 0.15 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 60 }}>
                                                                <Text style={{ fontSize: 13, color: '#24C656', textAlign: 'center' }}>
                                                                    Defect
                                                        </Text>
                                                            </View>
                                                            <View style={{ width: 0.14 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 60 }}>
                                                                <Text style={{ fontSize: 13, color: '#24C656', textAlign: 'center' }}>
                                                                    DAMAGE (lb)
                                                        </Text>
                                                            </View>
                                                            <View style={{ width: 0.14 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 60 }}>
                                                                <Text style={{ fontSize: 13, color: '#24C656', textAlign: 'center' }}>
                                                                    SERIOUS DAMAGE (lb)
                                                        </Text>
                                                            </View>
                                                            <View style={{ width: 0.06 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 60 }}>
                                                                <Text style={{ fontSize: 13, color: '#24C656', textAlign: 'center' }}>

                                                                </Text>
                                                            </View>
                                                        </View>
                                                        <FlatList
                                                            data={this.state.selected_internal_defects}
                                                            extraData={this.state}
                                                            renderItem={({ item, index }) =>
                                                                (<View style={{ flex: 1, flexDirection: 'row' }}>
                                                                    <View style={{ width: 0.15 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 125 }}>
                                                                        <Text style={{ fontSize: 15, color: '#24C656', textAlign: 'center' }}>
                                                                            {item.label}
                                                                        </Text>
                                                                    </View>
                                                                    <View style={{ width: 0.14 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 125 }}>
                                                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                            <TextInput
                                                                                value={item.damageValue}
                                                                                keyboardType={'numeric'}
                                                                                onChangeText={(damageValue) => this.updateInternalDefects("damage", damageValue, index)}
                                                                                editable={true}
                                                                                maxLength={20}
                                                                                style={{ width: 0.07 * width, textAlign: 'left', color: 'black', fontSize: 13, borderWidth: 1, borderColor: '#343434', paddingLeft: 10, height: 40 }}
                                                                            />
                                                                            <Text style={{ marginTop: 10, color: 'black', fontSize: 13, marginLeft: 3 }}>
                                                                                lb
                                                                    </Text>
                                                                            <Text style={{
                                                                                marginTop: 10,
                                                                                marginLeft: 5,
                                                                                color: 'black',
                                                                                fontSize: 13
                                                                            }}>
                                                                                {this.state.internal_defect_perc_calculate[index].damagePerc}%
                                                                    </Text>
                                                                        </View>
                                                                        <Text style={{ fontSize: 13, color: 'black', textAlign: 'center' }}>
                                                                            {item.damageHint}
                                                                        </Text>
                                                                    </View>
                                                                    <View style={{ width: 0.14 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 125 }}>
                                                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                            <TextInput
                                                                                value={item.seriousDamageValue}
                                                                                keyboardType={'numeric'}
                                                                                onChangeText={(seriousDamageValue) => this.updateInternalDefects("seriousdamage", seriousDamageValue, index)}
                                                                                editable={true}
                                                                                maxLength={20}
                                                                                style={{ width: 0.07 * width, textAlign: 'left', color: 'black', fontSize: 13, borderWidth: 1, borderColor: '#343434', height: 40, paddingLeft: 10 }}
                                                                            />
                                                                            <Text style={{ marginTop: 10, color: 'black', fontSize: 13, marginLeft: 3 }}>
                                                                                lb
                                                                    </Text>
                                                                            <Text style={{
                                                                                marginTop: 10,
                                                                                marginLeft: 5,
                                                                                color: 'black',
                                                                                fontSize: 13
                                                                            }}>
                                                                                {this.state.internal_defect_perc_calculate[index].seriousDamagePerc}%
                                                                    </Text>
                                                                        </View>
                                                                        <Text style={{ fontSize: 13, color: 'black' }}>
                                                                            {item.seriousDamageHint}
                                                                        </Text>
                                                                    </View>
                                                                    <View style={{ width: 0.06 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 125 }}>
                                                                        <View>
                                                                            <TouchableOpacity onPress={() => this.deleteInternalDefect(item)} style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                                                                <Image source={require('../assets/sample_inspection/Delete.png')} style={{ width: 30, height: 30 }} />
                                                                            </TouchableOpacity>
                                                                            {this.state.internal_defect_perc_calculate[index].status ?
                                                                                <Image
                                                                                    source={require('../assets/sample_inspection/Tick.png')}
                                                                                    style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center', textAlign: 'center', alignSelf: 'center', marginTop: 10 }} /> :
                                                                                <Image
                                                                                    source={require('../assets/sample_inspection/Cross.png')}
                                                                                    style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center', textAlign: 'center', alignSelf: 'center', marginTop: 10 }} />
                                                                            }
                                                                        </View>
                                                                    </View>
                                                                </View>)
                                                            }
                                                            keyExtractor={(key) => key.toString()}
                                                        />
                                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                                            <View style={{ width: 0.29 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 120, justifyContent: 'center' }}>
                                                                <Text style={{ fontSize: 15, color: '#24C656', textAlign: 'center', fontWeight: 'bold' }}>
                                                                    Total :
                                                        </Text>
                                                            </View>
                                                            <View>
                                                                {this.printInternalTotal()}
                                                            </View>
                                                        </View>
                                                    </View>
                                                }
                                            </ScrollView>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                                        <View style={{ borderWidth: 1, borderColor: '#24C656', flex: 0.2, borderRadius: 50, textAlign: 'center' }}>
                                            <Text style={{ color: '#24C656', fontSize: 13, paddingTop: 5, paddingBottom: 5, padding: 3, textAlign: 'center', fontWeight: '500' }}>
                                                Other Defects
                                    </Text>
                                        </View>
                                        <View style={{ borderWidth: 0.5, borderColor: '#24C656', flex: 1, height: 0, marginLeft: 5, marginRight: 5, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }} />
                                    </View>
                                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-start', marginTop: 10 }}>
                                        <View style={{}}>
                                            <TextInput
                                                placeholder={'Quick Search'}
                                                onChangeText={(value) => this.quickSearch('other Defects', value)}
                                                editable={true}
                                                maxLength={20}
                                                style={{ width: 0.4 * width, textAlign: 'left', color: 'black', fontSize: 13, borderBottomWidth: 1, borderBottomColor: '#c6c6c6', paddingTop: 10, paddingBottom: 10, padding: 15 }}
                                            />
                                            <View style={{ flex: 1, marginTop: 10, width: 0.43 * width }}>
                                                {this.state.isUpdate ?
                                                    <FlatList
                                                        key={this.state.searched_other_defects.length}
                                                        data={this.state.searched_other_defects}
                                                        numColumns={3}
                                                        extraData={this.state}
                                                        renderItem={({ item }) => this.displayOtherDefects(item)}
                                                        keyExtractor={(index) => index.toString()}
                                                    /> :
                                                    <FlatList
                                                        key={this.state.searched_other_defects.length}
                                                        data={this.state.searched_other_defects}
                                                        numColumns={3}
                                                        extraData={this.state}
                                                        renderItem={({ item }) => this.displayOtherDefects(item)}
                                                        keyExtractor={(index) => index.toString()}
                                                    />
                                                }
                                            </View>
                                        </View>
                                        <View style={{ width: 0.50 * width, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                            <View style={{ width: 0.50 * width, flex: 1 }}>
                                                <ScrollView style={{ flexGrow: 1 }}>
                                                    {this.state.selected_other_defects[0] === undefined ?
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                                            <Image source={require('../assets/sample_inspection/empty_defects.png')}
                                                                style={{ width: 0.2 * width, height: 300 }} />
                                                        </View> :
                                                        <View style={{ flex: 1, marginLeft: 10 }}>
                                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                <View style={{ width: 0.15 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 60 }}>
                                                                    <Text style={{ fontSize: 13, color: '#24C656', textAlign: 'center' }}>
                                                                        Defect
                                                            </Text>
                                                                </View>
                                                                <View style={{ width: 0.14 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 60 }}>
                                                                    <Text style={{ fontSize: 13, color: '#24C656', textAlign: 'center' }}>
                                                                        DAMAGE (lb)
                                                            </Text>
                                                                </View>
                                                                <View style={{ width: 0.14 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 60 }}>
                                                                    <Text style={{ fontSize: 13, color: '#24C656', textAlign: 'center' }}>
                                                                        SERIOUS DAMAGE (lb)
                                                            </Text>
                                                                </View>
                                                                <View style={{ width: 0.06 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 60 }}>
                                                                    <Text style={{ fontSize: 20, color: '#24C656', textAlign: 'center' }}>

                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            <FlatList
                                                                data={this.state.selected_other_defects}
                                                                extraData={this.state}
                                                                renderItem={({ item, index }) =>
                                                                    (<View style={{ flex: 1, flexDirection: 'row' }}>
                                                                        <View style={{ width: 0.15 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 125 }}>
                                                                            <Text style={{ fontSize: 15, color: '#24C656', textAlign: 'center' }}>
                                                                                {item.label}
                                                                            </Text>
                                                                        </View>
                                                                        <View style={{ width: 0.14 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 125 }}>
                                                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                                <TextInput
                                                                                    value={item.damageValue}
                                                                                    keyboardType={'numeric'}
                                                                                    onChangeText={(damageValue) => this.updateOtherDefects("damage", damageValue, index)}
                                                                                    editable={true}
                                                                                    maxLength={20}
                                                                                    style={{ width: 0.07 * width, textAlign: 'left', color: 'black', fontSize: 13, borderWidth: 1, borderColor: '#343434', height: 40, paddingLeft: 10 }}
                                                                                />
                                                                                <Text style={{ marginTop: 10, color: 'black', fontSize: 13, marginLeft: 3 }}>
                                                                                    lb
                                                                        </Text>
                                                                                <Text style={{
                                                                                    marginTop: 10,
                                                                                    marginLeft: 5,
                                                                                    color: 'black',
                                                                                    fontSize: 13
                                                                                }}>
                                                                                    {this.state.other_defect_perc_calculate[index].damagePerc}%
                                                                        </Text>
                                                                            </View>
                                                                            <Text style={{ fontSize: 13, color: 'black' }}>
                                                                                {item.damageHint}
                                                                            </Text>
                                                                        </View>
                                                                        <View style={{ width: 0.14 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 125 }}>
                                                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                                <TextInput
                                                                                    value={item.seriousDamageValue}
                                                                                    keyboardType={'numeric'}
                                                                                    onChangeText={(seriousDamageValue) => this.updateOtherDefects("seriousdamage", seriousDamageValue, index)}
                                                                                    editable={true}
                                                                                    maxLength={20}
                                                                                    style={{ width: 0.07 * width, textAlign: 'left', color: 'black', fontSize: 13, borderWidth: 1, borderColor: '#343434', paddingLeft: 15, height: 40 }}
                                                                                />
                                                                                <Text style={{ marginTop: 10, color: 'black', fontSize: 13, marginLeft: 3 }}>
                                                                                    lb
                                                                        </Text>
                                                                                <Text style={{
                                                                                    marginTop: 10,
                                                                                    marginLeft: 5,
                                                                                    color: 'black',
                                                                                    fontSize: 13
                                                                                }}>
                                                                                    {this.state.other_defect_perc_calculate[index].seriousDamagePerc}%
                                                                        </Text>
                                                                            </View>
                                                                            <Text style={{ fontSize: 13, color: 'black', textAlign: 'center' }}>
                                                                                {item.seriousDamageHint}
                                                                            </Text>
                                                                        </View>
                                                                        <View style={{ width: 0.06 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 125 }}>
                                                                            <View>
                                                                                <TouchableOpacity onPress={() => this.deleteOtherDefect(item)} style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                                                                    <Image source={require('../assets/sample_inspection/Delete.png')} style={{ width: 30, height: 30 }} />
                                                                                </TouchableOpacity>
                                                                                {this.state.other_defect_perc_calculate[index].status ?
                                                                                    <Image
                                                                                        source={require('../assets/sample_inspection/Tick.png')}
                                                                                        style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center', textAlign: 'center', alignSelf: 'center', marginTop: 10 }} /> :
                                                                                    <Image
                                                                                        source={require('../assets/sample_inspection/Cross.png')}
                                                                                        style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center', textAlign: 'center', alignSelf: 'center', marginTop: 10 }} />
                                                                                }
                                                                            </View>
                                                                        </View>
                                                                    </View>)
                                                                }
                                                                keyExtractor={(key) => key.toString()}
                                                            />
                                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                <View style={{ width: 0.29 * width, borderWidth: 1, borderColor: '#c6c6c6', paddingTop: 15, paddingBottom: 15, padding: 10, height: 120, justifyContent: 'flex-end' }}>
                                                                    <Text style={{ fontSize: 20, color: '#24C656', textAlign: 'center', fontWeight: 'bold' }}>
                                                                        Total :
                                                            </Text>
                                                                </View>
                                                                <View>
                                                                    {this.printOtherTotal()}
                                                                </View>
                                                            </View>
                                                        </View>
                                                    }
                                                </ScrollView>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                                        <View style={{ borderWidth: 1, borderColor: '#24C656', flex: 0.2, borderRadius: 50, textAlign: 'center' }}>
                                            <Text style={{ color: '#24C656', fontSize: 13, paddingTop: 5, paddingBottom: 5, padding: 3, textAlign: 'center', fontWeight: '500' }}>
                                                Images
                                    </Text>
                                        </View>
                                        <View style={{ borderWidth: 0.5, borderColor: '#24C656', flex: 1, height: 0, marginLeft: 5, marginRight: 5, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }} />
                                    </View>
                                    <View style={{ marginTop: 15, marginBottom: 30, marginRight: 10 }}>
                                        <TouchableOpacity onPress={() => this.takepic()} style={{ backgroundColor: '#f2f2f2', borderWidth: 1, borderColor: '#c6c6c6' }}>
                                            <Text style={{ color: 'black', textAlign: 'center', fontSize: 15, paddingTop: 15, paddingBottom: 15, padding: 8 }}>
                                                Take a Photo
                                    </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.uploadPic()} style={{ backgroundColor: '#f2f2f2', borderWidth: 1, borderColor: '#c6c6c6' }}>
                                            <Text style={{ color: 'black', textAlign: 'center', fontSize: 15, paddingTop: 15, paddingBottom: 15, padding: 8 }}>
                                                Upload Photo
                                    </Text>
                                        </TouchableOpacity>
                                        <View style={{ marginTop: 20, flexDirection: 'row', flex: 1 }}>
                                            <ScrollView horizontal>
                                                {this.state.isImageUploaded ?
                                                    this.state.image_objects_array.map((data, index) =>
                                                        <View key={index} style={{
                                                            width: 320, height: 'auto',
                                                            borderWidth: 1,
                                                            borderRadius: 2,
                                                            borderColor: 'white',
                                                            borderBottomWidth: 3,
                                                            shadowColor: 'grey',
                                                            shadowOffset: { width: 10, height: 10 },
                                                            shadowOpacity: 0.8,
                                                            shadowRadius: 5,
                                                            paddingRight: 10,
                                                            paddingLeft: 10,
                                                            elevation: 3, margin: 10
                                                        }}>
                                                            <Image source={{ isStatic: true, uri: data.path }} style={{ width: 300, height: 300, margin: 10, resizeMode: 'contain' }} />
                                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <Text style={{ color: 'black' }}>{data.filename}</Text>
                                                                <TouchableOpacity onPress={() => this.deleteImage(index)}>
                                                                    <Image source={require('../assets/sample_inspection/Delete.png')} style={{ width: 50, height: 50 }} />
                                                                </TouchableOpacity>
                                                            </View>
                                                            <Text style={{ color: 'black', fontSize: 15, fontWeight: '700' }}>Browse Defects</Text>
                                                            <Dropdown name={'Image_tags'} index={index} data={this.state.total_defects_label} defaultItem={''} sendData={this.getData} style={{ marginTop: 70 }} />
                                                            {this.state.isImageTagCreated[index] ?
                                                                <View>
                                                                    <Text style={{
                                                                        color: 'black',
                                                                        fontSize: 15,
                                                                        fontWeight: '700',
                                                                        marginTop: 20
                                                                    }}>Added Defects</Text>
                                                                    {this.displayTags(index)}
                                                                </View> :
                                                                <View />
                                                            }
                                                        </View>) :
                                                    null
                                                }
                                            </ScrollView>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 20, marginRight: 20 }}>
                                            {this.state.selected_Sample + 1 > this.state.count_samples ?
                                                <TouchableOpacity onPress={this.publish}
                                                    style={{ backgroundColor: '#24C656', borderRadius: 54 }}>
                                                    <Text style={{
                                                        fontWeight: 'bold',
                                                        color: 'white',
                                                        fontSize: 20,
                                                        paddingTop: 10,
                                                        paddingBottom: 10,
                                                        padding: 10
                                                    }}>
                                                        Review Report
                                            </Text>
                                                </TouchableOpacity> :
                                                <TouchableOpacity onPress={this.publish}
                                                    style={{ backgroundColor: '#24C656', borderRadius: 54 }}>
                                                    <Text style={{
                                                        fontWeight: 'bold',
                                                        color: 'white',
                                                        fontSize: 20,
                                                        paddingTop: 10,
                                                        paddingBottom: 10,
                                                        padding: 10
                                                    }}>
                                                        Save & Next
                                            </Text>
                                                </TouchableOpacity>
                                            }
                                        </View>
                                    </View>
                                </View>
                            </KeyboardAwareScrollView>
                        </View> :
                        <View style={{ flex: 1, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Spinner size={100} type={'9CubeGrid'} color={'#24C656'} style={{ alignItems: 'center', flex: 1, justifyContent: 'center', marginTop: 0.15 * height }} />
                        </View>
                    }
                </ScrollView>
            </View>
        )
    }
}
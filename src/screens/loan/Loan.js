import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import loanStyle from './loanStyle';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Loan() {
  const [search, setSearch] = useState('');
  const [loanData, setLoanData] = useState([]);
  const [Loan_Type, setLoanType] = useState([]);
  const [combinedData1, setCombineData1] = useState([]);
  const showData = async () => {
    const token = await AsyncStorage.getItem('auth_token');
    const ID = await AsyncStorage.getItem('Id');
    const apidata = {
      eventID: '1001',
      addInfo: {
        SUBSID: ID,
      },
    };
    try {
      const url = 'http://192.168.33.157:5385/ldashboard';
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          guid: '4C4C4544-004A-5910-8034-C2C04F4E4D33',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apidata),
      });

      const data = await result.json();
      if (data && data.rData && data.rData.LoanData) {
        setLoanData(data.rData.LoanData); // Set loan data to state
        // console.log(data.rData.LoanData, '----------------------')
      }

      //  setMobile('');
    } catch (error) {
      console.log(error);
      console.log('error in api calling--------------loan');
    }
    LoanType();
  };
  const LoanType = async () => {
    const token = await AsyncStorage.getItem('auth_token');
    const ID = await AsyncStorage.getItem('Id');
    const apidata = {
      eventID: '1002',
      addInfo: {
        SUBSR_ID: ID,
      },
    };
    try {
      const url = 'http://192.168.33.157:5385/ldashboard';
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          guid: '4C4C4544-004A-5910-8034-C2C04F4E4D33',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apidata),
      });
      const data = await result.json();
      if (data && data.rData && data.rData.ClaimData) {
        setLoanType(data.rData.ClaimData); // Set loan data to state
      }
      // console.log(data.rData.ClaimData, '----------------------loanType')
    } catch (error) {
      console.log(error);
      console.log('error in api calling--------------loanType');
    }
  };
  useEffect(() => {
    showData();
  }, []);
  useEffect(() => {
    const combinedData = loanData.map((loan, index) => ({
      Amount_San: loan.Amount_San,
      Message: loan.Message,
      RnD_Date: loan.RnD_Date,
      LTName: Loan_Type[index]?.LTName,
      FolioNumber: loan.FolioNumber,
    }));
    setCombineData1(combinedData);
  }, [loanData, Loan_Type]);

  const filterItem = combinedData1.filter(
    item =>
      item.LTName && item.LTName.toLowerCase().includes(search.toLowerCase()),
  );
  const clearSearch = () => {
    setSearch('');
  };

  //------------

  return (
    <View style={loanStyle.container}>
      <View style={loanStyle.input}>
        <Icon
          name="search"
          size={25}
          color="#bebebe"
          style={{position: 'absolute', bottom: '18%', left: '4%'}}
        />
        <TouchableOpacity
          style={{position: 'absolute', bottom: '20%', right: '4%'}}
          onPress={clearSearch}
          clearButtonMode="while-editing">
          <Icon name="cancel" size={20} color="#bebebe" />
        </TouchableOpacity>

        <TextInput
          placeholder="search here..."
          onChangeText={text => setSearch(text)}
          value={search}
        />
      </View>
      {loanData && loanData.length > 0 ? (
        <SafeAreaView style={{marginBottom: 60}}>
          <FlatList
            data={filterItem}
            renderItem={({item}) => (
              <View style={loanStyle.wrapper}>
                <View style={loanStyle.header}>
                  <Text style={loanStyle.loan_name}>{item.LTName}</Text>
                  <Text style={loanStyle.folonum}>
                    Folio Number - {item.FolioNumber}
                  </Text>
                  <Text style={loanStyle.date}>
                    Amount - ₹{item.Amount_San}
                  </Text>

                  <Text style={loanStyle.date}>RnD_Date - {item.RnD_Date}</Text>

                  <Text style={loanStyle.statustxt}>
                    Status - <Text>{item.Message}</Text>
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>
      ) : (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text>No loan data available</Text>
        </View>
      )}
    </View>
  );
}

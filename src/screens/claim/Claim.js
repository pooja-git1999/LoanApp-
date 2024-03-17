import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import loanStyle from '../loan/loanStyle';
export default function Claim() {
  const [search, setSearch] = useState('');
  const [Claim_Data, setClaimData] = useState([]);
  const [ClaimType_Data, setClaimType] = useState([]);
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
      const url = 'http://192.168.33.157:5385/cdashboard';
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
      // console.log('data', data.rData);

      if (data && data.rData && data.rData.ClaimData) {
        setClaimData(data.rData.ClaimData);
      }
    } catch (error) {
      console.log(error);
      console.log('error in api calling--------------clAIM');
    }
    ClaimType();
  };
  const ClaimType = async () => {
    const token = await AsyncStorage.getItem('auth_token');
    const ID = await AsyncStorage.getItem('Id');

    const apidata = {
      eventID: '1002',
      addInfo: {
        SUBSID: ID,
      },
    };

    try {
      const url = 'http://192.168.33.157:5385/cdashboard';
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
      if (data.rData.ClaimTypeData) {
        setClaimType(data.rData.ClaimTypeData);
      }
      // console.log(data.rData.ClaimTypeData, '----------------------ClaimType')
    } catch (error) {
      console.log(error);
      console.log('error in api calling--------------ClaimType');
    }
  };

  useEffect(() => {
    showData();
  }, []);

  useEffect(() => {
    const combinedData = Claim_Data.map((claim, index) => ({
      ActualAmount: claim.ActualAmount,
      STATUS: claim.STATUS,
      ApplyDate: claim.ApplyDate,
      CLM_CAT_1: ClaimType_Data[index]?.CLM_CAT_1,
      CLM_CAT_2: ClaimType_Data[index]?.CLM_CAT_2,
    }));
    setCombineData1(combinedData);
  }, [Claim_Data, ClaimType_Data]);

  const filterItem = combinedData1.filter(
    item =>
      item.CLM_CAT_2 &&
      item.CLM_CAT_2.toLowerCase().includes(search.toLowerCase()),
  );
  const clearSearch = () => {
    setSearch('');
  };

  // -------

  return (
    <View style={styles.container}>
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
      {Claim_Data && Claim_Data.length > 0 ? (
        <SafeAreaView style={{marginBottom: 40}}>
          <FlatList
            data={filterItem}
            renderItem={({item}) => (
              <View style={loanStyle.wrapper}>
                <View style={loanStyle.header}>
                  <Text style={loanStyle.loan_name}>
                    {item.CLM_CAT_2} - {item.CLM_CAT_1}
                  </Text>

                  <Text style={loanStyle.date}>
                    Amount - ₹{item.ActualAmount}
                  </Text>
                  <Text style={loanStyle.date}>
                    Apply Date - {item.ApplyDate}
                  </Text>

                  <Text style={loanStyle.statustxt}>
                    Status -{' '}
                    <Text>
                      {item.STATUS === '0'
                        ? 'Pending'
                        : item.STATUS === '1'
                        ? 'Paid'
                        : ''}
                    </Text>
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>
      ) : (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text>No Claim data available</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    paddingBottom: 50,
    marginBottom: 100,
  },
});

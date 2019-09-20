import React from 'react'
import { View, Text, Image } from 'react-native'
import * as constants from './Constants'
import axios from 'axios'

export default class ItemDetails extends React.Component {
    state={
        item:null
    }

    componentDidMount() {
        let item = this.props.navigation.getParam('item', null)
        axios.get(`https://kn4f3kklu4.execute-api.eu-west-1.amazonaws.com/default/jstasks/item?id=${item.id}`)
        .then(response => {
            const data = response.data
            this.setState({item: data})
        })
    }

    render() {
        const { item } = this.state
        return(
            item?
            <View  style={styles.selectedItem}>
                <Image source={{uri:item.picture}} alt="" style={styles.itemPicture}  />
                <View>
                    <Text style={{fontWeight:'bold'}}>{constants.ID_LABEL}: <Text style={{fontWeight:'normal'}}>{item.id} </Text></Text>
                </View>
                <View>
                    <Text style={{fontWeight:'bold'}}>{constants.TITLE_LABEL}: <Text style={{fontWeight:'normal'}}>{item.title} </Text>   </Text>
                </View>
                <View>
                    <Text style={{fontWeight:'bold'}}>{constants.DESCRIPTION_LABEL}: <Text style={{fontWeight:'normal'}}>{item.desc}</Text></Text>
                </View>
            </View>
            :<View>
                <Text>{constants.NO_ITEMS_MESSAGE}</Text>
            </View>
        )
    }
}

const styles = {

    "selectedItem": {
        flex: 1,
        flexDirection: 'column', 
        height:'100%', 
     
    },
    "itemPicture": {
        width: '100%',
        height: 300,
        top: 0,
    }
};
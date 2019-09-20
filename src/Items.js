import React from 'react'
import axios from 'axios'
import * as constants from './Constants'
import { View, Text, Image, ScrollView, TouchableOpacity} from 'react-native'

export default class Items extends React.Component {

    state = {
        items: [], 
        selected: null,
        offset:0,
        loadMore: true
    }

    componentDidMount() {
        this.getItems()
    }

    getItems () {
        let {offset , items} = this.state
        axios.get(`https://kn4f3kklu4.execute-api.eu-west-1.amazonaws.com/default/jstasks?offset=${offset}&count=10`)
        .then(response => {
            const data = response.data
            let loadMore = true
            if(data.length<10) {
                loadMore = false
            }
            this.setState({items: [...items,...data] , offset:offset+11 , loadMore })
        })
    }

    render() {
        const { items } = this.state
        return(
            items ?
            <ScrollView >
                <ScrollView  onScroll={this.getItems()} >
              
                    {items.map(item => {
                        return(
                            <TouchableOpacity  style={styles.itemRow} onPress={() => this.props.navigation.navigate('ItemDetails',{item})} >
                                <Image source={{uri:item.thumb}} alt="thumb" style={styles.itemThumb} />    
                                <View style={{flexDirection:'column'}}>
                                    <Text style={{fontWeight:'bold'}}>{constants.ID_LABEL}: <Text style={{fontWeight:'normal'}}>{item.id}</Text></Text>
                                    <Text style={{fontWeight:'bold'}}>{constants.TITLE_LABEL}: <Text style={{fontWeight:'normal'}}>{item.title}</Text></Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView> 
            </ScrollView>
            : <View><p>{constants.NO_ITEMS_MESSAGE}</p></View>
        )
    }
}

const styles = {
    "mainContainer": {
        borderStyle: 'solid',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#ffd',
        borderRadius: 5,
        borderWidth: 1,
        height:'100vh',
        borderColor: '#000000',
    },
    "itemsList": {
        overflowY: 'scroll',
        height:'100%', 
        width:'25%'
    },
    "itemRow": {
        borderStyle: 'solid',
        display: 'flex',
        alignItems: 'center',
        flex:1,
        flexDirection: 'row',
        backgroundColor: '#fee',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000000',

    },
    "itemThumb": {
        width: 100,
        height: '100%',
    }, 
};
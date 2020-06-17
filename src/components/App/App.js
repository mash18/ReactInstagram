import React from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import axios from 'axios'

import ImputSearch from '../InputSearch/InputSearch'
import Images from '../Images/images'

class App extends React.Component{
    constructor(){
        super()
        this.state = {
            searchText: '',
            images: []
        }
        this.onChangeText = this.onChangeText.bind(this)
        this.apiSearch = this.apiSearch.bind(this)

    }

    async apiSearch(){
        const response = await axios.get('https://api.unsplash.com/search/photos',
            {
                params: {
                    query: this.state.searchText
                },
                headers: {
                    Authorization: 'Client-ID 0f2SWuqhK9w9kwqzA5eLh_Pg4hFgQFT4xwaEpUUxSf4'
                }
            }
        )
        this.setState({images: response.data.results})

        //.then((response) => {
        //    console.log('Respuesta',response)
        //})
        //.catch((error) => {
        //    console.log('Error en la peticion por axios')
        //})
    }

    onChangeText(e){
        this.setState({searchText: e.target.value})
    }

    render(){
        return(
            <Container>
                <Row>
                    <Col>
                        <ImputSearch apiSearch={this.apiSearch} onChangeText={this.onChangeText}/>
                    </Col>
                </Row>
                <Row>
                    {
                        this.state.images.map((image) => {
                            return (
                            <Col sm="4" key={image.id}>
                                <Images imageUrl={image.urls.regular}></Images>
                            </Col>
                            )
                        })
                        
                    }
                </Row>
            </Container>
        )
    }
}

export default App
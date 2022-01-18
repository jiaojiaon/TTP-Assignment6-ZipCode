import { render } from "@testing-library/react";
import React from "react"

class CitySearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            cityName: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        event.preventDefault();
        this.setState({
            cityName:event.target.zip.value
        })
        
         fetch('http://ctp-zip-api.herokuapp.com/city/'+event.target.zip.value.toUpperCase())
             .then(response=>{
                 return response.json();
             })
             .then(data =>{
                 this.setState({
                     results:[...data]
                 })
                 
             })
             .catch(error=>{
                 console.log("error",error)
             })
             .then(()=>console.log(this.state.results));
             
     }

    render() {
        return (
            <div>
                <header>
                    <div className ="zip-header">
                        <h1>City Search</h1>

                        <div className ="submit-container">
                            <form onSubmit={this.handleChange}>
                                <h2> City Name:</h2>
                                <input type="Text" placeholder="CityName" name="zip"></input>

                                <input type="submit" placeholder="Search"></input>
                            </form>
                        </div>
                    </div>
                </header>

                <h2>
                    <div className ="zip-body">
                        {this.state.results.map((data, i) => (
                
                                <p key = {i}>
                                  Zip Code: {data}
                                </p>
        
                    ))}
    

                    </div>
                </h2>
            </div>
        );
    }
}
export default CitySearch;
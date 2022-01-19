import React from "react"

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            zipCode: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        event.preventDefault();
        this.setState({
            zipCode:event.target.zip.value
        })
        
         fetch('http://ctp-zip-api.herokuapp.com/zip/'+event.target.zip.value)
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
                        <h1> Zip Code Search</h1>

                        <div className ="submit-container">
                            <form onSubmit={this.handleChange}>
                                <h2> Enter Zip Code:</h2>
                                <input type="number" placeholder="ZipCode" name="zip"></input>

                                <input type="submit" placeholder="Search"></input>
                            </form>
                        </div>
                    </div>
                </header>

                <h2>
                    <div className ="zip-body">
                        {this.state.results.map((data, i) => (

                            <><p className={"top-box"}>
                                {data.City}, {data.State}
                            </p>
                                <ul key={i}>
                                    <li>State: {data.State}</li>
                                    <li>Location: ({data.Lat}  {data.Long}) </li>
                                    <li>Population(estimated): {data.EstimatedPopulation}</li>
                                    <li>Total Wages: {data.TotalWages}</li>
                                </ul></>
                            
        
                    ))}
    

                    </div>
                </h2>
            </div>
        );
    }
}
export default Search;
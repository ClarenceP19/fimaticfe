import React, {Component} from 'react';
import {Services} from "../_services";
import {calculateNetworth} from "../_utils";
import Button from "reactstrap/es/Button";
import {Recommendationbuttonstyle, singlePillButtonStyle, dividerText, LIFYlogo} from "../css";
import Logo from "../assets/LIYF_brand.png"
class ProductRecommendation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            result: [
                {
                    zero: "",
                    one: "",
                    two: ""
                }, {
                    zero: "",
                    one: "",
                    two: "",
                }
            ]


        }
    }

    componentDidMount() {
        let state = this.props.location.state;
        console.log(state);
        // JSON.parse(localStorage.getItem('user')).
        // JSON.parse(localStorage.getItem('user')).
        let insurance = state.gameControls.insurance.value;
        let recomObject = {
            "ID": (JSON.parse(localStorage.getItem('user')))["clusterID"],
            "episode_no": 2,
            "newnetworth": calculateNetworth(state.gameControls),
            "new_insurance_basic_health": insurance[0],
            "new_insurance_critical_illness": insurance[1],
            "new_insurance_home": insurance[2],
            "new_insurance_travel": insurance[3],
            "decisionscore_investment": state.ipoints,
            "decisionscore_bonds": state.bpoints,
            "decisionscore_savings": state.spoints
        }

        console.log(recomObject);
        Services.recommend(recomObject).then(result => {
            console.log(result);

            this.setState({result: result})
        }).catch(error => {
                console.log(error);
            }
        );

    }

    toPortfolio = (e) => {
      this.props.history.push({pathname:"/portfolioallocation"})
    };

    render() {
        // console.log(Object.values(this.state.result[0]));
        console.log(this.state.result[0].zero);
        return (<div className="App">
            <header className="App-header">
                <div><img src = {Logo} style = {LIFYlogo}></img></div>
                <div style={dividerText}> <h1>Thanks for playing!</h1>
                <h2>You did great! Here are some suggested services which we think you would love.</h2></div>
                <h5> Click on here to find out more! </h5>
                <Button style={Recommendationbuttonstyle}
                        href={this.state.result[1].zero}>
                    {this.state.result[0].zero}
                </Button>
                <Button style={Recommendationbuttonstyle}
                        href={this.state.result[1].one}>
                    {this.state.result[0].one}
                </Button>
                <Button style={Recommendationbuttonstyle}
                        href={this.state.result[1].two}>
                    {this.state.result[0].two}
                </Button>
                <Button style={singlePillButtonStyle} onClick={()=> this.toPortfolio()}>Lets try again!</Button>
            </header>
        </div>)
    }

}

export default ProductRecommendation
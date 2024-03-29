import React, {Component} from 'react';
import {Button} from "reactstrap";
import Card from "reactstrap/es/Card";
import CardHeader from "reactstrap/es/CardHeader";
import CardBody from "reactstrap/es/CardBody";
import CardText from "reactstrap/es/CardText";
import Container from "reactstrap/es/Container";
import Col from "reactstrap/es/Col";
import Row from "reactstrap/es/Row";
import {singlePillButtonStyle, titleStyle, simplediv, dividerText, LIFYlogo} from "../../css";
import PortfolioSummary from "../Components/PortfolioSummary";
import Logo from "../../assets/LIYF_brand.png"

class GameDescription extends Component {

    saveAndContinue = () => this.props.nextStage();

    back = (e) => {
        e.preventDefault();
        this.props.prevStage();
    };

    render() {
        const {descriptionStart, headlineStart, title, scproductName, scproductEffect} = this.props;
        var scproductEffectStr = "";
        if (scproductEffect % 1 == 0) {
            scproductEffectStr = "$" + scproductEffect.toString()
        } else {
            scproductEffectStr = (100 * scproductEffect).toFixed(2).toString() + "%"
        }
        return (
            <div>
                <div style={titleStyle}>
                    <h3>{title}</h3>
                </div>
                <PortfolioSummary gameControls={this.props.gameControls}/>
                <div style={simplediv}>
                    <h4>{headlineStart}</h4>
                </div>
                <div style={dividerText}>
                    {descriptionStart}
                </div>
                <div style={dividerText}>
                    <h3>{scproductName} affected by: {scproductEffectStr}</h3>
                    {/*{"These are the effects that happened on your investments"}*/}
                </div>
                <Button style={singlePillButtonStyle}
                        onClick={this.saveAndContinue}>Proceed</Button>
                <h1></h1>
                <div><img src = {Logo} style = {LIFYlogo}></img></div>
            </div>
        )
    }
}

export default GameDescription;
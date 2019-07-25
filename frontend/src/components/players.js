import React from "react";
import {getGameId, ajax} from "../utils"
import Loader from "./loader"

let groovyGoat = '../images/groovy goat.png'

let images = ['https://thumbs-prod.si-cdn.com/qXrJJ-l_jMrQbARjnToD0fi-Tsg=/800x600/filters:no_upscale()/https://public-media.si-cdn.com/filer/d6/93/d6939718-4e41-44a8-a8f3-d13648d2bcd0/c3npbx.jpg', 'https://previews.123rf.com/images/chromaco/chromaco1201/chromaco120100011/12050550-cartoon-image-of-a-crocodile-or-alligator-wearing-sunglasses.jpg', groovyGoat, 'https://cdn4.vectorstock.com/i/1000x1000/34/23/slow-snail-vector-20563423.jpg', 'https://previews.123rf.com/images/antimartina/antimartina1507/antimartina150700004/43263915-vector-illustration-of-a-frog-hero-who-jumps-with-cape.jpg' ]

export default class Players extends React.Component {
    constructor(props){
        super(props);
        this.state = {joinClicked:false};
    }

    join(){
        if (this.state.joinClicked){
            return;
        }
        this.setState(() => ({
            joinClicked:true
        }), () => { 
            ajax(`/games/${getGameId()}/players`,{method: 'POST'});
        });
    }

    showAvatar(){
        let length =  this.props.players.length; 
        console.log(length)
            for(let i = 0; i< length; i++){
                console.log(this.props.players[i])
                if (this.props.players[i].avatar == "Mr Fish"){
                    return images[0]
                }else if (this.props.players[i].avatar == "Angry Al"){
                    return images[1]
                }else if (this.props.players[i].avatar == "The slow Snai"){
                    return images[4]
                }else if (this.props.players[i].avatar == "Fine frog"){
                    return images[3]
                }else if (this.props.players[i].avatar == "Groovy goat"){
                    return images[2]
                }
            }    
    }

    render() {
        return <div className="players">
         
            <h3>Players</h3><ul className="players">
            {this.props.showJoinBtn &&
            <button className={`join-btn ${(this.state.joinClicked) ? "loading" : ""}`} onClick={this.join.bind(this)}>
            {(this.state.joinClicked) ? <Loader />: "Join!" }
            </button>
            }
            {this.props.players.map(k => (
                <li key={k.player} className="player" >
                <span><img className="avatar" src={this.showAvatar()}></img></span>
                <span className="player-name">{k.player} {(k.player === this.props.userName) ? "(you)":""}</span>
                <span className={`player-status ${k.status}`}>{k.status}</span>
                </li>
            ))}
            </ul>
            </div>
    }
}
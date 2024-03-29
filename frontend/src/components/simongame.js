import React from "react";
import {getGameId, ajax} from "../utils"
import Simon from "./simon"
import Players from "./players"
import Sequence from "./sequence"
import Won from "./won"
import Lost from "./lost"


export default class SimonGame extends React.Component {
    constructor(){
        super();
        this.state = {game:{status:"loading", sequence:[]}, user:{name:"", status:""}, players:[]}
    }

    componentDidMount() {
        this.gameLoop();
    }

    gameLoop(){
        ajax(`/games/${getGameId()}/status`, {},  (newStatus) => {
            this.setState(() => (newStatus), () => {
                //Poll the status only if the game is not over
                if (newStatus.game.status != "failed" && newStatus.game.status != "won"){
                    setTimeout(() => {this.gameLoop()}, 2000);
                }
             });
        });
    }

    isViewMode(){
        return this.state.user.status == "viewer" && this.state.game.status === "on";
    }
    ourFunk(){
        var status=this.state.game.status;
        if(status=="won"){
           let myEl = document.querySelector('.side');
           myEl.style.display = "none"
           return <Won/>
        }else if(status=="failed"){
            let myEl = document.querySelector('.side');
            myEl.style.display = "none"
            return <Lost/>
        }else{
        return(
            <div className="center">
                    <Simon  sequence={this.state.game.sequence} disabled={this.state.user.status != "turn"} showPlayBtn={this.state.user.status == "new"}/>
                    <Sequence sequence={this.state.game.sequence} step={this.state.game.step} />
                </div>
        )
        }
    }


    render() {

        return <div className="main">
            {this.ourFunk()}
          
                <div className="side">
                    <div className="game-name">{this.state.game.name}</div>
                    {(this.isViewMode()) && <div className="view-mode" >View mode</div>}
                    <div className={`game-status ${this.state.game.status}`}>{this.state.game.status}</div>
                    <Players players={this.state.players} userName={this.state.user.name} showJoinBtn={ this.state.user.status == "viewer" && this.state.game.status === "open"} />
                </div>
            </div>
    }
}

from bottle import (Bottle, request, jinja2_view, redirect)
from backend import utils
from backend import controller

pageHandler = Bottle()


@pageHandler.get('/start')
@jinja2_view('./backend/pages/start.html')
def start():
    currentPlayer = request.get_cookie("player")
    if currentPlayer:
        redirect("/games")
        return
    return {"version" : utils.getVersion()}

@pageHandler.get('/games')
@jinja2_view('./backend/pages/games.html')
def games():
    currentPlayer = request.get_cookie("player")
    if not currentPlayer:
        redirect("/start")
        return
    return {"version" : utils.getVersion(), "games": controller.listGames(), "currentPlayer": currentPlayer}

@pageHandler.get('/games/<game_id>')
@jinja2_view('./backend/pages/game.html')
def play(game_id):
    currentPlayer = request.get_cookie("player")
    if not currentPlayer or not controller.gameExists(game_id):
        redirect("/start")
        return
    return {"version" : utils.getVersion()}


@pageHandler.get('/')
@jinja2_view('./backend/pages/index.html')
def landing():
    return {"version" : utils.getVersion()}


@pageHandler.get('/scoreboard')
@jinja2_view('./backend/pages/scoreboard.html')
def scoreboard():
    scoreboard_alt = [{"name": "Nicky", "score": 100}, {"name": "Aaron", "score": 99}, {"name": "Cefi", "score": 98}]
    scoreboard_result = controller.getScoreboard()
    return {"version": utils.getVersion(), "scoreboard": scoreboard_result}
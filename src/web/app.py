from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
CORS(app)
socketio = SocketIO()
socketio.init_app(app, cors_allowed_origins='*')

@app.route('/')
def hello():
    return 'hello world'

@socketio.on('connect')
def connect():
    emit('my response', {'data': 'Connected'})

@socketio.on('chat message')
def log(msg):
    emit('chat message', msg, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0',debug=True)


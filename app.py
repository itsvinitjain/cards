from gevent import monkey; monkey.patch_all() 
from config import WEB_APP_PORT 
from gevent import pywsgi 
from web.ui import app 
http_server = pywsgi.WSGIServer(('127.0.0.1', WEB_APP_PORT), app) 
http_server.serve_forever() 
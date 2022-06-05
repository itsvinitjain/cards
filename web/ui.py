from flask import Blueprint, Flask, redirect, url_for, abort, render_template, request, jsonify, Response 
import logging
import util 
import config as C 
import util
import json 
from datetime import date, datetime
from flask_httpauth import HTTPBasicAuth
from werkzeug.security import generate_password_hash, check_password_hash
app = Flask(__name__)
auth = HTTPBasicAuth()

users = {
    "admin": generate_password_hash(C.passw.get("admin"))
}

@auth.verify_password
def verify_password(username, password):
    if username in users and check_password_hash(users.get(username), password):
        return username
  

formatter = logging.Formatter(C.LOGFORMATTER) 
handler = logging.FileHandler(C.LOGFILENAME) 
handler.name = __name__ 
handler.setFormatter(formatter) 
handler.setLevel(logging.DEBUG) 
app.logger.addHandler(handler) 
app.logger.setLevel(logging.DEBUG) 

def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, (datetime, date)):
        return obj.isoformat().replace("T", " ")
    raise TypeError ("Type %s not serializable" % type(obj))  

# initialize the sso blueprint 
#app_bp = Blueprint('app', __name__, static_folder='static') 

@app.route('/') 
@auth.login_required
def home():
    return render_template('home.html') 

@app.route('/interview', methods=["POST"]) 
def printname():
    try:
        res=request.json
        exp,lan=res["experience"],res["Language"]
        
        output=f"I have {exp} of experience in {lan}"
        print(output)
        return json.dumps({"output":output}),201
    except:
        return json.dumps({"error":"somethiong went wrong"})

@app.route('/update', methods=["POST"]) 
def update():
    res = util.insert_data(request.json)
    print(res)
    if res.get("data"):
        return json.dumps({"success":res["data"]}, default=json_serial)
    return json.dumps({"error":res["error"]})

@app.route('/test', methods=["GET", "POST"]) 
def test():
    return render_template('test.html') 

@app.route('/ajax_logs', methods=["GET", "POST"]) 
def logs():
    query_output = None 
    con1 = util.dbconnect() 
    if con1:                                                                                 
        cur = con1.cursor()
        query = "select * from card" 
        try:
            cur.execute(query)          
            results  = util.rows_to_dict_list(cur) 
            cur.close() 
            con1.close() 
            print({'data':results})
            return json.dumps({'data':results}, default=json_serial)                                           
        except Exception as e:                                                 
            print("Error while connecting to MySQL", e)
    else:
        print ("error: get_request_row() no active db connection" )

#app.register_blueprint(app_bp, url_prefix="/") 
if __name__ == '__main__':
      
    # run() method of Flask class runs the application 
    # on the local development server.
    app.run()
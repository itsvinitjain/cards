import os 
import sys
env = 'local' 
lab = True 

WEB_APP_PORT = 8080  
BASEPATH = os.getcwd()
LOGPATH = BASEPATH + "/logs" 
LOGFILENAME = LOGPATH + "/app.log" 
LOGFORMATTER = "[%(asctime)s] %(levelname)s : %(funcName)s : %(message)s"  

DATABASES = { 

    'dev':{ 

        'host': 'localhost', 

        'database': '', 

        'user': '', 

        'password': '', 

        }, 

    'local': { 

        'driver': 'mysql', 

        'host': '', 

        'database': '', 

        'user': '', 

        'password': '', 

    }, 

    'prod': { 

        'driver': 'mysql', 

        'host': '', 

        'database': '', 

        'user': '', 

        'password': '', 

    }, 

}.get(env) 

  

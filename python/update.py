import requests
import json

id = ''
url = 'http://localhost:3000/pkm' +id
payload = {'name': 'inconnu', 'type': 'feu', 'level': 100}
headers = {'content-type' : 'application/json'}

r = requests.put(url, data=json.dumps(payload), headers=headers)
print(r.text)
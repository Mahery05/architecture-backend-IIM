import requests
import json

url = 'http://localhost:3000/signup'
payload = {'email': 'pikachu@gmail.com', 'password' : 'azerty'}
headers = {'content-type' : 'application/json'}

r = requests.post(url, data=json.dumps(payload), headers=headers)
print(r.text)
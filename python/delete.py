import requests
import json

id = ''
url = 'http://localhost:3000/pkm/' + id
headers = {'content-type' : 'application/json'}

r = requests.delete(url, headers=headers)
print(r.text)
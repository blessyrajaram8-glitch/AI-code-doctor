import urllib.request
import json

def test_api():
    url = "http://localhost:5000/api/analyze"
    payload = {
        "code": "def foo(a):\n    if a = 5:\n        print(a)",
        "language": "python"
    }
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req) as response:
            res = json.loads(response.read().decode())
            print("API response success!")
            print(json.dumps(res, indent=2))
    except Exception as e:
        print("API test error:", e)

if __name__ == "__main__":
    test_api()

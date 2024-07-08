from flask import Flask, jsonify, request
import pandas as pd
from flask_cors import CORS
from threading import Lock
import joblib

app = Flask(__name__)
CORS(app)

csv_files = [
    './test_set_ethereum.csv',
    './test_set_cardano.csv',
    './test_set_doge.csv',
    './test_set_tether.csv'
]

model_paths = [
    './ethereum_model.pkl',
    './cardano_model.pkl',
    './doge_model.pkl',
    './tether_model.pkl',
]

models = {}
feature_names = {}

# Thread-safe lock for accessing models
models_lock = Lock()

def preload_models():
    global models, feature_names
    for id, model_path in enumerate(model_paths):
        model = joblib.load(model_path)
        models[id] = model
        if id == 1:
            feature_names[id] = model.feature_names_in_
        elif id == 0:
            feature_names[id] = ['High', 'Low', 'Open', 'Daily Return', 'Close_Lag1']
        elif id == 2:
            feature_names[id] = model.feature_names_in_
        elif id == 3:
            feature_names[id] = ['High', 'Low', 'Open', 'Volume', 'Marketcap']
        else:
            feature_names[id] = None

preload_models()


@app.route('/api/generate-sample/<int:id>', methods=['GET'])
def generate_sample(id):
    if 0 <= id < len(csv_files):
        df = pd.read_csv(csv_files[id])
        random_row = df.sample(n=1).iloc[0]
        target_value = random_row.iloc[-1]
        test_case = random_row.iloc[:-1].to_dict()
        return jsonify({
            'testCase': test_case,
            'targetValue': target_value
        })
    else:
        return jsonify({'error': 'Invalid ID'}), 400
    

@app.route('/api/predict-value', methods=['POST'])
def predict_value():
    try:
        data = request.json
        id = int(data['id'])
        test_case = data['testCase']
        if 0 <= id < len(model_paths):
            with models_lock:
                model = models[id]
                if id in feature_names and feature_names[id] is not None:
                    test_case_ordered = {name: test_case[name] for name in feature_names[id]}
                else:
                    test_case_ordered = test_case
            test_case_df = pd.DataFrame([test_case_ordered])
            prediction = model.predict(test_case_df)[0]
            return jsonify({'predictedValue': prediction})
        else:
            return jsonify({'error': 'Invalid ID'}), 400
    except Exception as e:
        app.logger.error(f"Error processing request: {e}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True)

if __name__ == '__main__':
    app.run(debug=True)

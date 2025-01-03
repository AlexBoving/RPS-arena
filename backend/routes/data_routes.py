# Define the data routes for the backend.
from flask import Blueprint, jsonify

data_bp = Blueprint('data', __name__)

@data_bp.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Flask!"})

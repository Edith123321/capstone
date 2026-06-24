# backend/app.py
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os
import sys

# Add the current directory to path
backend_dir = os.path.dirname(os.path.abspath(__file__))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

# Import the blueprint from the correct location
try:
    from api.v1.screening.heart_sound import heart_sound_bp
    print("✅ Blueprint imported successfully")
except ImportError as e:
    print(f"❌ Failed to import blueprint: {e}")
    print(f"   Looking for: api.v1.screening.heart_sound")
    print(f"   Current directory: {backend_dir}")
    heart_sound_bp = None

app = Flask(__name__)
CORS(app)

# Register blueprints
if heart_sound_bp:
    app.register_blueprint(heart_sound_bp)
    print("✅ Blueprint registered")
else:
    print("❌ Blueprint not available")

@app.route('/', methods=['GET'])
def index():
    """API home page"""
    return jsonify({
        'name': 'Heart Sound Classifier API',
        'version': '1.0.0',
        'status': 'running',
        'blueprint_loaded': heart_sound_bp is not None,
        'endpoints': {
            'health': '/api/v1/screening/health',
            'predict': '/api/v1/screening/predict',
            'batch_predict': '/api/v1/screening/batch_predict',
            'info': '/api/v1/screening/info'
        }
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500
# backend/app.py - Add this route
@app.route('/mobile')
def serve_mobile():
    """Serve the mobile web app"""
    return send_from_directory('../frontend_mobile', 'index.html')
if __name__ == '__main__':
    # Use port 5001 instead of 5000 (AirPlay uses 5000 on macOS)
    PORT = int(os.environ.get('PORT', 5001))
    
    print("\n" + "="*60)
    print("🫀 HEART SOUND CLASSIFIER API")
    print("="*60)
    print(f"📁 Backend path: {backend_dir}")
    print(f"📁 Blueprint loaded: {heart_sound_bp is not None}")
    print(f"📁 Port: {PORT}")
    print("\n🚀 Starting server at http://localhost:" + str(PORT))
    print("📍 Health check: http://localhost:" + str(PORT) + "/api/v1/screening/health")
    print("📍 Predict: http://localhost:" + str(PORT) + "/api/v1/screening/predict")
    print("="*60 + "\n")
    app.run(debug=True, host='0.0.0.0', port=PORT)
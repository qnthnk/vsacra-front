from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from transformers import GPT2LMHeadModel, GPT2Tokenizer

# Cargar la clave API desde un archivo .env
load_dotenv()

# Inicia la aplicación Flask
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Cargar el modelo GPT-2 y el tokenizador de Hugging Face
model_name = "gpt2"  # Usamos el modelo GPT-2 de Hugging Face
model = GPT2LMHeadModel.from_pretrained(model_name)
tokenizer = GPT2Tokenizer.from_pretrained(model_name)

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"response": "Mensaje vacío"}), 400

    try:
        # Codificar el mensaje del usuario
        input_ids = tokenizer.encode(user_message, return_tensors="pt")

        # Generar la respuesta usando GPT-2
        output = model.generate(input_ids, max_length=150, num_return_sequences=1)

        # Decodificar la respuesta generada
        generated_text = tokenizer.decode(output[0], skip_special_tokens=True)

        # Devolver la respuesta
        return jsonify({"response": generated_text.strip()})
    
    except Exception as e:
        print("Error en Hugging Face:", str(e))
        return jsonify({"response": "Error con la IA"}), 500

if __name__ == "__main__":
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
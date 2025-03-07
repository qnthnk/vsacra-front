
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
api = Blueprint('api', __name__)
from openai import OpenAI
import openai
import os
import re
import requests
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart



# Allow CORS requests to this API
CORS(api)

# Configuración del correo
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
EMAIL_ADDRESS = 'aliper1908@gmail.com'  # Cambia esto por tu correo
EMAIL_PASSWORD = 'sczfsundcixbjbf'  # Usa la contraseña de aplicación aquí
DESTINATARIO = 'aliper1908@gmail.com'  # Cambia esto por el correo del destinatario

client = openai.OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
    organization=os.environ.get("ORGANIZATION_ID")
)

CONVERTER_API_KEY = '43af89a58a6d8fd938bdd176d46766df'  
BASE_URL = os.environ.get("BASE_URL")
WEATHERAPI_KEY= os.environ.get("WEATHERAPI_KEY")



delete_tokens = set()

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods = ['POST'])
def sign_up():
    data = request.json
    first_name = data.get('first_name')
    first_last_name = data.get('first_last_name')
    second_last_name = data.get('second_last_name')
    nationality = data.get('nationality')
    gender = data.get('gender')
    birthdate = data.get('birthdate')
    blood_type = data.get('blood_type')
    allergy = data.get('allergy')
    disease = data.get('disease')
    email = data.get('email')
    password = data.get('password')
    phone_number = data.get('phone_number')
    facebook = data.get('facebook')
    instagram = data.get('instagram')
    x = data.get('x')
    city = data.get('city')
    state = data.get('state')
    address = data.get('address')
    home_country = data.get('home_country')
    country_of_residence = data.get('country_of_residence')
    country_of_destination = data.get('country_of_residence')
    zip_code = data.get('zip_code')
    latitude = data.get('latitude')
    longitude = data.get('longitude')

    user_exists = User.query.filter_by(email=email).first() 
    if user_exists is None:
        password_hash = generate_password_hash(password)

        new_user = User(
                first_name = first_name,
                first_last_name = first_last_name,
                second_last_name = second_last_name,
                nationality = nationality,
                gender = gender,
                birthdate = birthdate,
                email = email,
                password = password_hash,
                phone_number = phone_number,
                facebook = facebook,
                instagram = instagram,
                x = x,
                blood_type = blood_type,
                allergy = allergy,
                disease = disease,
                city = city,
                address = address,
                home_country = home_country,
                state = state,
                country_of_residence = country_of_residence,
                country_of_destination = country_of_destination,
                zip_code = zip_code,
                longitude = longitude,
                latitude = latitude
        )  

        try:
            db.session.add(new_user)  
            db.session.commit()

            
        except Exception as error:
            db.session.rollback()
            return jsonify({"message": "An error has ocurred."}), 500

        return jsonify({
            "user": new_user.serialize(),
            "message": "You have registered! Redirecting to log-in page" 
        }), 200
    else:
        return jsonify({"message": "Email already in use. Try using another one."}), 400
    
@api.route('/login', methods = ['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    user_exists = User.query.filter_by(email=email).first() 


    if user_exists:
        valid_password = check_password_hash(user_exists.password, password) 
        if valid_password:
            access_token = create_access_token(identity=user_exists.email)
            return jsonify({"token": access_token}), 200  
        else:
            return jsonify({"message": "Invalid password."}), 401 
    else:
        return jsonify({"message": "Invalid user."}), 404
    
@api.route('/example', methods=['GET'])
@jwt_required()
def private():
    jti = get_jwt()["jti"]
    if jti in delete_tokens:
        return jsonify({"msg": "Token has been revoked."}), 401  

    email = get_jwt_identity()
    user_exists = User.query.filter_by(email=email).first() 
    return jsonify(user_exists.serialize()), 200

# @api.route('/signup/admin', methods = ['POST'])
# def sign_up_admin():
#     data = request.json
#     email = data.get('email')
#     password = data.get('password')
#     organization_name = data.get('organization_name')

#     user_exists = Administrator.query.filter_by(email=email).first() 

#     if user_exists is None:
#         password_hash = generate_password_hash(password)

#         new_admin = Administrator(
#                 email = email,
#                 password = password_hash,
#                 organization_name = organization_name
#             )  

#         try:
#             db.session.add(new_admin)  
#             db.session.commit()
            
#         except Exception as error:
#             db.session.rollback()
#             return jsonify({"message": "An error has ocurred."}), 500

#         return jsonify({
#             "user": new_admin.serialize(),
#             "message": "You have registered! Redirecting to log-in page" 
#         }), 200
#     else:
#         return jsonify({"message": "Email already in use. Try using another one."}), 400
    
# @api.route('/login/admin', methods = ['POST'])
# def login_admin():
#     data = request.json
#     email = data.get('email')
#     password = data.get('password')
#     user_exists = Administrator.query.filter_by(email=email).first() 


#     if user_exists:
#         valid_password = check_password_hash(user_exists.password, password) 
#         if valid_password:
#             access_token = create_access_token(identity=user_exists.email)
#             return jsonify({"token": access_token}), 200  
#         else:
#             return jsonify({"message": "Invalid password."}), 401 
#     else:
#         return jsonify({"message": "Invalid user."}), 404
    
# @api.route('/example/admin', methods=['GET'])
# @jwt_required()
# def private_admin():
#     jti = get_jwt()["jti"]
#     if jti in delete_tokens:
#         return jsonify({"msg": "Token has been revoked."}), 401  

#     email = get_jwt_identity()
#     user_exists = Administrator.query.filter_by(email=email).first() 
#     return jsonify(user_exists.serialize()), 200

#@app.route('/api/get_locations', methods=['POST'])


def get_locations():
    try:
        data = request.json
        latitude = data.get("latitude")
        longitude = data.get("longitude")
        category = data.get("category")
        
        if not latitude or not longitude or not category:
            return jsonify({"error": "Faltan parámetros"}), 400
        
        prompt = f"Dame una dirección exacta y confiable de un lugar de {category} cerca de la ubicación ({latitude}, {longitude}). Solo responde con la dirección exacta."
        
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Eres un asistente experto en ubicaciones y direcciones precisas."},
                {"role": "user", "content": prompt}
            ]
        )
        
        respuesta = completion.choices[0].message.content.strip()
        client.info(f"Ubicación obtenida: {respuesta}")
        
        return jsonify({"location": respuesta})
    except Exception as e:
        client.error(f"Error al obtener ubicación: {e}")
        return jsonify({"error": "Error interno del servidor"}), 500


@api.route('/api/clasificar', methods=['POST'])
def darUBicacion():
    data = request.json
    apies_input = data.get("apies_input")
    prompt = data.get("prompt")

    if not apies_input or not prompt:
        return jsonify({"error": "Faltan parámetros"}), 400

    resultado = procesar_apies(apies_input, prompt)

    if resultado is None:
        return jsonify({"error": "Error procesando la solicitud"}), 500

    return jsonify({"resultado": resultado}), 200

@api.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.json
    message = data.get("message")
    api_key=os.environ.get("OPENAI_API_KEY"),
    organization=os.environ.get("ORGANIZATION_ID")
    print(api_key, organization)
    if not message:
        return jsonify({"error": "Falta el mensaje"}), 400

    try:
        # Enviar pregunta a OpenAI
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Eres un chatbot útil que responde preguntas de manera clara."},
                {"role": "user", "content": message}
            ]
        )

        response = completion.choices[0].message.content
        return jsonify({"response": response}), 200

    except Exception as e:
        return jsonify({"error": f"Error en el chatbot: {str(e)}"}), 500

@api.route('/exchange', methods=['GET'])
def converter():
    from_currency = request.args.get('from')  
    to_currency = request.args.get('to')      
    amount = float(request.args.get('amount', 1.0))  

    if not from_currency or not to_currency:
        return jsonify({'error': 'Debes proporcionar las monedas de origen (from) y destino (to)'}), 400

    try:
        response = requests.get(BASE_URL)
        data = response.json()

        if not data.get('success', False):
            return jsonify({'error': 'No se pudo obtener las tasas de cambio'}), 500

        rates = data.get('rates', {})
        if from_currency not in rates or to_currency not in rates:
            return jsonify({'error': 'Una o ambas monedas no son válidas'}), 400

        from_rate = rates[from_currency]
        to_rate = rates[to_currency]
        converted_amount = (amount / from_rate) * to_rate

        return jsonify({
            'from': from_currency,
            'to': to_currency,
            'amount': amount,
            'converted_amount': round(converted_amount, 2)
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/currency', methods=['GET'])
def currency():
    try:
        response = requests.get(BASE_URL)
        data = response.json()

        if not data.get('success', False):
            return jsonify({'error': 'No se pudo obtener las tasas de cambio'}), 500

        return jsonify({
            'monedas_soportadas': list(data.get('rates', {}).keys())
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@api.route('/weather', methods=['GET'])
def obtener_clima():
    try:
        lat = request.args.get('lat')
        lon = request.args.get('lon')

        if not lat or not lon:
            return jsonify({'error': 'Debes proporcionar latitud (lat) y longitud (lon).'}), 400

        url = f'http://api.weatherapi.com/v1/current.json?key={WEATHERAPI_KEY}&q={lat},{lon}'
        response = requests.get(url)

        if response.status_code != 200:
            return jsonify({'error': 'No se pudo obtener el clima.'}), 500

        data = response.json()
        return jsonify({
            'ciudad': data['location']['name'],
            'temperatura': data['current']['temp_c'],
            'humedad': data['current']['humidity'],
            'clima': data['current']['condition']['text'],
            'viento': data['current']['wind_kph']
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/emergency', methods=['POST'])
def emergency():
    try:
        # Obtener datos del cuerpo de la solicitud
        data = request.json
        user_id = data.get('user_id')
        latitude = data.get('latitude')
        longitude = data.get('longitude')

        if not user_id or not latitude or not longitude:
            return jsonify({"error": "Faltan datos requeridos"}), 400

        # Crear el mensaje del correo
        subject = "Coordenadas de Emergencia"
        body = f"El usuario {user_id} ha presionado el botón de emergencia:\n\nLatitud: {latitude}\nLongitud: {longitude}"

        msg = MIMEMultipart()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = DESTINATARIO
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        # Enviar el correo usando SMTP
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()  # Encriptación TLS
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.sendmail(EMAIL_ADDRESS, DESTINATARIO, msg.as_string())

        return jsonify({"mensaje": "Coordenadas enviadas correctamente"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

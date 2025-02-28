
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User_principal,  Administrator, Location
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
api = Blueprint('api', __name__)
from openai import OpenAI
import os
import re


# Allow CORS requests to this API
CORS(api)

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
    organization=os.environ.get("ORGANIZATION_ID")
)


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
    # nationality = data.get('nationality')
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
    # city = data.get('city')
    # state = data.get('state')
    # address = data.get('address')
    # home_country = data.get('home_country')
    # country_of_residence = data.get('country_of_residence')
    # country_of_destination = data.get('country_of_residence')
    # zip_code = data.get('zip_code')
    # migrant_or_family = data.get('migrant_or_family')

    user_exists = User_principal.query.filter_by(email=email).first() 
    if user_exists is None:
        # password_hash = generate_password_hash(password)

        new_user = User_principal(
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
                # city = city,
                # address = address,
                # home_country = home_country,
                # state = state,
                # country_of_residence = country_of_residence,
                # country_of_destination = country_of_destination,
                # zip_code = zip_code,
                # migrant_or_family = migrant_or_family
        )  

        # try:
        db.session.add(new_user)  
        db.session.commit()

            
        # except Exception as error:
        #     db.session.rollback()
        #     return jsonify({"message": "An error has ocurred."}), 500

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
    user_exists = User_principal.query.filter_by(email=email).first() 


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
    user_exists = User_principal.query.filter_by(email=email).first() 
    return jsonify(user_exists.serialize()), 200

@api.route('/signup/admin', methods = ['POST'])
def sign_up_admin():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    organization_name = data.get('organization_name')

    user_exists = Administrator.query.filter_by(email=email).first() 

    if user_exists is None:
        password_hash = generate_password_hash(password)

        new_admin = Administrator(
                email = email,
                password = password_hash,
                organization_name = organization_name
            )  

        try:
            db.session.add(new_admin)  
            db.session.commit()
            
        except Exception as error:
            db.session.rollback()
            return jsonify({"message": "An error has ocurred."}), 500

        return jsonify({
            "user": new_admin.serialize(),
            "message": "You have registered! Redirecting to log-in page" 
        }), 200
    else:
        return jsonify({"message": "Email already in use. Try using another one."}), 400
    
@api.route('/login/admin', methods = ['POST'])
def login_admin():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    user_exists = Administrator.query.filter_by(email=email).first() 


    if user_exists:
        valid_password = check_password_hash(user_exists.password, password) 
        if valid_password:
            access_token = create_access_token(identity=user_exists.email)
            return jsonify({"token": access_token}), 200  
        else:
            return jsonify({"message": "Invalid password."}), 401 
    else:
        return jsonify({"message": "Invalid user."}), 404
    
@api.route('/example/admin', methods=['GET'])
@jwt_required()
def private_admin():
    jti = get_jwt()["jti"]
    if jti in delete_tokens:
        return jsonify({"msg": "Token has been revoked."}), 401  

    email = get_jwt_identity()
    user_exists = Administrator.query.filter_by(email=email).first() 
    return jsonify(user_exists.serialize()), 200

def procesar_apies(apies_input, prompt):
    try:
        Location.info(f"Enviando solicitud a OpenAI para APIES {apies_input}...")

        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Eres un especialista en ubicaciones que va a ayudar a encontrar locaciones con direcciones exactas."},
                {"role": "user", "content": prompt}
            ]
        )

        respuesta = completion.choices[0].message.content
        Location.info(f"Respuesta obtenida para APIES {apies_input}")

        matches = re.findall(r'ID-(\d+):\s*(redflag|normal)', respuesta)

        return matches  

    except Exception as e:
        Location.error(f"Error al procesar el APIES {apies_input}: {e}")
        return None   
    
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

@api.route('/api/chatbot', methods=['POST'])
def chatbot():
    data = request.json
    message = data.get("message")

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
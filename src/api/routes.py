"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User_principal, General_data, Clinical_data, Additional_data, Family, Family_additional_data, Family_clinical_data, Family_general_data, Administrator, Location
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

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

    user_exists = User_principal.query.join(General_data).filter_by(email=email).first() 

    if user_exists is None:
        password_hash = generate_password_hash(password)

        new_user = User_principal()  

        try:
            db.session.add(new_user)  
            db.session.commit()

            new_general_data = General_data(
                first_name = first_name,
                first_last_name = first_last_name,
                second_last_name = second_last_name,
                nacionality = nationality,
                gender = gender,
                birthdate = birthdate,
                email = email,
                password = password_hash,
                phone_number = phone_number,
                facebook = facebook,
                instagram = instagram,
                x = x,
                user_principal_id = new_user.id 
            )

            new_clinical_data = Clinical_data(
                blood_type = blood_type,
                allergy = allergy,
                disease = disease,
                user_principal_id = new_user.id
            )

            new_additional_data = Additional_data(
                city = city,
                address = address,
                home_country = home_country,
                state = state,
                country_of_residence = country_of_residence,
                country_of_destination = country_of_destination,
                zip_code = zip_code,
                user_principal_id = new_user.id
            )


            db.session.add(new_general_data)
            db.session.add(new_clinical_data)
            db.session.add(new_additional_data)
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
    user_exists = User_principal.query.join(General_data).filter(General_data.email == email).first()


    if user_exists:
        valid_password = check_password_hash(user_exists.general_data.password, password) 
        if valid_password:
            access_token = create_access_token(identity=user_exists.general_data.email)
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
    user_exists = User_principal.query.join(General_data).filter(General_data.email == email).first()
    return jsonify(user_exists.serialize()), 200

@api.route('/signup/family', methods = ['POST'])
def sign_up_family():
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
    address = data.get('address')
    state = data.get('state')
    country = data.get('country')
    zip_code = data.get('zip_code')

    user_exists = Family.query.join(Family_general_data).filter_by(email=email).first() 

    if user_exists is None:
        password_hash = generate_password_hash(password)

        new_family = Family()  

        try:
            db.session.add(new_family)  
            db.session.commit()

            new_family_general_data = Family_general_data(
                first_name = first_name,
                first_last_name = first_last_name,
                second_last_name = second_last_name,
                nacionality = nationality,
                gender = gender,
                birthdate = birthdate,
                email = email,
                password = password_hash,
                phone_number = phone_number,
                facebook = facebook,
                instagram = instagram,
                x = x,
                family_id = new_family.id
            )

            new_family_clinical_data = Family_clinical_data(
                blood_type = blood_type,
                allergy = allergy,
                disease = disease,
                family_id = new_family.id
            )

            new_family_additional_data = Family_additional_data(
                city = city,
                address = address,
                country = country,
                state = state,
                zip_code = zip_code,
                family_id = new_family.id
            )


            db.session.add(new_family_general_data)
            db.session.add(new_family_clinical_data)
            db.session.add(new_family_additional_data)
            db.session.commit()
            
        except Exception as error:
            db.session.rollback()
            return jsonify({"message": "An error has ocurred."}), 500

        return jsonify({
            "user": new_family.serialize(),                                   
            "message": "You have registered! Redirecting to log-in page" 
        }), 200
    else:
        return jsonify({"message": "Email already in use. Try using another one."}), 400
    
@api.route('/login/family', methods = ['POST'])
def login_family():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    user_exists = Family.query.join(Family_general_data).filter(Family_general_data.email == email).first()


    if user_exists:
        valid_password = check_password_hash(user_exists.general_data.password, password) 
        if valid_password:
            access_token = create_access_token(identity=user_exists.general_data.email)
            return jsonify({"token": access_token}), 200  
        else:
            return jsonify({"message": "Invalid password."}), 401 
    else:
        return jsonify({"message": "Invalid user."}), 404
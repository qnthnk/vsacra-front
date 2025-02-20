from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from datetime import date

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class User_principal(db.Model):
    __tablename__ = 'user_principal'
    id = db.Column(db.Integer, primary_key=True)
    general_data = db.relationship('General_data', backref='user_principal', uselist=False)
    clinical_data = db.relationship('Clinical_data', backref='user_principal', uselist=False)
    contact_data = db.relationship('Contact_data', backref='user_principal', uselist=False)
    additional_data = db.relationship('Additional_data', backref='user_principal', uselist=False)
    location = db.relationship('Location', backref='user_principal', uselist=False)
    family_id = db.Column(db.Integer, db.ForeignKey('family.id'))
    administrator_id = db.Column(db.Integer, db.ForeignKey('administrator.id'))
    

    def __repr__(self):
        return f'<User_principal {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "general_data": self.general_data.serialize() if self.general_data else None,
            "clinical_data": self.clinical_data.serialize() if self.clinical_data else None,
            "contact_data": self.contact_data.serialize() if self.contact_data else None,
            "additional_data": self.additional_data.serialize() if self.additional_data else None,
        }

class General_data(db.Model):
    __tablename__ = 'general_data'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    first_last_name = db.Column(db.String(80), unique=False, nullable=False)
    second_last_name = db.Column(db.String(80), unique=False, nullable=False)
    nacionality = db.Column(db.String(80), unique=False, nullable=False)
    gender = db.Column(db.String(15), unique=False, nullable=False)
    birthdate = db.Column(db.Date, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), unique=False, nullable=False)
    user_principal_id = db.Column(db.Integer, db.ForeignKey('user_principal.id'))

    def __repr__(self):
        return f'<General_data {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "first_last_name": self.first_last_name,
            "second_last_name": self.second_last_name,
            "nacionality": self.nacionality,
            "gender": self.gender,
            "birthdate": self.birthdate.isoformat() if self.birthdate else None
        }

class Clinical_data(db.Model):
    __tablename__ = 'clinical_data'
    id = db.Column(db.Integer, primary_key=True)
    blood_type = db.Column(db.String(5), unique=False, nullable=True)
    allergy = db.Column(db.String(80), unique=False, nullable=True)
    disease = db.Column(db.String(80), unique=False, nullable=True)
    user_principal_id = db.Column(db.Integer, db.ForeignKey('user_principal.id'))

    def serialize(self):
        return {
            "id": self.id,
            "blood_type": self.blood_type,
            "allergy": self.allergy,
            "disease": self.disease,
        }

class Contact_data(db.Model):
    __tablename__ = 'contact_data'
    id = db.Column(db.Integer, primary_key=True)
    phone_number = db.Column(db.Integer, unique=False, nullable=False)
    user_principal_id = db.Column(db.Integer, db.ForeignKey('user_principal.id'))
    social_media = db.relationship('Social_media', backref='contact_data', uselist=False)

    def serialize(self):
        return {
            "id": self.id,
            "phone_number": self.phone_number,
            "social_media": self.social_media.serialize() if self.social_media else None,
        }

class Social_media(db.Model):
    __tablename__ = 'social_media'
    id = db.Column(db.Integer, primary_key=True)
    facebook = db.Column(db.String(80), unique=False, nullable=True)
    instagram = db.Column(db.String(80), unique=False, nullable=True)
    x = db.Column(db.String(80), unique=False, nullable=True)
    contact_data_id = db.Column(db.Integer, db.ForeignKey('contact_data.id'))

    def serialize(self):
        return {
            "id": self.id,
            "facebook": self.facebook,
            "instagram": self.instagram,
            "x": self.x,
        }

class Additional_data(db.Model):
    __tablename__ = 'additional_data'
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(80), unique=False, nullable=False)
    street = db.Column(db.String(80), unique=False, nullable=False)
    home_country = db.Column(db.String(80), unique=False, nullable=False)
    country_of_residence = db.Column(db.String(80), unique=False, nullable=False)
    country_of_destination = db.Column(db.String(80), unique=False, nullable=False)
    user_principal_id = db.Column(db.Integer, db.ForeignKey('user_principal.id'))

    def serialize(self):
        return {
            "id": self.id,
            "city": self.city,
            "street": self.street,
            "home_country": self.home_country,
            "country_of_residence": self.country_of_residence,
            "country_of_destination": self.country_of_destination,
        }
    
class Location(db.Model):
    __tablename__ = 'coordinate'
    id = db.Column(db.Integer, primary_key=True)
    latitude = db.Column(db.Float, nullable=True)  
    longitude = db.Column(db.Float, nullable=True) 
    user_principal_id = db.Column(db.Integer, db.ForeignKey('user_principal.id'))

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "latitude": self.latitude,
            "longitude": self.longitude,
        }
    
class Family(db.Model):
    __tablename__ = 'family'
    id = db.Column(db.Integer, primary_key=True)
    general_data = db.relationship('Family_general_data', backref='family', uselist=False)
    clinical_data = db.relationship('Family_clinical_data', backref='family', uselist=False)
    contact_data = db.relationship('Family_contact_data', backref='family', uselist=False)
    additional_data = db.relationship('Family_additional_data', backref='family', uselist=False)
    user_principal = db.relationship('User_principal', backref='family', uselist=False)

    def serialize(self):
        return {
            "id": self.id,
            "general_data": self.general_data.serialize() if self.general_data else None,
            "clinical_data": self.clinical_data.serialize() if self.clinical_data else None,
            "contact_data": self.contact_data.serialize() if self.contact_data else None,
            "additional_data": self.additional_data.serialize() if self.additional_data else None,
        }

class Family_general_data(db.Model):
    __tablename__ = 'family_general_data'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    first_last_name = db.Column(db.String(80), unique=False, nullable=False)
    second_last_name = db.Column(db.String(80), unique=False, nullable=False)
    nacionality = db.Column(db.String(80), unique=False, nullable=False)
    gender = db.Column(db.String(15), unique=False, nullable=False)
    birthdate = db.Column(db.Date, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), unique=False, nullable=False)
    family_id = db.Column(db.Integer, db.ForeignKey('family.id'))

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "first_last_name": self.first_last_name,
            "second_last_name": self.second_last_name,
            "nacionality": self.nacionality,
            "gender": self.gender,
            "birthdate": self.birthdate.isoformat() if self.birthdate else None
        }

class Family_clinical_data(db.Model):
    __tablename__ = 'family_clinical_data'
    id = db.Column(db.Integer, primary_key=True)
    blood_type = db.Column(db.String(5), unique=False, nullable=True)
    allergy = db.Column(db.String(80), unique=False, nullable=True)
    disease = db.Column(db.String(80), unique=False, nullable=True)
    family_id = db.Column(db.Integer, db.ForeignKey('family.id'))

    def serialize(self):
        return {
            "id": self.id,
            "blood_type": self.blood_type,
            "allergy": self.allergy,
            "disease": self.disease,
        }

class Family_contact_data(db.Model):
    __tablename__ = 'family_contact_data'
    id = db.Column(db.Integer, primary_key=True)
    phone_number = db.Column(db.Integer, unique=False, nullable=False)
    family_id = db.Column(db.Integer, db.ForeignKey('family.id'))
    social_media = db.relationship('Family_social_media', backref='family_contact_data', uselist=False)

    def serialize(self):
        return {
            "id": self.id,
            "phone_number": self.phone_number,
            "social_media": self.social_media.serialize() if self.social_media else None,
        }

class Family_social_media(db.Model):
    __tablename__ = 'family_social_media'
    id = db.Column(db.Integer, primary_key=True)
    facebook = db.Column(db.String(80), unique=False, nullable=True)
    instagram = db.Column(db.String(80), unique=False, nullable=True)
    x = db.Column(db.String(80), unique=False, nullable=True)
    contact_data_id = db.Column(db.Integer, db.ForeignKey('family_contact_data.id'))

    def serialize(self):
        return {
            "id": self.id,
            "facebook": self.facebook,
            "instagram": self.instagram,
            "x": self.x,
        }

class Family_additional_data(db.Model):
    __tablename__ = 'family_additional_data'
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(80), unique=False, nullable=False)
    street = db.Column(db.String(80), unique=False, nullable=False)
    country = db.Column(db.String(80), unique=False, nullable=False)
    family_id = db.Column(db.Integer, db.ForeignKey('family.id'))

    def serialize(self):
        return {
            "id": self.id,
            "city": self.city,
            "street": self.street,
            "country": self.country,
        }
    
class Administrator(db.Model):
    __tablename__ = 'administrator'
    id = db.Column(db.Integer, primary_key=True)
    organization_name = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    user_principal = db.relationship('User_principal', backref='administrator', uselist=False)
    

def serialize(self):
        return {
            "id": self.id,
            "organization_name": self.organization_name,
            "email": self.email
        }
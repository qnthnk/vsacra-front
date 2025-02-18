from flask_sqlalchemy import SQLAlchemy
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
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    general_data_id = db.Column(db.Integer, db.ForeignKey("general_data.id"), nullable=False )

    def __repr__(self):
        return f'<User_principal {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class General_data(db.Model):
    __tablename__ = 'general_data'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    first_last_name = db.Column(db.String(80), unique=False, nullable=False)
    second_last_name = db.Column(db.String(80), unique=False, nullable=False)
    nacionality = db.Column(db.String(80), unique=False, nullable=False)
    gender = db.Column(db.String(80), unique=False, nullable=False)
    birthdate = db.Column(db.Date, nullable=True)

    def __repr__(self):
        return f'<General_data {self.id}>' #Se cambia a id, ya que email no existe.

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "first_last_name": self.first_last_name,
            "second_last_name": self.second_last_name,
            "nacionality": self.nacionality,
            "gender": self.gender,
            "birthdate": self.birthdate.isoformat() if self.birthdate else None #Formatea la fecha si existe, sino retorna None.
        }


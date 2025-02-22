  
import os
from flask_admin import Admin
from .models import db, User_principal, User, General_data, Clinical_data,  Additional_data, Location,  Family, Family_additional_data, Family_clinical_data, Family_general_data,  Administrator
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User_principal, db.session))
    admin.add_view(ModelView(General_data, db.session))
    admin.add_view(ModelView(Clinical_data, db.session))
    admin.add_view(ModelView(Additional_data, db.session))
    admin.add_view(ModelView(Location, db.session))
    admin.add_view(ModelView(Family, db.session))
    admin.add_view(ModelView(Family_additional_data, db.session))
    admin.add_view(ModelView(Family_clinical_data, db.session))
    admin.add_view(ModelView(Family_general_data, db.session))
    admin.add_view(ModelView(Administrator, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
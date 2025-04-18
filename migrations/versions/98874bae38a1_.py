"""empty message

Revision ID: 98874bae38a1
Revises: 1d1dfeece4c0
Create Date: 2025-03-08 03:24:43.384340

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '98874bae38a1'
down_revision = '1d1dfeece4c0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('contact',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('full_name', sa.String(length=150), nullable=False),
    sa.Column('email', sa.String(length=150), nullable=False),
    sa.Column('role', sa.String(length=250), nullable=False),
    sa.Column('phone_number', sa.String(length=80), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('full_name')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('contact')
    # ### end Alembic commands ###

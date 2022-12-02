"""Create posts table

Revision ID: a2227fc162e4
Revises: ccb13ca40cf1
Create Date: 2022-12-02 16:28:00.629252

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a2227fc162e4'
down_revision = 'ccb13ca40cf1'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('posts',
                    sa.Column('id', sa.Integer(), nullable=False, primary_key=True),
                    sa.Column('title', sa.String(), nullable=False),
                    sa.Column('content', sa.String(), nullable=False),
                    sa.Column('published', sa.Boolean(), nullable=False, server_default='TRUE'),
                    sa.Column('created_at', sa.TIMESTAMP(timezone=True), nullable=False, server_default=sa.text('NOW()')),
                    )
    pass


def downgrade():
    op.drop_table('posts')
    pass

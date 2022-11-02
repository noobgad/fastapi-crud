from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash(password: str):
    return pwd_context.hash(password)


def verify_pwd(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


# ### NOT IN USE ######
my_posts = [{"title": "first title", "content": "first content", "id": 1},
            {"title": "fav foods", "content": "i like momos", "id": 2}]


def find_post(id):
    for p in my_posts:
        if p['id'] == id:
            return p
    # return None


def find_index_of_post(id):
    for i, p in enumerate(my_posts):
        if p['id'] == id:
            return i
    # return None

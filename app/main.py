# from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

from . import models
from .database import engine
from .routers import post, user, auth, vote
from .config import settings

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


""" We are splitting paths under posts, users, etc objects into different files, 
    and are accessing them back
    in the main.py file using FastAPI route onjects
"""

app.include_router(post.router)
app.include_router(user.router)
app.include_router(auth.router)
app.include_router(vote.router)

# print(f"{settings.algorithm=}")

@app.get("/")
async def root():
    return {"message": "Hello World"}

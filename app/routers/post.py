from typing import List, Optional

from fastapi import Depends, status, HTTPException, APIRouter

from sqlalchemy.orm import Session
from sqlalchemy import func

from app import models, oauth2
from app.database import get_db
from app.schemas import PostOut, PostResponse, PostCreate

router = APIRouter(prefix="/posts", tags=['Posts'])


# @router.get("/", response_model=List[PostResponse])
@router.get("/", response_model=List[PostOut])
def get_posts(db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user),
              limit: int = 10, skip: int = 0, search: Optional[str] = ""):
    # # Execute a query
    # cur.execute("SELECT * FROM posts")
    # # Retrieve query results
    # posts = cur.fetchall()

    # posts = db.query(models.Post).filter(
    #     models.Post.title.contains(search)).limit(limit).offset(skip).all()

    join_query = (db.query(models.Post, func.count(models.Vote.post_id).label("no_of_votes"))
                    .join(models.Vote, models.Post.id == models.Vote.post_id, isouter=True)
                    .group_by(models.Post.id))

    posts_with_votes = join_query.filter(
        models.Post.title.contains(search)).limit(limit).offset(skip).all()
    # print(join_query)
    # print(posts)

    # return posts
    return posts_with_votes


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=PostResponse)
def create_posts(post: PostCreate, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    # cur.execute("""INSERT INTO posts (title, content, published)
    #                 VALUES (%s, %s, %s) RETURNING * """,
    #             (post.title, post.content, post.published))
    # new_post = cur.fetchone()

    # conn.commit()

    # print(current_user)
    new_post = models.Post(user_id=current_user.id, **post.dict())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    return new_post


# @router.get("/{id}", response_model=PostResponse)
@router.get("/{id}", response_model=PostOut)
def get_post(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    # cur.execute("""SELECT * FROM posts WHERE id = (%s)""", (str(id),))
    # post = cur.fetchone()

    # post = db.query(models.Post).filter(models.Post.id == id).first()
    
    # print(post)
    # print(post.user_id)
    # print(current_user.id)
    # print(oauth2.get_current_user)
    join_query_post_votes = (db.query(models.Post, func.count(models.Vote.post_id).label("no_of_votes"))
                .join(models.Vote, models.Post.id == models.Vote.post_id, isouter=True)
                .group_by(models.Post.id))

    post = join_query_post_votes.filter(models.Post.id == id).first()

    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Post with id {id} was not found")

    return post


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    # cur.execute("""DELETE FROM posts WHERE id = (%s) RETURNING * """, (str(id),))
    # deleted_post = cur.fetchone()
    # conn.commit()

    post_query = db.query(models.Post).filter(models.Post.id == id)
    post = post_query.first()

    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Post with id {id} was not found")

    if post.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Not authorized to perform requested action")

    post_query.delete(synchronize_session=False)
    db.commit()

    return {"post deleted successfully!": post}


@router.put("/{id}", response_model=PostResponse)
# , status_code=status.HTTP_204_NO_CONTENT
def update_post(id: int, updated_post: PostCreate, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    # cur.execute("""UPDATE posts SET title = %s, content = %s, published = %s
    #                 WHERE id = %s RETURNING * """,
    #             (post.title, post.content, post.published, str(id)))

    # updated_post = cur.fetchone()
    # conn.commit()

    post_query = db.query(models.Post).filter(models.Post.id == id)
    post = post_query.first()

    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Post with id {id} was not found")

    if post.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Not authorized to perform requested action")

    post_query.update(updated_post.dict(), synchronize_session=False)
    db.commit()

    return post_query.first()

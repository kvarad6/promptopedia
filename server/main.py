from fastapi import FastAPI, Body, Form, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from pydantic import BaseModel, Field
import firebase_admin
from firebase_admin import credentials, firestore
import uvicorn
import uuid
from typing import Optional
from app_utils import *


log = putlog("MainExecutor")

configFile = "config/app.setting.json"
configuration = readJson(configFile)

if not firebase_admin._apps:
    # cred = credentials.Certificate(configuration["Secrets"]["Credentials"])
    cred = credentials.Certificate(configuration["Secrets"]["Render"])
    firebase_admin.initialize_app(cred)

app = FastAPI()

# origins = ["http://localhost:3000"]
# origins = ["promptopedia-chi.vercel.app",
#            "promptopedia-8ol8drbua-varad-kulkarnis-projects.vercel.app",
#            "promptopedia-e7ek90zge-varad-kulkarnis-projects.vercel.app"]
origins = ["*"]

app.add_middleware(GZipMiddleware, minimum_size=512)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# firestore_db = firestore.Client(credentials=cred)
firestore_db = firestore.client()

collection_name = configuration["Database"]["CollectionName"]


class Item(BaseModel):
    id: str = Field(default_factory=uuid.uuid4)
    prompt: str
    tags: list[str]  # List of strings for tags


@app.get("/items")
async def get_items():
    print("inside get_items")
    items = []
    docs = firestore_db.collection(collection_name).stream()
    for doc in docs:
        items.append({**doc.to_dict(), "id": doc.id})
    return items


@app.post("/items")
async def create_item(prompt: str = Form(...), tags: str = Form(...), name: str = Form(...), email: str = Form(...), photo: str = Form(...)):
    doc_ref = firestore_db.collection(collection_name).document()
    print("inside create_item")
    item = {
        "id": doc_ref.id,
        "name": name,
        "email": email,
        "photo": photo,
        "prompt": prompt,
        "tags": tags.split(','),  # Split comma-separated tags
    }
    # item.id = doc_ref.id
    doc_ref.set(item)
    return item


@app.get("/get_items_by_email/")
async def get_items_by_email(email: str = Query(..., description="Email address to filter posts")):

    print("email:", email)
    print("inside get_items_by_email")
    doc_ref = firestore_db.collection(collection_name).where(
        "email", "==", email)  # Using query operator
    docs = doc_ref.get()  # Fetch multiple documents

    if docs:
        posts = [doc.to_dict() for doc in docs]
        return posts
    else:
        return {"error": "Item not found"}


@app.get("/get_post_by_id/")
async def get_post_by_id(postId: str = Query(..., description="Post Id to filter posts")):

    print("post id:", postId)
    print("inside get_post_by_id")
    doc_ref = firestore_db.collection(collection_name).where(
        "id", "==", postId)  # Using query operator
    docs = doc_ref.get()  # Fetch multiple documents

    if docs:
        posts = [doc.to_dict() for doc in docs]
        return posts
    else:
        return {"error": "Item not found"}


@app.put("/update_post")
async def update_post(postId: str = Query(..., description="Edit post by id"), updatedData: Item = Body(...)):
    try:
        updatedData = {"prompt": updatedData.prompt, "tags": updatedData.tags}
        doc_ref = firestore_db.collection(collection_name).document(postId)
        doc_ref.update(updatedData)
        return {"message": "Item updated successfully"}
    except Exception as e:
        print(f"Error updating post: {e}")
        return {"message": "Error updating post. Please try again later."}


@app.delete("/delete_post/")
async def delete_item(postId: str = Query(..., description="Delete post by id")):
    doc_ref = firestore_db.collection(collection_name).document(postId)
    doc_ref.delete()
    return {"message": "Post deleted successfully"}

if __name__ == "__main__":
    uvicorn.run(
        "main:app", host=configuration["App"]["Host"], port=configuration["App"]["Port"])

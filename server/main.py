import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
from app_utils import *
from dotenv import dotenv_values
from pymongo import MongoClient
from routes import router as prompt_router
import certifi

# Load environment variables from .env file

config = dotenv_values(".env")

app = FastAPI()

origins = ["*"]

app.add_middleware(GZipMiddleware, minimum_size=512)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = MongoClient(
        config["CONNECTION_STRING"])
    print("connection name:", config["CONNECTION_STRING"])
    app.database = app.mongodb_client[config["DB_NAME"]]
    print("DB name:", config["DB_NAME"])
    print("Connected to MongoDB database")


@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()
    print("Closed MongoDB connection")


log = putlog("MainExecutor")

configFile = "config/app.setting.json"
configuration = readJson(configFile)


# @app.get("/")
# def base():
#     return {"Welcome to Promptopedia"}

app.include_router(prompt_router, tags=["Prompt"], prefix="/prompt")


if __name__ == "__main__":
    uvicorn.run(app,
                host=configuration["App"]["Host"],
                port=configuration["App"]["Port"])

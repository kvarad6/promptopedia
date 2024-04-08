from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List
from app_utils import *
from dotenv import dotenv_values
from models import Prompt,  PromptUpdate

router = APIRouter()

config = dotenv_values(".env")

@app.post("/api/submit-data")
async def submit_data(data: FormData = Body(...)):
  try:
    print(data)
  except Exception as e:
    return {"error": str(e)}

# @router.post("/", response_description="Create a new prompt", status_code=status.HTTP_201_CREATED, response_model=Prompt)
# async def create_prompt(request: Request, prompt: Prompt = Body(...)):
    
#     return created_prompt

# @app.post("/api/submit-data")
# async def submit_data(data: FormData = Body(...)):
#   try:
#     print(data)
#   except Exception as e:
#     return {"error": str(e)}
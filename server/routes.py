from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List

from models import Prompt, PromptUpdate

router = APIRouter()


@router.post("/", response_description="Create a new prompt", status_code=status.HTTP_201_CREATED, response_model=Prompt)
async def create_prompt(request: Request, prompt: Prompt = Body(...)):
    prompt = jsonable_encoder(prompt)
    # Save the prompt to the database
    new_prompt = request.app.database["prompts"].insert_one(prompt)
    created_prompt = request.app.database["prompts"].find_one(
        {"_id": new_prompt.inserted_id})
    return created_prompt


@router.get("/", response_description="List all prompts", response_model=List[Prompt])
async def list_prompts(request: Request):
    prompts = list(request.app.database["prompts"].find())
    if not prompts:
        raise HTTPException(status_code=404, detail="No prompts found")
    return prompts


@router.get("/{id}", response_description="Get a prompt by ID", response_model=Prompt)
async def get_prompt(request: Request, id: str):
    prompt = request.app.database["prompts"].find_one({"_id": id})
    if not prompt:
        raise HTTPException(status_code=404, detail="Prompt not found")


@router.put("/{id}", response_description="Update a prompt", response_model=Prompt)
async def update_prompt(id: str, request: Request, prompt: PromptUpdate = Body(...)):
    prompt = {k: v for k, v in prompt.dict().items() if v is not None}
    if len(prompt) >= 1:
        update_result = request.app.database["prompts"].update_one(
            {"_id": id}, {"$set": prompt}
        )

        if update_result.modified_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"Prompt with ID {id} not found")

    if (
        existing_prompt := request.app.database["prompts"].find_one({"_id": id})
    ) is not None:
        return existing_prompt

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"Promopt with ID {id} not found")


@router.delete("/{id}", response_description="Delete a prompt")
async def delete_prompt(id: str, request: Request, response: Response):
    delete_result = request.app.database["prompts"].delete_one({"_id": id})

    if delete_result.delete_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"Prompt with ID {id} not found")

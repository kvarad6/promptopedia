import uuid
from typing import Optional
from pydantic import BaseModel, Field


# class FormData(BaseModel):
#     id: str = Field(default_factory=uuid.uuid4, alias="_id")
#     prompt: str = Field(...)
#     tags: str = Field(...)

#     class Config:
#         allow_population_by_field_name = True
#         schema_extra = {
#             "example": {
#                 "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
#                 "prompt": "tell a story about a flying car",
#                 "tags": "vehicle"
#             }
#         }


class Prompt(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    title: str = Field(...)
    prompt: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
                "title": "Story telling prompt",
                "prompt": "tell a story about a flying car",
            }
        }


class PromptUpdate(BaseModel):
    title: Optional[str]
    prompt: Optional[str]

    schema_extra = {
        "example": {
            "title": "Story telling prompt",
            "prompt": "tell a story about a flying car",
        }
    }

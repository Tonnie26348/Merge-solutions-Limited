from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate

app = FastAPI()

# Initialize AI Client
llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", temperature=0.2)

class DiagnosticRequest(BaseModel):
    description: str
    issue_type: str

@app.post("/diagnose")
async def diagnose_issue(request: DiagnosticRequest):
    prompt = ChatPromptTemplate.from_template(
        "Analyze this maintenance issue: {description}. "
        "Categorize it into one of these: Plumbing, Electrical, HVAC, Structural. "
        "Estimate cost range in KES. Return JSON format: {{'category': ..., 'cost_min': ..., 'cost_max': ..., 'urgency': ...}}"
    )
    chain = prompt | llm
    try:
        response = await chain.ainvoke({"description": request.description})
        return response.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/recommend")
async def recommend_techs(request: dict):
    # Logic to fetch techs from backend, then score them here
    return {"message": "Technician recommendation logic"}

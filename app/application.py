from pydantic import ValidationError
from starlette.exceptions import HTTPException

from app.resources.task import task_resource
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from app.utils.exception.exception_handlers import ExceptionHandlers
from app.utils.exception.exception_types import DataException, ServiceException



def create_app():
    app = FastAPI(
        title="FastAPI Jira",
        description="FastAPI Jira Case Study",
        version="1.0.0",
        openapi_url="/openapi.json",
        docs_url="/",
        redoc_url="/redoc"
    )

    app.add_exception_handler(Exception, ExceptionHandlers.unhandled_exception)
    app.add_exception_handler(DataException, ExceptionHandlers.data_exception)
    app.add_exception_handler(ServiceException, ExceptionHandlers.service_exception)
    app.add_exception_handler(HTTPException, ExceptionHandlers.http_exception)
    app.add_exception_handler(ValidationError, ExceptionHandlers.validation_exception)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=['*'],
        allow_methods=["*"],
        allow_headers=["*"]
    )

    app.include_router(
        task_resource.router,
        prefix="/task",
        tags=["Tasks"]
    )

    @app.middleware("http")
    async def add_process_time_header(request: Request, call_next):
        response = await call_next(request)
        return response

    return app
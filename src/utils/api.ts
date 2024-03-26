import { HttpStatus } from "@/constants/api";
import { NextResponse } from "next/server";

const commonResponseEntity = ({
  res,
  statusCode = HttpStatus.OK,
  message = "Ok",
}: {
  res: any;
  statusCode?: number;
  message?: string;
}) => {
  return NextResponse.json(
    { result: res, message, statusCode },
    { status: statusCode }
  );
};

const getSuccessResponseEntity = ({
  res,
  statusCode = HttpStatus.OK,
  message = "Successfully retrieved.",
}: {
  res: any;
  statusCode?: number;
  message?: string;
}) => {
  return NextResponse.json(
    { result: res, message, statusCode },
    { status: statusCode }
  );
};

const createSuccessResponseEntity = ({
  res,
  statusCode = HttpStatus.CREATED,
  message = "Successfully created.",
}: {
  res: any;
  statusCode?: number;
  message?: string;
}) => {
  return NextResponse.json(
    { result: res, message, statusCode },
    { status: statusCode }
  );
};

const updateSuccessResponseEntity = ({
  res,
  statusCode = HttpStatus.OK,
  message = "Successfully updated.",
}: {
  res: any;
  statusCode?: number;
  message?: string;
}) => {
  return NextResponse.json(
    { result: res, message, statusCode },
    { status: statusCode }
  );
};

const deleteSuccessResponseEntity = (
  statusCode = HttpStatus.OK,
  message = "Successfully removed."
) => {
  return NextResponse.json({ message, statusCode }, { status: statusCode });
};

const notFoundResponseEntity = ({
  error,
  statusCode = HttpStatus.NOT_FOUND,
  message = "Resource not found.",
}: {
  error: any;
  statusCode?: number;
  message?: string;
}) => {
  console.log("Error : ", error);
  return NextResponse.json({ message, statusCode }, { status: statusCode });
};

const conflictErrorResponseEntity = ({
  error,
  statusCode = HttpStatus.CONFLICT,
  message = "Data is conflict.",
}: {
  error: any;
  statusCode?: number;
  message?: string;
}) => {
  console.log("Error : ", error);
  return NextResponse.json({ message, statusCode }, { status: statusCode });
};

const serverErrorResponseEntity = ({
  error,
  statusCode = HttpStatus.SERVER_ERROR,
  message = "Server error.",
}: {
  error: any;
  statusCode?: number;
  message?: string;
}) => {
  console.log("Error : ", error);
  return NextResponse.json({ message, statusCode }, { status: statusCode });
};

const badRequestResponseEntity = ({
  error,
  statusCode = HttpStatus.BAD_REQUEST,
  message = "Bad request.",
}: {
  error: any;
  statusCode?: number;
  message?: string;
}) => {
  console.log("Error : ", error);
  return NextResponse.json({ message, statusCode }, { status: statusCode });
};

export const ResponseEntity = {
  commonResponseEntity,
  getSuccessResponseEntity,
  createSuccessResponseEntity,
  updateSuccessResponseEntity,
  deleteSuccessResponseEntity,
  notFoundResponseEntity,
  conflictErrorResponseEntity,
  serverErrorResponseEntity,
  badRequestResponseEntity,
};

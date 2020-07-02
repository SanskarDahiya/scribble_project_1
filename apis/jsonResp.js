const writeJsonResponse = (resp, { result = {} }) => {
  var jsonResponseType = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
  };
  if (typeof result === "string") {
    result = { result };
  }
  if (result instanceof Error) {
    result = {
      error: { message: result.message, code: result.code || null },
      status: "error",
      code: 200
    };
    resp.writeHead(result.code, jsonResponseType);
    result = JSON.stringify(result);
  } else {
    resp.writeHead(result.code || 200, jsonResponseType);
    result = JSON.stringify(result);
  }
  resp.write(result);
  resp.end();
};

module.exports = { writeJsonResponse };

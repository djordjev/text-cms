const buildErrorResponse = (status = 404, message = 'Not found') => {
  return new Response(message, { status, statusText: message });
};

export { buildErrorResponse };

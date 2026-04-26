export const successResponse = (res, data) => {
  return res.json({
    success: true,
    data
  })
}

export const errorResponse = (res, error) => {
  return res.status(500).json({
    success: false,
    message: error.message
  })
}
export const characterCount = async (req, res, next) => {
  try {
    const content = await req.body.content;
    if (content) {
      if (content.length > 250) {
        throw new BadRequest(`Failed! Character exceeds the limit`);
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

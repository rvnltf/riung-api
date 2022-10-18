const getAdmin = async (req, res, next) => {
  try {
    res.status(200).send({
      success: true,
      message: `admin page`,
    });
  } catch (error) {
    next(error);
  }
};
export default getAdmin;

getAll(req, res) {
    const politicalOffices = officeData.getAll(req.body);
    politicalOffices.then((offices) => {
      if (!offices.status) {
        return res.status(400).json({
          status: 400,
          error: offices.message,
        });
      }
      return res.status(200).json({
        status: 200,
        data: offices.data,
      });
    });
  },
const Assignment = require("../../models/assignmentModel");

exports.createAssignment = async (req, res) => {
  const {
    traderId,
    userId,
    status,
    remarks,
    phoneNumber,
    location,
    productName,
    category,
    dueDate,
  } = req.body;

  try {
    const assignment = new Assignment({
      traderId,
      userId,
      status,
      remarks,
      phoneNumber,
      location,
      productName,
      category,
      dueDate,
    });

    await assignment.save();
    res
      .status(201)
      .json({ message: "Assignment created successfully", assignment });
  } catch (error) {
    res.status(500).json({ message: "Error creating assignment", error });
  }
};
// In your assignment controller
exports.getAssignments = async (req, res) => {
  const traderId = req.params.traderId;

  try {
    const assignments = await Assignment.find({ traderId });
    res.status(200).json({ success: true, data: assignments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching assignments", error });
  }
};


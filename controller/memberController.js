const Member = require("../model/Tasks");
const Item = require("../model/Members");

// @desc - all member
// @route - GET '/members'
// @access - public
const getAllMembers = async (req, res) => {
  try {
    const members = await Item.find();
    if (!members) return res.status(204).json({ message: "No member found" });
    res.json(members);
  } catch (err) {
    console.log(err);
  }
};

// @desc - create a member
// @route - POST '/members'
// @access - public
const createMember = async (req, res) => {
  const item = new Item(req.body);

  try {
    const allMembers = await Item.find();
    res.json(allMembers);
  } catch (err) {
    console.log(err);
  }
};

// @desc - update a member
// @route - PUT '/members'
// @access - public
const updateMember = async (req, res) => {
  const { id, item } = req?.body;
  if (!id) return res.status(400).json({ message: "Id parameter is required" });

  try {
    let member = await Item.findOne({ _id: id });

    if (!member)
      return res
        .status(204)
        .json({ message: `No matches member with id:${id}` });

    member.firstName = item.firstName;
    member.lastName = item.lastName;
    member.birthday = item.birthday;
    member.email = item.email;
    member.password = item.password;
    member.github = item.github;
    member.linkedIn = item.linkedIn;
    member.language = item.language;
    member.skill = item.skill;
    member.profileImage = item.profileImage;

    await member.save();
    const allMembers = await Item.find();
    res.json(allMembers);
  } catch (err) {
    console.log(err);
  }
};

// @desc - delete a member
// @route - DELETE '/members'
// @access - public
const deleteMember = async (req, res) => {
  const { id } = req?.body;
  if (!id) return res.status(400).json({ message: "id parameter is required" });

  try {
    const member = Item.findOne({ _id: id });
    if (!member)
      return res
        .status(204)
        .json({ message: `no matches member with id:${id}` });
    await member.deleteOne();
    const allMembers = await Item.find();
    res.json(allMembers);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAllMembers, createMember, updateMember, deleteMember };

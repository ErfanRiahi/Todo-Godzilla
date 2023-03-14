const Member = require("../model/Tasks");

// @desc - all member
// @route - GET '/members'
// @access - public
const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();
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
  const { title, age, linkedIn, github, skill, language } = req?.body;
  if (!title || !age || !linkedIn || !github || !skill || language)
    return res.status(400).json({
      message:
        "These parameter is required: title, age, linkedIn, github, skill, language",
    });

  try {
    await Member.create({ title, age, linkedIn, github, skill, language });
    const allMembers = await Member.find();
    res.json(allMembers);
  } catch (err) {
    console.log(err);
  }
};

// @desc - update a member
// @route - PUT '/members'
// @access - public
const updateMember = async (req, res) => {
  const { id, title, age, linkedIn, github, skill, language } = req?.body;
  if (!id) return res.status(400).json({ message: "Id parameter is required" });

  try {
    const member = await Member.findOne({ _id: id });
    if (!member)
      return res
        .status(204)
        .json({ message: `No matches member with id:${id}` });

    if (req.body?.title) member.title = title;
    if (req.body?.age) member.age = age;
    if (req.body?.linkedIn) member.linkedIn = linkedIn;
    if (req.body?.github) member.github = github;
    if (req.body?.skill) member.skill = skill;
    if (req.body?.language) member.language = language;

    await member.save();
    const allMembers = await member.find();
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
    const member = Member.findOne({ _id: id });
    if (!member)
      return res
        .status(204)
        .json({ message: `no matches member with id:${id}` });
    await member.deleteOne();
    const allMembers = await Member.find();
    res.json(allMembers);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAllMembers, createMember, updateMember, deleteMember };
